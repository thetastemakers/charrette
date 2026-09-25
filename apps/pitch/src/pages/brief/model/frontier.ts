/* Who held the top of the Artificial Analysis Intelligence Index, and for how
   long. Each entry is a release that beat every model released before it, on
   the current index (v4.3.2): the best reasoning setting of each release,
   scores before 2026 are Artificial Analysis's estimates. Source:
   artificialanalysis.ai/leaderboards/models, read on 25 September 2026. */

import type { Lab } from '../Mark'

export interface Leader {
  /** Release date, ISO. */
  on: string
  name: string
  lab: Lab
  /** Intelligence Index score. */
  score: number
}

export const LEADERS: readonly Leader[] = [
  { on: '2022-11-30', name: 'GPT-3.5 Turbo', lab: 'openai', score: 5.5 },
  { on: '2023-03-14', name: 'GPT-4', lab: 'openai', score: 6.7 },
  { on: '2023-11-06', name: 'GPT-4 Turbo', lab: 'openai', score: 7.0 },
  { on: '2024-03-04', name: 'Claude 3 Opus', lab: 'anthropic', score: 8.7 },
  { on: '2024-09-12', name: 'o1-preview', lab: 'openai', score: 11.4 },
  { on: '2024-12-05', name: 'o1', lab: 'openai', score: 15.2 },
  { on: '2025-02-24', name: 'Claude 3.7 Sonnet', lab: 'anthropic', score: 17.7 },
  { on: '2025-04-16', name: 'o3', lab: 'openai', score: 20.2 },
  { on: '2025-05-22', name: 'Claude 4 Opus', lab: 'anthropic', score: 20.6 },
  { on: '2025-06-10', name: 'o3-pro', lab: 'openai', score: 21.9 },
  { on: '2025-07-10', name: 'Grok 4', lab: 'xai', score: 22.5 },
  { on: '2025-08-05', name: 'Claude 4.1 Opus', lab: 'anthropic', score: 22.8 },
  { on: '2025-08-07', name: 'GPT-5', lab: 'openai', score: 23.0 },
  { on: '2025-09-23', name: 'GPT-5 Codex', lab: 'openai', score: 24.9 },
  { on: '2025-11-18', name: 'Gemini 3 Pro', lab: 'google', score: 28.0 },
  { on: '2025-11-24', name: 'Claude Opus 4.5', lab: 'anthropic', score: 29.1 },
  { on: '2025-12-11', name: 'GPT-5.2', lab: 'openai', score: 30.4 },
  { on: '2026-02-05', name: 'GPT-5.3 Codex', lab: 'openai', score: 32.5 },
  { on: '2026-03-05', name: 'GPT-5.4', lab: 'openai', score: 39.0 },
  { on: '2026-04-16', name: 'Claude Opus 4.7', lab: 'anthropic', score: 40.7 },
  { on: '2026-05-28', name: 'Claude Opus 4.8', lab: 'anthropic', score: 41.8 },
  { on: '2026-06-09', name: 'Claude Fable 5', lab: 'anthropic', score: 49.6 },
  { on: '2026-07-24', name: 'Claude Opus 5', lab: 'anthropic', score: 50.8 },
  { on: '2026-09-01', name: 'Claude Fable 5.1', lab: 'anthropic', score: 53.4 },
  { on: '2026-09-22', name: 'Claude Opus 5.5', lab: 'anthropic', score: 57.6 },
]

/** Open-weights releases at least as good as the top model of six months
   before: a model a business could run on its own hardware and not be far
   behind. The best setting of each release; variants a lab shipped the same
   day are one release. Same source and reading. */
export interface OpenRelease {
  on: string
  name: string
  /** Who made it, as a caption. */
  maker: string
  lab?: Lab
  score: number
}

