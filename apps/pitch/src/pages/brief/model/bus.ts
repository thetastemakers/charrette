/* The morning as a switchboard: two agents, and you wired between them. Every
   message one agent has for the other goes through you. */

import { DAY, type Ping } from './data'

export type Agent = Ping['a']
export type Side = 'left' | 'right'
/** Claude Code on the left, Codex on the right. */
export const sideOf = (a: Agent): Side => (a === 'Claude Code' ? 'left' : 'right')

export type Tone = 'relay' | 'decide' | 'brief'

export interface Wire {
  side: Side
  label: string
  tone: Tone
}

export interface AgentState {
  a: Agent
  lab: string
  /** What it's doing, in a few words. */
  status: string
  mode: 'working' | 'waiting' | 'idle' | 'done'
}

export interface Board {
  /** The message coming in to you, if any. */
  in?: Wire
  /** What you send out, if anything. */
  out?: Wire
  /** Your part in this step. */
  you?: { label: string; tone: Tone }
  agents: Record<Side, AgentState>
  /** Interruptions so far: true for the one that needed a person. */
  tally: boolean[]
}

const LAB: Record<Agent, string> = { 'Claude Code': 'Anthropic', Codex: 'OpenAI' }
const idle = (a: Agent): AgentState => ({ a, lab: LAB[a], status: 'Idle', mode: 'idle' })

/** The switchboard at step `k`: 0 is the brief, 1 to DAY.length one interruption each, past that the morning is over. */
export function board(k: number, day: readonly Ping[] = DAY): Board {
  const agents: Record<Side, AgentState> = { left: idle('Claude Code'), right: idle('Codex') }
  const tally = day.slice(0, Math.max(0, Math.min(k, day.length))).map((e) => e.dec === true)
  const first = day[0]
  if (k <= 0 && first) {
    const side = sideOf(first.a)
    agents[side] = { ...agents[side], status: `Working · ${first.k}`, mode: 'working' }
    return { out: { side, label: 'Brief the bug', tone: 'brief' }, you: { label: 'Brief', tone: 'brief' }, agents, tally }
  }
  const e = day[k - 1]
  if (!e) {
    for (const side of ['left', 'right'] as const) agents[side] = { ...agents[side], status: 'Done', mode: 'done' }
    return { agents, tally }
  }
  const tone: Tone = e.dec ? 'decide' : 'relay'
  const from = sideOf(e.a)
  agents[from] = { ...agents[from], status: `Waited ${e.seen - e.ping} min for you`, mode: 'waiting' }
  const next = day[k]
  const b: Board = { in: { side: from, label: `${e.k} · done`, tone }, you: { label: e.yk, tone }, agents, tally }
  if (next) {
    const to = sideOf(next.a)
    agents[to] = { ...agents[to], status: `Working · ${next.k}`, mode: 'working' }
    b.out = { side: to, label: e.yk, tone }
  }
  return b
}
