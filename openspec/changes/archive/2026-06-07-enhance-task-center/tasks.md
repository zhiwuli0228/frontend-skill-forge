# Tasks: Enhance Task Center

Status: Ready for implementation

## Task List

### 1. Template Mock Data

- [x] 1.1 Create `src/domains/task/data/template-mock-data.ts` with `TemplateItem` interface (id, title, description, category, tags[], icon) and 12 mock templates across 4 categories (development, design, testing, operations)
- [x] 1.2 Export `emptyTemplates` array for empty state scenario

### 2. Template Components

- [x] 2.1 Create `src/domains/task/components/TemplateFilterBar.tsx` with Search input + Category Select dropdown
- [x] 2.2 Create `src/domains/task/components/TemplateCard.tsx` displaying icon, title, description, category Tag
- [x] 2.3 Create `src/domains/task/components/TemplatePreviewModal.tsx` with Modal showing template details
- [x] 2.4 Create `src/domains/task/components/TemplateGrid.tsx` with Row+Col grid layout (span={6})
- [x] 2.5 Add `data-testid` attributes: `template-filter-bar`, `template-search`, `template-category-filter`, `template-card-{id}`, `template-grid`, `template-preview-modal`

### 3. Task Templates Page

- [x] 3.1 Create `src/domains/task/pages/TaskTemplatesPage.tsx` composing TemplateFilterBar + TemplateGrid + TemplatePreviewModal
- [x] 3.2 Implement search filter (case-insensitive title/description match)
- [x] 3.3 Implement category filter
- [x] 3.4 Implement scenario selector (loaded/loading/empty/error)
- [x] 3.5 Implement loading state (Skeleton cards)
- [x] 3.6 Implement error state (Alert with retry)
- [x] 3.7 Implement empty state (Empty component)

### 4. Board Components

- [x] 4.1 Create `src/domains/task/components/BoardTaskCard.tsx` with title, priority Tag, assignee, draggable attribute
- [x] 4.2 Create `src/domains/task/components/BoardColumn.tsx` with column header (title + count) and droppable area
- [x] 4.3 Create `src/domains/task/components/BoardContainer.tsx` with 4 columns (To Do, In Progress, In Review, Done)
- [x] 4.4 Implement HTML5 drag-and-drop: onDragStart, onDragOver, onDrop
- [x] 4.5 Add `data-testid` attributes: `board-container`, `board-column-{status}`, `board-task-card-{id}`, `board-card-count-{status}`

### 5. Task Board Page

- [x] 5.1 Create `src/domains/task/pages/TaskBoardPage.tsx` composing BoardContainer + TaskDetailDrawer
- [x] 5.2 Group tasks by status into columns
- [x] 5.3 Implement card click → open TaskDetailDrawer
- [x] 5.4 Implement drag-and-drop state management (move task between columns)
- [x] 5.5 Implement scenario selector (loaded/loading/empty/error)
- [x] 5.6 Implement loading state (Skeleton columns)
- [x] 5.7 Implement error state (Alert with retry)
- [x] 5.8 Implement empty state (Empty component per column)

### 6. Router Update

- [x] 6.1 Update `src/app/router.tsx`: replace `PlaceholderPage` for `/task/templates` with `TaskTemplatesPage`
- [x] 6.2 Update `src/app/router.tsx`: replace `PlaceholderPage` for `/task/board` with `TaskBoardPage`

### 7. E2E Tests

- [x] 7.1 Create `tests/e2e/task-templates-runtime.spec.ts` with tests for: loaded grid, category filter, search filter, modal open/close, empty state, loading state, error state
- [x] 7.2 Create `tests/e2e/task-board-runtime.spec.ts` with tests for: loaded board with 4 columns, card drag between columns, card click opens drawer, empty state, loading state, error state

### 8. Quality Gates

- [x] 8.1 Run `npm run lint`
- [x] 8.2 Run `npm run build`
- [x] 8.3 Run `npm run test:e2e`
