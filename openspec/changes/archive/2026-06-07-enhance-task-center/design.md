# Design: Enhance Task Center

Status: Draft ready for implementation

## Affected Frontend Surfaces

| Surface | Type | Change |
| --- | --- | --- |
| `/task/templates` | page | replace PlaceholderPage with template library |
| `/task/board` | page | replace PlaceholderPage with board view |

## File Boundary

- Files to create:
  - `src/domains/task/pages/TaskTemplatesPage.tsx`
  - `src/domains/task/pages/TaskBoardPage.tsx`
  - `src/domains/task/components/TemplateCard.tsx`
  - `src/domains/task/components/TemplateGrid.tsx`
  - `src/domains/task/components/TemplateFilterBar.tsx`
  - `src/domains/task/components/TemplatePreviewModal.tsx`
  - `src/domains/task/components/BoardColumn.tsx`
  - `src/domains/task/components/BoardTaskCard.tsx`
  - `src/domains/task/components/BoardContainer.tsx`
  - `src/domains/task/data/template-mock-data.ts`
  - `tests/e2e/task-templates-runtime.spec.ts`
  - `tests/e2e/task-board-runtime.spec.ts`

- Files to modify:
  - `src/app/router.tsx` — replace PlaceholderPage with actual components

- Files protected:
  - `src/domains/task/components/TaskDetailDrawer.tsx` — reuse as-is
  - `src/domains/task/data/mock-data.ts` — reuse TaskItem type

## Technical Design

### Template Library

```
TaskTemplatesPage
├── ScenarioSelector
├── TemplateFilterBar (Search + Category Select)
└── TemplateGrid
    ├── TemplateCard (×N)
    └── TemplatePreviewModal
```

- Mock data: `TemplateItem { id, title, description, category, tags[], icon }`
- 12 templates across 4 categories: development, design, testing, operations
- Grid: `Row + Col span={6}` (4 per row)
- Search: filter by title/description (case-insensitive)
- Category: `Select` dropdown filter

### Board View

```
TaskBoardPage
├── ScenarioSelector
├── BoardHeader (title + "New Task" button)
└── BoardContainer
    ├── BoardColumn ("To Do")
    │   └── BoardTaskCard (×N)
    ├── BoardColumn ("In Progress")
    ├── BoardColumn ("In Review")
    └── BoardColumn ("Done")
```

- Reuse `TaskItem` from existing mock data
- Group tasks by status into columns
- Drag and drop: HTML5 `draggable`, `onDragStart`, `onDragOver`, `onDrop`
- Card click: opens existing `TaskDetailDrawer`

## Verification

- `npm run lint`
- `npm run build`
- `npm run test:e2e`
