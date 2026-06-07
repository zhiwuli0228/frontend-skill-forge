# Phase 7 Drift Diagnosis Report

Date: 2026-06-07
Version: V7.1

## Failure Summary

| Item | Value |
| --- | --- |
| Failing test | `skill-list-runtime.spec.ts:14` — "view toggle switches between grid and list" |
| Failure type | Selector drift (UI migration) |
| Root cause | AntD migration: `Button.Group` → `Space.Compact` with concurrent testid rename |
| Confidence | High (reproducible, linked to specific commit) |
| Affected component | `src/domains/skill/components/SkillFilterBar.tsx` |

## Failure Details

### Test Error

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByTestId('skill-view-list')

at skill-list-runtime.spec.ts:19:47
```

### Root Cause Analysis

The controlled drift introduced two simultaneous changes:

1. **AntD API migration**: `Button.Group` → `Space.Compact`
   - `Button.Group` renders `<div class="ant-btn-group">`
   - `Space.Compact` renders `<div class="ant-space-compact">`
   - Structural DOM change but functional behavior preserved

2. **Selector rename**: Testids renamed during migration
   - `skill-view-toggle` → `skill-view-mode` (group wrapper)
   - `skill-view-grid` → `skill-grid-btn` (grid button)
   - `skill-view-list` → `skill-list-btn` (list button)

### Impact Assessment

| Metric | Value |
| --- | --- |
| Tests failing | 1 of 8 in skill-list-runtime |
| Tests passing | 7 of 8 (no regressions) |
| Other modules affected | None |
| Build status | Pass |
| Lint status | Pass |

## Diagnosis Classification

| Dimension | Classification |
| --- | --- |
| Failure category | Selector drift |
| Drift source | Library migration (AntD 6 deprecation fix) |
| Reproducibility | 100% (deterministic) |
| Scope | Single component, single test |
| Evolution type | Knowledge update + Rule candidate |

## Evolution Candidates

### Knowledge Candidate: KE-005

**Title**: AntD Button.Group → Space.Compact migration changes DOM structure

**Trigger**: Component structure change (Knowledge Evolution Trigger #1 from blueprint)

**Problem**: After AntD migration from `Button.Group` to `Space.Compact`, the wrapper element's class and testid changed. The component-map and any knowledge referencing `Button.Group` patterns need updating.

**Patch**:
- Update component-map.md to reflect `Space.Compact` usage in SkillFilterBar
- Document the testid changes: `skill-view-toggle` → `skill-view-mode`, `skill-view-grid` → `skill-grid-btn`, `skill-view-list` → `skill-list-btn`

### Rule Candidate: RE-006

**Title**: Library migration PRs must update all referencing e2e test selectors

**Trigger**: Verification gap (Rule Evolution Trigger #4 from blueprint)

**Problem**: The AntD migration changed testids without updating the referencing e2e test. This is a verification gap — the migration PR should have included test updates.

**Patch**: Add rule: "When migrating a library API that changes DOM structure or testids, the PR must update all e2e tests that reference affected selectors."

### Skill Candidate: SE-001

**Title**: frontend-e2e-explorer should detect selector drift during migration

**Trigger**: Agent misses important evidence (Skill Evolution Trigger #2 from blueprint)

**Problem**: The `frontend-e2e-explorer` skill procedure does not include a step to verify testid stability after library migrations. Adding a "post-migration selector audit" step would catch this class of drift.

**Patch**: Add step 10 to frontend-e2e-explorer: "After any library migration, grep for changed testids in e2e tests and verify all references are updated."

## Verification Status

- [x] Failure reproduced
- [x] Root cause identified
- [x] Evolution candidates produced
- [ ] Minimal patch applied (next step)
- [ ] Re-verification passed (next step)
