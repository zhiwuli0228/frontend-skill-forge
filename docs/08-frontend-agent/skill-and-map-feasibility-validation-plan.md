# Skill and Map Feasibility Validation Plan

Last Updated: 2026-06-07
Status: Active
Owner: Frontend Agent validation phase

## Purpose

Validate whether the current Skill set and frontend knowledge maps are usable enough for real follow-up work before investing further in automation.

This plan focuses on three questions:

1. Can an agent complete real tasks primarily by relying on the current Skills and maps?
2. Are `project-map.md`, `route-map.md`, and `component-map.md` sufficiently complete and current to reduce rediscovery cost?
3. Which parts of the workflow are stable enough to automate next, and which parts still need manual or document-level refinement?

## Scope

In scope:

- `frontend-project-reader`
- `frontend-incremental-coder`
- `frontend-e2e-explorer`
- `docs/02-harness/knowledge/frontend/project-map.md`
- `docs/02-harness/knowledge/frontend/route-map.md`
- `docs/02-harness/knowledge/frontend/component-map.md`
- related evidence and E2E references when needed

Out of scope:

- adding new automation first
- large runtime feature expansion
- validating multi-project portability
- evaluating backend integration

## Validation Principle

Do not ask whether the documents look complete.

Ask whether an agent can finish bounded work with:

```text
less rediscovery
less human correction
less map patching during execution
```

If the agent completes tasks but only after repeatedly reading source code to compensate for map gaps, the validation is not a pass.

For any UI-facing validation step in this plan, follow `ui-validation-evidence-contract.md`.
Code-only conclusions are not enough.

## Test Pack

Run exactly three task types. Together they cover reading, changing, and exploring.

### Task A: Code Understanding and Targeting

Goal:
Verify that `frontend-project-reader` plus the maps are enough to locate the correct route, page, component, test, and likely risk area before coding.

Suggested prompt:

```text
Use the current Skills and frontend maps to identify where the grid/list toggle behavior for the skill list is implemented, which routes and tests cover it, and what the main regression risks are.
```

Expected agent outputs:

- target route: `/skill/list/:filter?`
- target page: `SkillListPage`
- target sub-component: `SkillFilterBar`
- related tests: `skill-list-runtime.spec.ts` and any aggregate coverage
- known migration note: `Button.Group` → `Space.Compact`
- concise risk assessment

Pass conditions:

- no route/module misidentification
- no more than 2 source-code detours beyond the mapped files
- correct identification of at least 1 related test and 1 related risk

Fail signals:

- agent searches the repo broadly before trusting the maps
- route and component relationships are wrong
- map content is insufficient to identify the target area confidently

### Task B: Small Bounded Frontend Change

Goal:
Verify that `frontend-incremental-coder` plus the maps can support a real, low-risk change without uncontrolled wandering.

Suggested change:

```text
Add or adjust a small, visible text label or helper copy inside one documented page without changing module boundaries or route structure.
```

Recommended target:

- one page in `task`, `skill`, or `workflow`
- avoid router or shell changes for this validation round

Expected agent outputs:

- correct module and component targeting
- minimal change plan
- scoped code edit
- explicit evidence/map update decision
- verification result
- at least one real runtime check on the modified page with preserved artifacts

Pass conditions:

- change stays inside the expected module
- no unnecessary edits outside the target area
- existing testids remain stable unless intentionally changed
- agent identifies whether map updates are required

Fail signals:

- unnecessary cross-module edits
- surprise modifications to router or sidebar config
- missing awareness of evidence/map sync obligations
- testid breakage without recognition

### Task C: UI Exploration and Evidence Closure

Goal:
Verify that `frontend-e2e-explorer` plus the maps can produce or validate route evidence without major manual interpretation.

Suggested target:

- `/task/list/all`
- or `/skill/list/all`
- or `/workflow/editor`

Expected agent outputs:

- route-level target confirmation from `route-map.md`
- component targets from `component-map.md`
- 2-3 key interactions to inspect
- evidence gap judgment: complete, partial, or stale
- if needed, a proposed evidence update set

