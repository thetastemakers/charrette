import type { ReactNode } from 'react'

import { cx } from '../../../lib/cx'
import { labOf, Mark } from '../Mark'
import { Pin as Panel } from '../Slide'
import ui from '../ui.module.css'
import s from './Team.module.css'

const POINTS = [
  ['A stand-up, not a chat log.', 'What moved, what’s running and what’s waiting on you, as a report or as a board.'],
  ['Only decisions reach you.', 'Product calls, irreversible actions and contradictions in memory.'],
  ['The right agent for each step,', 'with review from a different lab from the author’s.'],
  ['Built as an instrument.', 'Calm, dense and keyboard-first, for hours of daily use.'],
] as const

/** A numbered pin on the mockup, matching a point beside it. */
const Pin = ({ n }: { n: number }) => (
  <span className={s.pin} aria-hidden="true">
    {n}
  </span>
)

const MOVED = [
  ['Refund idempotency keys', 'PR #1184 merged', ['Claude Code', 'Codex']],
  ['Checkout timeouts', 'cause found: pool exhausted under retry storms', ['Codex']],
  ['Webhook retry contract', 'promoted to settled memory', []],
] as const

const RUNNING = [
  [418, 'Stale permissions after a role change', 'Review', 'Codex', 4, 9],
  [419, 'Migrate billing webhooks to v2', 'Implement', 'Claude Code', 2, 6],
  [421, 'Drop legacy_sessions table', 'Review', 'Codex', 3, 5],
  [424, 'Currency rounding in refund totals', 'Triage', 'Coordinator', 0, 1],
] as const

const TABS = ['Stand-up', 'Board', 'Memory'] as const

/** The app window around either view, with the view's tab lit. */
function Window({ tab, className, children }: { tab: (typeof TABS)[number]; className?: string; children: ReactNode }) {
  return (
    <div className={cx(s.app, className)}>
      <div className={s.bar}>
        <i />
        <i />
        <i />
        <b>payments-service</b>
        <span className={s.tabs}>
          {TABS.map((t) => (
            <span key={t} className={cx(t === tab && s.on)}>
              {t}
            </span>
          ))}
        </span>
        <span className={s.stat}>
          4 running · <em>1 needs you</em>
        </span>
      </div>
      {children}
    </div>
  )
}

/** The command bar, the same in every view. */
const Command = () => (
  <div className={s.cmd}>
    <Pin n={4} />
    Tell the project what you want next
    <span>
      <kbd>⌘</kbd>
      <kbd>K</kbd>
    </span>
  </div>
)

/** The coordinator's morning report for one project: a mockup made for this slide. */
export function Standup({ className }: { className?: string }) {
  return (
    <Window tab="Stand-up" className={className}>
      <div className={s.body}>
        <p className={s.since}>
          <Pin n={1} />
          Since you left yesterday at 18:10
        </p>

        <p className={s.sh}>Moved</p>
        <ul className={s.moved}>
          {MOVED.map(([what, note, by]) => (
            <li key={what}>
              <span className={s.tick}>✓</span>
              <b>{what}</b>
              <span className={s.note}>{note}</span>
              <span className={s.by}>
                {by.map((a) => (
                  <Mark key={a} lab={labOf(a)} />
                ))}
              </span>
            </li>
          ))}
        </ul>

        <p className={s.sh}>
          Needs you <Pin n={2} />
        </p>
        <div className={s.ask}>
          <p className={s.askK}>Task 418 · a decision</p>
          <p className={s.askQ}>If token rotation fails, should the request fail, or retry once?</p>
          <p className={s.askW}>Found by the security audit. No decision on record; memory proposes retrying once, from task 402.</p>
          <div className={s.btns}>
            <span className={s.primary}>
              Retry once <kbd>R</kbd>
            </span>
            <span>
              Fail the request <kbd>F</kbd>
            </span>
            <em>Review keeps running while you decide.</em>
          </div>
        </div>

        <p className={s.sh}>
          Running <Pin n={3} />
        </p>
        <ul className={s.running}>
          {RUNNING.map(([id, title, step, agent, at, of]) => (
            <li key={id}>
              <span className={s.id}>{id}</span>
              <b>{title}</b>
              <span className={s.step}>
                {step} · <Mark lab={labOf(agent)} /> {agent}
              </span>
              <Steps at={at} of={of} />
            </li>
          ))}
        </ul>

        <p className={s.note2}>
          <span>Coordinator</span>I added a security audit to 418: the diff touches token rotation, which a rule from 4 February marks
          sensitive.
        </p>
        <Command />
      </div>
    </Window>
  )
}

