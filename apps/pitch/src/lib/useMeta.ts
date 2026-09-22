import { useEffect } from 'react'

import type { PageMeta } from '../meta'

/** Keeps the title and browser colour in step on client-side navigation. The prerender writes them for first load. */
export function useMeta(meta: PageMeta): void {
  useEffect(() => {
    document.title = meta.title
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', meta.theme)
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description)
  }, [meta])
}
