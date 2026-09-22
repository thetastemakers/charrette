import { useEffect, useState } from 'react'

import { cx } from '../../../lib/cx'
import { Slide } from '../Slide'
import ui from '../ui.module.css'
import s from './Arch.module.css'

const AGENTS = ['Claude Code', 'Codex', 'Cursor', 'Gemini CLI', 'Open-weight'] as const

/** The agent in use changes every couple of seconds; the project layer doesn't. Holds still for reduced motion. */
function useRotation(n: number, ms: number): number {
  const [k, setK] = useState(0)
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    let timer = 0
    const run = (): void => {
      window.clearInterval(timer)
      if (reduce.matches || document.hidden) return
      timer = window.setInterval(() => setK((v) => (v + 1) % n), ms)
    }
    run()
    document.addEventListener('visibilitychange', run)
    reduce.addEventListener('change', run)
    return () => {
      window.clearInterval(timer)
      document.removeEventListener('visibilitychange', run)
      reduce.removeEventListener('change', run)
    }
  }, [n, ms])
  return k
}

export function Arch() {
  const on = useRotation(AGENTS.length, 2200)
  return (
    <Slide tone="dark" name="Where it sits" className={s.arch}>
      <div className={ui.wrap}>
        <p className={cx(ui.kicker, s.kicker)}>Where Charrette sits</p>
        <h2>A persistent layer between your team and whichever agents you use.</h2>
        <div className={s.stack}>
          <div className={s.layer}>
            <p className={s.lK}>
              Agents<small>Replaceable. Use whichever is best this month.</small>
            </p>
            <div className={s.chips}>
              {AGENTS.map((a, j) => (
                <span key={a} className={cx(j === on && s.on)}>
                  {a}
                </span>
              ))}
              <span className={s.next}>What ships next</span>
            </div>
          </div>
          <div className={cx(s.layer, s.lCore)}>
            <p className={s.lK}>
              Charrette<small>Persists. Owned by the project and its team.</small>
            </p>
            <div className={s.core}>
              <div>
                <b>Project memory</b>
                <span>Facts and decisions, each with its status and source</span>
              </div>
              <div>
                <b>Coordinator</b>
                <span>Graphs, routing, review, the attention boundary</span>
              </div>
              <div>
                <b>Tasks and artifacts</b>
                <span>Bounded work and everything it produced</span>
              </div>
            </div>
            <p className={s.foot}>
              Next task briefed from 6 facts · running on <b>{AGENTS[on]}</b>
            </p>
          </div>
          <div className={s.layer}>
            <p className={s.lK}>
              Yours<small>Nothing leaves unless you send it.</small>
            </p>
            <div className={cx(s.chips, s.plain)}>
              <span>Your repositories</span>
              <span>Your subscriptions and API keys</span>
              <span>Your laptop, or your servers</span>
            </div>
          </div>
        </div>
      </div>
    </Slide>
  )
}
