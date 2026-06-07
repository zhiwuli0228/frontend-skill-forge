# API Contract Map

Status: Populated (V3.1)
Last Updated: 2026-06-07

## Purpose

The "API contract" for this project is the **mock data layer**, since there are no real backend services. Every type exported from a `*-mock-data.ts` file defines the contract between the page and the data source. This map catalogs all such contracts.

## Conventions

- **File Path**: Path under `src/domains/<module>/data/`.
- **Purpose**: One-line description of what data this contract provides.
- **Exported Interfaces**: All TypeScript types/interfaces exported.
- **Record Counts**: Number of items in each exported array (excluding `empty*` arrays).
- **Consumers**: Pages that import this data.

## Mock Data Files

| # | File | Purpose | Exported Interfaces | Record Counts | Consumers |
| --- | --- | --- | --- | --- | --- |
| 1 | `src/domains/task/data/mock-data.ts` | Task list and create data | `TaskItem` | `tasks`: 10 (8 active + 2 archived) | `TaskListPage`, `TaskCreatePage`, `TaskDetailDrawer` |
| 2 | `src/domains/task/data/template-mock-data.ts` | Task templates for the templates page | `TemplateItem`, `TemplateCategory` | `templates`: 12 | `TaskTemplatesPage`, `TemplateGrid`, `TemplateCard` |
| 3 | `src/domains/dashboard/data/mock-data.ts` | Dashboard metrics, alerts, activity | `MetricItem`, `AlertItem`, `ActivityItem` | (dashboard legacy, kept for compat) | `DashboardPage`, `MetricBand`, `AlertQueue`, `ActivityFeed` |
| 4 | `src/domains/skill/data/skill-mock-data.ts` | Skill library data | `SkillItem`, `SkillVersion`, `SkillConfig`, `skillCategories` | `skills`: 20, `mockVersions`: 5, `mockConfig`: 1 | `SkillListPage`, `SkillMarketPage`, `SkillConfigPage`, `SkillVersionsPage` |
| 5 | `src/domains/workflow/data/workflow-mock-data.ts` | Workflow list, history, schedule, editor | `WorkflowItem`, `ExecutionLog`, `ScheduleItem`, `EditorNode`, `EditorEdge` | `workflows`: 10, `executionLogs`: 15, `schedules`: 5, `editorNodes`: 6, `editorEdges`: 5 | `WorkflowListPage`, `WorkflowEditorPage`, `WorkflowHistoryPage`, `WorkflowSchedulePage` |
| 6 | `src/domains/insight/data/insight-mock-data.ts` | Insight dashboard data | `StatCard`, `ChartDataPoint`, `ReportItem`, `ExportItem` | `statCards`: 4, `taskTrendData`: 6, `skillUsageData`: 4, `reports`: 8, `exports`: 5 | `InsightOverviewPage`, `InsightReportsPage`, `InsightAnalysisPage`, `InsightExportPage` |
| 7 | `src/domains/settings/data/settings-mock-data.ts` | System settings data | `UserItem`, `PermissionNode`, `SystemParam`, `LogEntry` | `users`: 8, `permissionTree`: 4 roots, `systemParams`: 12, `logs`: 10 | `SettingsUsersPage`, `SettingsPermissionsPage`, `SettingsParamsPage`, `SettingsLogsPage` |

**Total mock records across all files: ~135**

## Type Definitions by File

### 1. `task/data/mock-data.ts`

```typescript
export interface TaskItem {
  id: string;
  title: string;
  status: 'open' | 'in-progress' | 'completed' | 'blocked' | 'archived';
  priority: 'critical' | 'high' | 'medium' | 'low';
  assignee: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  description: string;
}

export const tasks: TaskItem[] = [/* 10 items */];
export const emptyTasks: TaskItem[] = [];
export const taskStatuses = ['open', 'in-progress', 'completed', 'blocked', 'archived'] as const;
export const taskPriorities = ['critical', 'high', 'medium', 'low'] as const;
export const taskCategories = ['infrastructure', 'security', 'bugfix', 'observability', 'performance'] as const;
```

### 2. `task/data/template-mock-data.ts`

```typescript
export interface TemplateItem {
  id: string;
  name: string;
  description: string;
  category: 'bugfix' | 'feature' | 'ops' | 'review';
  icon: string; // Ant Design icon name
  fields: string[];
  estimatedTime: string;
}

export type TemplateCategory = TemplateItem['category'];
export const templates: TemplateItem[] = [/* 12 items */];
```

### 3. `skill/data/skill-mock-data.ts`

```typescript
export interface SkillItem {
  id: string;
  name: string;
  description: string;
  category: 'text' | 'image' | 'data' | 'tool';
  version: string;
  status: 'active' | 'inactive' | 'draft';
  icon: string;
  author: string;
  downloads: number;
  tags: string[];
}

export interface SkillVersion {
  version: string;
  date: string;
  changes: string;
  status: 'current' | 'previous' | 'deprecated';
}

export interface SkillConfig {
  skillId: string;
  connection: { endpoint: string; apiKey: string; timeout: number };
  parameters: Record<string, unknown>;
  permissions: string[];
}

export const skills: SkillItem[] = [/* 20 items */];
export const emptySkills: SkillItem[] = [];
export const skillCategories = ['all', 'text', 'image', 'data', 'tool'] as const;
export const mockVersions: SkillVersion[] = [/* 5 items */];
export const mockConfig: SkillConfig = {/* 1 item */};
```

### 4. `workflow/data/workflow-mock-data.ts`

