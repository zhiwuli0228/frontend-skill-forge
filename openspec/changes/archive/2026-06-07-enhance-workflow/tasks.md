# Tasks: Enhance Workflow

Status: Ready for implementation

## Task List

### 1. Mock Data

- [x] 1.1 Create `src/domains/workflow/data/workflow-mock-data.ts` with WorkflowItem, ExecutionLog, ScheduleItem, EditorNode, EditorEdge interfaces and mock data

### 2. Workflow List Page

- [x] 2.1 Create `src/domains/workflow/pages/WorkflowListPage.tsx` with Table (name, status, nodeCount, lastRun, actions)
- [x] 2.2 Implement start/stop toggle per row
- [x] 2.3 Implement scenario selector and states

### 3. Workflow Editor Page

- [x] 3.1 Create `src/domains/workflow/pages/WorkflowEditorPage.tsx` with canvas area and node palette
- [x] 3.2 Implement draggable nodes on canvas (simplified with absolute positioning)
- [x] 3.3 Implement node connections (SVG lines)
- [x] 3.4 Implement scenario selector and states

### 4. Workflow History Page

- [x] 4.1 Create `src/domains/workflow/pages/WorkflowHistoryPage.tsx` with execution log Table
- [x] 4.2 Implement status filter
- [x] 4.3 Implement scenario selector and states

### 5. Workflow Schedule Page

- [x] 5.1 Create `src/domains/workflow/pages/WorkflowSchedulePage.tsx` with schedule Table
- [x] 5.2 Implement enable/disable toggle per row
- [x] 5.3 Implement add schedule modal
- [x] 5.4 Implement scenario selector and states

### 6. Router Update

- [x] 6.1 Update router: replace PlaceholderPage for `/workflow/editor`
- [x] 6.2 Update router: replace PlaceholderPage for `/workflow/history`
- [x] 6.3 Update router: replace PlaceholderPage for `/workflow/schedule`

### 7. E2E Tests

- [x] 7.1 Create `tests/e2e/workflow-list-runtime.spec.ts`
- [x] 7.2 Create `tests/e2e/workflow-editor-runtime.spec.ts`
- [x] 7.3 Create `tests/e2e/workflow-history-runtime.spec.ts`
- [x] 7.4 Create `tests/e2e/workflow-schedule-runtime.spec.ts`

### 8. Quality Gates

- [x] 8.1 Run `npm run lint`
- [x] 8.2 Run `npm run build`
- [x] 8.3 Run `npm run test:e2e`
