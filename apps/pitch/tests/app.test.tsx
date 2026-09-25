import { renderToString } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { App } from '../src/App'
import { render as renderPage } from '../src/entry-server'
import { BRIEF, NOT_FOUND, RESEARCH } from '../src/meta'
import { pageForPath } from '../src/paths'

describe('static page routing', () => {
  it('selects the same page with and without a trailing slash', () => {
    expect(pageForPath('/')).toBe(BRIEF)
    expect(pageForPath('/research')).toBe(RESEARCH)
    expect(pageForPath('/research/')).toBe(RESEARCH)
    expect(pageForPath('/404.html')).toBe(NOT_FOUND)
    expect(pageForPath('/404/')).toBe(NOT_FOUND)
  })

  it('routes within a deployment base without matching lookalike paths', () => {
    expect(pageForPath('/brief/', '/brief/')).toBe(BRIEF)
    expect(pageForPath('/brief/research/', '/brief/')).toBe(RESEARCH)
    expect(pageForPath('/other/research/', '/brief/')).toBe(NOT_FOUND)
  })

  it('renders the complete brief before JavaScript runs', () => {
    const html = renderToString(<App pathname="/" />)
    expect(html.match(/data-slide=""/g)).toHaveLength(14)
    expect(html).toMatch(/Agents come and go\. <span[^>]*>The project stays\.<\/span><\/h1>/)
    expect(html).toContain('The developer is the messenger.')
    expect(html).toContain('The best model now changes every few weeks.')
    expect(html).toContain('Task 418, step by step')
    expect(html).toContain('href="/research/"')
    expect(html.match(/class="skip"/g)).toHaveLength(1)
  })

  it('renders the research note and its table of contents before JavaScript runs', () => {
    const html = renderToString(<App pathname="/research/" />)
    expect(html).toContain('The bottleneck is moving')
    expect(html).toContain('aria-label="Contents"')
    expect(html).toContain('href="#s13"')
    expect(html).toContain('href="/"')
    expect(html.match(/class="skip"/g)).toHaveLength(1)
  })

  it('renders a useful not-found page for an unknown path', () => {
    const html = renderToString(<App pathname="/missing" />)
    expect(html).toContain('Nothing here.')
    expect(html).toContain('Back to the brief')
    expect(html.match(/class="skip"/g)).toHaveLength(1)
  })

  it('prerenders the actual output paths with content', async () => {
    expect(await renderPage('/')).toContain('The project stays.</span></h1>')
    expect(await renderPage('/research/')).toContain('The missing project layer.')
    expect(await renderPage('/404/')).toContain('Nothing here.')
  })
})
