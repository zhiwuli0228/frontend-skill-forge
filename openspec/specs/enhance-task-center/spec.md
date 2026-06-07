# Spec: Enhance Task Center

Status: Draft ready for implementation

## Scope

- Capability: template library and board view for task center
- Target routes: `/task/templates`, `/task/board`
- Related components: TemplateCard, TemplateGrid, TemplateFilterBar, TemplatePreviewModal, BoardColumn, BoardTaskCard, BoardContainer

## Functional Requirements

### Requirement: Template Library Displays Card Grid

The system MUST display task templates in a card grid layout with category filtering and search.

#### Scenario: Loaded template grid

- GIVEN the user opens `/task/templates`
- WHEN the page loads successfully
- THEN a grid of template cards is visible, each showing title, description, category tag, and icon

#### Scenario: Category filter

- GIVEN the template library is loaded with multiple categories
- WHEN the user selects a category (e.g., "Development")
- THEN only templates matching that category are displayed

#### Scenario: Search filter

- GIVEN the template library is loaded
- WHEN the user types in the search box
- THEN templates are filtered by title/description match

#### Scenario: Empty state

- GIVEN no templates match the current filter
- WHEN the page renders
- THEN an explicit empty state message is shown

### Requirement: Template Card Opens Preview Modal

The system MUST allow users to preview template details in a modal.

#### Scenario: Click template card

- GIVEN the template library shows template cards
- WHEN the user clicks a template card
- THEN a modal opens showing template details (title, description, category, tags, preview content)

#### Scenario: Close modal

- GIVEN the template preview modal is open
- WHEN the user clicks close or the backdrop
- THEN the modal closes and the card grid is visible again

### Requirement: Board View Displays Multi-Column Layout

The system MUST display tasks in a kanban-style board with columns for each status.

#### Scenario: Loaded board view

- GIVEN the user opens `/task/board`
- WHEN the page loads successfully
- THEN 4 columns are visible: To Do, In Progress, In Review, Done
- AND each column contains task cards matching that status

#### Scenario: Empty board

- GIVEN no tasks exist
- WHEN the board renders
- THEN each column shows an empty state message

### Requirement: Board Cards Are Draggable

The system MUST allow dragging task cards between columns.

#### Scenario: Drag card to different column

- GIVEN the board shows tasks in columns
- WHEN the user drags a task card from "To Do" to "In Progress"
- THEN the card appears in the "In Progress" column
- AND the task's status is updated visually

### Requirement: Board Card Opens Detail Drawer

The system MUST allow viewing task details from the board.

#### Scenario: Click board task card

- GIVEN the board shows task cards
- WHEN the user clicks a task card
- THEN the TaskDetailDrawer opens showing full task details

### Requirement: Both Pages Support Scenario Selector

The system MUST provide scenario selectors on both template library and board view.

#### Scenario: Template library scenarios

- GIVEN the user opens `/task/templates`
- WHEN switching between loaded/loading/empty/error scenarios
- THEN the appropriate UI state is displayed

#### Scenario: Board view scenarios

- GIVEN the user opens `/task/board`
- WHEN switching between loaded/loading/empty/error scenarios
- THEN the appropriate UI state is displayed

## Traceability

| Requirement | Planned E2E Spec | Planned Evidence |
| --- | --- | --- |
| Template Library Displays Card Grid | `tests/e2e/task-templates-runtime.spec.ts` | grid visibility, filter assertions |
| Template Card Opens Preview Modal | `tests/e2e/task-templates-runtime.spec.ts` | modal open/close assertions |
| Board View Displays Multi-Column Layout | `tests/e2e/task-board-runtime.spec.ts` | column visibility assertions |
| Board Cards Are Draggable | `tests/e2e/task-board-runtime.spec.ts` | drag-and-drop assertions |
| Board Card Opens Detail Drawer | `tests/e2e/task-board-runtime.spec.ts` | drawer visibility assertions |
| Both Pages Support Scenario Selector | both specs | scenario switch assertions |
