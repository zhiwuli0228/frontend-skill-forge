# Design: Enhance Workflow

Status: Complete

## Data Model

```typescript
interface WorkflowItem {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'draft';
  nodeCount: number;
  lastRun: string;
  createdAt: string;
}

interface ExecutionLog {
  id: string;
  workflowId: string;
  workflowName: string;
  startTime: string;
  duration: string;
  status: 'success' | 'failed' | 'running';
  trigger: string;
}

interface ScheduleItem {
  id: string;
  workflowId: string;
  workflowName: string;
  cron: string;
  nextRun: string;
  enabled: boolean;
}

interface EditorNode {
  id: string;
  type: 'trigger' | 'process' | 'condition' | 'output';
  label: string;
  x: number;
  y: number;
}

interface EditorEdge {
  id: string;
  source: string;
  target: string;
}
```

## Routes

Already in router.tsx:
- `/workflow/list` → WorkflowListPage
- `/workflow/editor` → WorkflowEditorPage
- `/workflow/history` → WorkflowHistoryPage
- `/workflow/schedule` → WorkflowSchedulePage

## Data-testid Attributes

- `workflow-list-page`, `workflow-editor-page`, `workflow-history-page`, `workflow-schedule-page`
- `workflow-table`, `workflow-row-{id}`, `workflow-status-toggle-{id}`
- `workflow-editor-canvas`, `workflow-node-{id}`, `workflow-node-palette`
- `workflow-history-table`, `workflow-history-status-filter`
- `workflow-schedule-table`, `workflow-schedule-toggle-{id}`, `workflow-add-schedule`
- `workflow-scenario-select`, `workflow-loading`, `workflow-error`, `workflow-error-retry-link`
