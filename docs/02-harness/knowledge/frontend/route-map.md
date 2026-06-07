# Route Map

Status: Populated (V3.1) + MCP Verified (V6)
Last Updated: 2026-06-07

## Purpose

Single source of truth for all runtime routes in the frontend-skill-forge project. Any agent reading this file should be able to navigate to any route without re-discovering the structure.

## Conventions

- **URL Pattern**: The exact path as defined in `src/app/router.tsx`. `:filter?` denotes an optional path param.
- **Module**: One of `auth | task | skill | workflow | insight | settings`. The ModuleLayout wraps the page in module-specific tabs + sidebar.
- **Sub-Features**: Inline `data-testid` test ids that anchor the page's main content regions.
- **E2E Spec**: The Playwright spec file(s) covering this route, relative to `tests/e2e/`.
- **Sidebar Path**: The sidebar item `path` from `src/shell/config/moduleConfig.tsx` that, when clicked, lands on this route (empty if the route has no sidebar item or is a sub-route of one).

## Route Table

| # | Path | Module | Page Component | Sub-Features (key testids) | E2E Spec | Sidebar Path |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `/login` | auth | `LoginPage` | (form-based, no testid required) | _none_ | (outside GlobalShell) |
| 2 | `/` | (root) | redirect → `/task/list/all` | (n/a) | `global-shell-navigation.spec.ts` | (n/a) |
| 3 | `/dashboard` | (root) | redirect → `/task/list/all` | (n/a) | (covered by smoke) | (n/a) |
| 4 | `/task/list/:filter?` | task | `TaskListPage` | `task-table`, `task-filter-bar`, `task-detail-drawer`, `task-scenario-select` | `task-list-runtime.spec.ts`, `sidebar-filter-navigation.spec.ts`, `full-functional-verification.spec.ts` | `/task/list/all` (and 4 siblings) |
| 5 | `/task/create` | task | `TaskCreatePage` | `task-create-form`, `task-create-scenario-select` | `task-create-runtime.spec.ts`, `full-functional-verification.spec.ts` | (no sidebar item) |
| 6 | `/task/templates` | task | `TaskTemplatesPage` | `template-grid`, `template-filter-bar`, `template-preview-modal`, `template-open-workflow` | `task-templates-runtime.spec.ts`, `full-functional-verification.spec.ts` | (no sidebar item) |
| 7 | `/task/board` | task | `TaskBoardPage` | `board-container`, `board-column-{status}`, `board-task-card-{id}` | `task-board-runtime.spec.ts`, `full-functional-verification.spec.ts` | (no sidebar item) |
| 8 | `/skill/list/:filter?` | skill | `SkillListPage` | `skill-grid`, `skill-list-view`, `skill-detail-modal`, `skill-filter-bar`, `skill-scenario-select` | `skill-list-runtime.spec.ts`, `sidebar-filter-navigation.spec.ts`, `full-functional-verification.spec.ts` | `/skill/list/all` (and 4 siblings) |
| 9 | `/skill/market` | skill | `SkillMarketPage` | `skill-market-featured`, `skill-market-recommended`, `skill-card-{id}`, `skill-install-{id}` | `skill-market-runtime.spec.ts`, `full-functional-verification.spec.ts` | (no sidebar item) |
| 10 | `/skill/config` | skill | `SkillConfigPage` | `skill-config-form`, `skill-config-skill-select`, `skill-config-save`, `skill-config-reset` | `skill-config-runtime.spec.ts`, `full-functional-verification.spec.ts` | (no sidebar item) |
| 11 | `/skill/versions` | skill | `SkillVersionsPage` | `skill-version-table`, `skill-rollback-btn-{version}` | `skill-versions-runtime.spec.ts`, `full-functional-verification.spec.ts` | (no sidebar item) |
| 12 | `/workflow/list/:filter?` | workflow | `WorkflowListPage` | `workflow-table`, `workflow-status-toggle-{id}`, `workflow-edit-{id}` | `workflow-list-runtime.spec.ts`, `sidebar-filter-navigation.spec.ts`, `full-functional-verification.spec.ts` | `/workflow/list/all` (and 3 siblings) |
| 13 | `/workflow/editor` | workflow | `WorkflowEditorPage` | `workflow-editor-canvas`, `workflow-node-palette`, `workflow-node-{id}`, `workflow-editor-save`, `workflow-editor-run`, `workflow-template-context` | `workflow-editor-runtime.spec.ts`, `full-functional-verification.spec.ts` | (no sidebar item) |

## MCP Verification (V6)

The following routes were verified with real Playwright MCP browser tools on 2026-06-07:

| Route | MCP Session | Status | Key Findings |
|-------|-------------|--------|--------------|
| `/task/list` | `2026-06-07-V6-task-list-exploration` | ✅ Verified | 4 scenario states confirmed, row-click drawer works, pagination (10 tasks, 2 pages, 5/page), 1 console warning |
| `/skill/list` | `2026-06-07-V6-skill-list-exploration` | ✅ Verified | 20 skill cards, grid/list toggle, search/filter/sort, skill detail modal, 2 console warnings |
| `/workflow/editor` | `2026-06-07-V6-workflow-editor-exploration` | ✅ Verified | 6 nodes in graph, node palette (4 types), node properties dialog, save/run buttons |

