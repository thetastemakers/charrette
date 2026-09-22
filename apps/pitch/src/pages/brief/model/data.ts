/* The two stories the brief tells with data. Both are illustrative: one task in
   the prototype's project, and one plausible morning without Charrette. */

/** One step of task 418's execution graph, in the order the coordinator adds them. */
export interface Step {
  /** Short name on the graph node. */
  k: string
  /** Who runs it, as shown on the node. */
  w: string
  /** Who runs it, and how they're paid for, as shown in the caption. */
  full: string
  /** Column and row on the graph. */
  c: number
  r: number
  /** Index of the step this one depends on. Defaults to the one before. */
  from?: number
  /** Why the step was added, when the plan didn't have it. */
  add?: string
  tag?: string
  /** Model family, for runs that call a model. */
  fam?: string
  coord?: boolean
  human?: boolean
  t: string
}

export const STEPS: readonly Step[] = [
  {
    k: 'Brief',
    w: 'Coordinator',
    full: 'Coordinator · your choice of model',
    c: 0,
    r: 0,
    coord: true,
    t: 'The task starts from project memory, not a blank prompt. Six claims apply. Two of them disagree about the session window, so both are supplied and marked as disputed.',
  },
  {
    k: 'Reproduce',
    w: 'Codex · OpenAI',
    full: 'Codex CLI · paid by your ChatGPT plan',
    c: 1,
    r: 0,
    fam: 'OpenAI',
    t: 'A repair starts from a failing test. Test-writing goes to whichever agent is cheapest for it on your plans this month.',
  },
  {
    k: 'Implement',
    w: 'Claude Code',
    full: 'Claude Code · paid by your Claude plan',
    c: 2,
    r: 0,
    fam: 'Anthropic',
    t: 'Routed on evidence: this agent has the best record on this module’s last five tasks. It gets the brief and the failing test, not a summary of them.',
  },
  {
    k: 'Review',
    w: 'Codex · OpenAI',
    full: 'Codex CLI · a different lab from the author',
    c: 3,
    r: 0,
    fam: 'OpenAI',
    t: 'Project policy: session code gets an independent review, meaning a model family other than the author’s. It finds three more call sites with the same bug.',
  },
  {
    k: 'Repair',
    w: 'Claude Code',
    full: 'Claude Code · paid by your Claude plan',
    c: 3,
    r: 1,
    from: 3,
    add: 'Review found three more call sites with the same bug',
    tag: '3 call sites',
    fam: 'Anthropic',
    t: 'The repair inherits the finding, the original intent and the project’s conventions, so it can’t fix one problem by reintroducing another.',
  },
  {
    k: 'Re-review',
    w: 'Codex · OpenAI',
    full: 'Codex CLI · checks the repair against the finding',
    c: 4,
    r: 1,
    from: 4,
    add: 'Every repair is re-reviewed',
    tag: 'every repair',
    fam: 'OpenAI',
    t: 'Checked against both the original task and the earlier finding, not treated as a fresh review. Clean.',
  },
  {
    k: 'Security',
    w: 'Self-hosted',
    full: 'Open-weight model · on your own GPUs',
    c: 4,
    r: 2,
    from: 5,
    add: 'The diff touched token rotation, a path project memory marks sensitive',
    tag: 'sensitive path',
    fam: 'Open-weight',
    t: 'Runs on your own hardware, so this code never leaves your network, and it is a third model family. One finding it can’t settle: if rotation fails, the request now fails too.',
  },
  {
    k: 'Decide',
    w: 'You',
    full: 'You · one question, one tap',
    c: 5,
    r: 2,
    from: 6,
    add: 'A behaviour change with no recorded decision',
    tag: 'your call',
    human: true,
    t: 'Should a failed rotation fail the request, or retry once? It changes what users see, so it goes to a person, with the proposal from project memory attached. Everything else ran without you.',
  },
  {
    k: 'Verify',
    w: 'Coordinator',
    full: 'Coordinator · evidence, not self-reports',
    c: 5,
    r: 0,
    from: 7,
    coord: true,
    t: 'Done means evidence: 412 tests pass, and the original failing test passes against staging.',
  },
  {
    k: 'Record',
    w: 'Coordinator',
    full: 'Coordinator · writes back to project memory',
    c: 6,
    r: 0,
    from: 8,
    coord: true,
    t: 'Three entries go back to the project: a new convention, your decision, and the unresolved refresh window. The next task inherits all three, whichever agent runs it.',
  },
]

/** One time an agent came back to you. Times are minutes after 09:00. */
export interface Ping {
  a: 'Claude Code' | 'Codex'
  /** The agent starts working. */
  from: number
  /** The agent is done and waiting. */
  ping: number
  /** You notice, and stop your own work. */
  seen: number
  /** You're back at your own work. */
  back: number
  msg: string
  you: string
  /** The one interruption that needed a person. */
  dec?: boolean
}

/** You brief the first agent at 09:00 and are back at your own work at 09:05. */
export const DAY_START = 5
/** The morning shown, in minutes: 09:00 to 12:30. */
export const SPAN = 210

export const DAY: readonly Ping[] = [
  {
    a: 'Claude Code',
    from: 5,
    ping: 32,
    seen: 41,
    back: 47,
    msg: 'Done. 4 files changed.',
    you: 'Copy the diff to Codex and explain the task again.',
  },
  {
    a: 'Codex',
    from: 47,
    ping: 62,
    seen: 65,
    back: 71,
    msg: 'Same bug at 3 more call sites.',
    you: 'Paste the findings back into Claude Code.',
  },
  { a: 'Claude Code', from: 71, ping: 89, seen: 104, back: 109, msg: 'Fixed all four. Shall I run the tests?', you: 'Yes.' },
  {
    a: 'Claude Code',
    from: 109,
    ping: 118,
    seen: 123,
    back: 130,
    msg: '2 tests failing.',
    you: 'Read the output. Same bug. Send it back.',
  },
  { a: 'Claude Code', from: 130, ping: 141, seen: 144, back: 149, msg: 'All tests pass.', you: 'Ask Codex to review the repair.' },
  {
    a: 'Codex',
    from: 149,
    ping: 160,
    seen: 172,
    back: 181,
    msg: 'Clean. But a failed token rotation now fails the request.',
    you: 'Decide: fail the request, or retry once?',
    dec: true,
  },
  { a: 'Claude Code', from: 181, ping: 192, seen: 195, back: 204, msg: 'Done.', you: 'Check staging. Write down what was decided.' },
]
