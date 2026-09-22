/* oxlint-disable jsx-a11y/prefer-tag-over-role -- Inline SVG needs an image role and accessible title. */
import { cx } from '../../../lib/cx'
import { Slide } from '../Slide'
import ui from '../ui.module.css'
import s from './Memory.module.css'

export function Memory() {
  return (
    <Slide id="memory" tone="dark" name="Project memory" className={s.a1}>
      <div className={cx(ui.wrap, ui.split)}>
        <div>
          <p className={cx(ui.kicker, s.kicker)}>The answer · Project memory</p>
          <h2>A knowledge graph the project owns. Not a docs folder.</h2>
          <ul className={cx(ui.pts, s.pts)}>
            <li>
              <b>Every fact has a status.</b> Settled, seen once, proposed, or no longer true. Agents are told which.
            </li>
            <li>
              <b>Every fact says where it came from.</b> The task, the agent and the evidence behind it.
            </li>
            <li>
              <b>Disagreements stay visible.</b> When two facts conflict, both are kept until a person decides.
            </li>
            <li>
              <b>It moves with the project.</b> Every agent is briefed from it. None of it lives inside an agent.
            </li>
          </ul>
        </div>
        <figure className={s.kg} aria-label="A section of one project's knowledge graph">
          <svg viewBox="0 0 560 432" role="img" aria-labelledby="kg-t">
            <title id="kg-t">
              One project, six facts, and where each came from. Two facts disagree and both are kept; one that is no longer true stays
              visible.
            </title>
            <g className={s.kgE}>
              <path d="M150 216 C 168 216, 160 46, 178 46" />
              <path d="M470 46 H 486" />
              <path d="M150 216 C 168 216, 160 114, 178 114" />
              <path d="M470 114 H 486" />
              <path d="M150 216 C 168 216, 160 182, 178 182" />
              <path d="M470 182 H 486" />
              <path d="M150 216 C 168 216, 160 250, 178 250" />
              <path d="M470 250 H 486" />
              <path d="M150 216 C 168 216, 160 318, 178 318" />
              <path d="M470 318 H 486" />
              <path d="M150 216 C 168 216, 160 386, 178 386" />
              <path d="M470 386 H 486" />
            </g>
            <path className={s.kgX} d="M472 182 H 478 V 250 H 472" />
            <g className={s.kgHub}>
              <rect x="2" y="194" width="148" height="44" rx="22" />
              <text x="76" y="220" textAnchor="middle">
                payments-service
              </text>
            </g>
            <g className={cx(s.kgN, s.canon)}>
              <rect x="178" y="24" width="292" height="44" rx="6" />
              <text x="194" y="51">
                Money is integer minor units
              </text>
            </g>
            <g className={s.kgT}>
              <rect x="486" y="34" width="72" height="24" rx="3" />
              <text x="522" y="50" textAnchor="middle">
                a person
              </text>
            </g>
            <g className={cx(s.kgN, s.canon)}>
              <rect x="178" y="92" width="292" height="44" rx="6" />
              <text x="194" y="119">
                Webhook deliveries are idempotent
              </text>
            </g>
            <g className={s.kgT}>
              <rect x="486" y="102" width="72" height="24" rx="3" />
              <text x="522" y="118" textAnchor="middle">
                task 407
              </text>
            </g>
            <g className={cx(s.kgN, s.canon, s.con)}>
              <rect x="178" y="160" width="292" height="44" rx="6" />
              <text x="194" y="187">
                Sessions refresh every 15 min
              </text>
            </g>
            <g className={s.kgT}>
              <rect x="486" y="170" width="72" height="24" rx="3" />
              <text x="522" y="186" textAnchor="middle">
                review
              </text>
            </g>
            <g className={cx(s.kgN, s.obs, s.con)}>
              <rect x="178" y="228" width="292" height="44" rx="6" />
              <text x="194" y="255">
                Production reads 5 min
              </text>
            </g>
            <g className={s.kgT}>
              <rect x="486" y="238" width="72" height="24" rx="3" />
              <text x="522" y="254" textAnchor="middle">
                task 418
              </text>
            </g>
            <g className={cx(s.kgN, s.prop)}>
              <rect x="178" y="296" width="292" height="44" rx="6" />
              <text x="194" y="323">
                Writes fail fast; deliveries retry
              </text>
            </g>
            <g className={s.kgT}>
              <rect x="486" y="306" width="72" height="24" rx="3" />
              <text x="522" y="322" textAnchor="middle">
                task 425
              </text>
            </g>
            <g className={cx(s.kgN, s.ret)}>
              <rect x="178" y="364" width="292" height="44" rx="6" />
              <text x="194" y="391">
                Refunds are synchronous
              </text>
            </g>
            <g className={s.kgT}>
              <rect x="486" y="374" width="72" height="24" rx="3" />
              <text x="522" y="390" textAnchor="middle">
                task 388
              </text>
            </g>
          </svg>
          <figcaption>
            {' '}
            <span>
              <i className={cx(s.lg, s.canon)}></i>Settled
            </span>
            <span>
              <i className={cx(s.lg, s.obs)}></i>Seen once
            </span>
            <span>
              <i className={cx(s.lg, s.prop)}></i>Proposed
            </span>
            <span>
              <i className={cx(s.lg, s.ret)}></i>No longer true
            </span>
            <span>
              <i className={cx(s.lg, s.con)}></i>Disputed
            </span>{' '}
          </figcaption>
        </figure>
      </div>
    </Slide>
  )
}