```typescript
export interface WorkflowItem {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'draft';
  nodeCount: number;
  lastRun: string;
  createdAt: string;
}

export interface ExecutionLog {
  id: string;
  workflowId: string;
  workflowName: string;
  startTime: string;
  duration: string;
  status: 'success' | 'failed' | 'running';
  trigger: 'manual' | 'schedule' | 'webhook';
}

export interface ScheduleItem {
  id: string;
  workflowId: string;
  workflowName: string;
  cron: string;
  nextRun: string;
  enabled: boolean;
}

export interface EditorNode {
  id: string;
  type: 'trigger' | 'process' | 'condition' | 'output';
  label: string;
  x: number;
  y: number;
}

export interface EditorEdge {
  id: string;
  source: string;
  target: string;
}

export const workflows: WorkflowItem[] = [/* 10 items */];
export const emptyWorkflows: WorkflowItem[] = [];
export const executionLogs: ExecutionLog[] = [/* 15 items */];
export const emptyExecutionLogs: ExecutionLog[] = [];
export const schedules: ScheduleItem[] = [/* 5 items */];
export const emptySchedules: ScheduleItem[] = [];
export const editorNodes: EditorNode[] = [/* 6 items */];
export const editorEdges: EditorEdge[] = [/* 5 items */];
```

### 5. `insight/data/insight-mock-data.ts`

```typescript
export interface StatCard {
  title: string;
  value: string;
  trend: string;
  trendType: 'up' | 'down' | 'flat';
}

export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface ReportItem {
  id: string;
  name: string;
  type: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface ExportItem {
  id: string;
  format: string;
  dateRange: string;
  createdAt: string;
  status: 'ready' | 'processing' | 'failed';
  downloadUrl: string;
}

export const statCards: StatCard[] = [/* 4 items */];
export const taskTrendData: ChartDataPoint[] = [/* 6 items */];
export const skillUsageData: ChartDataPoint[] = [/* 4 items */];
export const reports: ReportItem[] = [/* 8 items */];
export const emptyReports: ReportItem[] = [];
export const exports: ExportItem[] = [/* 5 items */];
export const emptyExports: ExportItem[] = [];
```

### 6. `settings/data/settings-mock-data.ts`

```typescript
export interface UserItem {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user' | 'viewer';
  status: 'active' | 'disabled';
  createdAt: string;
  lastLogin: string;
}

export interface PermissionNode {
  key: string;
  title: string;
  description: string;
  children: PermissionNode[];
}

export interface SystemParam {
  key: string;
  label: string;
  value: string | number | boolean;
  type: 'input' | 'select' | 'toggle' | 'number';
  group: string;
  description: string;
  options: string[];
}

export interface LogEntry {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  status: 'success' | 'failed';
  ip: string;
}

export const users: UserItem[] = [/* 8 items */];
export const emptyUsers: UserItem[] = [];
export const permissionTree: PermissionNode[] = [/* 4 roots with 14 leaves total */];
export const systemParams: SystemParam[] = [/* 12 items in 3 groups */];
export const logs: LogEntry[] = [/* 10 items */];
export const emptyLogs: LogEntry[] = [];
```

### 7. `dashboard/data/mock-data.ts` (legacy)

The Dashboard module is being deprecated in favor of `/task/list/all`. Its mock data is kept for backward compatibility but is not actively extended.

```typescript
export interface MetricItem { /* dashboard-specific */ }
export interface AlertItem { /* dashboard-specific */ }
export interface ActivityItem { /* dashboard-specific */ }
```

## Mock Data Conventions

- **All dates are ISO 8601 strings** (e.g., `'2026-06-07T08:12:00Z'`)
- **All IDs are short strings** (`'t1'`, `'s1'`, `'wf1'`, `'el1'`, `'sch1'`, etc.)
- **Empty arrays are always named `empty*`** (e.g., `emptyTasks`, `emptyUsers`) and are used by the `Empty` scenario
- **Status enums are string literal unions**, not `enum`s (better tree-shaking and serialization)
- **No async/Promise in mock data** — pages can use the data synchronously, which is why the scenario selector is so easy to implement

## How a Page Reads Mock Data

The standard pattern (used by every list/table page):

```typescript
import { tasks, emptyTasks, type TaskItem } from '../data/mock-data';

function TaskListPage() {
  const [scenario, setScenario] = useState<Scenario>('loaded');
  const baseData = scenario === 'empty' ? emptyTasks : tasks;
  const filteredData = useMemo(() => /* filter logic */, [baseData, ...deps]);
  // ...
}
```

This pattern has three properties that make it ideal for evidence collection:

1. **Deterministic** — same input → same output. No flakiness from network or timing.
2. **Self-contained** — no setup, no fixtures, no env vars.
3. **Scenario-controllable** — switching the scenario instantly changes the data source.

## Empty Array Pattern

Every list mock file exports both a populated array and an empty array. Pages use the empty array in the `empty` scenario to render an `<Empty>` component. This is a deliberate contract: a page with `empty*` data should always render its empty state correctly.

## Future Contract Changes

When adding a new field to an interface:

1. Update the interface in the `*-mock-data.ts` file
2. Add the field to at least 2-3 mock items (to surface the change in tests)
3. Update any page that uses the field
4. Update this map

When adding a new mock-data file:

1. Place it at `src/domains/<module>/data/<purpose>-mock-data.ts`
2. Export the interface AND the populated array AND the `empty*` array
3. Update this map
4. Update `api-contract-map.md` (this file)