interface Card {
  id: number
  title: string
  /** The step it's on, and who runs it. */
  step: string
  agent?: string
  at?: number
  of?: number
  note?: string
}

/** The same project as a board: every task, where it stands, and who has it. */
const COLUMNS: readonly { k: string; pin?: number; tone?: string; cards: readonly Card[] }[] = [
  {
    k: 'Needs you',
    pin: 2,
    tone: 'you',
    cards: [
      { id: 418, title: 'Stale permissions after a role change', step: 'Decide', note: 'Retry once, or fail the request?', at: 4, of: 9 },
    ],
  },
  {
    k: 'Running',
    pin: 3,
    cards: [
      { id: 418, title: 'Stale permissions after a role change', step: 'Review', agent: 'Codex', at: 4, of: 9 },
      { id: 419, title: 'Migrate billing webhooks to v2', step: 'Implement', agent: 'Claude Code', at: 2, of: 6 },
      { id: 421, title: 'Drop legacy_sessions table', step: 'Review', agent: 'Codex', at: 3, of: 5 },
      { id: 424, title: 'Currency rounding in refund totals', step: 'Triage', agent: 'Coordinator', at: 0, of: 1 },
    ],
  },
  {
    k: 'Held',
    cards: [{ id: 420, title: 'Upgrade the Stripe SDK to v15', step: 'Waiting on 419', note: 'Starts when the webhooks land' }],
  },
  {
    k: 'Settled',
    pin: 1,
    tone: 'done',
    cards: [
      { id: 415, title: 'Refund idempotency keys', step: 'PR #1184 merged', agent: 'Claude Code' },
      { id: 416, title: 'Checkout timeouts', step: 'Cause found', agent: 'Codex' },
      { id: 417, title: 'Webhook retry contract', step: 'Into memory' },
    ],
  },
]

function Steps({ at, of }: { at: number; of: number }) {
  return (
    <span className={s.prog}>
      {Array.from({ length: of }, (_, j) => (
        <i key={j} className={cx(j < at && s.did, j === at && s.cur)} />
      ))}
    </span>
  )
}

/** The board view of the same morning: a mockup made for this slide. */
export function Board({ className }: { className?: string }) {
  return (
    <Window tab="Board" className={className}>
      <div className={s.body}>
        <div className={s.cols}>
          {COLUMNS.map((c) => (
            <section key={c.k} className={cx(s.col, c.tone && s[c.tone])}>
              <p className={s.sh}>
                {c.k} <span className={s.count}>{c.cards.length}</span>
                {c.pin && <Pin n={c.pin} />}
              </p>
              {c.cards.map((t) => (
                <div key={`${t.id}-${t.step}`} className={s.card}>
                  <span className={s.id}>{t.id}</span>
                  <b>{t.title}</b>
                  <span className={s.step}>{t.step}</span>
                  {t.agent && (
                    <span className={s.step}>
                      <Mark lab={labOf(t.agent)} /> {t.agent}
                    </span>
                  )}
                  {t.note && <span className={s.cnote}>{t.note}</span>}
                  {t.of !== undefined && <Steps at={t.at ?? 0} of={t.of} />}
                </div>
              ))}
            </section>
          ))}
        </div>
        <Command />
      </div>
    </Window>
  )
}

/** Two views of one project, as the panel scrolls: the stand-up, then the board. */
export function Team() {
  return (
    <Panel id="team" tone="light" name="The experience" className={s.team} steps={2}>
      {(k) => (
        <div className={cx(ui.wrap, ui.split, s.split)} data-step={k}>
          <div>
            <p className={cx(ui.kicker, s.kicker)}>The experience</p>
            <h2>Run agents the way a good lead runs a team.</h2>
            <ol className={s.pts}>
              {POINTS.map(([b, t], j) => (
                <li key={b}>
                  <span className={s.n}>{j + 1}</span>
                  <p>
                    <b>{b}</b> {t}
                  </p>
                </li>
              ))}
            </ol>
          </div>
          <figure className={s.shot} aria-label="Mockup: the coordinator’s stand-up for payments-service, then the same project as a board">
            <Standup className={s.v0} />
            <Board className={s.v1} />
          </figure>
        </div>
      )}
    </Panel>
  )
}
