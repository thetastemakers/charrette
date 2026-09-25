import { describe, expect, it } from 'vitest'

import { HAND, MERGED, type HandStep } from '../src/pages/brief/model/data'
import { clamp, clock, esc, handTotals, pad2, pinProgress, stepAt } from '../src/pages/brief/model/lib'

describe('clamp', () => {
  it('keeps values between 0 and 1', () => {
    expect(clamp(-2)).toBe(0)
    expect(clamp(0.4)).toBe(0.4)
    expect(clamp(7)).toBe(1)
  })
})

describe('esc', () => {
  it('escapes markup characters', () => {
    expect(esc('<a href="x">&</a>')).toBe('&lt;a href=&quot;x&quot;&gt;&amp;&lt;/a&gt;')
  })
  it('leaves typographic quotes alone', () => {
    expect(esc('It’s “fine”')).toBe('It’s “fine”')
  })
})

describe('formatting', () => {
  it('pads to two digits', () => {
    expect(pad2(3)).toBe('03')
    expect(pad2(12)).toBe('12')
  })
  it('turns minutes after nine into clock times', () => {
    expect(clock(0)).toBe('09:00')
    expect(clock(65)).toBe('10:05')
    expect(clock(MERGED)).toBe('11:40')
  })
})

describe('pinned panels', () => {
  it('measures progress from pinned to released', () => {
    expect(pinProgress(0, 3000, 1000)).toBe(0)
    expect(pinProgress(-1000, 3000, 1000)).toBe(0.5)
    expect(pinProgress(-2000, 3000, 1000)).toBe(1)
    expect(pinProgress(400, 3000, 1000)).toBe(0)
    expect(pinProgress(-9000, 3000, 1000)).toBe(1)
  })
  it('survives a panel no taller than the viewport', () => {
    expect(Number.isFinite(pinProgress(-10, 900, 900))).toBe(true)
  })
  it('maps progress onto whole steps, first and last included', () => {
    expect(stepAt(0, 10)).toBe(0)
    expect(stepAt(1, 10)).toBe(9)
    expect(stepAt(0.5, 3)).toBe(1)
    expect(stepAt(0.49, 9)).toBe(4)
    expect(stepAt(0.7, 1)).toBe(0)
  })
  it('lands every step of a snapped panel exactly', () => {
    for (const n of [2, 3, 9, 10]) {
      for (let k = 0; k < n; k++) expect(stepAt(k / (n - 1), n)).toBe(k)
    }
  })
})

describe('the morning', () => {
  it('adds up to what the slide claims', () => {
    expect(handTotals(HAND.length)).toEqual({ waiting: 62, relays: 5, skipped: 2, lossy: 1 })
  })
  it('starts from nothing', () => {
    const none = { waiting: 0, relays: 0, skipped: 0, lossy: 0 }
    expect(handTotals(0)).toEqual(none)
    expect(handTotals(-3)).toEqual(none)
  })
  it('counts only what has happened so far', () => {
    const steps: HandStep[] = [
      { k: 'A', a: 'Codex', from: 0, done: 10, seen: 14, you: '', fate: 'ok' },
      { k: 'B', you: '', fate: 'forgot' },
      { k: 'C', a: 'Codex', from: 14, done: 20, seen: 21, you: '', fate: 'lossy', lost: '' },
      { k: 'D', a: 'Codex', you: '', fate: 'ok' },
    ]
    expect(handTotals(1, steps)).toEqual({ waiting: 4, relays: 1, skipped: 0, lossy: 0 })
    expect(handTotals(3, steps)).toEqual({ waiting: 5, relays: 2, skipped: 1, lossy: 1 })
    expect(handTotals(4, steps).waiting).toBe(5)
  })
})
