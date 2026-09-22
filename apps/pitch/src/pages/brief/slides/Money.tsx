import { cx } from '../../../lib/cx'
import { vars } from '../../../lib/vars'
import { Slide } from '../Slide'
import ui from '../ui.module.css'
import s from './Money.module.css'

export function Money() {
  return (
    <Slide id="money" tone="light" name="The opportunity" className={s.money}>
      <div className={cx(ui.wrap, ui.split, s.split)}>
        <div>
          <p className={cx(ui.kicker, s.kicker)}>The opportunity</p>
          <h2>Teams already pay for several agents. Nothing connects them.</h2>
          <p className={ui.body}>
            A heavy user now pays more than one lab at once. Each subscription buys a strong agent with its own memory. None of it buys the
            project that sits across them, and that gap grows with every agent a team adds.
          </p>
          <p className={ui.answer}>
            The more agents a team runs <span>→</span> the more the layer across them is worth
          </p>
        </div>
        <figure
          className={s.subs}
          aria-label="What one heavy user pays each month at list price: one tool in 2022, three in 2026, each with its own memory"
        >
          <figcaption>What one heavy user pays each month, at list price</figcaption>
          <div className={s.subsGrid}>
            <p className={cx(s.subsYr, s.y0)}>2022</p>
            <p className={cx(s.subsYr, s.y1)}>2026</p>
            <div className={s.across}>
              <b>Charrette</b>
              <span>one project memory, one coordinator, across all of them</span>
            </div>
            <div className={cx(s.sub, s.then)} style={vars({ '--v': 10 })}>
              <b>$10</b>
              <i></i>
              <p>
                GitHub Copilot<small>one tool</small>
              </p>
            </div>
            <div className={s.sub} style={vars({ '--v': 200 })}>
              <b>$200</b>
              <i></i>
              <p>
                Claude Max<small>CLAUDE.md</small>
              </p>
            </div>
            <div className={s.sub} style={vars({ '--v': 200 })}>
              <b>$200</b>
              <i></i>
              <p>
                ChatGPT Pro<small>AGENTS.md</small>
              </p>
            </div>
            <div className={s.sub} style={vars({ '--v': 20 })}>
              <b>$20</b>
              <i></i>
              <p>
                Cursor Pro<small>.cursor/rules</small>
              </p>
            </div>
          </div>
          <p className={s.subsSum}>
            <b>$420 a month.</b> Three vendors, three memories, nothing between them.
          </p>
          <p className={s.spendCap}>
            For scale, both reported: Cursor passed $1B in annualised revenue in 2025, and Claude Code reached a $1B run-rate the same year.
            The budget exists; teams have decided this is worth paying for.
          </p>
        </figure>
      </div>
    </Slide>
  )
}
