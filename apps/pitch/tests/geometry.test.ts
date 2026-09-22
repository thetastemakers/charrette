import { describe, expect, it } from 'vitest'

import { DAY, DAY_START, SPAN, STEPS } from '../src/pages/brief/model/data'
import { DAG_VIEWBOX, edgePath, laneSegments, NODE_H, NODE_W, nodeX, nodeY, parentOf, stepTitle } from '../src/pages/brief/model/geometry'

describe('the graph', () => {
  it('fits every node inside the view box', () => {
    const [x, y, w, h] = DAG_VIEWBOX.split(' ').map(Number) as [number, number, number, number]
    for (const s of STEPS) {
      expect(nodeX(s)).toBeGreaterThanOrEqual(x)
      expect(nodeY(s)).toBeGreaterThanOrEqual(y)
      expect(nodeX(s) + NODE_W).toBeLessThanOrEqual(x + w)
      expect(nodeY(s) + NODE_H).toBeLessThanOrEqual(y + h)
    }
  })
  it('grows each step from the one it names, or the one before', () => {
    expect(parentOf(STEPS[1]!, 1)).toBe(STEPS[0])
    expect(parentOf(STEPS[4]!, 4)).toBe(STEPS[3])
    expect(parentOf(STEPS[8]!, 8)).toBe(STEPS[7])
  })
  it('draws straight lines within a column and curves between columns', () => {
    expect(edgePath(STEPS[3]!, STEPS[4]!)).toMatch(/^M\d+ \d+ L\d+ \d+$/)
    expect(edgePath(STEPS[0]!, STEPS[1]!)).toMatch(/^M\d+ \d+ C/)
  })
  it('spells out the one abbreviated title', () => {
    expect(stepTitle(STEPS[6]!)).toBe('Security audit')
    expect(stepTitle(STEPS[0]!)).toBe('Brief')
  })
})

describe('the lanes', () => {
  const lanes = laneSegments()
  it('covers your whole morning without gaps', () => {
    let t = 0
    for (const g of lanes.you) {
      expect(g.from).toBe(t)
      expect(g.to).toBeGreaterThanOrEqual(g.from)
      t = g.to
    }
    expect(t).toBe(SPAN)
    expect(lanes.you[0]).toEqual({ kind: 'brief', from: 0, to: DAY_START })
  })
  it('pulls you out once per interruption', () => {
    expect(lanes.you.filter((g) => g.kind === 'out')).toHaveLength(DAY.length)
  })
  it('puts each agent’s runs on its own lane', () => {
    const codex = DAY.filter((e) => e.a === 'Codex').length
    expect(lanes.codex).toHaveLength(codex * 2)
    expect(lanes.claude).toHaveLength((DAY.length - codex) * 2)
  })
})
