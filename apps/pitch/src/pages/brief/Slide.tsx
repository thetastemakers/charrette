import { useEffect, useRef, useState, type ReactNode } from 'react'

import { cx } from '../../lib/cx'
import { vars } from '../../lib/vars'
import { pinProgress, stepAt } from './model/lib'
import { onFrame, pinMedia } from './scroll'
import s from './Slide.module.css'

export type Tone = 'light' | 'dark'

interface SlideProps {
  id?: string
  /** Colour of the chrome over this panel. */
  tone: Tone
  /** Shown in the slide counter. */
  name: string
  className?: string
}

/** A full-screen panel. */
export function Slide({ id, tone, name, className, children }: SlideProps & { children: ReactNode }) {
  return (
    <section id={id} className={cx(s.slide, className)} data-slide="" data-tone={tone} data-name={name}>
      {children}
    </section>
  )
}

interface PinProps extends SlideProps {
  /** How many steps the panel plays, one screen of scroll each. */
  steps: number
  stickClassName?: string
  /** Rendered after the pinned part, e.g. a text version of the figure. */
  after?: ReactNode
  /** Called every frame with progress through the panel, 0 to 1. */
  onProgress?: (p: number, live: boolean, el: HTMLElement) => void
  /** Renders the panel at a step. The server, and screens where panels don't pin, get the last step. */
  children: (step: number) => ReactNode
}

/** A panel that holds still for several screens of scroll while its figure plays. */
export function Pin({ id, tone, name, className, steps, stickClassName, after, onProgress, children }: PinProps) {
  const ref = useRef<HTMLElement>(null)
  const [step, setStep] = useState(steps - 1)
  const progress = useRef(onProgress)
  useEffect(() => {
    progress.current = onProgress
  })

  useEffect(
    () =>
      onFrame(() => {
        const el = ref.current
        if (!el) return
        const r = el.getBoundingClientRect()
        const vh = window.innerHeight
        const live = pinMedia().matches && r.height > vh * 1.2
        const p = live ? pinProgress(r.top, r.height, vh) : 1
        progress.current?.(p, live, el)
        setStep(stepAt(p, steps))
      }),
    [steps],
  )

  return (
    <section
      ref={ref}
      id={id}
      className={cx(s.slide, s.pin, className)}
      style={vars({ '--steps': steps })}
      data-slide=""
      data-tone={tone}
      data-name={name}
    >
      <div className={cx(s.stick, stickClassName)}>{children(step)}</div>
      {after}
      {Array.from({ length: steps }, (_, k) => (
        <i key={k} className={s.snap} style={{ top: `${k * 100}vh` }} aria-hidden="true" />
      ))}
    </section>
  )
}
