import { describe, expect, it } from 'vitest'

import { STEPS } from '../src/pages/brief/model/data'
import { DAG_BOX, edgePath, NODE_H, NODE_W, nodeX, nodeY, parentOf, stepTitle } from '../src/pages/brief/model/geometry'

describe('the graph', () => {
  it('fits every node inside the view box', () => {
    const [x, y, w, h] = DAG_BOX
    for (const s of STEPS) {
      expect(nodeX(s)).toBeGreaterThanOrEqual(x)
      expect(nodeY(s)).toBeGreaterThanOrEqual(y)
      expect(nodeX(s) + NODE_W).toBeLessThanOrEqual(x + w)
      expect(nodeY(s) + NODE_H).toBeLessThanOrEqual(y + h)
    }
  })
  it('grows each step from the one it names, or the one before', () => {
    expect(parentOf(STEPS[1]!, 1)).toBe(STEPS[0])
    expect(parentOf(STEPS[4]!, 4)).toBe(STEPS[2])
    expect(parentOf(STEPS[8]!, 8)).toBe(STEPS[7])
  })
  it('draws straight lines within a column and curves between columns', () => {
    const at = (c: number, r: number) => ({ ...STEPS[1]!, c, r })
    expect(edgePath(at(3, 0), at(3, 2))).toMatch(/^M\d+ \d+ L\d+ \d+$/)
    expect(edgePath(at(3, 2), at(3, 0))).toMatch(/^M\d+ \d+ L\d+ \d+$/)
    expect(edgePath(STEPS[0]!, STEPS[1]!)).toMatch(/^M\d+ \d+ C/)
  })
  it('spells out abbreviated titles', () => {
    expect(stepTitle(STEPS[2]!)).toBe('Security audit')
    expect(stepTitle(STEPS[0]!)).toBe('Triage')
  })
})
