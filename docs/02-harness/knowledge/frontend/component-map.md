# Component Map

Status: Populated (V3.1) + MCP Verified (V6)
Last Updated: 2026-06-07

## Purpose

Catalog all page and sub-components in the V2 surface, with their data-testid roots, parent pages, and key interactions. Use this map to plan component changes and to find the right place to add new components.

## Conventions

- **Component Type**: `page` (top-level route component) or `sub` (composed inside a page).
- **data-testid Root**: The test id rendered at the component's outermost element. For pages this is typically `{module}-{page}-page`. For subs, it varies.
- **Props**: Critical props the component receives. For sub-components this is the props interface name.
- **Key Interactions**: The most important user-facing interactions (click, drag, type, switch).
- **Notes**: Anything an agent should know before modifying this component.

## Page Components

| # | Component | Path | Type | data-testid Root | Key Interactions | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `LoginPage` | `src/domains/auth/pages/LoginPage.tsx` | page | (none) | submit form | Outside GlobalShell |
| 2 | `DashboardPage` | `src/domains/dashboard/pages/DashboardPage.tsx` | page | (legacy) | (redirected to /task/list) | kept for backward compat |
| 3 | `TaskListPage` | `src/domains/task/pages/TaskListPage.tsx` | page | `task-list-page` | scenario select, row click (drawer), status/priority/category filter | scenario selector + URL `filter` param |
| 4 | `TaskCreatePage` | `src/domains/task/pages/TaskCreatePage.tsx` | page | `task-create-page` | multi-step form, scenario select | uses `TaskCreateForm` (3 steps) |
| 5 | `TaskTemplatesPage` | `src/domains/task/pages/TaskTemplatesPage.tsx` | page | `task-templates-page` | template search, category filter, preview modal, workflow handoff | uses `TemplateGrid` + `TemplateFilterBar` |
| 6 | `TaskBoardPage` | `src/domains/task/pages/TaskBoardPage.tsx` | page | `task-board-page` | drag-and-drop task cards between columns | uses `BoardContainer` |
| 7 | `SkillListPage` | `src/domains/skill/pages/SkillListPage.tsx` | page | `skill-list-page` | search, category filter, view toggle (grid/list), card click (modal) | URL `filter` overrides user filter |
| 8 | `SkillMarketPage` | `src/domains/skill/pages/SkillMarketPage.tsx` | page | `skill-market-page` | install/uninstall toggle on cards | featured + recommended sections |
| 9 | `SkillConfigPage` | `src/domains/skill/pages/SkillConfigPage.tsx` | page | `skill-config-page` | skill select, view mode toggle, save/reset | uses `SkillConfigForm` |
| 10 | `SkillVersionsPage` | `src/domains/skill/pages/SkillVersionsPage.tsx` | page | `skill-versions-page` | rollback per version | uses `SkillVersionTable` |
| 11 | `WorkflowListPage` | `src/domains/workflow/pages/WorkflowListPage.tsx` | page | `workflow-list-page` | status toggle, edit link | URL `filter` + manual toggle |
| 12 | `WorkflowEditorPage` | `src/domains/workflow/pages/WorkflowEditorPage.tsx` | page | `workflow-editor-page` | node palette, save/run, template context banner | canvas + SVG connections |
| 13 | `WorkflowHistoryPage` | `src/domains/workflow/pages/WorkflowHistoryPage.tsx` | page | `workflow-history-page` | status filter | log table |
| 14 | `WorkflowSchedulePage` | `src/domains/workflow/pages/WorkflowSchedulePage.tsx` | page | `workflow-schedule-page` | toggle enabled, add schedule modal | uses `AddScheduleModal` |
| 15 | `InsightOverviewPage` | `src/domains/insight/pages/InsightOverviewPage.tsx` | page | `insight-overview-page` | URL `filter` scales stat/chart data | CSS bar chart, no external lib |
| 16 | `InsightReportsPage` | `src/domains/insight/pages/InsightReportsPage.tsx` | page | `insight-reports-page` | generate report button | simple table |
| 17 | `InsightAnalysisPage` | `src/domains/insight/pages/InsightAnalysisPage.tsx` | page | `insight-analysis-page` | metric select, time range select | metric swap re-renders chart |
| 18 | `InsightExportPage` | `src/domains/insight/pages/InsightExportPage.tsx` | page | `insight-export-page` | format select, datatype select, date pickers, export button | config + history |
| 19 | `SettingsUsersPage` | `src/domains/settings/pages/SettingsUsersPage.tsx` | page | `settings-users-page` | add user modal, status toggle | Form + Table |
| 20 | `SettingsPermissionsPage` | `src/domains/settings/pages/SettingsPermissionsPage.tsx` | page | `settings-permissions-page` | tree check, matrix view, save/reset | Ant Design Tree |
| 21 | `SettingsParamsPage` | `src/domains/settings/pages/SettingsParamsPage.tsx` | page | `settings-params-page` | form field edits, save/reset | 3 grouped cards (General/Notification/Security) |
| 22 | `SettingsLogsPage` | `src/domains/settings/pages/SettingsLogsPage.tsx` | page | `settings-logs-page` | action/status filter, export | filterable table |