Pass conditions:

- route and component targets match the documented maps
- agent can explain what evidence already exists
- agent can identify one concrete selector or interaction stability concern, if present
- agent avoids duplicating evidence blindly
- agent preserves real interaction evidence, not only narrative summary

Fail signals:

- agent ignores existing evidence index or MCP session records
- route evidence cannot be reconciled with the maps
- component discovery and route documentation disagree with no diagnosis

## Execution Rules

To keep the validation honest:

1. Run tasks in order: A → B → C.
2. Require the agent to start from the Skill and map assets first.
3. Allow source inspection only after the agent names the relevant mapped targets.
4. Record every point where the agent had to compensate for missing or stale documentation.
5. Do not fix the maps during the run unless the task explicitly requires it.
6. Store raw run outputs under `artifacts/validation/`, not under `docs/`.
7. Any UI-facing step must preserve before/after visual artifacts plus at least one runtime artifact.

## Artifact Storage Rule

For each validation run:

1. create a run folder under `artifacts/validation/runs/`
2. create `manifest.md` from `artifacts/validation/RUN-MANIFEST.template.md`
3. store screenshots, traces, raw logs, HTML reports, and JSON outputs in the matching sibling artifact directories
4. reference those paths from the manifest and any final evidence document

Minimum UI artifact set per run:

- 2 screenshots
- 1 runtime artifact: trace or HTML report
- 1 raw log
- 1 manifest with exact paths

## Recording Template

Use one record per task.

```md
# Validation Record: <Task ID>

Date:
Operator:
Agent:
Skill used:
Primary maps used:

## Task

<prompt or change request>

## Expected Target

- module:
- route:
- page:
- component:
- tests/evidence:

## Actual Agent Path

1. First artifacts consulted:
2. First target hypothesis:
3. Source files opened after maps:
4. Human corrections required:

## Result

- outcome: pass | partial | fail
- success without human intervention: yes | no
- unnecessary rediscovery: none | low | medium | high
- map freshness issue: yes | no
- skill instruction gap: yes | no

## Findings

- what worked:
- what was missing:
- what was stale:
- what should be automated later:

## Evidence

- files read:
- files changed:
- tests run:
```

## Scorecard

Score each task on a 0-2 scale:

| Dimension | 0 | 1 | 2 |
| --- | --- | --- | --- |
| Targeting accuracy | wrong target | partially correct | correct target quickly |
| Map usefulness | mostly bypassed | somewhat helpful | primary navigation aid |
| Skill guidance quality | confusing/incomplete | usable with gaps | clear and sufficient |
| Human intervention needed | heavy | moderate | little or none |
| Evidence awareness | missing | partial | explicit and correct |

Per-task max score: `10`

Overall interpretation:

- `25-30`: current Skill + map set is viable; automate the stable parts next
- `18-24`: viable but uneven; patch maps/Skills before major automation
- `0-17`: not yet reliable; do not automate beyond experiments

## Exit Criteria

Treat the current system as validated for next-stage automation only if all conditions hold:

1. At least 2 of 3 tasks score `8/10` or higher.
2. No task fully fails due to route/component mis-targeting.
3. Map freshness problems are limited and diagnosable, not pervasive.
4. Skill gaps are specific enough to patch without redesigning the whole workflow.

If these conditions are not met, the next step is:

```text
repair Skills and maps first
then rerun the same validation pack
```

## What To Automate Only After Passing

If the pack passes, prioritize automation in this order:

1. map freshness checks
2. evidence registry update assistance
3. governed-change detection for route/component/test-sensitive edits
4. selector drift reminders for UI-facing component changes

Do not automate broad workflow enforcement before these basics are stable.

## Recommended First Run

Use this exact first validation sequence:

1. Task A:
   investigate skill list grid/list toggle implementation and risk
2. Task B:
   apply one small text-level change in a documented single-module page
3. Task C:
   validate existing evidence completeness for `/task/list/all`

This sequence is intentionally narrow. The goal is to test whether the current assets support reliable work, not to stress the runtime.
