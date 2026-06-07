# Route Snapshot: /task/list/all (Loaded)

Status: Complete
Evidence ID: RS-TL-001

## Metadata

- **Type:** route-snapshot (ui-state-snapshot)
- **Route:** /task/list/all
- **Scenario:** loaded
- **Timestamp:** 2026-06-07T14:32:00Z
- **Source:** agent (derived from e2e test artifacts + page source)
- **Confidence:** 0.95
- **Tags:** task, list, scenario-loaded, smoke

## Context

- **Exploration Session:** 2026-06-07-V3-task-list-exploration
- **Goal:** Capture the loaded state of the task list page
- **Trigger:** Initial route discovery

## Page State

- **URL:** `/task/list/all`
- **Title (browser tab):** "Task List"
- **Page heading (H2):** "Task List"
- **Load state:** loaded
- **Mock data source:** `tasks` (10 items) from `src/domains/task/data/mock-data.ts`

## Visible Components

| Component | Selector | Visible | Content |
| --- | --- | --- | --- |
| Scenario selector | `[data-testid="task-scenario-select"]` | yes | Currently "Loaded" |
| Filter bar | `[data-testid="task-filter-bar"]` | yes | status, priority, category selects |
| Table | `[data-testid="task-table"]` | yes | 10 rows |
| Table rows | `.ant-table-row` | yes | 10 rows |
| Sidebar | `[data-testid="sidebar-menu"]` | yes | 5 task sidebar items (All, Open, In Progress, Completed, Archived) |
| URL filter indicator | `[data-testid="sidebar-filter-indicator"]` | no | Hidden when filter='all' |
| Page heading | `getByRole('heading', { name: /task list/i })` | yes | "Task List" |

## Form State

| Field | Value |
| --- | --- |
| statusFilter | null (no user filter) |
| priorityFilter | null |
| categoryFilter | null |
| URL filter | 'all' |

## Modal/Drawer State

| Component | Open | Notes |
| --- | --- | --- |
| task-detail-drawer | no | hidden |

## Toast/Notification State

(none)

## Network State

(none — all data is in-memory mock)

## Console State

| Level | Message | Count |
| --- | --- | --- |
| warning | `[antd: Drawer] 'width' is deprecated. Please use 'size' instead.` | 0 (drawer is hidden) |
| warning | `[antd: Alert] 'message' is deprecated. Please use 'title' instead.` | 0 (no alert) |

## Artifacts

| Type | Path | Description |
| --- | --- | --- |
| e2e test | `tests/e2e/task-list-runtime.spec.ts` | "loaded page shows heading, filter bar, and table" |
| e2e test | `tests/e2e/sidebar-filter-navigation.spec.ts` | "clicking All shows all tasks with no filter indicator" |
| page source | `src/domains/task/pages/TaskListPage.tsx` | (full file, 138 lines) |
| mock data | `src/domains/task/data/mock-data.ts` | (full file, 109 lines) |

## Reproduction Steps

1. `npm run dev` (or rely on `npm run test:e2e` auto-start)
2. Navigate to `http://localhost:5173/task/list/all`
3. Wait for table to render
4. Verify: page heading "Task List" visible
5. Verify: table has 10 rows
6. Verify: filter bar has 3 selects (status, priority, category)
7. Verify: scenario selector shows "Loaded"
8. Verify: no URL filter indicator (filter is 'all')

## Validation

- [x] Metadata complete
- [x] Artifact exists (e2e test passes)
- [x] Reproduction steps documented
- [x] Confidence assessed (0.95 — high; backed by 2 e2e specs that pass on every run)

## Notes

- This is the canonical "happy path" state for the task list page.
- The 10 tasks include 2 archived (added in V2.6-V2.10 hotfix) which the archived sidebar filter surfaces.
- The filter bar's 3 selects are independent of the URL filter — they combine via AND logic.
