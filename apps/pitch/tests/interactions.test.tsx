// @vitest-environment jsdom

import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { App } from '../src/App'
import { Arch } from '../src/pages/brief/slides/Arch'
import { onFrame, PIN_QUERY } from '../src/pages/brief/scroll'

interface Query {
  matches: boolean
  listeners: Set<() => void>
}

const queries = new Map<string, Query>()

function query(text: string): Query {
  if (!queries.has(text)) window.matchMedia(text)
  const result = queries.get(text)
  if (!result) throw new Error(`Missing media query: ${text}`)
  return result
}

function setMedia(text: string, matches: boolean): void {
  const result = query(text)
  result.matches = matches
  for (const listener of result.listeners) listener()
}

beforeEach(() => {
  for (const [text, state] of queries) {
    state.matches = text === PIN_QUERY
    state.listeners.clear()
  }
  document.head.innerHTML = '<meta name="theme-color" content="" /><meta name="description" content="" />'
  Object.defineProperty(document, 'hidden', { configurable: true, value: false })
  Object.defineProperty(window, 'innerHeight', { configurable: true, value: 900 })
  vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
    callback(0)
    return 1
  })
  vi.stubGlobal('matchMedia', (text: string) => {
    let state = queries.get(text)
    if (!state) {
      state = { matches: text === PIN_QUERY, listeners: new Set() }
      queries.set(text, state)
    }
    return {
      media: text,
      get matches() {
        return state.matches
      },
      addEventListener: (_: string, listener: () => void) => state.listeners.add(listener),
      removeEventListener: (_: string, listener: () => void) => state.listeners.delete(listener),
    }
  })
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
  vi.useRealTimers()
})

describe('client behavior', () => {
  it('updates the title and contents marker as the research note is read', () => {
    let active = 's1'
    vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function (this: Element) {
      return { top: this.id === active ? 0 : 1_000 } as DOMRect
    })

    render(<App pathname="/research/" />)
    expect(document.title).toBe('Charrette · Research note')
    expect(document.querySelector('meta[name="theme-color"]')?.getAttribute('content')).toBe('#fbfaf6')
    expect(document.querySelector('a[href="#s1"]')?.getAttribute('aria-current')).toBe('location')

    active = 's2'
    act(() => {
      fireEvent.scroll(window)
    })
    expect(document.querySelector('a[href="#s1"]')?.getAttribute('aria-current')).toBeNull()
    expect(document.querySelector('a[href="#s2"]')?.getAttribute('aria-current')).toBe('location')
  })

  it('advances the graph as its pinned panel is scrolled', () => {
    let flowTop = 900
    vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function (this: Element) {
      if (this.id === 'flow') return { top: flowTop, height: 3_000 } as DOMRect
      return { top: this.id === 'top' ? 0 : 1_000, height: 0 } as DOMRect
    })

    render(<App pathname="/" />)
    expect(document.title).toBe('Charrette · Brief')
    expect(document.querySelectorAll('#flow svg g')).toHaveLength(2)

    flowTop = -2_100
    act(() => {
      fireEvent.scroll(window)
    })
    expect(document.querySelectorAll('#flow svg g')).toHaveLength(10)
    expect(screen.getByRole('list', { name: 'Task 418, step by step' }).querySelectorAll('li')).toHaveLength(10)
  })

  it('keeps the final graph visible when pinning is disabled', () => {
    setMedia(PIN_QUERY, false)
    render(<App pathname="/" />)
    expect(document.querySelectorAll('#flow svg g')).toHaveLength(10)
    expect(document.querySelector('#bus')?.textContent).toContain('Seven interruptions. One needed you.')
  })

  it('stops rotating agents when reduced motion is requested', () => {
    vi.useFakeTimers()
    render(<Arch />)
    expect(screen.getByText(/Next task briefed from 6 facts/).textContent).toContain('Claude Code')
    act(() => {
      vi.advanceTimersByTime(2_200)
    })
    expect(screen.getByText(/Next task briefed from 6 facts/).textContent).toContain('Codex')
    act(() => setMedia('(prefers-reduced-motion: reduce)', true))
    act(() => {
      vi.advanceTimersByTime(4_400)
    })
    expect(screen.getByText(/Next task briefed from 6 facts/).textContent).toContain('Codex')
  })

  it('shares and removes the brief scroll listener', () => {
    const first = vi.fn()
    const second = vi.fn()
    const offFirst = onFrame(first)
    const offSecond = onFrame(second)
    expect(first).toHaveBeenCalledTimes(2)
    expect(second).toHaveBeenCalledTimes(1)
    fireEvent.scroll(window)
    expect(first).toHaveBeenCalledTimes(3)
    expect(second).toHaveBeenCalledTimes(2)
    offFirst()
    offSecond()
    fireEvent.scroll(window)
    expect(first).toHaveBeenCalledTimes(3)
    expect(second).toHaveBeenCalledTimes(2)
  })

  it('hydrates the prerendered home page without duplicating its skip link', async () => {
    window.history.replaceState({}, '', '/')
    document.body.innerHTML = `<div id="app">${renderToString(<App pathname="/" />)}</div>`
    await act(async () => {
      await import('../src/entry-client')
    })
    expect(document.querySelectorAll('#app .skip')).toHaveLength(1)
    expect(document.querySelector('#main')?.textContent).toContain('Agents come and go. The project stays.')
  })
})
