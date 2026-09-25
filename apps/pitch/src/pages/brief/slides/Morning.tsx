import { cx } from '../../../lib/cx'
import { vars } from '../../../lib/vars'
import { board, type AgentState, type Side, type Wire } from '../model/bus'
import { DAY } from '../model/data'
import { clock, dayTotals, pad2 } from '../model/lib'
import { Pin } from '../Slide'
import ui from '../ui.module.css'
import s from './Morning.module.css'

/** Step 0 is the brief, one step per interruption, then the sum. */
const STEPS = DAY.length + 2

function AgentCard({ st }: { st: AgentState }) {
  return (
    <div className={cx(s.agent, s[st.mode])}>
      <b>{st.a}</b>
      <small>{st.lab}</small>
      <span className={s.status}>{st.status}</span>
    </div>
  )
}

/** One side's two wires: the message coming in to you on top, what you send back out below. */
function Wires({ side, into, out }: { side: Side; into?: Wire; out?: Wire }) {
  const w = (wire: Wire | undefined, dir: 'in' | 'out') => {
    const on = wire?.side === side ? wire : undefined
    return (
      <div className={cx(s.wire, s[dir], on && s.live, on && s[on.tone])}>
        <span className={s.wl}>{on?.label}</span>
        <i />
      </div>
    )
  }
  return (
    <div className={cx(s.wires, s[side])}>
      {w(into, 'in')}
      {w(out, 'out')}
    </div>
  )
}

/**
 * The morning at step `k`: Claude Code on the left, Codex on the right, and
 * you in the middle. Every message between them goes through you.
 */
export function Switchboard({ k }: { k: number }) {
  const b = board(k)
  return (
    <div className={s.board} aria-hidden="true">
      <AgentCard st={b.agents.left} />
      <Wires side="left" into={b.in} out={b.out} />
      <div className={cx(s.me, b.you && s[b.you.tone])}>
        <span className={s.dot}>You</span>
        <span className={s.act}>{b.you?.label ?? 'Back to your own work'}</span>
        <span className={s.tally}>
          {DAY.map((e, j) => (
            <i key={e.seen} className={cx(j < b.tally.length && (b.tally[j] ? s.tDec : s.tRelay))} />
          ))}
        </span>
      </div>
      <Wires side="right" into={b.in} out={b.out} />
      <AgentCard st={b.agents.right} />
    </div>
  )
}

/** The caption under the switchboard: the interruption being told. */
export function BusCard({ k }: { k: number }) {
  const e = DAY[k - 1]
  if (!e) {
    return (
      <div className={s.card} aria-hidden="true">
        <p className={s.cN}>
          <b>{clock(0)}</b>
        </p>
        <div>
          <p className={s.cH}>You brief Claude Code</p>
          <p className={s.cW}>on the token-refresh bug</p>
        </div>
        <p className={s.cP}>Then back to your own work. For about half an hour.</p>
      </div>
    )
  }
  return (
    <div className={s.card} aria-hidden="true">
      <p className={s.cN}>
        <b>{pad2(k)}</b>/ {pad2(DAY.length)}
      </p>
      <div>
        <p className={s.cH}>“{e.msg}”</p>
        <p className={s.cW}>
          {e.a} · done {clock(e.ping)}, seen {clock(e.seen)}
        </p>
      </div>
      <p className={s.cP}>
        <span className={cx(s.tag, e.dec && s.dec)}>{e.dec ? 'A real decision' : 'Passing it on'}</span>
        You: {e.you}
      </p>
    </div>
  )
}

/** The notifications, oldest first: the figure itself on small screens. */
function Log() {
  return (
    <ol className={s.log} aria-hidden="true">
      <li className={s.start}>
        <span className={s.t}>09:00</span>
        <span className={s.who}>You</span> <span className={s.msg}>brief Claude Code on the token-refresh bug.</span>
        <span className={s.you}>Back to your own work.</span>
      </li>
      {DAY.map((e, j) => (
        <li key={e.seen} className={cx(e.dec && s.dec)} style={vars({ '--i': j + 1 })}>
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
        const sum = dayTotals(Math.min(k, DAY.length))
        const done = k > DAY.length
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
            <figure className={cx(s.day, done && s.done)} aria-label="One morning spent fixing one bug with two agents">
              <figcaption className={s.dayH}>
                <span>One bug fix, one morning</span>
                <span className={s.clock} aria-hidden="true">
                  {k === 0 ? clock(0) : k > DAY.length ? `${clock(0)}–${clock(DAY.at(-1)?.back ?? 0)}` : clock(DAY[k - 1]?.seen ?? 0)}
                </span>
              </figcaption>
              <Switchboard k={k} />
              {done ? (
                <div className={s.sum}>
                  <p>
                    <b>Seven interruptions. One needed you.</b> The other six were you carrying a message from one agent to the next.
                  </p>
                  <p className={s.then}>
                    With Charrette <span>→</span> the one question, and nothing else
                  </p>
                </div>
              ) : (
                <BusCard k={k} />
              )}
              <Log />
              <ol className="sr-only" aria-label="The morning, interruption by interruption">
                {DAY.map((e, j) => (
                  <li key={e.seen}>
                    {j + 1}. At {clock(e.seen)}, {e.a}: “{e.msg}” You: {e.you} {e.dec ? '(A real decision.)' : '(Passing it on.)'}
                  </li>
                ))}
              </ol>
            </figure>
          </div>
        )
      }}
    </Pin>
  )
}
