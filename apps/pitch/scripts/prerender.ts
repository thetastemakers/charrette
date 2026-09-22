/* Renders every page to static HTML after `vp build` (the client) and
   `vp build --ssr` (the renderer), so each page is complete before any
   JavaScript runs. Then writes robots.txt and, with SITE_URL, sitemap.xml. */

import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

import { fillShell, joinBase, parseOrigin, robotsTxt, sitemapXml } from '../config/seo'
import type { PageMeta } from '../src/meta'

const root = resolve(import.meta.dirname, '..')
const dist = resolve(root, 'dist')
const ssr = resolve(root, '.ssr')

const origin = parseOrigin(process.env.SITE_URL)
const noindex = ['1', 'true'].includes(process.env.SITE_NOINDEX ?? '')
const base = `/${(process.env.BASE_PATH ?? '/').replace(/^\/+|\/+$/g, '')}/`.replace('//', '/')
if (!origin) console.warn('prerender: SITE_URL is not set: no canonical links or sitemap, and social cards use a relative image URL.')

const entry = (await import(pathToFileURL(resolve(ssr, 'entry-server.js')).href)) as {
  render: (url: string) => Promise<string>
  PAGES: readonly PageMeta[]
}
const shell = await readFile(resolve(dist, 'index.html'), 'utf8')

for (const page of entry.PAGES) {
  const body = await entry.render(joinBase(base, page.path))
  const out = resolve(dist, page.file)
  await mkdir(dirname(out), { recursive: true })
  await writeFile(out, fillShell(shell, page, body, { origin, base, noindex }))
}
await writeFile(resolve(dist, 'robots.txt'), robotsTxt(origin, noindex, base))
if (origin && !noindex) await writeFile(resolve(dist, 'sitemap.xml'), sitemapXml(origin, entry.PAGES, base))
await rm(ssr, { recursive: true, force: true })

console.warn(`prerender: ${entry.PAGES.map((p) => p.file).join(', ')}`)
