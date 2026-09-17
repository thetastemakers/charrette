# Charrette

Charrette is an open-source project orchestration environment for software engineering with AI agents.

It is built around a simple idea:

> **The project should persist. The agents should not have to.**

Today, much of the useful context created during AI-assisted development accumulates inside individual agent sessions, developer chats, proprietary tools, and model-specific environments.

Charrette explores a different model: the **project** becomes the persistent object.

A project can retain its knowledge, decisions, tasks, artifacts, execution history, and shared context independently of whichever agent happens to be working on it.

Agents become transient workers.

The project remains.

## The basic model

Charrette currently explores four core primitives:

**Project** — the persistent owner of context, knowledge, history, tasks, artifacts, and execution state.

**Coordinator** — the developer's continuous interface to the project. It understands intent, delegates work, follows execution, synthesises outcomes, and remains available while other agents work asynchronously.

**Task** — a bounded execution context that may be handled by any suitable coding agent and may produce code, research, documentation, decisions, or other outcomes.

**Artifact** — useful output produced during work that should remain accessible without necessarily becoming permanent repository documentation.

The model is deliberately provisional.

Charrette is a prototype for discovering what the right abstractions actually are.

## Open by design

Charrette is intended to exist as open-source infrastructure.

This is not incidental to the project.

If project context, engineering workflows, accumulated knowledge, orchestration rules, and execution history become increasingly valuable parts of software development, they should not be controlled exclusively by a single model provider or development platform.

Developers should be able to:

* choose and change models
* combine agents from different providers
* move between interfaces
* retain their project state
* inspect how orchestration works
* own the workflows their teams develop
* avoid rebuilding accumulated project intelligence when a better model or tool appears

Model providers will naturally build excellent orchestration experiences around their own agents.

Developers have a different incentive: **to use whichever agent is best for the work.**

Charrette explores whether the persistent layer between the developer and those agents should therefore be open, portable, and provider-independent.

## The thesis

Charrette is an implementation of a broader research hypothesis about how software engineering changes when autonomous coding agents become abundant.

That argument, the questions we intend to test, and the evidence we hope to collect are maintained in:

**[`THESIS.md`](./THESIS.md)**

Charrette should be understood as an experiment emerging from that thesis rather than proof that the thesis is correct.

## Status

Very early.

The architecture, terminology, interaction model, and even the underlying thesis are expected to change substantially through prototyping and use.
