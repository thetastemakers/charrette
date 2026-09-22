import { BRIEF, NOT_FOUND, RESEARCH, type PageMeta } from './meta'

/** The same URLs are used by static links, the prerenderer, and the client. */
export const base = import.meta.env.BASE_URL
export const homeHref = base
export const researchHref = `${base}research/`

const trimSlash = (path: string): string => path.replace(/\/+$/, '') || '/'

export function pageForPath(pathname: string, basePath = base): PageMeta {
  const root = trimSlash(basePath)
  const path = trimSlash(pathname)
  if (path === root) return BRIEF
  if (path === `${root === '/' ? '' : root}/research`) return RESEARCH
  return NOT_FOUND
}
