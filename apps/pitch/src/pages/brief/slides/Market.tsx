/* oxlint-disable jsx-a11y/no-noninteractive-tabindex, jsx-a11y/prefer-tag-over-role -- The labelled overflow region must be keyboard-scrollable on narrow screens. */
import { cx } from '../../../lib/cx'
import { Slide } from '../Slide'
import ui from '../ui.module.css'
import s from './Market.module.css'

export function Market() {
  return (
    <Slide id="market" tone="dark" name="The market" className={s.market}>
      <div className={ui.wrap}>
        <p className={cx(ui.kicker, s.kicker)}>The market</p>
        <h2>Everyone is building this layer, each for their own agent.</h2>
        <p className={cx(ui.body, s.body)}>
          That validates the category. It also means the project’s memory ends up tied to whatever each vendor sells: its agent, its models,
          its compute or its platform.
        </p>
        <div className={s.tblWrap} tabIndex={0} role="region" aria-label="Table, scrolls sideways on small screens">
          <table className={s.tbl}>
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th>Which agent</th>
                <th>Which models</th>
                <th>What you pay for</th>
                <th>Where memory lives</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Devin</td>
                <td className={s.lock}>Devin</td>
                <td className={s.lock}>Cognition’s choice</td>
                <td className={s.lock}>Their compute</td>
                <td className={s.lock}>Inside Devin</td>
              </tr>
              <tr>
                <td>GitHub Copilot</td>
                <td className={s.lock}>Copilot</td>
                <td className={s.lock}>GitHub’s catalogue</td>
                <td className={s.lock}>Seats and requests</td>
                <td className={s.lock}>Inside GitHub</td>
              </tr>
              <tr>
                <td>Cursor</td>
                <td className={s.lock}>Cursor’s agents</td>
                <td className={s.lock}>Cursor’s catalogue</td>
                <td className={s.lock}>Seats and usage</td>
                <td className={s.lock}>Inside Cursor</td>
              </tr>
              <tr>
                <td>Claude Code, Codex</td>
                <td className={s.lock}>The lab’s own</td>
                <td className={s.lock}>The lab’s own</td>
                <td className={s.free}>Your subscription</td>
                <td className={s.lock}>Each lab’s own files</td>
              </tr>
              <tr className={s.us}>
                <td>Charrette</td>
                <td className={s.free}>Any</td>
                <td className={s.free}>Any, including self-hosted</td>
                <td className={s.free}>Your subscriptions</td>
                <td className={s.free}>With the project, open format</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className={s.key}>
          <span className={s.kLock}></span>Decided by the vendor <span className={s.kFree}></span>Decided by you · simplified, September
          2026
        </p>
        <p className={s.pull}>
          A memory that moves cleanly to a competitor stops keeping customers, so no vendor will build one. The best coding model has
          changed hands repeatedly in eighteen months. <b>The project outlives every tool it uses.</b>
        </p>
      </div>
    </Slide>
  )
}
