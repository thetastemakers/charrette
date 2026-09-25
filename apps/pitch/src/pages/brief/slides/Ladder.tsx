import { cx } from '../../../lib/cx'
import { vars } from '../../../lib/vars'
import { Slide } from '../Slide'
import ui from '../ui.module.css'
import s from './Ladder.module.css'

export function Ladder() {
  return (
    <Slide tone="light" name="Orchestration" className={s.ladder}>
      <div className={ui.wrap}>
        <p className={cx(ui.kicker, s.kicker)}>What orchestration actually means</p>
        <h2>Launching a sub-agent is delegation. Orchestration is deciding what happens next.</h2>
        <ol className={s.stairs}>
          <li style={vars({ '--h': 112 })}>
            <div className={s.tread}>
              <svg viewBox="0 0 200 90" aria-hidden="true">
                <rect className={s.gb} x="14" y="31" width="58" height="28" rx="4" />
                <rect className={s.gb} x="128" y="31" width="58" height="28" rx="4" />
                <path className={s.gl} d="M72 40 H124 M118 35 L124 40 L118 45" />
                <path className={s.gd} d="M128 52 H76" />
              </svg>
            </div>{' '}
            <b>Delegation</b>
            <p>One agent starts another and waits for text back.</p>
            <span className={s.rW}>Most agent tools</span>
          </li>
          <li style={vars({ '--h': 160 })}>
            <div className={s.tread}>
              <svg viewBox="0 0 200 90" aria-hidden="true">
                <circle className={s.gi} cx="36" cy="45" r="13" />
                <rect className={s.gb} x="118" y="6" width="64" height="20" rx="4" />
                <rect className={s.gb} x="118" y="35" width="64" height="20" rx="4" />
                <rect className={s.gb} x="118" y="64" width="64" height="20" rx="4" />
                <path className={s.gd} d="M49 42 L118 16 M49 45 H118 M49 48 L118 74" />
              </svg>
            </div>{' '}
            <b>Parallel agents</b>
            <p>Many sessions at once. You carry the context between them.</p>
            <span className={s.rW}>Most agent tools</span>
          </li>
          <li style={vars({ '--h': 208 })}>
            <div className={s.tread}>
              <svg viewBox="0 0 200 90" aria-hidden="true">
                <rect className={s.gb} x="4" y="33" width="36" height="24" rx="4" />
                <rect className={s.gb} x="56" y="33" width="36" height="24" rx="4" />
                <rect className={s.gb} x="108" y="33" width="36" height="24" rx="4" />
                <rect className={s.gb} x="160" y="33" width="36" height="24" rx="4" />
                <path className={s.gl} d="M40 45 H56 M92 45 H108 M144 45 H160" />
              </svg>
            </div>{' '}
            <b>Fixed pipeline</b>
            <p>The same steps every time, whether they’re needed or not.</p>
            <span className={s.rW}>Workflow features, CI</span>
          </li>
          <li className={s.us} style={vars({ '--h': 300 })}>
            <div className={s.tread}>
              <svg viewBox="0 0 280 110" aria-hidden="true">
                <rect className={s.gm} x="4" y="92" width="272" height="14" rx="3" />
                <rect className={s.gb} x="4" y="12" width="44" height="24" rx="4" />
                <rect className={s.gb} x="70" y="12" width="44" height="24" rx="4" />
                <rect className={s.gb} x="136" y="12" width="44" height="24" rx="4" />
                <rect className={s.gb} x="232" y="12" width="44" height="24" rx="4" />
                <path className={s.gl} d="M48 24 H70 M114 24 H136 M180 24 H232" />
                <rect className={s.ga} x="136" y="52" width="44" height="24" rx="4" />
                <path className={s.gad} d="M158 36 V52" />
                <circle className={s.gy} cx="210" cy="64" r="11" />
                <path className={s.gh} d="M180 64 H199 M210 53 V36 H232" />
                <path className={s.gad} d="M254 36 V92" />
              </svg>
            </div>{' '}
            <b>Supervision from evidence</b>
            <p>
              Each result decides the next step: a finding adds a repair, a sensitive file adds an audit. Work is routed across labs, a
              person is asked only when it matters, and what was learned goes into memory the next task inherits.
            </p>
            <span className={s.rW}>Charrette</span>
          </li>
        </ol>
        <p className={s.cap}>
          The agent vendors sell steps 1 to 3. Step 4 is one thing, not two features: the graph, the routing, the person and the memory only
          work together.
        </p>
      </div>
    </Slide>
  )
}
