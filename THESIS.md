# Thesis

> **Status: Draft — working research thesis, expected to change substantially through prototyping and evidence.**

# The Fourth Age of Software Engineering

Charrette begins with a hypothesis:

> **Software engineering is entering a new phase in which the primary unit of work shifts from code, and then from individual agent conversations, toward persistent software projects capable of coordinating transient intelligent workers.**

As implementation becomes increasingly delegable, the scarce functions of software engineering begin to move elsewhere.

The engineer spends proportionally less effort translating intent directly into code and proportionally more effort on:

* defining intent
* refining requirements
* making trade-offs
* preserving and sharing project knowledge
* coordinating parallel work
* evaluating outcomes
* resolving ambiguity
* designing execution workflows
* verifying correctness
* deciding when human judgement is required

If this transition continues, the software project itself may need to become a more active computational object.

Not merely a repository.

Not merely a set of files.

Not merely an issue tracker.

Not merely a collection of agent conversations.

A persistent, potentially collaborative system capable of retaining context, coordinating work, and surviving the replacement of the individual agents, models, interfaces, and developers operating within it.

Charrette is an attempt to explore that hypothesis.

---

# Table of Contents

1. [The emerging transition](#1-the-emerging-transition)
2. [The core claim](#2-the-core-claim)
3. [Project persistence and shared project intelligence](#3-project-persistence-and-shared-project-intelligence)
4. [The coordinator hypothesis](#4-the-coordinator-hypothesis)
5. [Tasks as bounded execution contexts](#5-tasks-as-bounded-execution-contexts)
6. [The human-attention boundary](#6-the-human-attention-boundary)
7. [Execution as a graph](#7-execution-as-a-graph)
8. [Provider independence and open infrastructure](#8-provider-independence-and-open-infrastructure)
9. [What Charrette is](#9-what-charrette-is)
10. [What this thesis does not assume](#10-what-this-thesis-does-not-assume)
11. [Questions this project must answer](#11-questions-this-project-must-answer)
12. [Evidence to collect during prototyping](#12-evidence-to-collect-during-prototyping)
13. [What would make this thesis wrong?](#13-what-would-make-this-thesis-wrong)
14. [Toward a whitepaper](#14-toward-a-whitepaper)
15. [Current working proposition](#15-current-working-proposition)

---

# 1. The emerging transition

Software development has repeatedly changed its dominant abstraction.

A deliberately simplified framing is:

## First age — Manual

```text
Human → Code
```

The engineer directly performs most implementation work.

Tools primarily assist editing, compilation, debugging, and execution.

## Second age — Assisted

```text
Human → Tools → Code
```

IDEs, static analysis, package ecosystems, autocomplete, search, CI/CD, cloud platforms, and collaborative tooling dramatically increase developer leverage.

The human remains the primary executor.

## Third age — Agentic

```text
Human → Agent → Code
```

The engineer increasingly delegates bounded implementation tasks to intelligent coding agents.

The unit of interaction begins moving from:

> write this code

toward:

> complete this task

The agent can inspect a codebase, make changes, run tools, and reason over multiple steps.

## Possible fourth age — Orchestrated

```text
Human / Team
     ↓
Persistent Project
     ↓
Coordinator
     ↓
Execution Graph
     ↓
Transient Agents
     ↓
Outcomes
```

The engineer increasingly manages intent, constraints, judgement, and priorities while a persistent project-level system coordinates execution.

Individual agents become workers rather than the place where project state lives.

Execution itself may move beyond a single agent performing a linear task into configurable graphs containing implementation, review, testing, repair, investigation, and other specialised work.

This fourth age is not assumed to exist.

It is the central hypothesis this project aims to test.

---

# 2. The core claim

The dominant abstraction in current coding-agent products is still often the **agent session**.

A developer opens a conversation.

The agent accumulates context.

The agent plans.

The agent acts.

The conversation becomes progressively more valuable because it contains historical information about what happened, what was tried, what constraints were discovered, and why decisions were made.

This model works surprisingly well.

But it may have two related architectural weaknesses.

## Project intelligence becomes entangled with transient workers

> **The most valuable state of the project can become entangled with a transient worker, model, interface, or conversation.**

If the developer changes models, tools, machines, agents, or interfaces, some of that accumulated intelligence is lost or must be reconstructed.

Yet the problem is broader than individual tool portability.

## Project intelligence also becomes fragmented between developers

Different developers increasingly build up different representations of the same project inside their own AI environments.

One developer's agent may know:

* why an architectural decision was made
* what failed yesterday
* which implementation pattern the team prefers
* what an undocumented API constraint means
* which temporary workaround must not become permanent

Another developer's agent may know none of this.

Both may ostensibly be working on the same repository.

The project therefore risks acquiring several private, partially overlapping knowledge graphs:

```text
Developer A
    ↓
Agent conversations
    ↓
Partial model of project

Developer B
    ↓
Different agent conversations
    ↓
Different partial model of project

Developer C
    ↓
Different tool / model
    ↓
Another partial model
```

Source control solved collaborative ownership of source code remarkably well.

It has not yet solved collaborative ownership of the accumulated intelligence used by agents to understand that source code.

Charrette therefore starts from a stronger assumption:

> **Durable project intelligence should belong to the project rather than to an individual worker, conversation, developer, or model provider.**

A worker may exist for minutes.

A developer may join or leave a team.

A model may be replaced next month.

The project may exist for years.

Those lifetimes should not be confused.

Whether project intelligence can become meaningfully collaborative without creating noise, incorrect shared assumptions, permission problems, or coordination overhead remains an open research question.

---

# 3. Project persistence and shared project intelligence

A mature software project already contains multiple overlapping forms of memory:

* source code
* Git history
* documentation
* architecture notes
* issue trackers
* pull requests
* review comments
* chat messages
* incident reports
* design files
* task descriptions
* developer habits
* undocumented conventions
* knowledge held only in people's heads

AI agents add another layer:

* prompts
* plans
* investigations
* generated summaries
* review findings
* temporary implementation notes
* failed approaches
* test results
* discovered constraints
* agent-specific context
* implicit conclusions embedded in long-running conversations

This information is useful, but it is not all equally durable.

One working distinction is between **canonical** and **episodic** project knowledge.

## Canonical project knowledge

Information intended to remain true and influence future work.

Examples:

* architecture
* engineering conventions
* domain terminology
* development workflows
* product constraints
* design rules
* deployment procedures
* important technical decisions

## Episodic project knowledge

Information created during a particular episode of work.

Examples:

* a release-readiness report
* a debugging investigation
* a migration plan
* a temporary implementation strategy
* a performance analysis
* a PR review
* a design exploration
* the findings from a failed implementation attempt

Episodic information may remain useful long after a task completes without deserving promotion into permanent documentation.

Agentic development may dramatically increase the amount of episodic knowledge produced by a software project.

A project-level system may therefore need to preserve it without allowing it to pollute canonical documentation.

## Shared project context

A further hypothesis is that at least some project intelligence should be collaborative.

If an agent working for one developer discovers an important project constraint, should another developer's agent be able to benefit from it?

Possibly.

But this immediately introduces difficult questions:

* What knowledge belongs to the team versus the individual?
* Who can modify shared project knowledge?
* How are conflicting interpretations represented?
* How does knowledge move from private to shared?
* Should all agents receive the same context?
* Can role-specific or branch-specific knowledge exist?
* How should sensitive information be scoped?
* What happens when two developers concurrently teach the project contradictory things?
* How should knowledge be reviewed or approved?
* Can project memory become socially self-correcting in the way source code does through review?

The collaborative project is therefore a direction to explore, not a solved assumption.

---

# 4. The coordinator hypothesis

If multiple agents can operate simultaneously, asking the developer to independently manage every agent may not scale.

Charrette therefore tests a second hypothesis:

> **A continuous project-level coordinator may be a better human interface to parallel agentic work than direct management of multiple isolated workers.**

The coordinator is not necessarily the primary implementer.

Its responsibilities may include:

* understanding developer intent
* maintaining conversational continuity
* decomposing work
* refining requirements
* selecting execution strategies
* dispatching work
* tracking active tasks
* supplying relevant project context
* synthesising results
* surfacing conflicts
* maintaining project state
* escalating only decisions requiring human judgement

The coordinator remains available while workers execute asynchronously.

This creates a different interaction model from a conventional coding-agent conversation.

The developer should be able to continue thinking with the project while implementation proceeds elsewhere.

In a collaborative project, the coordinator may eventually also need to reason about the activity of other developers and agents without collapsing the project into a single shared conversation.

Whether one coordinator, multiple personal coordinators, or some hybrid architecture works best is itself an open question.

---

# 5. Tasks as bounded execution contexts

Work delegated to an agent should be isolated into a task.

A task may contain:

* the original request
* refined requirements
* relevant project context
* an execution agent
* a branch or worktree
* a terminal
* a conversation
* implementation progress
* review findings
* test results
* final outcomes

Tasks are bounded.

Projects are persistent.

This boundary may make agent workers replaceable.

It may also allow the project to execute several tasks concurrently without forcing their entire histories into a single context window.

A task does not necessarily produce code.

Possible outcomes include:

* pull request
* artifact
* finding
* decision
* documentation
* recommendation
* no action required
* failure

Treating code as only one possible outcome is important.

A significant amount of useful engineering work consists of understanding rather than modification.

---

# 6. The human-attention boundary

Greater agent autonomy is only valuable if it reduces useful human effort rather than moving problems elsewhere.

Charrette therefore treats human attention as a scarce resource.

One possible design goal is:

> **The system should maximise useful autonomous progress while minimising unnecessary interruption.**

This creates a human-attention boundary.

Some events should remain inside the execution system.

Others should escalate.

The difficult question is determining which is which.

Potential reasons for escalation include:

* unclear product intent
* conflicting requirements
* irreversible action
* architectural trade-off
* missing credentials
* ambiguous acceptance criteria
* safety or security implications
* multiple plausible product behaviours
* disagreement between agents
* repeated failed execution
* insufficient evidence for a decision

A project-level coordinator may be useful partly because it can mediate this boundary.

---

# 7. Execution as a graph

Agent execution is often presented as a conversation or a linear loop:

```text
Understand
   ↓
Implement
   ↓
Finish
```

More sophisticated workflows already introduce additional stages:

```text
Understand
   ↓
Plan
   ↓
Implement
   ↓
Review
   ↓
Repair
   ↓
Verify
```

But a linear pipeline may itself be too restrictive.

Real engineering work frequently branches, repeats, and conditionally invokes specialised capabilities.

A more general abstraction may be an **execution graph**.

For example:

```text
                 ┌──────────── Review ────────────┐
                 │                  │              │
Requirements → Implement ───────────┼→ Repair ────┘
                 │                  │
                 │                  └→ Re-review
                 │
                 └────────→ Test
                              │
                         ┌────┴────┐
                         │         │
                       Pass      Fail
                         │         │
                        Done     Repair
```

Or:

```text
              ┌→ Security review ──┐
Implement ────┼→ Code review ──────┼→ Repair → Re-review
              └→ Test agent ───────┘
```

The graph might depend on the kind of work being performed.

A small documentation change may require almost nothing.

A critical authentication change may require:

1. requirement refinement
2. implementation
3. unit tests
4. independent code review
5. security review
6. repair
7. re-review
8. browser or integration testing
9. final human approval

A visual frontend task may replace several of those stages with:

* browser execution
* screenshot capture
* visual comparison
* accessibility review

This suggests a broader hypothesis:

> **Execution workflows may themselves become durable, programmable project assets.**

Review is therefore only one node in a larger system.

Testing is another.

Re-review is another.

Human approval may be another.

Conditional repair loops may form edges back through the graph.

Different agents may execute different nodes.

The system may eventually support reusable workflows or policies representing how a team wants certain classes of work to be performed.

Questions include:

* Are DAGs the appropriate abstraction?
* How much workflow should developers explicitly configure?
* Can useful graphs be inferred from intent?
* Which nodes should execute concurrently?
* How are loops represented safely?
* When should a graph terminate?
* How are failure and escalation encoded?
* Can teams maintain workflows as shared engineering policy?
* Should workflows be portable between agent providers?

The prototype should determine whether this generality is genuinely useful or unnecessarily complex.

---

# 8. Provider independence and open infrastructure

Current coding agents are improving rapidly.

Their relative strengths change quickly.

A model that is strongest at implementation today may not be strongest six months from now.

One provider may excel at long-context architectural work.

Another may become dramatically cheaper.

Another may offer stronger visual capabilities.

Another may provide better code review.

Another may simply become better.

The developer therefore has a strong incentive to preserve optionality.

> **Developers should be able to use whichever agent is best for a particular task without abandoning the accumulated intelligence and workflows of their project.**

Yet some of the earliest attempts at project-level orchestration are naturally being built inside model-provider and proprietary development harnesses.

This is rational.

A model provider has strong incentives to create an excellent end-to-end experience around its models.

A development platform has strong incentives to make its own environment increasingly capable and sticky.

Those incentives are not inherently hostile to developers.

But they are not identical to the developer's incentives.

A provider may prefer:

```text
Project
   ↓
Its harness
   ↓
Its models
```

The developer may prefer:

```text
                     ┌→ Model A
Project → Open layer ├→ Model B
                     ├→ Local agent
                     └→ Future model
```

If the persistent layer begins to contain:

* project memory
* execution history
* workflows
* orchestration rules
* task state
* review policies
* learned conventions
* team knowledge
* historical artifacts

then leaving a platform may become much more expensive than merely changing an API call.

The lock-in would no longer primarily concern the model.

It would concern the accumulated **operating system of the project**.

Charrette therefore tests the idea that:

> **The persistent project layer should remain independent from the transient execution providers beneath it.**

And that leads to a second principle:

> **The infrastructure defining that layer should be open enough that no single corporation exclusively owns the developer's accumulated project intelligence or engineering workflows.**

Open source matters here for practical reasons rather than ideology alone.

It enables developers and teams to:

* inspect how project state is represented
* retain data independently of a vendor
* build new agent adapters
* modify orchestration behaviour
* preserve workflows even when providers disappear
* self-host where appropriate
* contribute interoperable project formats
* experiment with new models without migrating the project itself

Provider independence does not mean pretending all agents are identical.

They are not.

The system should be able to exploit their differences without becoming inseparable from any one of them.

Whether an open provider-independent layer delivers enough additional value to justify itself remains a central question for the project.

---

# 9. What Charrette is

Charrette is an experimental open-source implementation of these ideas.

Its current conceptual model contains four core primitives:

## Project

The persistent owner of knowledge, history, tasks, artifacts, execution state, and potentially shared team context.

## Coordinator

The continuous interface between a developer and the project.

## Task

A bounded execution context assigned to one or more workers.

## Artifact

A useful output of work that does not necessarily belong in the repository's durable documentation.

Execution graphs may eventually become another first-class primitive, or they may remain an implementation detail beneath tasks.

This model is provisional.

The prototype exists partly to discover whether these are the right abstractions.

---

# 10. What this thesis does not assume

This project should not begin by assuming that more autonomy is always better.

It should not assume that multi-agent systems outperform a strong single agent.

It should not assume that every project needs a knowledge graph.

It should not assume that shared agent memory is automatically beneficial.

It should not assume that agents should make product decisions.

It should not assume that every task benefits from parallelism.

It should not assume that all project knowledge should be retained.

It should not assume that DAGs are the right execution abstraction.

It should not assume that a project-level coordinator is inherently superior to direct agent interaction.

It should not assume that open-source orchestration necessarily defeats integrated proprietary experiences.

It should not assume that provider independence is valuable enough to overcome the advantages of deeply integrated model-provider tools.

It should not assume that the "fourth age" framing will survive contact with evidence.

These are questions.

Not conclusions.

---

# 11. Questions this project must answer

The purpose of Charrette is not only to build software.

It is to investigate the operating model emerging around agentic software development.

The following questions should guide both product development and the eventual whitepaper.

## 11.1 Is there genuinely a new engineering abstraction?

* What fundamentally changes when implementation capacity becomes abundant?
* What remains scarce when agents can independently complete well-scoped tasks?
* Does the engineer's role measurably shift toward specification, judgement, coordination, and verification?
* Is agentic software engineering meaningfully different from AI-assisted software engineering?
* Is project-level orchestration meaningfully different from simply using several agents?
* At what level of agent capability does this transition become visible?
* Which forms of engineering work stubbornly remain human?
* Does the project itself become a useful computational abstraction?

## 11.2 What should persist?

* What information must survive an individual agent session?
* What belongs to the project rather than the worker?
* How much conversation history is genuinely useful?
* What information should be canonical?
* What information should remain episodic?
* When should episodic knowledge be promoted into canonical knowledge?
* How should provenance be stored?
* How quickly does stored project knowledge become stale?
* Can stale information be detected automatically?
* Can a new agent reconstruct sufficient context without inheriting full historical conversations?
* Is repository content plus retrieval sufficient, or is another persistence layer necessary?

## 11.3 Can project intelligence become collaborative?

* Which project knowledge should be shared between developers?
* Which knowledge should remain private or personal?
* How should one developer's agent publish useful discoveries to the project?
* Should shared knowledge require review?
* How should conflicting memories or interpretations be represented?
* How should permissions and sensitive information work?
* Can shared project context reduce duplicated investigation?
* Can it accidentally propagate one agent's mistake across an entire team?
* Does a shared project model meaningfully improve onboarding?
* Should developers have personal coordinators operating against a common project state?
* Can collaborative project intelligence scale to large organisations?

## 11.4 What is the correct human-agent boundary?

* What kinds of ambiguity should stop execution?
* What decisions can agents make safely without asking?
* What deserves escalation?
* What percentage of tasks can complete without human intervention?
* Which classes of task most often require clarification?
* Does greater autonomy genuinely reduce human attention?
* Does autonomy sometimes merely defer debugging or decision-making?
* Is one coordinator easier to manage than several direct agent conversations?
* When does delegation cost more than direct implementation?

## 11.5 Does orchestration improve engineering work?

* Does parallel execution reduce elapsed completion time?
* Where does parallelism introduce conflicts or duplicated effort?
* How many concurrent tasks can one developer meaningfully supervise?
* Does a coordinator reduce cognitive load?
* Does coordinator-supplied project context improve task success?
* Are specialised agents meaningfully better than a single strong general-purpose model?
* How large is orchestration overhead relative to execution?
* What becomes the bottleneck when implementation ceases to be the bottleneck?

## 11.6 What is the right execution model?

* Are configurable execution graphs useful?
* Are DAGs the correct abstraction?
* Which workflow stages recur frequently enough to become reusable?
* When should work branch into parallel reviewers or testers?
* When should review trigger repair and re-review?
* How many loops are useful before returns diminish?
* Can task requirements determine execution policy automatically?
* Should teams maintain their own execution policies?
* How much control should remain implicit versus explicitly configured?
* When should execution graphs escalate to a human?

## 11.7 Does independent verification improve outcomes?

* Does an independent reviewer reliably identify meaningful defects?
* Should implementer and reviewer use different models?
* Does review improve when the reviewer receives requirements but not the implementer's conversation history?
* How many review and repair loops are useful before returns diminish?
* Does a specialised testing agent catch materially different issues from a reviewing agent?
* Which verification mechanisms are strongest?
* Can acceptance criteria be converted into executable verification?
* How often can an agent repair review findings without introducing regressions?
* What categories of finding should always require human review?

## 11.8 How should project knowledge behave?

* Can project memory improve agent performance over time?
* Which stored information produces the most value?
* How should contradictory knowledge be handled?
* How should the system represent uncertainty?
* Should knowledge have confidence, source, date, and scope?
* Can agents maintain project documentation automatically without degrading its quality?
* How do we prevent memory accumulation from becoming another form of context pollution?

## 11.9 Does provider independence matter?

* How frequently do developers benefit from switching agent or model?
* Do different models remain meaningfully specialised?
* Does a provider-independent layer reduce switching costs?
* What project state becomes difficult to migrate out of integrated proprietary systems?
* How valuable are proprietary integrations compared with portability?
* Can an open system remain competitive with vertically integrated provider experiences?
* What standards would make project state portable?
* Which parts of execution can realistically be provider-independent?
* Where should provider-specific capabilities remain exposed rather than abstracted away?

## 11.10 What happens to existing software-development tools?

* Does the IDE remain the primary surface?
* Does the issue tracker become primarily an intake system?
* Does the pull request remain the natural unit of review?
* How should agent-generated plans and investigations be stored?
* What happens when agents produce dozens of concurrent branches?
* Do repositories need a portable machine-readable project-memory format?
* Should that format be standardised?
* What does vendor lock-in mean when accumulated project intelligence becomes valuable?
* Is a new project-level control-plane layer required between developers and execution agents?

## 11.11 What should Charrette not own?

* Which state should remain in Git?
* Which state should remain in Linear, Jira, or GitHub?
* Which information should Charrette reference rather than duplicate?
* When should external systems be mutated?
* How should bidirectional sync be handled?
* What is the minimum persistent state Charrette needs in order to remain useful?

---

# 12. Evidence to collect during prototyping

The prototype should be instrumented.

The eventual whitepaper should rely on observed behaviour rather than retrospective anecdotes wherever possible.

Useful measurements may include:

* number of delegated tasks
* task type
* agent used
* model switches
* time to completion
* human interruptions per task
* reason for interruption
* number of clarification cycles
* task success or failure
* number of concurrent workers
* code-producing versus non-code-producing tasks
* execution graph used
* number of review cycles
* review findings
* repair success rate
* testing-agent findings
* test failures
* merge conflicts
* repeated work
* coordinator interventions
* project-memory retrievals
* shared-memory retrievals
* stale-memory incidents
* contradictory-memory incidents
* human overrides
* final outcome type

Qualitative observations should also be recorded.

Particularly useful events include:

* surprising successes
* surprising failures
* cases where memory materially helped
* cases where shared memory materially helped
* cases where memory misled an agent
* cases where another developer already possessed knowledge an agent had to rediscover
* points where the developer became confused
* unnecessary interruptions
* missed escalations
* coordination failures
* workflow stages that proved unnecessary
* unexpected value from re-review or testing agents
* tasks that should never have been delegated
* tasks that worked substantially better in parallel
* tasks that worked substantially worse in parallel
* cases where switching providers improved an outcome
* cases where provider abstraction degraded an otherwise useful capability

The goal is not to produce flattering metrics.

The goal is to understand the system.

---

# 13. What would make this thesis wrong?

This thesis should remain falsifiable.

Evidence against it would include findings such as:

* a single long-context agent consistently outperforms coordinator-worker architectures
* repository files plus ordinary retrieval provide all useful project memory
* developer-specific agent context is sufficient and shared project intelligence adds little value
* shared project memory produces more confusion than coordination
* developers strongly prefer direct interaction with individual workers
* orchestration overhead outweighs the gains from parallel execution
* project-level persistence provides little measurable improvement
* execution graphs add complexity without meaningful quality gains
* independent agent review fails to meaningfully improve outcomes
* specialised testing agents provide little additional value
* accumulated project memory creates more errors than it prevents
* workers become sufficiently capable that coordination and requirements refinement become negligible
* integrated provider environments consistently outperform open provider-independent systems by enough that portability has little practical value
* model providers converge on genuinely open interoperable project state, removing the need for an independent persistence layer
* existing IDE and issue-tracker abstractions prove sufficient without a new project-level layer

If repeated evidence supports these conclusions, Charrette should change direction.

The thesis is a hypothesis to test, not a doctrine to protect.

---

# 14. Toward a whitepaper

The eventual whitepaper should not primarily be a whitepaper about Charrette.

It should be a paper about the broader transition Charrette was built to investigate.

A working title is:

# The Fourth Age of Software Engineering

Possible subtitle:

> **From Coding Agents to Persistent Project Intelligence**

Charrette should appear as the experimental system through which the ideas were explored.

The relationship should be:

```text
Observation
    ↓
Thesis
    ↓
Research questions
    ↓
Charrette prototype
    ↓
Experiments and real-world use
    ↓
Findings
    ↓
Refined thesis
    ↓
Whitepaper
```

The whitepaper should answer, with evidence where possible:

1. Has a meaningful new mode of software engineering emerged?
2. What changed as coding agents became capable of autonomous multi-step work?
3. What became scarce as implementation became cheaper?
4. What state must survive individual agent sessions?
5. What project intelligence should be shared between developers?
6. Can software projects themselves become persistent collaborative intelligence systems?
7. What is the appropriate persistent abstraction?
8. What is the role of a coordinator?
9. When does parallel agent execution help or hurt?
10. What decisions still require human judgement?
11. Are programmable execution graphs useful?
12. When should implementation be followed by review, repair, re-review, or specialised testing?
13. Can verification itself be delegated?
14. Does persistent project knowledge improve future execution?
15. What should remain canonical and what should remain episodic?
16. What happens to IDEs, issue trackers, PRs, and repositories?
17. What forms of vendor lock-in emerge around project intelligence and engineering workflows?
18. Does provider independence produce meaningful practical value?
19. What role should open-source infrastructure play in the persistent project layer?
20. What did building and using Charrette reveal that was not obvious beforehand?
21. Which parts of the original thesis were wrong?

A good final paper should contain findings that changed the system.

If the whitepaper merely confirms everything written in this file, the research process has probably failed.

---

# 15. Current working proposition

The current proposition behind Charrette is:

> **The project persists. The coordinator understands. Agents come and go.**

A second, increasingly important proposition is:

> **Project intelligence should belong to the project and its team, not to the transient agent, developer session, or corporation through which the work happened.**

Everything else remains open to evidence.
