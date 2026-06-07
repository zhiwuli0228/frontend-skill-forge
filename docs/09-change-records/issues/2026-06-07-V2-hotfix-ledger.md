# V2 Hotfix Issue Ledger

Status: Recorded
Date: 2026-06-07
Type: post-release hotfix

## Issue Summary

| Field | Value |
| --- | --- |
| **Issue ID** | V2-HOTFIX-001 |
| **Discovered Date** | 2026-06-07 |
| **Resolved Date** | 2026-06-07 |
| **Reporter** | user (during V2.10 acceptance) |
| **Resolver** | agent (claude-code) |
| **Affected Versions** | V2.5 through V2.10 |
| **Severity** | high (core navigation feature broken) |

## Symptom

User reported: "为什么每个页面左侧变栏的item点击以后没有任何效果" ("Why does clicking sidebar items on every page have no effect?").

## Root Cause

In `src/shell/config/moduleConfig.tsx`, the sidebar items for 4 of 5 modules (task, skill, workflow, insight) all pointed to the same URL. `navigate()` was being called by `SidebarNavigation.handleClick`, but since all paths were identical, the visible page didn't change.

```typescript
// BUGGY: all 4 task sidebar items had path: '/task/list'
sidebarMenu: [
  { key: 'all', label: 'All', path: '/task/list' },
  { key: 'in-progress', label: 'In Progress', path: '/task/list' },
  // ...
],
```

The settings module was unaffected because its items used `key` as the path (which happened to match the routes).

## Fix

Five changes:

1. **Router** (`src/app/router.tsx`) — `path: 'list'` → `path: 'list/:filter?'` (4 modules)
2. **Module config** (`src/shell/config/moduleConfig.tsx`) — unique paths per item; workflow sidebar changed from node types to status filters
3. **SidebarNavigation** (`src/shell/navigation/SidebarNavigation.tsx`) — `selectedKeys` derived from current pathname (was hard-coded `[]`)
4. **4 pages** — read `useParams().filter`, filter mock data, show `sidebar-filter-indicator`
5. **Mock data** — added 'archived' status to `TaskItem` + 2 archived tasks

## Verification

- 13 new e2e tests in `tests/e2e/sidebar-filter-navigation.spec.ts`
- All 181 e2e tests pass (post-fix)
- `npm run lint` and `npm run build` clean

## Commits

- `eed3a5a feat: V2.6-V2.10 五模块页面实现 + 侧边栏过滤修复` (included the fix)

## Classification

- **Type:** post-release hotfix
- **Component:** `moduleConfig.tsx` + `SidebarNavigation.tsx` + 4 pages
- **Layer:** frontend
- **Drift class:** selector drift (per `docs/08-frontend-agent/ui-drift-diagnosis.md` taxonomy)

## Why Tests Did Not Catch It

The 130+ existing e2e tests verified "page loads" but did not verify "sidebar click changes URL." The 13 new tests in `sidebar-filter-navigation.spec.ts` add the missing assertion pattern.

This is captured as **Rule RE-004** in `rule-evolution-queue.md`: "E2E tests must assert on URL change when navigation is the goal."

## Lessons

1. Test the behavior the user is testing (page-load tests don't catch navigation bugs)
2. Configuration and data layers need to be designed together (the "archived" status was missing from the data when the sidebar was added)
3. The scenario selector pattern makes drift visible — if a future change breaks the empty state, the empty-state test fails

## Cross-References

- **Failure diagnosis:** `docs/08-frontend-agent/evidence/failure-diagnoses/2026-06-07-V2-sidebar-drift.md`
- **Knowledge candidates:** `docs/08-frontend-agent/evolution/knowledge-evolution-queue.md` (KE-001 through KE-004)
- **Rule candidates:** `docs/08-frontend-agent/evolution/rule-evolution-queue.md` (RE-001 through RE-005)
- **V2 retrospective:** `docs/09-change-records/process/RETRO-V2.6-V2.10.md` (§"What Didn't Go Well" → "The sidebar was wrong from V2.5 but only caught at V2.10")

## Status

✅ Resolved. All 5 modules' sidebars now work correctly. 13 new regression-grade tests prevent recurrence.
