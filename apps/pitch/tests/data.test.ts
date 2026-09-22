import { describe, expect, it } from 'vitest'

import { DAY, DAY_START, SPAN, STEPS } from '../src/pages/brief/model/data'

describe('task 418', () => {
  it('has ten steps', () => {
    expect(STEPS).toHaveLength(10)
  })
  it('only depends on earlier steps', () => {
    STEPS.forEach((s, j) => {
      if (s.from !== undefined) {
        expect(s.from).toBeGreaterThanOrEqual(0)
        expect(s.from).toBeLessThan(j)
      }
    })
  })
  it('puts every step in its own place on the graph', () => {
    const at = new Set(STEPS.map((s) => `${s.c},${s.r}`))
    expect(at.size).toBe(STEPS.length)
  })
  it('stays inside the drawn grid', () => {
    for (const s of STEPS) {
      expect(s.c).toBeGreaterThanOrEqual(0)
      expect(s.c).toBeLessThanOrEqual(6)
      expect(s.r).toBeGreaterThanOrEqual(0)
      expect(s.r).toBeLessThanOrEqual(2)
    }
  })
  it('tags every step it added, and only those', () => {
    for (const s of STEPS) expect(Boolean(s.add)).toBe(Boolean(s.tag))
  })
  it('asks a person exactly once', () => {
    expect(STEPS.filter((s) => s.human)).toHaveLength(1)
  })
})

describe('the morning', () => {
  it('runs forward in time, inside the window shown', () => {
    let last = DAY_START
    for (const e of DAY) {
      expect(e.from).toBeGreaterThanOrEqual(last)
      expect(e.ping).toBeGreaterThan(e.from)
      expect(e.seen).toBeGreaterThanOrEqual(e.ping)
      expect(e.back).toBeGreaterThan(e.seen)
      last = e.back
    }
    expect(last).toBeLessThanOrEqual(SPAN)
  })
  it('has one real decision', () => {
    expect(DAY.filter((e) => e.dec)).toHaveLength(1)
  })
})
