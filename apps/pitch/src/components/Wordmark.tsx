import s from './Wordmark.module.css'

/** The name across the bottom of the page, flush with its lower edge. Decorative. */
export function Wordmark() {
  return (
    <p className={s.mark} aria-hidden="true">
      Charrette
    </p>
  )
}
