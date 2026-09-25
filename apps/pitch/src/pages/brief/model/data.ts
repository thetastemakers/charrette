/* The one task the brief follows, told twice: run by hand one morning, then run
   by the coordinator. Illustrative, like the prototype's project it lives in. */

/** Task 418, as the ticket names it. */
export const TASK = {
  id: 418,
  title: 'Stale permissions after a role change',
  text: 'After a user’s role changes, their old permissions keep being served until the session token refreshes.',
} as const

/** One step of task 418's execution graph, in the order the coordinator adds them. */
export interface Step {
  /** Short name on the graph node. */
  k: string
  /** Full name in captions, when it differs from the node's. */
  title?: string
  /** Who runs it, as shown on the node. */
  w: string
  /** Who runs it, and how they're paid for, as shown in the caption. */
  full: string
  /** Column and row on the graph. */
  c: number
  r: number
  /** Index of the step this one depends on. Defaults to the one before. */
  from?: number
  /** A second step this one waits for. */
  also?: number
  /** Why the step was added, when the plan didn't have it. */
  add?: string
  tag?: string
  /** Why a planned step is where it is. */
  why?: string
  coord?: boolean
  human?: boolean
  t: string
}

export const STEPS: readonly Step[] = [
  {
    k: 'Triage',
    w: 'Coordinator',
    full: 'Coordinator · your choice of model',
    c: 0,
    r: 0,
    coord: true,
    why: 'Every task starts here.',
    t: 'It starts from project memory, not a blank prompt. It reproduces the bug, writes three acceptance criteria and attaches the six facts that apply. Two of them disagree about the refresh window, so both go along, marked disputed.',
  },
  {
    k: 'Implement',
    w: 'Claude Code',
    full: 'Claude Code · paid by your Claude plan',
    c: 1,
    r: 0,
    why: 'The obvious next step. Nothing after it exists until its result does.',
    t: 'Routed on evidence: this agent has the best record on this module’s last five tasks. It gets the criteria and the failing test, not a summary of them, and fixes the bug by rotating the session token when a role changes.',
  },
  {
    k: 'Security',
    title: 'Security audit',
    w: 'Self-hosted',
    full: 'Open-weight model · on your own GPUs',
    c: 2,
    r: 1,
    add: 'The diff touched token rotation, which project memory marks sensitive',
    tag: 'sensitive path',
    t: 'Runs on your own hardware, so this code never leaves your network, and it is a third model family. One finding it can’t settle on its own: if rotation fails, the request now fails too.',
  },
  {
    k: 'Decide',
    w: 'You',
    full: 'You · one question, one tap',
    c: 3,
    r: 2,
    from: 2,
    add: 'A behaviour change with no recorded decision',
    tag: 'your call',
    human: true,
    t: 'Fail the request, or retry the rotation once? It changes what users see, so it goes to a person, with the proposal from project memory attached. The review doesn’t wait for your answer.',
  },
  {
    k: 'Review',
    w: 'Codex',
    full: 'Codex · a different lab from the author',
    c: 3,
    r: 0,
    from: 2,
    why: 'In the plan from the start: project policy asks for it on session code.',
    t: 'Session code gets a review from a lab other than the author’s. It finds the same stale read at three more call sites.',
  },
  {
    k: 'Repair',
    w: 'Claude Code',
    full: 'Claude Code · paid by your Claude plan',
    c: 4,
    r: 1,
    from: 4,
    also: 3,
    add: 'Review found the same bug at three more call sites',
    tag: '3 call sites',
    t: 'It gets all three findings and your answer on rotation, with the original criteria, so it can’t fix one problem by reintroducing another.',
  },
  {
    k: 'Re-review',
    w: 'Codex',
    full: 'Codex · checks the repair against the findings',
    c: 5,
    r: 1,
    add: 'Every repair is re-reviewed',
    tag: 'every repair',
    t: 'Checked against the three findings, not treated as a fresh review. All three call sites are fixed. Clean.',
  },
  {
    k: 'Acceptance',
    title: 'Acceptance test',
    w: 'Gemini CLI',
    full: 'Gemini CLI · a fresh agent that never saw the code',
    c: 6,
    r: 0,
    add: 'Users will see the change, so the criteria from triage are tested end to end',
    tag: 'user-facing',
    t: 'The three criteria from triage, checked on staging: a demoted user loses access on their next request, other sessions are untouched, nobody is logged out. All three pass, and so do 412 tests.',
  },
  {
    k: 'Record',
    w: 'Coordinator',
    full: 'Coordinator · writes back to project memory',
    c: 7,
    r: 0,
    coord: true,
    why: 'Back on the main line, once everything the evidence added is settled.',
    t: 'Three entries go back to the project: a new convention, your decision, and the unresolved refresh window. The next task inherits all three, whichever agent runs it.',
  },
]

/** One step of the same task, run by hand. Times are minutes after 09:00. */
export interface HandStep {
  /** The step, named as on the coordinator's graph. */
  k: string
  /** The agent you ran it with. None when it never ran. */
  a?: 'Claude Code' | 'Codex'
  /** You start it. */
  from?: number
  /** It finishes, and waits. */
  done?: number
  /** You notice. */
  seen?: number
  /** What you did by hand, or why it never happened. */
  you: string
  /** Ran and passed on whole, passed on with something lost, or never ran. */
  fate: 'ok' | 'lossy' | 'forgot'
  /** What went missing. */
  lost?: string
}

/** The morning: the same seven steps, remembered and relayed by you. */
export const HAND: readonly HandStep[] = [
  {
    k: 'Triage',
    a: 'Claude Code',
    from: 0,
    done: 14,
    seen: 22,
    you: 'Paste the ticket in. Explain how sessions work, again.',
    fate: 'ok',
  },
  {
    k: 'Implement',
    a: 'Claude Code',
    from: 22,
    done: 49,
    seen: 64,
    you: 'Open Codex. Paste the diff. Explain the ticket, again.',
    fate: 'ok',
  },
  {
    k: 'Security audit',
    you: 'Nobody remembered that token rotation is a sensitive path.',
    fate: 'forgot',
  },
  {
    k: 'Review',
    a: 'Codex',
    from: 66,
    done: 84,
    seen: 93,
    you: 'Copy the findings back into Claude Code.',
    fate: 'lossy',
    lost: '2 of 3 findings passed on',
  },
  {
    k: 'Repair',
    a: 'Claude Code',
    from: 95,
    done: 113,
    seen: 136,
    you: 'Back from stand-up. Ask Codex to look again.',
    fate: 'ok',
  },
  {
    k: 'Re-review',
    a: 'Codex',
    from: 138,
    done: 150,
    seen: 157,
    you: '“Looks clean.” Merge it before lunch.',
    fate: 'ok',
  },
  {
    k: 'Acceptance test',
    you: 'The criteria were in the first chat, three hours back.',
    fate: 'forgot',
  },
]

/** When the fix was merged, in minutes after 09:00. */
export const MERGED = 160
