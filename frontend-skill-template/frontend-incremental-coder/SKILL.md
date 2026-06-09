---
name: frontend-incremental-coder
description: Make bounded frontend changes — produce a minimal change plan that respects architecture boundaries, updates evidence, and passes verification.
compatibility: opencode
metadata:
  project: frontend-skill-forge
  skill_type: implementation
  authority: project
---

# Frontend Incremental Coder

## Purpose

Given a change request, produce a minimal change plan that respects architecture boundaries, updates evidence, and passes verification — without introducing unintended side effects.

## Use When

Use this Skill when:

- Implementing a new feature within an existing module
- Fixing a bug in a documented area
- Refactoring a component without changing its external behavior
- Adding a new route to an existing module
- Updating mock data to support new sidebar filter values

Do not use this Skill when:

- The change crosses module boundaries (escalate to human review first)
- The change requires a new module (use the architecture blueprint to plan)
- The change is purely documentation (just edit the docs directly)

## Required Inputs

- Change request (text description)
- Architecture boundary rules from `docs/01-architecture/module-boundary.md`
- Affected routes/components from `docs/02-harness/knowledge/frontend/` (route-map, component-map)
- Existing evidence from `docs/08-frontend-agent/evidence/`
- Verification rules from `docs/02-harness/rules/`

## Workflow

### 1. Parse the Change Request

Identify: target module (task/skill/workflow/insight/settings), target route(s) and component(s), change type (new route / new component / bug fix / refactor / mock data update), and expected output files. If the change affects ≥2 modules, pause and ask for human guidance.

### 2. Check Architecture Boundaries

Verify the change does not:
- Import from another module's `pages/` or `components/`
- Modify `src/shell/config/moduleConfig.tsx` without justification
- Modify `src/app/router.tsx` without justification

Document any boundary crossing with justification.

### 3. Read Existing Evidence

Check if the affected route has evidence records, component-discovery records, failure-diagnosis records, and existing e2e test coverage. If the area has no evidence records, flag as "undocumented area — extra caution needed."

### 4. Read Affected Components

Read the page component, sub-components, and mock data file. Note existing `data-testid` values — they must be preserved unless intentionally changed. If a component has >200 lines, consider splitting the change.

### 5. Produce Minimal Change Plan

Define exactly what to change:
- Files to create (with purpose)
- Files to modify (with specific changes)
- Files NOT to touch (with rationale)
- New `data-testid` values to add
- Existing `data-testid` values to preserve
- Mock data changes needed

The plan should be achievable in <50 lines of code changes. If larger, break into multiple changes.

### 6. Execute the Plan

Make the code changes: create new files, modify existing files (scoped edits only), update router and moduleConfig if adding routes/sidebar items. Preserve all existing `data-testid` values.

### 7. Run Verification

```bash
npm run lint    # 0 errors
npm run build   # clean
npm run test:e2e # existing tests still pass
```

If adding a new route, add a new e2e spec in `tests/e2e/`. If any existing test fails, the change introduced a regression — revert and investigate.

### 8. Update Evidence

Keep the evidence layer in sync:
- Route affected → update route-map entry
- New component added → add to component-map
- Mock data changed → update api-contract-map
- Bug fix → create failure-diagnosis record
- New e2e test → update e2e registry

### 9. Record in Decision Ledger

Track boundary-crossing changes in `docs/09-change-records/current/DECISIONS.md`. Bug fixes go to `docs/09-change-records/issues/`.

## Failure Handling

If blocked, use one of these failure codes:

- `BLOCKED_BY_MODULE_BOUNDARY` — change crosses module boundaries; needs human orchestration
- `BLOCKED_BY_UNDOCUMENTED_AREA` — affected area has no evidence records
- `BLOCKED_BY_ARCHITECTURE_VIOLATION` — change violates module boundary rules without valid justification
- `BLOCKED_BY_BUILD_FAILURE` — `npm run build` fails after change
- `BLOCKED_BY_TEST_REGRESSION` — existing e2e tests fail after change
- `BLOCKED_BY_EXCESSIVE_SCOPE` — change plan exceeds 50 lines; needs decomposition

For each blocker, include: what was attempted, what evidence exists, what is missing, and the next safe action.

## Context Budget Rules

- Start with route-map + component-map; only load state-flow-map or api-contract-map when needed
- Read only the affected component files, not the entire module
- Load minimum context path: change request → route-map entry → component-map entry → affected source → latest evidence record
- Do not preload all knowledge maps or all evidence records

## Output Format

```md
# Minimal Change Plan

## Change Classification
- Module, type, affected files

## Boundary Check
- Result (pass / violation with justification)

## Evidence Summary
- What's documented, what's not

## Changes
- Files to create / modify / leave alone
- data-testid changes
- Mock data changes

## Verification
- Lint / build / e2e results

## Evidence Updates
- Maps to update, records to create

## Decision Ledger Entry (if applicable)
```

## References

- `references/README.md` — validation examples, known limitations, cross-references
