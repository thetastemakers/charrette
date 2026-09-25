import { describe, expect, it } from 'vitest'

import { HAND, MERGED, STEPS } from '../src/pages/brief/model/data'

describe('task 418', () => {
  it('has nine steps', () => {
    expect(STEPS).toHaveLength(9)
  })
  it('only depends on earlier steps', () => {
    STEPS.forEach((s, j) => {
      for (const d of [s.from, s.also]) {
        if (d === undefined) continue
        expect(d).toBeGreaterThanOrEqual(0)
        expect(d).toBeLessThan(j)
      }
    })
  })
  it('starts at triage and ends by writing back', () => {
    expect(STEPS[0]!.k).toBe('Triage')
    expect(STEPS.at(-1)!.k).toBe('Record')
  })
  it('puts every step in its own place on the graph', () => {
    const at = new Set(STEPS.map((s) => `${s.c},${s.r}`))
    expect(at.size).toBe(STEPS.length)
  })
  it('stays inside the drawn grid', () => {
    for (const s of STEPS) {
      expect(s.c).toBeGreaterThanOrEqual(0)
      expect(s.c).toBeLessThanOrEqual(7)
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
  it('runs the same steps as the graph, minus the coordinator’s and yours', () => {
    const graph = STEPS.filter((s) => !s.coord && !s.human).map((s) => s.title ?? s.k)
    expect(HAND.map((e) => e.k).toSorted()).toEqual([...graph, 'Triage'].toSorted())
  })
  it('runs forward in time, and merges after the last step', () => {
    let last = 0
    for (const e of HAND) {
      if (e.fate === 'forgot') {
        expect(e.a).toBeUndefined()
        continue
      }
      expect(e.from).toBeGreaterThanOrEqual(last)
      expect(e.done).toBeGreaterThan(e.from!)
      expect(e.seen).toBeGreaterThanOrEqual(e.done!)
      last = e.seen!
    }
    expect(MERGED).toBeGreaterThanOrEqual(last)
  })
  it('names what was lost on every lossy hand-off', () => {
    for (const e of HAND) expect(Boolean(e.lost)).toBe(e.fate === 'lossy')
  })
})
