import { HAND, type HandStep } from './data'

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

export interface HandTotals {
  /** Minutes finished agents sat waiting for you to notice. */
  waiting: number
  /** Results you carried from one agent to the next. */
  relays: number
  /** Steps that never ran. */
  skipped: number
  /** Hand-offs that lost something on the way. */
  lossy: number
}

/** The running totals after the first `n` steps of the morning. */
export function handTotals(n: number, steps: readonly HandStep[] = HAND): HandTotals {
  const past = steps.slice(0, Math.max(0, n))
  const ran = past.filter((e) => e.fate !== 'forgot')
  return {
    waiting: ran.reduce((m, e) => m + (e.seen ?? 0) - (e.done ?? 0), 0),
    relays: ran.length,
    skipped: past.length - ran.length,
    lossy: past.filter((e) => e.fate === 'lossy').length,
  }
}
