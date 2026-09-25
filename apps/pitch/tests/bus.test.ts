import { describe, expect, it } from 'vitest'

import { board, sideOf } from '../src/pages/brief/model/bus'
import { DAY } from '../src/pages/brief/model/data'

describe('the switchboard', () => {
  it('puts each agent on its own side', () => {
    expect(sideOf('Claude Code')).toBe('left')
    expect(sideOf('Codex')).toBe('right')
  })
  it('starts with your brief going out to the first agent', () => {
    const b = board(0)
    expect(b.in).toBeUndefined()
    expect(b.out).toEqual({ side: 'left', label: 'Brief the bug', tone: 'brief' })
    expect(b.agents.left.mode).toBe('working')
    expect(b.agents.right.mode).toBe('idle')
    expect(b.tally).toEqual([])
  })
  it('routes a message from one agent, through you, to the other', () => {
    const b = board(1)
    expect(b.in).toMatchObject({ side: 'left', tone: 'relay' })
    expect(b.out).toMatchObject({ side: 'right', label: DAY[0]?.yk })
    expect(b.agents.right.status).toBe(`Working · ${DAY[1]?.k}`)
    expect(b.tally).toEqual([false])
  })
  it('sends the reply back to the same agent when it asked the question', () => {
    const b = board(3)
    expect(b.in?.side).toBe('left')
    expect(b.out?.side).toBe('left')
    expect(b.agents.left.mode).toBe('working')
  })
  it('keeps an agent waiting until you notice', () => {
    const b = board(2)
    expect(b.agents.right).toMatchObject({ mode: 'waiting', status: `Waited ${(DAY[1]?.seen ?? 0) - (DAY[1]?.ping ?? 0)} min for you` })
  })
  it('marks the one decision', () => {
    const k = DAY.findIndex((e) => e.dec) + 1
    expect(board(k).you?.tone).toBe('decide')
    expect(board(k).tally.at(-1)).toBe(true)
  })
  it('sends nothing on after the last interruption, then settles', () => {
    expect(board(DAY.length).out).toBeUndefined()
    const end = board(DAY.length + 1)
    expect(end.in).toBeUndefined()
    expect(end.you).toBeUndefined()
    expect(end.agents.left.mode).toBe('done')
    expect(end.tally.filter(Boolean)).toHaveLength(1)
    expect(end.tally).toHaveLength(DAY.length)
  })
  it('copes with an empty morning', () => {
    expect(board(0, []).agents.left.mode).toBe('done')
  })
})
