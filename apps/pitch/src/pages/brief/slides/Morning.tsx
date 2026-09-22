import { cx } from '../../../lib/cx'
import { vars } from '../../../lib/vars'
import { DAY } from '../model/data'
import { laneSegments, type Seg } from '../model/geometry'
import { clock, dayReveal, dayTotals, pct } from '../model/lib'
import { Pin } from '../Slide'
import ui from '../ui.module.css'
import s from './Morning.module.css'

const LANES = laneSegments()
const HOURS = ['09:00', '10:00', '11:00', '12:00']
const KEY: readonly [string, string][] = [
  ['var(--lime)', 'Focused'],
  ['var(--hot)', 'Pulled out'],
  ['#7d7d84', 'Agent working'],
  ['repeating-linear-gradient(135deg,var(--hot) 0 2px,transparent 2px 4px)', 'Agent waiting on you'],
]
/** Step 0 is the brief, one step per interruption, then the sum. */
const STEPS = DAY.length + 2

function Lane({ label, segs, t }: { label: string; segs: Seg[]; t: string }) {
  return (
    <div className={s.lane}>
      <span>{label}</span>
      <div className={s.track}>
        <div className={s.segs} style={vars({ '--t': t })}>
          {segs.map((g) => (
            <i key={`${g.kind}-${g.from}`} className={s[g.kind]} style={{ left: pct(g.from), width: pct(g.to - g.from) }} />
          ))}
        </div>
      </div>
    </div>
  )
}

/** The notifications, oldest first. The panel shows the latest few at a time. */
function Log({ n }: { n: number }) {
  const at = (j: number): string | undefined => {
    const d = n - j
    return cx(d >= 0 && d < 3 && s.on, d === 1 && s.old, d === 2 && s.old2, d === 0 && s.fresh)
  }
  return (
    <ol className={s.log} aria-hidden="true">
      <li className={cx(s.start, at(0))} style={vars({ '--i': 0 })}>
        <span className={s.t}>09:00</span>
        <span className={s.who}>You</span> <span className={s.msg}>brief Claude Code on the token-refresh bug.</span>
        <span className={s.you}>Back to your own work.</span>
      </li>
      {DAY.map((e, j) => (
        <li key={e.seen} className={cx(e.dec && s.dec, at(j + 1))} style={vars({ '--i': j + 1 })}>
          <span className={s.no}>{j + 1}</span>
          <span className={s.tag}>{e.dec ? 'A real decision' : 'Passing it on'}</span>
          <span className={s.t}>{clock(e.seen)}</span>
          <span className={s.who}>{e.a}</span> <span className={s.msg}>“{e.msg}”</span>
          <span className={s.you}>You: {e.you}</span>
        </li>
      ))}
    </ol>
  )
}

export function Morning() {
  return (
    <Pin id="bus" tone="light" name="The message bus" className={s.p2} steps={STEPS}>
      {(k) => {
        const n = Math.min(k, DAY.length)
        const t = pct(dayReveal(k))
        const sum = dayTotals(n)
        return (
          <div className={ui.wrap}>
            <div className={s.head}>
              <div>
                <p className={cx(ui.kicker, s.kicker)}>The problem · Attention</p>
                <h2>The developer is the message bus.</h2>
              </div>
              <div>
                <p className={cx(ui.body, s.body)}>
                  You hand a bug to an agent and get back to your own work. Then it comes back. And again. Most of the time, all it needed
                  was someone to pass the message on.
                </p>
                <div className={s.nums}>
                  <div>
                    <b>{sum.interruptions}</b>
                    <span>times you were pulled out of your work</span>
                  </div>
                  <div>
                    <b>{sum.relays}</b>
                    <span>of them just to pass a message on</span>
                  </div>
                  <div>
                    <b>{sum.waiting}</b>
                    <span>minutes the agents sat waiting for you</span>
                  </div>
                </div>
              </div>
            </div>
            <figure className={cx(s.day, k > DAY.length && s.done)} aria-label="One morning spent fixing one bug with two agents">
              <figcaption className={s.dayH}>
                <span>One bug fix, one morning</span>
                <span className={s.axis}>
                  {HOURS.map((h, j) => (
                    <i key={h} style={{ left: pct(j * 60) }}>
                      {h}
                    </i>
                  ))}
                </span>
              </figcaption>
              <div className={s.lanes} aria-hidden="true">
                <div className={s.lane}>
                  <span />
                  <div className={s.marks}>
                    {DAY.map((e, j) => (
                      <b key={e.seen} className={cx(e.dec && s.dec, j < n && s.on)} style={{ left: pct(e.seen) }}>
                        {j + 1}
                      </b>
                    ))}
                  </div>
                </div>
                <Lane label="Your work" segs={LANES.you} t={t} />
                <Lane label="Claude Code" segs={LANES.claude} t={t} />
                <Lane label="Codex" segs={LANES.codex} t={t} />
                <p className={s.key}>
                  {KEY.map(([bg, label]) => (
                    <span key={label}>
                      <i style={{ background: bg }} />
                      {label}
                    </span>
                  ))}
                </p>
              </div>
              <Log n={n} />
              <ol className="sr-only" aria-label="The morning, interruption by interruption">
                {DAY.map((e, j) => (
                  <li key={e.seen}>
                    {j + 1}. At {clock(e.seen)}, {e.a}: “{e.msg}” You: {e.you} {e.dec ? '(A real decision.)' : '(Passing it on.)'}
                  </li>
                ))}
              </ol>
              <div className={s.sum}>
                <p>
                  <b>Seven interruptions. One needed you.</b> The other six were you carrying a message from one agent to the next.
                </p>
                <p className={s.then}>
                  With Charrette <span>→</span> the one question, and nothing else
                </p>
              </div>
            </figure>
          </div>
        )
      }}
    </Pin>
  )
}
