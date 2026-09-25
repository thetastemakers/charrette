import { DAY, type Ping } from './data'

export const clamp = (v: number): number => Math.max(0, Math.min(1, v))

const ENTITIES: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }
/** Escapes text for use inside HTML or SVG markup. */
export const esc = (s: unknown): string => String(s).replace(/[&<>"]/g, (c) => ENTITIES[c] ?? c)

export const pad2 = (n: number): string => String(n).padStart(2, '0')

/** Minutes after 09:00 as a clock time. */
export const clock = (m: number): string => `${pad2(9 + Math.floor(m / 60))}:${pad2(m % 60)}`

/**
 * How far through a pinned panel the reader is, 0 to 1: 0 when its top meets
 * the top of the viewport, 1 when its bottom meets the bottom.
 */
export const pinProgress = (top: number, height: number, viewport: number): number => clamp(-top / Math.max(1, height - viewport))

/** The step to show for a given progress through a panel of `n` steps. */
export const stepAt = (p: number, n: number): number => Math.round(clamp(p) * (n - 1))

export interface DayTotals {
  /** Times you were pulled out of your work. */
  interruptions: number
  /** Of those, the ones that only needed a message passed on. */
  relays: number
  /** Minutes the agents sat finished, waiting for you to notice. */
  waiting: number
}

/** The running totals after the first `n` interruptions of the morning. */
export function dayTotals(n: number, day: readonly Ping[] = DAY): DayTotals {
  const seen = day.slice(0, Math.max(0, n))
  return {
    interruptions: seen.length,
    relays: seen.filter((e) => !e.dec).length,
    waiting: seen.reduce((m, e) => m + e.seen - e.ping, 0),
  }
}
