# Subagent End-To-End Handoff Template

Status: Active template

Date: 2026-06-07

## Purpose

Provide the handoff shape for the default subagent mode when the work must continue past `apply` through implementation, review, verification, and release.

This is a thin delivery template: keep the payload short, link to artifacts,
and avoid re-explaining the entire process.

## When To Use

Use this template when:

- the user wants the default subagent execution mode
- the work is expected to continue beyond `apply-ready`
- the current agent is delegating the rest of the lifecycle to another agent or role

## Mandatory Preconditions

Before handoff, confirm:

1. the formal change exists under `openspec/changes/<change>/`
2. required pre-implementation artifacts are complete
3. `openspec status --change <name> --json` shows the next ready artifact
4. the handoff clearly states which downstream artifacts still remain
5. the handoff does not imply that implementation, review, or release is already complete

If any item is false, do not hand off.

## Completion Check

Before the producing agent says the work is done, it must confirm the current
change status and list every remaining artifact explicitly. If any of the
following are missing, the work is not complete:

- implementation-review.md
- implementation-disposition.md
- implementation-closure.md
- verify-review.md
- verify-disposition.md
- verify-closure.md
- acceptance-precheck.md
- release.md

If the downstream chain is already complete, do not repeat the whole chain in
the handoff message. State completion briefly and point to the release record.

## Handoff Message Template

```text
Subagent End-To-End Handoff

Change:
- <change-name>

Execution mode:
- subagent

Schema:
- superspec

Governance:
- superpower

Target branch:
- <branch-name>

Current ready artifact:
- tasks.md

Downstream artifacts still required:
- <next missing artifacts only>

Implementation scope:
- <short summary>

Allowed files:
- <file boundaries>

Forbidden files:
- <file boundaries>

Required reads:
- <paths>

Required commands:
- <commands>

Review path:
- independent reviewer role

Commit rule:
- <in scope / out of scope / conditional>
```

## Receiver Instructions

The receiving agent should:

1. read the provided context files
2. continue from `tasks.md`
3. create `implementation.md` when code work begins
4. produce the implementation-review, disposition, closure, verify, and release artifacts in order
5. stop only if blocked or if the user interrupts

## Thin Delivery Guidance

- Use one sentence for status, one sentence for risk, and one sentence for next
  action.
- Link to the canonical artifact files instead of pasting long explanations.
- If the work is blocked, name the blocker and the next gate only.

## Anti-Patterns

- treating `apply-ready` as the final state
- stopping after code changes without review and verification artifacts
- claiming release readiness when downstream artifacts are incomplete
- using one agent to self-review its own implementation without explicit separation