## Sub-Components (Domain-Specific)

| # | Component | Path | Parent Page | Props Interface | data-testid Root | Key Interactions |
| --- | --- | --- | --- | --- | --- | --- |
| S1 | `TaskFilterBar` | `src/domains/task/components/TaskFilterBar.tsx` | TaskListPage | `TaskFilterBarProps` | `task-filter-bar` | status / priority / category selects |
| S2 | `TaskTable` | `src/domains/task/components/TaskTable.tsx` | TaskListPage | `TaskTableProps` | `task-table` | row click → drawer |

## MCP Verification (V6)

The following components were verified with real Playwright MCP browser tools on 2026-06-07:

| Component | Route | MCP Finding |
|-----------|-------|-------------|
| `TaskListPage` | `/task/list` | Scenario selector has 4 states (Loaded/Loading/Empty/Error). Empty shows AntD Empty with "No tasks match the current filter". Drawer uses `dialog` role (480px width). |
| `TaskTable` | `/task/list` | 5 columns with sort indicators (Title, Priority, Created). Checkbox column for batch select. Status filter button in column header. |
| `TaskDetailDrawer` | `/task/list` | Opens on row click. Shows detail table: Status, Priority, Assignee, Category, Created, Updated, Description. Close button top-right. |
| `SkillListPage` | `/skill/list` | 20 skills in 4-column grid. Search input, category filter, tags filter, sort selector, grid/list toggle. |
| `SkillDetailModal` | `/skill/list` | Opens on card click. Shows: Description, Category, Version, Status, Author, Downloads, Tags. |
| `WorkflowEditorPage` | `/workflow/editor` | Node Palette (4 types) + Canvas (6 nodes). Node Properties dialog: Node ID, Type, Label, X/Y Position, Delete button. |
| `WorkflowNode` | `/workflow/editor` | 6 nodes: Webhook Trigger, Validate Payload, Is Valid?, Transform Data, Send to Queue, Log Error. Click opens properties dialog. |
| S3 | `TaskDetailDrawer` | `src/domains/task/components/TaskDetailDrawer.tsx` | TaskListPage | `TaskDetailDrawerProps` | `task-detail-drawer` | open/close, edit |
| S4 | `TaskCreateForm` | `src/domains/task/components/TaskCreateForm.tsx` | TaskCreatePage | `TaskCreateFormProps` | `task-create-form` | 3 steps (basic → details → review) |
| S5 | `TaskPreview` | `src/domains/task/components/TaskPreview.tsx` | TaskCreatePage | `TaskPreviewProps` | `task-preview` | live preview of form values |
| S6 | `TemplateFilterBar` | `src/domains/task/components/TemplateFilterBar.tsx` | TaskTemplatesPage | `TemplateFilterBarProps` | `template-filter-bar` | search + category |
| S7 | `TemplateGrid` | `src/domains/task/components/TemplateGrid.tsx` | TaskTemplatesPage | `TemplateGridProps` | `template-grid` | renders `TemplateCard[]` |
| S8 | `TemplateCard` | `src/domains/task/components/TemplateCard.tsx` | TemplateGrid | `TemplateCardProps` | `template-card-{id}` | click → preview modal |
| S9 | `TemplatePreviewModal` | `src/domains/task/components/TemplatePreviewModal.tsx` | TaskTemplatesPage | `TemplatePreviewModalProps` | `template-preview-modal` | open/close, open workflow editor |
| S10 | `BoardContainer` | `src/domains/task/components/BoardContainer.tsx` | TaskBoardPage | `BoardContainerProps` | `board-container` | drag-drop container |
| S11 | `BoardColumn` | `src/domains/task/components/BoardColumn.tsx` | BoardContainer | `BoardColumnProps` | `board-column-{status}` | drop target |
| S12 | `BoardTaskCard` | `src/domains/task/components/BoardTaskCard.tsx` | BoardColumn | `BoardTaskCardProps` | `board-task-card-{id}` | drag source |
| S13 | `SkillFilterBar` | `src/domains/skill/components/SkillFilterBar.tsx` | SkillListPage | `SkillFilterBarProps` | `skill-filter-bar` | search + category + view toggle (Space.Compact, V7 migrated) |
| S14 | `SkillGrid` | `src/domains/skill/components/SkillGrid.tsx` | SkillListPage, SkillMarketPage | `SkillGridProps` | `skill-grid` | renders `SkillCard[]` |
| S15 | `SkillList` | `src/domains/skill/components/SkillList.tsx` | SkillListPage | `SkillListProps` | `skill-list-view` | list view of skills |
| S16 | `SkillCard` | `src/domains/skill/components/SkillCard.tsx` | SkillGrid, SkillList | `SkillCardProps` | `skill-card-{id}` | click → modal |
| S17 | `SkillDetailModal` | `src/domains/skill/components/SkillDetailModal.tsx` | SkillListPage | `SkillDetailModalProps` | `skill-detail-modal` | open/close |
| S18 | `SkillConfigForm` | `src/domains/skill/components/SkillConfigForm.tsx` | SkillConfigPage | `SkillConfigFormProps` | `skill-config-form` | edit connection, parameters, permissions |
| S19 | `SkillVersionTable` | `src/domains/skill/components/SkillVersionTable.tsx` | SkillVersionsPage | `SkillVersionTableProps` | `skill-version-table` | rollback per row |
| S20 | `MetricBand` | `src/domains/dashboard/components/MetricBand.tsx` | DashboardPage | `MetricBandProps` | `metric-band` | stat card row |
| S21 | `AlertQueue` | `src/domains/dashboard/components/AlertQueue.tsx` | DashboardPage | `AlertQueueProps` | `alert-queue` | alerts list |
| S22 | `ActivityFeed` | `src/domains/dashboard/components/ActivityFeed.tsx` | DashboardPage | `ActivityFeedProps` | `activity-feed` | activity stream |
| S23 | `DetailDrawer` | `src/domains/dashboard/components/DetailDrawer.tsx` | DashboardPage | `DetailDrawerProps` | `detail-drawer` | item detail |

