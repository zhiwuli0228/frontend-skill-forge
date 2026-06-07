# State Flow Map

Status: Populated (V3.1)
Last Updated: 2026-06-07

## Purpose

Catalog every state source in the V2 surface. Use this to understand how data flows from inputs (URL, user interactions, scenario selector) to rendered output, and to find the right place to add new state-driven behavior.

## State Source Categories

The V2 surface uses **three state sources**, no global state manager, no React Context beyond the Ant Design `ConfigProvider`. They are:

1. **URL-derived state** — read via `useParams()` or `useLocation()`
2. **Component-local `useState`** — for scenario, modal visibility, form values, filters
3. **Derived `useMemo`** — for filtered/sorted/transformed data

There is no global store, no Redux, no Zustand. This is intentional per the architecture blueprint §19.

## Source 1: URL-Derived State

### 1a. Optional `:filter?` Path Param

Four pages read `useParams().filter` from React Router and use it as a baseline filter combined with their own state.

| Page | Param Effect | Source of Truth | Combined With |
| --- | --- | --- | --- |
| `TaskListPage` | Filters tasks by `status` (open / in-progress / completed / blocked / archived / all) | URL | User's local `statusFilter` (AND-combined) |
| `SkillListPage` | Sets the `effectiveCategory` (text / image / data / tool / all) | URL | User's local `userCategory` (overrides URL when set) |
| `WorkflowListPage` | Filters workflows by `status` (active / inactive / draft) | URL | (no local filter; toggle is separate) |
| `InsightOverviewPage` | Scales stat-card values and chart data by time-range multiplier (today=0.05, week=0.25, month=1, quarter=3, all=6) | URL | (only used) |

Testid: `sidebar-filter-indicator` renders on all 4 pages when the filter is non-default.

### 1b. `useLocation` in `SidebarNavigation`

The sidebar reads `useLocation().pathname` to compute the `selectedKeys` for the active item. `selectedKey` is the sidebar item whose `path` is a prefix of the current pathname.

```typescript
const selectedKey =
  menuItems.find((item) => item.path && pathname.startsWith(item.path))?.key ?? '';
```

This means the sidebar item stays highlighted as the user navigates between sub-routes that share the same prefix.

## Source 2: Component-Local `useState`

### 2a. Scenario Selector (all pages except Login)

Pattern: every page has a `<Select>` at the top with options `Loaded | Loading | Empty | Error`. State is `useState<Scenario>('loaded')`. The page conditionally renders one of four sub-trees based on `scenario`.

```typescript
type Scenario = 'loaded' | 'loading' | 'empty' | 'error';
const [scenario, setScenario] = useState<Scenario>('loaded');
```

| Scenario | Render |
| --- | --- |
| `loaded` | Real data from mock store, possibly filtered |
| `loading` | `<Skeleton>` placeholder |
| `empty` | `<Empty description="...">` |
| `error` | `<Alert type="error">` with retry link |

Consumers: 22 of 23 page components (all except `LoginPage`). The `DashboardPage` and `LoginPage` are the only exceptions.

Testids: `{page-name}-loading`, `{page-name}-error`, `{page-name}-retry-link`, `{page-name}-scenario-select`.

### 2b. Form Local State (multi-step and grouped forms)

| Form | Local State | Testid |
| --- | --- | --- |
| `TaskCreateForm` | `currentStep: 0..2` (3 steps) | `form-steps`, `step-basic-info`, `step-details`, `step-review`, `btn-prev`, `btn-next`, `btn-submit` |
| `TaskPreview` | Reads form values via prop | `task-preview` |
| `SkillConfigForm` | `parameters: { key, value }[]`, `permissions: string[]` | `skill-config-param-key-{i}`, `skill-config-param-value-{i}`, `skill-config-param-add`, `skill-config-permissions` |
| `SettingsParamsPage` | `formValues: Record<string, ParamValue>` seeded from mock data | `settings-params-form`, `settings-params-group-{group}` |

### 2c. Modal / Drawer Visibility

