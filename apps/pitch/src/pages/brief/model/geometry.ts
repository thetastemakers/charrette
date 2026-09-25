/* Where things go on the task graph. Pure functions of the data, shared by
   the components and the tests. */

import { STEPS, type Step } from './data'

/* ---- task 418: the graph ---- */

export const NODE_W = 144
export const NODE_H = 72
const SX = 164
const SY = 100

export const nodeX = (s: Step): number => s.c * SX
export const nodeY = (s: Step): number => s.r * SY

/** The graph's drawing area, with a little room for strokes. */
export const DAG_VIEWBOX = `-2 -2 ${6 * SX + NODE_W + 4} ${2 * SY + NODE_H + 4}`

/** The step a step grows from: the one named in `from`, or the one before. */
export const parentOf = (s: Step, j: number): Step => STEPS[s.from ?? j - 1]!

/** The display title of a step. */
export const stepTitle = (s: Step): string => (s.k === 'Security' ? 'Security audit' : s.k)

/** The connector from `a` to `b`: straight within a column, a soft S between columns. */
export function edgePath(a: Step, b: Step): string {
  const ax = nodeX(a)
  const ay = nodeY(a)
  const bx = nodeX(b)
  const by = nodeY(b)
  if (a.c === b.c) {
    const down = b.r > a.r
    const x = ax + NODE_W / 2
    return `M${x} ${down ? ay + NODE_H : ay} L${x} ${down ? by : by + NODE_H}`
  }
  const x1 = ax + NODE_W
  const y1 = ay + NODE_H / 2
  const x2 = bx
  const y2 = by + NODE_H / 2
  const m = (x1 + x2) / 2
  return `M${x1} ${y1} C${m} ${y1}, ${m} ${y2}, ${x2} ${y2}`
}
