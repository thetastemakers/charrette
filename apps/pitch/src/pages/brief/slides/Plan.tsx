import { cx } from '../../../lib/cx'
import { Slide } from '../Slide'
import ui from '../ui.module.css'
import s from './Plan.module.css'

export function Plan() {
  return (
    <Slide tone="dark" name="The plan" className={s.path}>
      <div className={ui.wrap}>
        <p className={cx(ui.kicker, s.kicker)}>Where we are</p>
        <h2>The thinking is done. This round ships it.</h2>
        <ol className={s.tl}>
          <li className={s.done}>
            <p className={s.phW}>Done</p>
            <b>Thesis and research</b>
            <ul>
              <li>The core thesis</li>
              <li>The research note and prior art</li>
              <li>Most of the research</li>
            </ul>
          </li>
          <li className={s.now}>
            <p className={s.phW}>Now</p>
            <b>Design and experiments</b>
            <ul>
              <li>Designing the prototype: board, conversation, knowledge</li>
              <li>Experiments with the coordinator and project memory</li>
              <li>The first working prototype, in progress</li>
            </ul>
          </li>
          <li className={s.funded}>
            <p className={s.phW}>With this round</p>
            <b>Ship the open-source app</b>
            <ul>
              <li>A local desktop app anyone can run</li>
              <li>Project memory with status and source</li>
              <li>Adapters for the major agent tools</li>
              <li>A review and repair loop across labs</li>
            </ul>
          </li>
          <li className={s.funded}>
            <p className={s.phW}>With the next round</p>
            <b>Cloud and team supervision</b>
            <ul>
              <li>Secure containers for long-running agents</li>
              <li>Approvals from your phone</li>
              <li>Memory shared across people and projects</li>
              <li>Self-hosted for enterprises</li>
            </ul>
          </li>
        </ol>
        <p className={s.fund}>
          <span>Where the capital goes</span>Neither release happens without it. This round funds the open-source app; the cloud needs the
          next.
        </p>
      </div>
    </Slide>
  )
}
