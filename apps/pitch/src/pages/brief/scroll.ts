/* One scroll listener for the whole brief, batched to animation frames. */

type Listener = () => void

const listeners = new Set<Listener>()
let queued = false

/** Where panels pin. Keep in step with the @media rules in Slide.module.css. */
export const PIN_QUERY = '(min-width: 901px) and (min-height: 620px) and (prefers-reduced-motion: no-preference)'
let pinQuery: MediaQueryList | undefined
export const pinMedia = (): MediaQueryList => (pinQuery ??= window.matchMedia(PIN_QUERY))

function run(): void {
  queued = false
  for (const fn of listeners) fn()
}
function kick(): void {
  if (queued) return
  queued = true
  requestAnimationFrame(run)
}

/** Calls `fn` once now, then on every frame that scrolled or resized. Returns the unsubscribe. */
export function onFrame(fn: Listener): () => void {
  if (listeners.size === 0) {
    window.addEventListener('scroll', kick, { passive: true })
    window.addEventListener('resize', kick)
    pinMedia().addEventListener('change', kick)
  }
  listeners.add(fn)
  kick()
  return () => {
    listeners.delete(fn)
    if (listeners.size === 0) {
      window.removeEventListener('scroll', kick)
      window.removeEventListener('resize', kick)
      pinMedia().removeEventListener('change', kick)
    }
  }
}