export const OPEN: readonly OpenRelease[] = [
  { on: '2023-07-18', name: 'Llama 2', maker: 'Meta', lab: 'meta', score: 5.7 },
  { on: '2024-07-23', name: 'Llama 3.1 405B', maker: 'Meta', lab: 'meta', score: 7.3 },
  { on: '2025-01-20', name: 'DeepSeek R1', maker: 'DeepSeek', lab: 'deepseek', score: 11.4 },
  { on: '2025-03-05', name: 'QwQ 32B', maker: 'Alibaba', lab: 'qwen', score: 9.5 },
  { on: '2025-05-28', name: 'DeepSeek R1 0528', maker: 'DeepSeek', lab: 'deepseek', score: 13.1 },
  { on: '2025-09-30', name: 'GLM-4.6', maker: 'Z.ai', lab: 'zai', score: 18.5 },
  { on: '2025-11-06', name: 'Kimi K2 Thinking', maker: 'Moonshot AI', lab: 'moonshot', score: 22.0 },
  { on: '2025-12-01', name: 'DeepSeek V3.2', maker: 'DeepSeek', lab: 'deepseek', score: 21.5 },
  { on: '2025-12-16', name: 'MiMo-V2-Flash', maker: 'Xiaomi', lab: 'xiaomi', score: 22.4 },
  { on: '2025-12-22', name: 'GLM-4.7', maker: 'Z.ai', lab: 'zai', score: 22.2 },
  { on: '2026-01-27', name: 'Kimi K2.5', maker: 'Moonshot AI', lab: 'moonshot', score: 23.5 },
  { on: '2026-02-11', name: 'GLM-5', maker: 'Z.ai', lab: 'zai', score: 27.9 },
  { on: '2026-04-07', name: 'GLM-5.1', maker: 'Z.ai', lab: 'zai', score: 26.1 },
  { on: '2026-04-20', name: 'Kimi K2.6', maker: 'Moonshot AI', lab: 'moonshot', score: 27.0 },
  { on: '2026-04-22', name: 'MiMo-V2.5-Pro', maker: 'Xiaomi', lab: 'xiaomi', score: 26.0 },
  { on: '2026-04-24', name: 'DeepSeek V4 Pro', maker: 'DeepSeek', lab: 'deepseek', score: 30.4 },
  { on: '2026-06-01', name: 'MiniMax-M3', maker: 'MiniMax', lab: 'minimax', score: 29.2 },
  { on: '2026-06-16', name: 'GLM-5.2', maker: 'Z.ai', lab: 'zai', score: 33.7 },
  { on: '2026-07-16', name: 'Kimi K3', maker: 'Moonshot AI', lab: 'moonshot', score: 43.6 },
  { on: '2026-07-31', name: 'DeepSeek V4 Flash', maker: 'DeepSeek', lab: 'deepseek', score: 34.3 },
  { on: '2026-08-12', name: 'Qwen3.8', maker: 'Alibaba', lab: 'qwen', score: 39.9 },
  { on: '2026-08-12', name: 'Motif 3', maker: 'Motif Technologies', lab: 'motif', score: 33.6 },
  { on: '2026-08-13', name: 'DeepSeek V4 Pro 0813', maker: 'DeepSeek', lab: 'deepseek', score: 36.0 },
  { on: '2026-08-14', name: 'Qwen3.8 27B', maker: 'Alibaba', lab: 'qwen', score: 33.7 },
  { on: '2026-08-18', name: 'GLM-5.3', maker: 'Z.ai', lab: 'zai', score: 44.8 },
  { on: '2026-08-26', name: 'GLM-5.3 Flash', maker: 'Z.ai', lab: 'zai', score: 41.8 },
  { on: '2026-08-26', name: 'Qwen3.8 Flash', maker: 'Alibaba', lab: 'qwen', score: 39.8 },
  { on: '2026-09-10', name: 'DeepSeek V4.1 Flash', maker: 'DeepSeek', lab: 'deepseek', score: 39.5 },
  { on: '2026-09-21', name: 'MiMo-V2.6-Pro', maker: 'Xiaomi', lab: 'xiaomi', score: 46.3 },
]

/** The day the data was read: the last reign runs to here. */
export const AS_OF = '2026-09-25'

export const YEARS = [2023, 2024, 2025, 2026] as const

const DAY = 86_400_000
const t = (iso: string): number => Date.parse(`${iso}T00:00:00Z`)

/** One stretch at the top within a year, as fractions of that year. */
export interface Reign {
  name: string
  lab: Lab
  /** Release date and score, for the caption. */
  on: string
  score: number
  from: number
  to: number
  /** It took the top this year, rather than carrying over from the last. */
  fresh: boolean
  /** Still at the top on the day the data was read. */
  now: boolean
}

/** Who led during `year`, left to right. */
export function reigns(year: number, leaders: readonly Leader[] = LEADERS, asOf: string = AS_OF): Reign[] {
  const start = t(`${year}-01-01`)
  const end = t(`${year + 1}-01-01`)
  const span = end - start
  const last = t(asOf) + DAY
  const out: Reign[] = []
  leaders.forEach((l, j) => {
    const from = Math.max(t(l.on), start)
    const to = Math.min(j + 1 < leaders.length ? t(leaders[j + 1]!.on) : last, end)
    if (to <= from) return
    out.push({
      name: l.name,
      lab: l.lab,
      on: l.on,
      score: l.score,
      from: (from - start) / span,
      to: (to - start) / span,
      fresh: t(l.on) >= start,
      now: j === leaders.length - 1,
    })
  })
  return out
}

/** Where in `year` each open release landed, as a fraction of the year. */
export function openIn(year: number, open: readonly OpenRelease[] = OPEN): (OpenRelease & { at: number })[] {
  const start = t(`${year}-01-01`)
  const span = t(`${year + 1}-01-01`) - start
  return open.filter((o) => o.on.startsWith(String(year))).map((o) => ({ ...o, at: (t(o.on) - start) / span }))
}

/** The day the top model first reached `score`: how far behind the frontier a model of that score is. */
export function frontierReached(score: number, leaders: readonly Leader[] = LEADERS): string | undefined {
  return leaders.find((l) => l.score >= score)?.on
}

export interface YearStats {
  /** Releases that took the top that year. */
  leaders: number
  /** Points the top score gained over the year. */
  gain: number
}

export function yearStats(year: number, leaders: readonly Leader[] = LEADERS): YearStats {
  const before = leaders.filter((l) => l.on < `${year}-01-01`).at(-1)
  const within = leaders.filter((l) => l.on.startsWith(String(year)))
  const top = within.at(-1) ?? before
  return {
    leaders: within.length,
    gain: Math.round(((top?.score ?? 0) - (before?.score ?? 0)) * 10) / 10,
  }
}

/** The labs that have held the top since the start of `year`. */
export function labsSince(year: number, leaders: readonly Leader[] = LEADERS): Lab[] {
  const start = `${year}-01-01`
  /* a leader counts if it was still on top when the year began, or took the top after */
  const held = leaders.filter((_, j) => (leaders[j + 1]?.on ?? AS_OF) > start)
  return [...new Set(held.map((l) => l.lab))]
}
