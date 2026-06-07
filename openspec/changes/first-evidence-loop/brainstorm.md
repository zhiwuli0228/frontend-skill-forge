# Brainstorm: V3 First Evidence Loop

Status: Complete

## Context

V2 closed as the first code-bearing frontend version: 5 business modules, 21 pages, 181 e2e tests, 216 unique `data-testid` selectors. V2 produced the **surface**; V3 produces the **observational harness** that lets agents read the surface without re-discovering it, and lets the project start evolving its own Skills/Rules/Knowledge based on observed evidence.

Per the architecture blueprint §17, Phase 3 "First Evidence Loop" has 7 deliverables: route observation records, MCP exploration session, e2e asset registry, route reachability tests, knowledge map updates, evolution candidate records, verification report.

Today the project has all the templates for these assets but zero populated records. The 5 knowledge maps under `docs/02-harness/knowledge/frontend/` are 1-line "Status: Draft" stubs. V3 fills them.

## V3 Major Version Goal

Establish the project's first operational evidence loop:

```text
Route discovery → MCP exploration → Evidence records → Knowledge map updates
     ↓                                                            ↓
E2E registry ←―――――― Failure diagnosis ←―― Selector stability
     ↓
Evolution candidates (knowledge, rule, skill)
```

The loop must run at least once end-to-end on a real V2 route, producing real evidence records that downstream V4 (Skill v1 implementation) and V5 (benchmark expansion) can consume.

## Non-Goals for V3

- New runtime features (V5 territory)
- Skill v1 implementation (V4 territory)
- Real-time MCP browser tool usage if unavailable — fall back to deriving evidence from e2e artifacts
- Code splitting (V5)
- Ant Design 6→7 deprecation migration (V5)

## V3 Minor-Version Strategy

| Minor | Goal | Output count | Code change? |
| --- | --- | --- | --- |
| V3.1 | Knowledge Map Population | 5 maps fully populated | No |
| V3.2 | E2E Asset Registry | 2 new docs (registry + promotion candidates) | No |
| V3.3 | First MCP Exploration Session | 1 session + 9-10 evidence records | No (uses e2e artifacts) |
| V3.4 | Drift Diagnosis + Evolution Candidates | 1 failure record + 1 issue ledger + 2 queue updates + 1 spec | 1 new e2e spec (~30 lines) |
| V3.5 | V3 Aggregate Closure | V3 governance artifacts (baseline + summary + release + retro + issues + decisions) | No |

## Target Route for V3.3

`/task/list/all` — chosen because it has the most sub-components (Table, FilterBar, Drawer), the scenario selector covering all 4 states, the URL-derived filter pattern just stabilized in the V2.10 hotfix, and the most e2e coverage (8 tests in `task-list-runtime.spec.ts`).

## Exit Gate

User accepts V3 as complete when:
1. All 5 knowledge maps are populated
2. The e2e registry catalogs all 25 spec files
3. The first MCP session record exists with at least 9 evidence records
4. At least 1 evolution candidate is approved through the decision-record workflow
5. `npm run lint`, `npm run build`, `npm run test:e2e` all pass (181/181 + 1 new drift demo)
6. The V3 aggregate summary, release record, retrospective, and decision ledger updates exist
