import { cx } from '../../../lib/cx'
import { Slide } from '../Slide'
import ui from '../ui.module.css'
import s from './Business.module.css'

export function Business() {
  return (
    <Slide id="business" tone="dark" name="The business" className={s.biz}>
      <div className={ui.wrap}>
        <p className={cx(ui.kicker, s.kicker)}>The business</p>
        <h2>Charge for coordination, never for compute.</h2>
        <p className={cx(ui.body, s.body)}>
          Teams bring their own agents and spend. They pay for what no single agent gives them: a shared project record, sync, governance
          and support. Charrette adds to an AI budget instead of competing for it, and stays out of a price war with the labs.
        </p>
        <div className={s.tiers}>
          <div className={s.tier}>
            <p className={s.tK}>Open source</p>
            <b>Charrette</b>
            <p className={s.tWho}>One developer</p>
            <ul>
              <li>The full memory and coordinator</li>
              <li>Any agent, any model</li>
              <li>Local-first, open format</li>
              <li>Complete, not a trial</li>
            </ul>
            <p className={s.tP}>Free · the adoption engine</p>
          </div>
          <div className={s.tier}>
            <p className={s.tK}>Cloud</p>
            <b>Charrette for teams</b>
            <p className={s.tWho}>Several people, one project record</p>
            <ul>
              <li>Shared memory across people and machines</li>
              <li>Decisions with authors and history</li>
              <li>Hosted, long-running agent runs</li>
              <li>Approvals from anywhere, including mobile</li>
            </ul>
            <p className={s.tP}>Per seat or per active project</p>
          </div>
          <div className={s.tier}>
            <p className={s.tK}>Enterprise</p>
            <b>Self-hosted, supported</b>
            <p className={s.tWho}>Organisations with policy</p>
            <ul>
              <li>SSO, audit and retention</li>
              <li>Deployed on your infrastructure</li>
              <li>Knowledge shared across projects</li>
              <li>Support and security review</li>
            </ul>
            <p className={s.tP}>Annual licence</p>
          </div>
        </div>
        <p className={s.cap}>
          The model behind GitLab, Sentry, PostHog and Tailscale: free and complete for the individual, paid where a team needs sync,
          control and someone to call.
        </p>
      </div>
    </Slide>
  )
}
