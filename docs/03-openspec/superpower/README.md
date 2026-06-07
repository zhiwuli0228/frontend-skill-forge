# Superpower Governance

Status: V1.3 baseline

## Purpose

Define the repository's governance layer for pre-change brainstorming, agent dispatch, independent review, and controlled closure inside the combined OpenSpec + SuperSpec + Superpower model.

## V1.3 Scope

This directory defines:

- mission definitions for the main Superpower operating modes
- power definitions that constrain what an agent may claim or do
- brainstorm usage rules before formal change execution
- dispatch and review governance for bounded agent work

This directory does not define:

- business/runtime implementation logic
- direct `src/` or `tests/` execution plans
- V1.4 integrated proof that the whole workflow is operational end to end

## Main Files

| File | Purpose |
| --- | --- |
| [missions/mission-catalog.md](./missions/mission-catalog.md) | Mission definitions for brainstorm and governed execution |
| [powers/power-catalog.md](./powers/power-catalog.md) | Power definitions and guardrails |
| [brainstorm-governance.md](./brainstorm-governance.md) | Rules for exploratory work before formalized change execution |
| [dispatch-review-governance.md](./dispatch-review-governance.md) | Dispatch packet, review independence, and closure rules |
| [execution-modes.md](./execution-modes.md) | Default subagent execution mode and optional local execution mode |

## Governance Position

Within V1:

- OpenSpec governs change entry and artifact flow
- SuperSpec governs schema stages and dependency rules
- Superpower governs how agents brainstorm, receive assignments, report results, and undergo review

Naming rule:

- do not use bare `spec-driven` as the repository execution label for code-bearing work
- formal dispatches must name both `schema: superspec` and `governance: superpower`
