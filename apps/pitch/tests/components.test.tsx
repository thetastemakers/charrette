import { renderToString } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { DAY, STEPS } from '../src/pages/brief/model/data'
import { pad2 } from '../src/pages/brief/model/lib'
import { Card, Dag, FlowList } from '../src/pages/brief/slides/Coordinator'
import { BusCard, Morning, Switchboard } from '../src/pages/brief/slides/Morning'

const count = (html: string, re: RegExp): number => html.match(re)?.length ?? 0

describe('Dag', () => {
  it('grows by one node and one edge per step, with one current node', () => {
    for (let i = 0; i < STEPS.length; i++) {
      const h = renderToString(<Dag i={i} />)
      expect(count(h, /<rect /g)).toBe(i + 1 + (i < STEPS.length - 1 ? 1 : 0))
      expect(count(h, /<path /g)).toBe(i)
    }
  })
  it('drops the placeholder once the graph is complete', () => {
    expect(renderToString(<Dag i={STEPS.length - 2} />)).toContain('?')
    expect(renderToString(<Dag i={STEPS.length - 1} />)).not.toContain('>?<')
  })
})

describe('Card', () => {
  it('numbers the step and explains the ones the evidence added', () => {
    expect(renderToString(<Card i={0} />)).toMatch(/<b>01<\/b>\/ (<!-- -->)?10/)
    expect(renderToString(<Card i={4} />)).toContain('Not in the plan. Added because <b>review found three more call sites')
    expect(renderToString(<Card i={9} />)).toContain('Back on the main line')
  })
})

describe('FlowList', () => {
  it('lists every step, with the added ones tagged', () => {
    const h = renderToString(<FlowList />)
    expect(count(h, /<li>/g)).toBe(STEPS.length)
    expect(count(h, /Added · /g)).toBe(STEPS.filter((s) => s.add).length)
  })
})

describe('Morning, prerendered', () => {
  const h = renderToString(<Morning />)
  it('shows the final state: the sum, not the log', () => {
    expect(h).toContain('Seven interruptions. One needed you.')
    expect(h).toMatch(/<b>7<\/b>.*<b>6<\/b>.*<b>50<\/b>/s)
  })
  it('has a text version of the morning for screen readers', () => {
    expect(h).toContain('aria-label="The morning, interruption by interruption"')
    expect(h).toContain('(A real decision.)')
  })
  it('gets one snap point per step', () => {
    expect(count(h, /<i class="[^"]*snap[^"]*"/g)).toBe(9)
  })
})

describe('Switchboard', () => {
  const count = (html: string, re: RegExp): number => html.match(re)?.length ?? 0
  it('lights one wire for the brief, then two per interruption, then none', () => {
    expect(renderToString(<Switchboard k={0} />)).toContain('Brief the bug')
    for (let k = 1; k < DAY.length; k++) expect(count(renderToString(<Switchboard k={k} />), /_live_/g)).toBe(2)
    expect(count(renderToString(<Switchboard k={DAY.length} />), /_live_/g)).toBe(1)
    const end = renderToString(<Switchboard k={DAY.length + 1} />)
    expect(count(end, /_live_/g)).toBe(0)
    expect(end).toContain('Back to your own work')
  })
})

describe('BusCard', () => {
  it('opens with the brief', () => {
    expect(renderToString(<BusCard k={0} />)).toContain('You brief Claude Code')
  })
  it('tells each interruption, and names the one real decision', () => {
    const tags = DAY.map((_, j) => renderToString(<BusCard k={j + 1} />))
    expect(tags.filter((h) => h.includes('A real decision'))).toHaveLength(1)
    expect(tags.filter((h) => h.includes('Passing it on'))).toHaveLength(DAY.length - 1)
    expect(tags[0]).toMatch(new RegExp(`<b>01</b>/ (<!-- -->)?${pad2(DAY.length)}`))
  })
})