| Component | State | Testid |
| --- | --- | --- |
| `TaskDetailDrawer` | `selectedTask: TaskItem \| null` (parent: `TaskListPage`) | `task-detail-drawer` |
| `TemplatePreviewModal` | `previewTemplate: TemplateItem \| null` (parent: `TaskTemplatesPage`) | `template-preview-modal` |
| `SkillDetailModal` | `selectedSkill: SkillItem \| null` (parent: `SkillListPage`) | `skill-detail-modal` |
| `DashboardPage` DetailDrawer | `selectedItem` (parent: `DashboardPage`) | `detail-drawer` |
| `AddScheduleModal` (in `WorkflowSchedulePage`) | `modalOpen: boolean` | `workflow-schedule-modal` |
| `AddUserModal` (in `SettingsUsersPage`) | `modalOpen: boolean` | `settings-users-add-modal` |

### 2d. View Mode / Filter Toggles

| Component | State | Testid |
| --- | --- | --- |
| `SkillListPage` | `viewMode: 'grid' \| 'list'` | `skill-view-grid`, `skill-view-list` |
| `SkillListPage` | `search: string`, `category: string` (overridden by URL) | `skill-search`, `skill-category-filter` |
| `WorkflowListPage` | `statusToggle: Record<id, boolean>` (overrides status display) | `workflow-status-toggle-{id}` |
| `WorkflowSchedulePage` | `enabled: boolean` per row | `workflow-schedule-toggle-{id}` |
| `SkillConfigPage` | `viewMode: 'form' \| 'json'` | `skill-config-view-toggle` |
| `SettingsLogsPage` | `actionFilter: string`, `statusFilter: string` | `settings-logs-action-filter`, `settings-logs-status-filter` |
| `InsightAnalysisPage` | `metric: string`, `timeRange: string` (page-local, not URL) | `insight-analysis-metric-select`, `insight-analysis-time-select` |
| `WorkflowHistoryPage` | `statusFilter: string` | `workflow-history-status-filter` |

## Source 3: Derived `useMemo`

Used in every page that filters mock data. Standard pattern:

```typescript
const filteredData = useMemo(() => {
  let result = baseData;
  if (urlFilter && urlFilter !== 'all') result = result.filter(...);
  if (localFilter) result = result.filter(...);
  return result;
}, [baseData, urlFilter, localFilter, ...otherDeps]);
```

The full list of `useMemo` consumers can be found by grep — they exist in every list/table page.

## Cross-Module State Flows

There are no cross-module state flows in V2. Each page's state is fully local. The only "cross-module" state is:

- **URL pathname** — read by `SidebarNavigation` (in shell) and indirectly by the 4 URL-filter pages
- **Module config** — `moduleConfig.tsx` is the single source of truth for module metadata, read by `GlobalShell`, `ModuleLayout`, `SidebarNavigation`, and `TopTabNavigation`

## State Reset Behavior

State resets on every navigation (because each route mounts a fresh page). Only `useMemo` results survive across re-renders within the same page.

If a user navigates from `/task/list/in-progress` to `/skill/list/text` and back to `/task/list/open`, all in-page state (scenario, modal, filters) is reset. This is the React Router default and is the desired behavior.

## Debugging Tips

- To see what scenario a page is in: `document.querySelector('[data-testid$="-scenario-select"]')` → check the value
- To see the current sidebar filter: look for `data-testid="sidebar-filter-indicator"` in the DOM
- To see the URL params: open React Router DevTools or check `window.location.pathname`
- To see the form state: add `console.log(form.getFieldsValue())` in a `Form.useForm` handler

## Patterns Worth Knowing

1. **Derived over mirrored state** — do not `useEffect` to sync URL into state. Derive `effectiveX = urlParam ?? localState` and pass to children.
2. **Scenario selector as 4-state machine** — not a continuous slider. Each state is fully separate code path, not a partial overlay.
3. **No global store** — if you find yourself wanting to share state across pages, prefer URL params (deep-linkable) or pass through module config.

## Anti-Patterns to Avoid

1. **`useEffect(() => setState(prop))`** — anti-pattern. Use the prop directly or derive.
2. **Global Redux/Zustand for page-local state** — overkill; use `useState`.
3. **Storing form values in URL** — brittle; keep form values local until submit.
4. **Putting scenario in URL** — scenario is a demo/dev tool, not a user feature.
