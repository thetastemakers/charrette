import conversation from '../../../assets/conversation.png'
import conversation1000avif from '../../../assets/img/conversation-1000.avif'
import conversation1000webp from '../../../assets/img/conversation-1000.webp'
import conversation500avif from '../../../assets/img/conversation-500.avif'
import conversation500webp from '../../../assets/img/conversation-500.webp'
import conversation760avif from '../../../assets/img/conversation-760.avif'
import conversation760webp from '../../../assets/img/conversation-760.webp'
import { cx } from '../../../lib/cx'
import { Slide } from '../Slide'
import ui from '../ui.module.css'
import s from './Team.module.css'

const SIZES = '(min-width: 1200px) 560px, (min-width: 901px) 46vw, calc(100vw - 32px)'

function Shot() {
  return (
    <picture>
      <source
        type="image/avif"
        srcSet={`${conversation500avif} 500w, ${conversation760avif} 760w, ${conversation1000avif} 1000w`}
        sizes={SIZES}
      />
      <source
        type="image/webp"
        srcSet={`${conversation500webp} 500w, ${conversation760webp} 760w, ${conversation1000webp} 1000w`}
        sizes={SIZES}
      />
      <img
        src={conversation}
        width={1000}
        height={700}
        loading="lazy"
        decoding="async"
        alt="The Charrette coordinator: a project intent, what moved, what is still running, and a note that a security review was added by a project rule."
      />
    </picture>
  )
}

export function Team() {
  return (
    <Slide tone="light" name="The experience" className={s.team}>
      <div className={cx(ui.wrap, ui.split, s.split)}>
        <div>
          <p className={cx(ui.kicker, s.kicker)}>The experience</p>
          <h2>Run agents the way a good lead runs a team.</h2>
          <ul className={cx(ui.pts, s.pts)}>
            <li>
              <b>A stand-up, not a chat log.</b> The coordinator reports what moved, what’s running and what’s waiting on you.
            </li>
            <li>
              <b>Only decisions reach you.</b> Product calls, irreversible actions and contradictions in memory. Nothing else interrupts.
            </li>
            <li>
              <b>The right agent for each step,</b> including a reviewer from a different lab from the author’s.
            </li>
            <li>
              <b>Built as an instrument.</b> Calm, dense and keyboard-first, for hours of daily use, not demos.
            </li>
          </ul>
        </div>
        <figure className={s.shot}>
          <div className={ui.frame}>
            <Shot />
          </div>
          <figcaption>
            The coordinator’s view of one project, from the design prototype. It added a security review on its own because a project rule
            required it, and it names the one decision holding things up.
          </figcaption>
        </figure>
      </div>
    </Slide>
  )
}