## Shell Components

| # | Component | Path | data-testid Root | Purpose |
| --- | --- | --- | --- | --- |
| SH1 | `GlobalShell` | `src/shell/layout/GlobalShell.tsx` | `global-shell` | top frame: header, module switcher, outlet |
| SH2 | `ModuleLayout` | `src/shell/layout/ModuleLayout.tsx` | `module-layout` | per-module frame: tabs, sider, content, breadcrumb |
| SH3 | `ModuleSwitcher` | `src/shell/navigation/ModuleSwitcher.tsx` | `module-card-{key}` (cards inside drawer) | drawer of 5 module cards |
| SH4 | `TopTabNavigation` | `src/shell/navigation/TopTabNavigation.tsx` | `tab-{key}`, `module-tabs` | per-module tab bar |
| SH5 | `SidebarNavigation` | `src/shell/navigation/SidebarNavigation.tsx` | `sidebar-menu` | per-module sidebar; selectedKeys derived from URL |
| SH6 | `PlaceholderPage` | `src/shared/ui/PlaceholderPage.tsx` | (none) | fallback for unimplemented pages (no longer used in V2) |

## Shared / Reusable

| # | Component | Path | Notes |
| --- | --- | --- | --- |
| SH7 | `LoginPage` | `src/domains/auth/pages/LoginPage.tsx` | only auth surface, no shared components |
| SH8 | (Ant Design primitives) | `node_modules/antd` | Table, Form, Card, Modal, Drawer, Tree, Select, etc. — see state-flow-map.md for the patterns in use |

## Composition Diagram (high level)

```text
App
└── GlobalShell  (SH1)
    ├── ModuleSwitcher (header button) (SH3)
    └── ModuleLayout  (SH2)
        ├── TopTabNavigation (SH4)
        ├── SidebarNavigation (SH5) ← reads moduleConfig.sidebarMenu
        └── Outlet → Page Component (1-22)
            └── Sub-Components (S1-S23) as needed
```

## Pattern: Scenario Selector

Every page (except LoginPage and DashboardPage) renders a top-of-page `<Select>` with options Loaded / Loading / Empty / Error. Switching the select sets a `scenario` state that controls which sub-render is shown:

- Loaded → real data from mock store
- Loading → `<Skeleton>` placeholder
- Empty → `<Empty>` component with description
- Error → `<Alert type="error">` with retry link

The testids follow the convention `{page-name}-{scenario}` (loading, error, retry-link, scenario-select). See `state-flow-map.md` for the full state-source catalog.

## Pattern: Sidebar-Filter Indicator

The 4 pages that read `useParams().filter` (TaskListPage, SkillListPage, WorkflowListPage, InsightOverviewPage) render a `data-testid="sidebar-filter-indicator"` element when the filter is set to something other than `all`. This gives the user visible feedback that they are looking at a filtered view.

## Migration Notes (V7)

### AntD Button.Group → Space.Compact (V7.2)

Component `SkillFilterBar` (S13) migrated from `Button.Group` to `Space.Compact`. Testid changes:

| Old testid | New testid | Element |
| --- | --- | --- |
| `skill-view-toggle` | `skill-view-mode` | View mode toggle wrapper |
| `skill-view-grid` | `skill-grid-btn` | Grid view button |
| `skill-view-list` | `skill-list-btn` | List view button |

Source: V7 drift diagnosis (phase-7-drift-diagnosis.md), KE-005.
