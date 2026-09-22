import { describe, expect, it } from 'vitest'

import { DAY, DAY_START, SPAN, type Ping } from '../src/pages/brief/model/data'
import { clamp, clock, dayReveal, dayTotals, esc, pad2, pct, pinProgress, stepAt } from '../src/pages/brief/model/lib'

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
    expect(clock(SPAN)).toBe('12:30')
  })
  it('turns minutes into a share of the morning', () => {
    expect(pct(0)).toBe('0.00%')
    expect(pct(SPAN / 2)).toBe('50.00%')
    expect(pct(SPAN)).toBe('100.00%')
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
    expect(dayTotals(DAY.length)).toEqual({ interruptions: 7, relays: 6, waiting: 50 })
  })
  it('starts from nothing', () => {
    expect(dayTotals(0)).toEqual({ interruptions: 0, relays: 0, waiting: 0 })
    expect(dayTotals(-3)).toEqual({ interruptions: 0, relays: 0, waiting: 0 })
  })
  it('counts only what has happened so far', () => {
    const day: Ping[] = [
      { a: 'Codex', from: 0, ping: 10, seen: 14, back: 20, msg: '', you: '' },
      { a: 'Codex', from: 20, ping: 30, seen: 31, back: 40, msg: '', you: '', dec: true },
    ]
    expect(dayTotals(1, day)).toEqual({ interruptions: 1, relays: 1, waiting: 4 })
    expect(dayTotals(2, day)).toEqual({ interruptions: 2, relays: 1, waiting: 5 })
  })
  it('reveals the timeline up to each return to work, then all of it', () => {
    expect(dayReveal(0)).toBe(DAY_START)
    expect(dayReveal(1)).toBe(DAY[0]?.back)
    expect(dayReveal(DAY.length)).toBe(DAY.at(-1)?.back)
    expect(dayReveal(DAY.length + 1)).toBe(SPAN)
  })
})
