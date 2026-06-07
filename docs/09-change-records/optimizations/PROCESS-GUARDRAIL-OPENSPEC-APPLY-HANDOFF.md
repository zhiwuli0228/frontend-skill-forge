# Process Guardrail: OpenSpec Apply-Handoff Requests

Status: Active

Date: 2026-06-07

## Purpose

Prevent recurrence of the specific failure mode where a user asks for a formal change flow that should stop at `apply`, but the work drifts into non-change documentation instead.

## Guardrail

If a request contains both of the following:

- a requirement to produce the formal spec/change flow
- a requirement to stop at `apply` so another agent can continue

then the execution order must be:

1. formal change creation or reuse under `openspec/changes/<change>/`
2. artifact generation only through the schema-defined `apply` prerequisites
3. CLI confirmation that `apply` is ready
4. handoff package for the next agent

No version-ledger expansion, implementation work, or substitute documentation path may take priority over that flow.

## Operational Checklist

- Did a formal change directory get created first?
- Did the agent generate the change-local artifacts instead of only version-level docs?
- Did the agent check `openspec status --change <name> --json`?
- Did the agent check `openspec instructions apply --change <name> --json`?
- Did the agent stop before `implementation.md` and code edits?

If any answer is `no`, the handoff is incomplete.
