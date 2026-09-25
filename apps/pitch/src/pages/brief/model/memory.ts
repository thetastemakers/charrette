/* Project memory for payments-service, the project task 418 runs in. The
   coordinator panel pans from the finished task graph to this graph: the
   task's Record step writes into it, the rest of the project's knowledge
   fills in, then the people who share it. Illustrative, like the task. */

import { NODE_H, NODE_W, nodeX, nodeY } from './geometry'
import { STEPS } from './data'

export type FactStatus = 'settled' | 'seen' | 'proposed' | 'retired'

export interface Fact {
  id: string
  text: string
  status: FactStatus
  /** Where it came from: a task, an agent's record, a policy or a person. */
  src: string
  /** Offset from the hub. Facts left of the hub are labelled to the left. */
  x: number
  y: number
  /** The panel step it appears at. */
  at: number
  /** Written by task 418's Record step. */
  fresh?: boolean
  /** Part of the one disagreement on the graph. */
  disputed?: boolean
}

export interface Person {
  id: string
  initials: string
  name: string
  /** Offset from the hub. */
  x: number
  y: number
  /** The fact this person settled. */
  owns: string
}

/** The step of the coordinator panel where the camera leaves the task graph. */
export const MEMORY_FROM = STEPS.length
/** Steps after the task graph: what the task wrote back, the rest of the project, the team. */
export const MEMORY_STEPS = 3
/** Facts in the whole project, of which the graph names a few. */
export const FACT_TOTAL = 214

const RECORD = STEPS[STEPS.length - 1]!
/** Where the Record step's connector leaves the task graph. */
export const RECORD_OUT = { x: nodeX(RECORD) + NODE_W, y: nodeY(RECORD) + NODE_H / 2 }
/** The knowledge graph's centre, level with the Record node so the hand-off is one straight line. */
export const HUB = { x: RECORD_OUT.x + 660, y: RECORD_OUT.y }

const step = MEMORY_FROM
export const FACTS: readonly Fact[] = [
  {
    id: 'live',
    text: 'Role checks read live permissions',
    status: 'settled',
    src: 'convention · task 418',
    x: 88,
    y: -200,
    at: step,
    fresh: true,
  },
  {
    id: 'rotate',
    text: 'A failed rotation retries once',
    status: 'settled',
    src: 'your decision · task 418',
    x: 188,
    y: -133,
    at: step,
    fresh: true,
  },
  {
    id: 'window',
    text: 'Refresh window: 15 or 5 min?',
    status: 'proposed',
    src: 'open question · task 418',
    x: 228,
    y: -67,
    at: step,
    fresh: true,
  },
  { id: 'sensitive', text: 'Token rotation is sensitive', status: 'settled', src: 'security policy', x: 240, y: 0, at: step + 1 },
  { id: 'crosslab', text: 'Cross-lab review on session code', status: 'settled', src: 'project policy', x: 228, y: 67, at: step + 1 },
  { id: 'idem', text: 'Webhook deliveries are idempotent', status: 'settled', src: 'task 407', x: 188, y: 133, at: step + 1 },
  { id: 'money', text: 'Money is integer minor units', status: 'settled', src: 'Priya · March', x: 88, y: 200, at: step + 1 },
  {
    id: 'fifteen',
    text: 'Sessions refresh every 15 min',
    status: 'settled',
    src: 'review · task 391',
    x: -88,
    y: -200,
    at: step + 1,
    disputed: true,
  },
  {
    id: 'five',
    text: 'Production reads 5 min',
    status: 'seen',
    src: 'seen once · task 402',
    x: -188,
    y: -133,
    at: step + 1,
    disputed: true,
  },
  { id: 'leads', text: 'Claude Code leads on this module', status: 'seen', src: 'last five tasks', x: -228, y: -67, at: step + 1 },
  { id: 'cached', text: 'Permissions are cached per session', status: 'retired', src: 'retired by task 418', x: -228, y: 67, at: step },
  {
    id: 'failfast',
    text: 'Writes fail fast; deliveries retry',
    status: 'proposed',
    src: 'proposed · task 425',
    x: -188,
    y: 133,
    at: step + 1,
  },
  { id: 'refunds', text: 'Refunds are synchronous', status: 'retired', src: 'no longer true · task 388', x: -88, y: 200, at: step + 1 },
]

export const PEOPLE: readonly Person[] = [
  { id: 'you', initials: 'You', name: 'You', x: 96, y: -64, owns: 'rotate' },
  { id: 'priya', initials: 'PS', name: 'Priya S.', x: 64, y: 104, owns: 'money' },
  { id: 'tomas', initials: 'TM', name: 'Tomás M.', x: -74, y: -104, owns: 'fifteen' },
  { id: 'aiko', initials: 'AK', name: 'Aiko K.', x: -104, y: 72, owns: 'failfast' },
  { id: 'dev', initials: 'DO', name: 'Dev O.', x: 124, y: 30, owns: 'crosslab' },
]
/** The step the people arrive at. */
export const PEOPLE_AT = step + 2

/** The camera over the coordinator panel: the task graph alone, then panned so the graph's end leads into memory. */
export const CAMERA = {
  task: [-2, -2, 1132, 276],
  memory: [RECORD_OUT.x - 340, HUB.y - 250, HUB.x + 650 - (RECORD_OUT.x - 340), 500],
} as const satisfies Record<string, readonly [number, number, number, number]>

/** The connector from the hub to a fact, a gentle curve out from the centre. */
export function spoke(f: { x: number; y: number }): string {
  const x2 = HUB.x + f.x
  const y2 = HUB.y + f.y
  return `M${HUB.x} ${HUB.y} Q${HUB.x + f.x * 0.55} ${HUB.y + f.y * 0.15}, ${x2} ${y2}`
}
