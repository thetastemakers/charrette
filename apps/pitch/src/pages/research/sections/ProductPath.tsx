import { cx } from '../../../lib/cx'
import s from '../Research.module.css'

export function ProductPath() {
  return (
    <>
      <section className={s.s} id="s11">
        <p className={s.sN}>11 · Product path</p>
        <h2>The local proof is narrow. The useful product becomes infrastructure.</h2>
        <div className={s.path}>
          <div className={cx(s.phase, s.isNow)}>
            <p className={s.phaseWhen}>Phase one</p>
            <p className={s.phaseWhat}>Prove the seam</p>
            <ul>
              <li>One repository, durable task state</li>
              <li>Adapters for two agent providers</li>
              <li>Isolated worktrees and an explicit hand-off packet</li>
              <li>A review–repair–re-review loop with evidence</li>
            </ul>
          </div>
          <div className={s.phase}>
            <p className={s.phaseWhen}>Phase two</p>
            <p className={s.phaseWhat}>Supervise work beyond the laptop</p>
            <ul>
              <li>Secure, fast containers and environment caching</li>
              <li>Credentials, resumability, observability, cost controls</li>
              <li>Mobile for decisions and exceptions, not a tiny terminal</li>
              <li>An open specification for the project record</li>
            </ul>
          </div>
          <div className={s.phase}>
            <p className={s.phaseWhen}>Phase three</p>
            <p className={s.phaseWhat}>Collaborative project intelligence</p>
            <ul>
              <li>Shared state, permissions and provenance</li>
              <li>Boundaries between private, project and org knowledge</li>
              <li>Potentially the most valuable layer, and the easiest to get dangerously wrong</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
