import board from '../../../assets/board.png'
import board1080avif from '../../../assets/img/board-1080.avif'
import board1080webp from '../../../assets/img/board-1080.webp'
import board1440avif from '../../../assets/img/board-1440.avif'
import board1440webp from '../../../assets/img/board-1440.webp'
import board720avif from '../../../assets/img/board-720.avif'
import board720webp from '../../../assets/img/board-720.webp'
import { cx } from '../../../lib/cx'
import { clamp } from '../model/lib'
import { Pin } from '../Slide'
import ui from '../ui.module.css'
import s from './Hero.module.css'

const SIZES = '(min-width: 1200px) 1180px, calc(100vw - 32px)'

/* The opening copy lifts away and the product rises into its place. */
function move(p: number, live: boolean, el: HTMLElement): void {
  el.style.setProperty('--p', live ? p.toFixed(4) : '0')
  el.style.setProperty('--q', live ? clamp((p - 0.1) / 0.75).toFixed(4) : '1')
}

export function Hero() {
  return (
    <Pin id="top" tone="light" name="Charrette" className={s.hero} stickClassName={s.stick} steps={2} onProgress={move}>
      {() => (
        <>
          <div className={cx(ui.wrap, s.copy)}>
            <p className={cx(ui.kicker, s.kicker)}>Open-source infrastructure for software engineering with AI agents</p>
            <h1>Agents come and go. The project stays.</h1>
            <div className={s.row}>
              <p className={s.dek}>
                Charrette gives a software project <b>a memory it owns</b> and <b>a coordinator that moves the work</b> between AI agents.
                Any agent, any model, your own subscriptions, on your own servers.
              </p>
              <aside className={s.prop}>
                <b>The proposition</b>
                <p>The agents will keep changing. Your project should not have to.</p>
              </aside>
            </div>
          </div>
          <figure className={s.shot}>
            <figcaption>
              <span className={cx(ui.kicker, s.kicker)}>The prototype · Board</span>
              <b>Every task the project is running. Three need a person. The rest move on their own.</b>
            </figcaption>
            <div className={ui.frame}>
              <picture>
                <source type="image/avif" srcSet={`${board720avif} 720w, ${board1080avif} 1080w, ${board1440avif} 1440w`} sizes={SIZES} />
                <source type="image/webp" srcSet={`${board720webp} 720w, ${board1080webp} 1080w, ${board1440webp} 1440w`} sizes={SIZES} />
                <img
                  src={board}
                  width={1440}
                  height={780}
                  fetchPriority="high"
                  alt="The Charrette board: tasks grouped as Needs you, Running, Held and Settled, each showing its agent, model and progress."
                />
              </picture>
            </div>
          </figure>
          <p className={s.cue} aria-hidden="true">
            Scroll ↓
          </p>
        </>
      )}
    </Pin>
  )
}
