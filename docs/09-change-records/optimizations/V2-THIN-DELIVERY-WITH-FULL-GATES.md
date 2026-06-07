# V2 Thin Delivery With Full Gates

Status: Recorded

Date: 2026-06-07

## Optimization

Reduce agent delivery payload without relaxing the OpenSpec / SuperSpec /
Superpower gate model.

## What To Change

- Keep handoffs short and evidence-linked.
- Report only the current stage, completed artifacts, next gate, blockers, and
  links to canonical files.
- Avoid repeating the full downstream artifact list unless the change is still
  mid-transition.
- Put detailed reasoning in the artifact files themselves, not in every
  progress update.

## Why This Helps

- Lowers cognitive load on the user.
- Makes subagent output easier to scan.
- Preserves the same end-to-end completion requirement and release gate model.

## Operational Rule

When delivering work:

1. say what stage is complete
2. say what still blocks completion
3. link the canonical artifacts
4. mention the next gate only
5. keep the message short unless the user explicitly asks for detail
