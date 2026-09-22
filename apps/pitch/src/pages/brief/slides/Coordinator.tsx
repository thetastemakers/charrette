import { cx } from '../../../lib/cx'
import { STEPS, type Step } from '../model/data'
import { DAG_VIEWBOX, edgePath, NODE_H, NODE_W, nodeX, nodeY, parentOf, stepTitle } from '../model/geometry'
import { pad2 } from '../model/lib'
import { Pin } from '../Slide'
import ui from '../ui.module.css'
import s from './Coordinator.module.css'

/** The graph after step `i` (0-based): every step so far, and a placeholder for the next. */
export function Dag({ i }: { i: number }) {
  const next = STEPS[i + 1]
  return (
    <svg className={s.dag} viewBox={DAG_VIEWBOX} aria-hidden="true">
      {STEPS.map((st, j) =>
        j === 0 || j > i ? null : (
          <path
            key={`e${j}`}
            className={cx(s.e, st.add && s.app, st.human && s.human, j === i && s.new)}
            d={edgePath(parentOf(st, j), st)}
            pathLength={1}
          />
        ),
      )}
      {STEPS.map((st, j) => {
        if (j > i) return null
        const x = nodeX(st)
        const y = nodeY(st)
        return (
          <g key={`n${j}`} className={cx(s.n, st.coord && s.coord, st.add && s.app, st.human && s.human, j === i ? s.cur : s.past)}>
            <rect x={x} y={y} width={NODE_W} height={NODE_H} rx={10} />
            <text className={s.nk} x={x + 14} y={y + 32}>
              {st.k}
            </text>
            <text className={s.nw} x={x + 14} y={y + 54}>
              {st.w}
            </text>
          </g>
        )
      })}
      {next && (
        <g className={s.ghost}>
          <rect x={nodeX(next)} y={nodeY(next)} width={NODE_W} height={NODE_H} rx={10} />
          <text x={nodeX(next) + NODE_W / 2} y={nodeY(next) + NODE_H / 2 + 6} textAnchor="middle">
            ?
          </text>
        </g>
      )}
    </svg>
  )
}

function Why({ i, st }: { i: number; st: Step }) {
  if (st.add) {
    const reason = st.add.charAt(0).toLowerCase() + st.add.slice(1)
    return (
      <span className={cx(s.why, st.human && s.human)}>
        Not in the plan. Added because <b>{reason}</b>.
      </span>
    )
  }
  return (
    <span className={s.why}>
      {i < 4
        ? 'The obvious next step. Nothing after it exists until its result does.'
        : 'Back on the main line, once everything the evidence added is settled.'}
    </span>
  )
}

/** The caption under the graph: the step being told. */
export function Card({ i }: { i: number }) {
  const st = STEPS[i]!
  return (
    <div className={s.card} aria-hidden="true">
      <p className={s.fcN}>
        <b>{pad2(i + 1)}</b>/ {STEPS.length}
      </p>
      <div>
        <p className={s.fcH}>{stepTitle(st)}</p>
        <p className={cx(s.fcW, st.human && s.human)}>{st.full}</p>
      </div>
      <p className={s.fcP}>
        {st.t}
        <Why i={i} st={st} />
      </p>
    </div>
  )
}

/** Every step as a list: the graph's text on small screens and for screen readers. */
export function FlowList() {
  return (
    <ol className={s.list} aria-label="Task 418, step by step">
      {STEPS.map((st, j) => (
        <li key={st.k}>
          <span className={s.ln}>{pad2(j + 1)}</span>
          {st.add && <span className={cx(s.la, st.human && s.human)}>Added · {st.tag}</span>}
          <b>{stepTitle(st)}</b>
          <span className={cx(s.lw, st.human && s.human)}>{st.full}</span>
          <p>{st.t}</p>
        </li>
      ))}
    </ol>
  )
}

export function Coordinator() {
  return (
    <Pin id="flow" tone="dark" name="The coordinator" className={s.flow} stickClassName={s.stick} steps={STEPS.length} after={<FlowList />}>
      {(i) => (
        <div className={ui.wrap}>
          <div className={s.head}>
            <p className={cx(ui.kicker, s.kicker)}>The answer · The coordinator</p>
            <h2>The graph isn’t drawn in advance. Each result decides the next step.</h2>
            <p className={s.task}>
              <span>Task 418</span>After a user’s role changes, their old permissions keep being served.
            </p>
          </div>
          <Dag i={i} />
          <Card i={i} />
        </div>
      )}
    </Pin>
  )
}
