import type { CSSProperties } from 'react'

/** Custom properties as a style object: vars({ '--h': 112 }). */
export const vars = (v: Record<`--${string}`, string | number>): CSSProperties => v as CSSProperties
