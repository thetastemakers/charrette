import { cx } from '../../../lib/cx'
import { Pin } from '../Slide'
import ui from '../ui.module.css'
import s from './Open.module.css'

/** The three beats of the panel, told beside the scene each one shows. */
const BEATS = [
  {
    k: 'The base',
    h: 'The whole product, open source, on your desktop.',
    t: 'Project memory, the coordinator and the agent adapters. Free for as long as you like, with your own agents and subscriptions. What the project knows is plain files in an open format, next to your code.',
  },
  {
    k: 'Built on top',
    h: 'Cloud for anyone who would rather not run it.',
    t: 'Small teams and large ones get shared memory, hosted runs and approvals from anywhere. Enterprises get it on their own infrastructure, supported. The same core runs underneath, so nothing is lost moving up or back down.',
  },
  {
    k: 'Why it matters',
    h: 'It is how we grow, and why a lead can say yes.',
    t: 'Developers adopt it free and pull in the cloud when their team shares a project. A lead choosing where project knowledge lives is choosing for years: with open source there is no lock-in to weigh.',
  },
] as const

const TREE = [
  ['payments-service/', 0],
  ['src/', 1],
  ['.charrette/', 1],
  ['memory/', 2],
  ['token-rotation.md', 3],
  ['refresh-window.md', 3],
  ['money-units.md', 3],
  ['tasks/418/', 2],
  ['graph.json', 3],
  ['evidence/', 3],
] as const

/** Beat one: the app on your own machine, and memory as a file you can open. */
function Desktop() {
  return (
    <div className={cx(s.scene, s.desk)}>
      <div className={s.win}>
        <div className={s.bar}>
          <i />
          <i />
          <i />
          <span>payments-service · Charrette</span>
          <em>on this Mac</em>
        </div>
        <div className={s.pane}>
          <ul className={s.tree}>
            {TREE.map(([name, depth]) => (
              <li key={name} className={cx(name === 'token-rotation.md' && s.sel, name === '.charrette/' && s.ours)} data-d={depth}>
                {name}
              </li>
            ))}
          </ul>
          <pre className={s.file}>
            <span className={s.fm}>---</span>
            {'\n'}
            <span className={s.fk}>status:</span> settled{'\n'}
            <span className={s.fk}>source:</span> your decision · task 418{'\n'}
            <span className={s.fk}>agents:</span> claude-code, codex{'\n'}
            <span className={s.fm}>---</span>
            {'\n\n'}A failed token rotation retries once,{'\n'}then fails the request.
          </pre>
        </div>
      </div>
      <ul className={s.chips}>
        <li>Runs on your desktop</li>
        <li>Plain files, open format</li>
        <li>Your agents, your subscriptions</li>
      </ul>
    </div>
  )
}

const LAYERS = [
  {
    k: 'Enterprise',
    h: 'Self-hosted, supported',
    t: 'SSO, audit and retention, on your own infrastructure',
    who: 'Organisations · licence',
    cls: 'ent',
  },
  {
    k: 'Charrette Cloud',
    h: 'For teams, small and large',
    t: 'Shared memory, hosted runs, approvals from your phone',
    who: 'Teams · per seat',
    cls: 'cloud',
  },
  { k: 'Open source', h: 'Charrette', t: 'The complete product, on your own machine', who: 'Anyone · free', cls: 'base' },
] as const

/** Beat two: what's sold, stacked on the same open core. */
function Stack() {
  return (
    <div className={cx(s.scene, s.stack)}>
      {LAYERS.map((l) => (
        <div key={l.k} className={cx(s.layer, s[l.cls])}>
          <div>
            <small>{l.k}</small>
            <b>{l.h}</b>
            <span>{l.t}</span>
          </div>
          <p className={s.who}>{l.who}</p>
        </div>
      ))}
      <p className={s.core}>
        <span>Same open core</span>
      </p>
    </div>
  )
}

const LOOP = ['A developer installs it', 'Uses it on a real project', 'The team shares the project', 'The team moves to Cloud'] as const
const LEAD = ['Read every line', 'Pin a version', 'Host it yourself', 'Fork it, if it comes to that'] as const

/** Beat three: the growth loop, and the lead's checklist. */
function Why() {
  return (
    <div className={cx(s.scene, s.why)}>
      <div className={s.loop}>
        <p className={s.sk}>How it grows</p>
        <ol>
          {LOOP.map((l, j) => (
            <li key={l}>
              <span>{j + 1}</span>
              {l}
            </li>
          ))}
        </ol>
        <p className={s.back}>More adapters and more users bring the next developer in</p>
      </div>
      <div className={s.lead}>
        <p className={s.sk}>What a lead checks</p>
        <ul>
          {LEAD.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
        <p className={s.stamp}>No lock-in</p>
      </div>
    </div>
  )
}

export function Open() {
  return (
    <Pin id="open" tone="light" name="Open source" className={s.open} steps={BEATS.length}>
      {(step) => (
        <div className={cx(ui.wrap, s.grid)} data-step={step}>
          <div>
            <p className={cx(ui.kicker, s.kicker)}>Why open source</p>
            <h2>Open source is the base. Everything we sell is built on top.</h2>
            <ol className={s.beats}>
              {BEATS.map((b, j) => (
                <li key={b.k} className={cx(j === step && s.on)}>
                  <span>
                    {String(j + 1).padStart(2, '0')} · {b.k}
                  </span>
                  <b>{b.h}</b>
                  <p>{b.t}</p>
                </li>
              ))}
            </ol>
          </div>
          <figure
            className={s.fig}
            aria-label="Charrette on your desktop, the cloud and enterprise offerings built on it, and why that grows"
          >
            <Desktop />
            <Stack />
            <Why />
          </figure>
        </div>
      )}
    </Pin>
  )
}
