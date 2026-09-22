import { readdir, readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { gzipSync } from 'node:zlib'

const assets = resolve(import.meta.dirname, '..', 'dist', 'assets')
const limits = { '.js': 120 * 1024, '.css': 20 * 1024 } as const

for (const [extension, limit] of Object.entries(limits)) {
  const files = (await readdir(assets)).filter((name) => name.endsWith(extension))
  if (files.length === 0) throw new Error(`No ${extension} asset found in ${assets}`)
  const bytes = (await Promise.all(files.map(async (name) => gzipSync(await readFile(resolve(assets, name))).byteLength))).reduce(
    (sum, size) => sum + size,
    0,
  )
  if (bytes > limit) throw new Error(`${extension} assets exceed gzip budget: ${bytes} > ${limit} bytes`)
  console.warn(`budget: ${extension} ${bytes} / ${limit} gzip bytes`)
}
