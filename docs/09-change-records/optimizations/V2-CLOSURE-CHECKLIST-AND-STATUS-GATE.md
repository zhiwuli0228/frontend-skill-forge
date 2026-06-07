# V2 Closure Checklist and Status Gate

Status: Recorded

Date: 2026-06-07

## Optimization

Make change completion status machine-checkable and checklist-driven.

## What To Change

- Before saying a change is done, always read `openspec status --change <name>
  --json`.
- Treat `implementation.md` and `verify.md` as necessary but insufficient.
- Require explicit presence of the downstream review, disposition, closure,
  acceptance-precheck, and release artifacts before closure language is used.
- If acceptance is not yet recorded, the release summary must remain blocked.

## Why This Helps

- Prevents premature "done" claims after implementation-only success.
- Forces the reviewer to notice missing artifacts before the user receives a
  completion statement.
- Makes subagent execution safer by tying completion to the full artifact
  chain, not to a single implementation pass.

## Operational Rule

Use this checklist for every code-bearing OpenSpec change:

1. confirm `tasks.md` is complete
2. confirm `implementation.md` exists
3. confirm `verify.md` exists
4. confirm implementation and verification review/disposition/closure exist
5. confirm acceptance-precheck exists
6. confirm release exists and reflects the acceptance state
7. confirm `openspec status --change <name> --json` agrees with the claimed state