Selector stability: 18 High (64%), 8 Medium (29%), 2 Low (7%). See `evidence/selector-stability-v6.md`.
| 14 | `/workflow/history` | workflow | `WorkflowHistoryPage` | `workflow-history-table`, `workflow-history-status-filter` | `workflow-history-runtime.spec.ts`, `full-functional-verification.spec.ts` | (no sidebar item) |
| 15 | `/workflow/schedule` | workflow | `WorkflowSchedulePage` | `workflow-schedule-table`, `workflow-schedule-toggle-{id}`, `workflow-add-schedule` | `workflow-schedule-runtime.spec.ts`, `full-functional-verification.spec.ts` | (no sidebar item) |
| 16 | `/insight/overview/:filter?` | insight | `InsightOverviewPage` | `insight-stat-cards`, `insight-chart`, `insight-overview-scenario-select` | `insight-overview-runtime.spec.ts`, `sidebar-filter-navigation.spec.ts`, `full-functional-verification.spec.ts` | `/insight/overview/all` (and 4 siblings) |
| 17 | `/insight/reports` | insight | `InsightReportsPage` | `insight-reports-table`, `insight-reports-scenario-select` | `insight-reports-runtime.spec.ts`, `full-functional-verification.spec.ts` | (no sidebar item) |
| 18 | `/insight/analysis` | insight | `InsightAnalysisPage` | `insight-analysis-filter`, `insight-analysis-chart`, `insight-analysis-metric-select`, `insight-analysis-data-table` | `insight-analysis-runtime.spec.ts`, `full-functional-verification.spec.ts` | (no sidebar item) |
| 19 | `/insight/export` | insight | `InsightExportPage` | `insight-export-form`, `insight-export-format-select`, `insight-export-button`, `insight-export-table` | `insight-export-runtime.spec.ts`, `full-functional-verification.spec.ts` | (no sidebar item) |
| 20 | `/settings/users` | settings | `SettingsUsersPage` | `settings-users-table`, `settings-users-add-button`, `settings-users-add-modal` | `settings-users-runtime.spec.ts`, `sidebar-filter-navigation.spec.ts`, `full-functional-verification.spec.ts` | `/settings/users` |
| 21 | `/settings/permissions` | settings | `SettingsPermissionsPage` | `settings-permissions-tree`, `settings-permissions-matrix`, `settings-permissions-save-button` | `settings-permissions-runtime.spec.ts`, `sidebar-filter-navigation.spec.ts`, `full-functional-verification.spec.ts` | `/settings/permissions` |
| 22 | `/settings/params` | settings | `SettingsParamsPage` | `settings-params-form`, `settings-params-group-{General\|Notification\|Security}`, `settings-params-save-button` | `settings-params-runtime.spec.ts`, `sidebar-filter-navigation.spec.ts`, `full-functional-verification.spec.ts` | `/settings/params` |
| 23 | `/settings/logs` | settings | `SettingsLogsPage` | `settings-logs-action-filter`, `settings-logs-status-filter`, `settings-logs-export-button`, `settings-logs-table` | `settings-logs-runtime.spec.ts`, `sidebar-filter-navigation.spec.ts`, `full-functional-verification.spec.ts` | `/settings/logs` |

## Route-to-Sidebar Mapping

| Module | Sidebar Items | Routes Reachable |
| --- | --- | --- |
| task | 5 (all, open, in-progress, completed, archived) | 1 (all variants of `/task/list/:filter?`) |
| skill | 5 (all, text, image, data, tool) | 1 (all variants of `/skill/list/:filter?`) |
| workflow | 4 (all, active, inactive, draft) | 1 (all variants of `/workflow/list/:filter?`) |
| insight | 5 (all, today, week, month, quarter) | 1 (all variants of `/insight/overview/:filter?`) |
| settings | 4 (users, security, params, audit logs) | 4 (each sub-page has a unique sidebar path) |

## Pattern: Optional `:filter?` Param

Four modules (task, skill, workflow, insight) use a single list/overview page with an optional `:filter?` path param. The page reads the param via `useParams()` and combines it with the page's internal filter state:

- task: `filter` controls `TaskItem.status` (open / in-progress / completed / blocked / archived)
- skill: `filter` controls `SkillItem.category` (text / image / data / tool)
- workflow: `filter` controls `WorkflowItem.status` (active / inactive / draft)
- insight: `filter` controls a time-range multiplier applied to stat-card values and chart data (today=0.05, week=0.25, month=1, quarter=3, all=6)

The `all` filter is the default and the explicit reset state. Each filter is documented in the module's sidebar config (`src/shell/config/moduleConfig.tsx`).

## Notes

- Login is intentionally outside the GlobalShell and has no sidebar.
- The Dashboard route (`/dashboard`) is a legacy redirect kept for backward compatibility; it points to `/task/list/all`.
- `*` wildcards or 404 handling are not currently defined; unknown routes will be caught by React Router's default.
