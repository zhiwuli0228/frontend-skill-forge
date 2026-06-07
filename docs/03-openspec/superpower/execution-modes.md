# Execution Modes

Status: Active governance

## Purpose

Define how implementation work may be executed under the repository's Superpower governance model.

## Default Mode

The default execution mode is:

- current working branch
- subagent delegation enabled
- the active agent acts as orchestrator unless the user explicitly disables subagent usage

This default applies unless the user explicitly requests local-only execution or explicitly disables delegated implementation.

## Optional Local Mode

Local mode is optional. It is enabled only when the user explicitly chooses it or explicitly disables subagent usage.

When local mode is used, execution still remains governed by SuperSpec and Superpower. Removing subagents does not relax the workflow.

## Branch Rule

- Default target branch: the current working branch
- If the user names a different branch, that explicit branch overrides the default
- Subagent mode does not imply automatic branch switching

## Subagent End-To-End Rule

Because subagent mode is the default, the delegated flow must cover the same lifecycle as local execution:

1. implementation
2. verification
3. independent review
4. disposition
5. closure verification
6. commit handoff or approved commit execution

Subagent mode is therefore not just "write code somewhere else". It is the default governed execution path.

## Required Role Split In Subagent Mode

Subagent mode should distinguish at least these roles:

### Role 1: Implementer

Owns:

- bounded code changes
- task completion updates
- implementation record
- initial verification execution

### Role 2: Independent Reviewer

Owns:

- review of delivered code and verification results
- findings and risks
- recommendation for disposition

### Role 3: Closer / Integrator

Owns:

- disposition and closure verification
- final integration decision
- commit creation or commit approval path

One agent must not silently self-certify all of these roles while claiming independent review.

## Commit Rule

Subagent mode may include commit creation, but only when all of the following are true:

- implementation scope is bounded
- verification results are recorded
- independent review has occurred
- disposition and closure are not skipped
- the commit target branch is explicit

If these conditions are not satisfied, the workflow must stop before commit.

## Dispatch Requirements

Any dispatch packet must declare:

- `schema: superspec`
- `governance: superpower`
- `execution_mode: subagent`
- target branch
- delegated role
- allowed files
- forbidden files
- required reads
- required validation commands
- expected review path
- whether commit is in or out of scope

If the user explicitly disables subagent mode, the dispatch should instead declare:

- `execution_mode: local`

If `execution_mode` is omitted, treat the work as subagent mode by default.

## Anti-Patterns

The following are not acceptable:

- enabling local-only execution implicitly
- using a subagent for coding while skipping review and closure
- saying a subagent "finished end to end" without commit/verification/review evidence
- spawning a coding subagent and treating its own self-summary as independent review

## Practical Meaning

This repository now supports two execution modes:

- `subagent`: default, current branch, governed end-to-end delegation path
- `local`: optional, user-selected local execution path

Both modes must satisfy the same SuperSpec artifact and verification expectations.
