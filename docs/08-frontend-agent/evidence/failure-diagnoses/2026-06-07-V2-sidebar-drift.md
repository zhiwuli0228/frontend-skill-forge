# Failure Diagnosis: V2.10 Sidebar Items All Pointed to Same URL

Status: Complete
Date Diagnosed: 2026-06-07 (retroactively documented during V3.4)

## Diagnosis Info

- **Diagnosis ID:** FD-2026-06-07-001
- **Date:** 2026-06-07
- **Route:** All 5 module sidebars (cross-module)
- **Severity:** high

## Failure Description

- **Symptom:** User clicks any sidebar item (e.g., "In Progress" in the task sidebar) and nothing visible changes. The URL does change but the user sees no different content.
- **Expected:** Each sidebar item should navigate to a unique URL that reflects the filter value.
- **Actual:** All sidebar items in 4 of 5 modules (task, skill, workflow, insight) pointed to the same base URL. `navigate()` was being called successfully, but the URL didn't change enough to be visually distinct.
- **Frequency:** always (reproducible 100% of the time)

## Evidence

| Evidence ID | Type | Description |
| --- | --- | --- |
| docs/09-change-records/process/RETRO-V2.6-V2.10.md | retrospective | "The sidebar was wrong from V2.5 but only caught at V2.10" |
| tests/e2e/sidebar-filter-navigation.spec.ts | e2e (post-fix) | 13 tests proving the fix works |
| 13 archive screenshots (mentioned in the e2e output) | screenshots | Confirmation of fix across 5 modules |

## Root Cause Analysis

### Hypotheses

| # | Hypothesis | Confidence | Evidence |
| --- | --- | --- | --- |
| 1 | Sidebar items have wrong `path` property pointing to the same URL | 0.95 | Inspection of `moduleConfig.tsx` showed all 4 task sidebar items had `path: '/task/list'` |
| 2 | React Router is broken | 0.0 | `navigate()` was being called; URL changed |
| 3 | Browser cache showed old UI | 0.0 | Issue reproducible in fresh browser |
| 4 | User error | 0.0 | Issue affected 100% of users, all 4 modules |

### Confirmed Cause

The `SidebarMenuItem` interface in `moduleConfig.tsx` had a `path` field, but the sidebar config was filled with all-same paths:

```typescript
sidebarMenu: [
  { key: 'all', label: 'All', path: '/task/list' },          // ← all the same
  { key: 'in-progress', label: 'In Progress', path: '/task/list' },
  { key: 'completed', label: 'Completed', path: '/task/list' },
  { key: 'archived', label: 'Archived', path: '/task/list' },
],
```

The `SidebarNavigation.handleClick` was correctly using `item.path`, but since all paths were identical, navigation had no visible effect.

## Classification

- **Type:** drift (selector/config drift, not a runtime bug)
- **Component:** `moduleConfig.tsx` (sidebar config) + `SidebarNavigation.tsx` (handler)
- **Layer:** frontend
- **Drift Class:** per `ui-drift-diagnosis.md` taxonomy: **selector drift** (the sidebar items were selectors for routes, and they drifted to non-distinct values)

## Impact

- **User Impact:** Sidebar appeared broken. Users could not use the sidebar to filter.
- **Test Impact:** 130+ e2e tests passed despite the bug. Tests verified "page loads" not "navigation works".
- **Business Impact:** Project demo looked broken. 1 post-release hotfix round required.

## Recommended Action

- [x] Fix moduleConfig.tsx: each sidebar item gets a unique path (e.g., `/task/list/open`, `/task/list/in-progress`)
- [x] Update router: `path: 'list'` → `path: 'list/:filter?'` for 4 modules
- [x] Update 4 pages to read `useParams().filter` and filter data
- [x] Update SidebarNavigation to highlight current item via pathname-derived `selectedKeys`
- [x] Add 13 new e2e tests in `sidebar-filter-navigation.spec.ts`
- [x] Add `data-testid="sidebar-filter-indicator"` to filtered pages for visual feedback

## Evolution Candidate

- **Candidate:** yes
- **Type:** rule + knowledge
- **Description:**
  - **Rule**: "Every sidebar item must have a unique `path` property; do not merge items to the same URL."
  - **Knowledge**: Add the "sidebar item config pattern" entry to the knowledge maps (already done in V3.1)
  - **Skill**: (V4 territory) "When reviewing sidebar config, check that each `path` is unique"

## Resolution

- **Resolved:** yes
- **Resolution Date:** 2026-06-07 (same day)
- **Resolution Method:** fix
- **Commits:** `eed3a5a feat: V2.6-V2.10 五模块页面实现 + 侧边栏过滤修复`

## Lessons Learned

1. **Test the behavior the user is testing.** "Page loads" tests don't catch navigation bugs. We needed at least one test per sidebar module that "click item X → URL changes → page reflects filter".

2. **Design mock data first.** The task sidebar had "Archived" but `TaskItem.status` didn't include 'archived'. Same for workflow sidebar (had `trigger/process/condition/output` but workflows don't have a `type` field). The "configuration" layer (moduleConfig) and the "data" layer (mock data) need to be designed together.

3. **Don't mirror URL into state via useEffect.** Use derived values. This is enforced by the lint rule but was a real anti-pattern in early implementations.

4. **The scenario selector pattern makes drift visible.** A page that "supports 4 scenarios" is testable in 4 distinct ways. If a future change breaks the empty state, the e2e test for the empty state fails.

## Cross-References

- This diagnosis is referenced from:
  - `docs/09-change-records/issues/2026-06-07-V2-hotfix-ledger.md` (V3.4 new) — formal issue ledger
  - `docs/08-frontend-agent/evolution/rule-evolution-queue.md` (V3.4 updated) — first rule candidate
  - `docs/08-frontend-agent/evolution/knowledge-evolution-queue.md` (V3.4 updated) — first knowledge candidate
  - `docs/08-frontend-agent/e2e-assets/registry.md` (V3.2) — links to the 13 sidebar tests as evidence
