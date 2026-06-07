# OpenSpec Apply Handoff Template

Status: Active template

Date: 2026-06-07

## Purpose

Provide a reusable handoff template for requests where one agent must build the formal change flow and stop at `apply`, and another agent must continue implementation.

This is a thin delivery template. Keep it short and point to canonical files
rather than re-explaining the workflow.

This template is only complete when it explicitly names:

- `schema: superspec`
- `governance: superpower` for code-bearing work

Note:

- `apply-ready` is a handoff point, not a completion point
- code-bearing work still requires the downstream review, disposition, closure,
  acceptance-precheck, and release artifacts

## When To Use

Use this template only when all of the following are true:

- the user explicitly wants a formal OpenSpec/SuperSpec change flow
- the current agent should stop before coding
- another agent will continue with implementation

## Mandatory Preconditions

Before handoff, the producing agent must confirm:

1. a formal change exists under `openspec/changes/<change>/`
2. all schema artifacts required for `apply` are complete
3. `openspec status --change <name> --json` reflects that state
4. `openspec instructions apply --change <name> --json` returns `state: "ready"`
5. no `implementation.md` content or code edits were created by the producing agent

If any item is false, do not hand off.

## Producer Checklist

- Create or continue the formal change.
- Generate artifacts in schema order.
- Stop at the schema-defined `apply` entrypoint.
- Verify `apply` readiness with the CLI.
- Package the change name, context files, and execution expectations for the next agent.

## Thin Delivery Guidance

- Report only the change name, schema, target branch, current ready artifact,
  and the next step.
- Link to the canonical files instead of pasting a full narrative.
- If `apply` is ready, do not restate proposal/spec/design details unless one of
  them changed.

## Handoff Message Template

Copy and fill in this block:

```text
OpenSpec Apply Handoff

Execution mode:
- subagent | local

Schema:
- superspec

Governance:
- superpower

Target branch:
- <branch-name>

Change:
- <change-name>

Schema:
- <schema-name>

Apply status:
- ready

CLI checks:
- openspec status --change <change-name> --json : pass
- openspec instructions apply --change <change-name> --json : ready

Context files:
- <path 1>
- <path 2>
- <path 3>

Implementation entry artifact:
- tasks.md

Do not redo:
- change creation
- proposal/specs/design generation

Next step:
- run /opsx:apply <change-name>
```

## Required Context File Types

At minimum, the handoff should include:

- `brainstorm.md`
- `proposal.md`
- `specs/**/*.md`
- `design.md`
- any required review/disposition/closure artifacts that gate the plan
- `plan.md`
- `tasks.md`

## Anti-Patterns

The following are invalid handoffs:

- "The design is in version docs, another agent can code from there."
- "The change probably looks ready even though apply was not checked."
- "Implementation can start even though tasks.md does not exist."
- "Release or verify artifacts were prewritten before implementation started."
- "The change is done because tasks.md is complete."
- "The change is done because implementation.md and verify.md exist."

## Receiver Instructions

The receiving agent should:

1. read the provided context files
2. confirm `openspec instructions apply --change <name> --json`
3. begin implementation from `tasks.md`
4. update task checkboxes as work completes
5. continue through implementation until done or blocked

## Example

Example using the current dashboard change:

```text
OpenSpec Apply Handoff

Execution mode:
- subagent

Target branch:
- current branch

Change:
- implement-dashboard-runtime-baseline

Schema:
- superspec

Apply status:
- ready

CLI checks:
- openspec status --change implement-dashboard-runtime-baseline --json : pass
- openspec instructions apply --change implement-dashboard-runtime-baseline --json : ready

Context files:
- openspec/changes/implement-dashboard-runtime-baseline/brainstorm.md
- openspec/changes/implement-dashboard-runtime-baseline/proposal.md
- openspec/changes/implement-dashboard-runtime-baseline/specs/dashboard-runtime-baseline.md
- openspec/changes/implement-dashboard-runtime-baseline/design.md
- openspec/changes/implement-dashboard-runtime-baseline/design-review.md
- openspec/changes/implement-dashboard-runtime-baseline/design-disposition.md
- openspec/changes/implement-dashboard-runtime-baseline/design-closure.md
- openspec/changes/implement-dashboard-runtime-baseline/plan.md
- openspec/changes/implement-dashboard-runtime-baseline/tasks.md

Implementation entry artifact:
- tasks.md

Do not redo:
- change creation
- proposal/specs/design generation

Next step:
- run /opsx:apply implement-dashboard-runtime-baseline
```
