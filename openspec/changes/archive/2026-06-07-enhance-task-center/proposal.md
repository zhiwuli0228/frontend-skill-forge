# Proposal: Enhance Task Center

Status: Draft ready for specs

## Purpose

Enhance the task center with template library and board view to increase page complexity for automation exploration.

## Change Summary

- Problem: Task center only has list and create pages. Templates and board views are placeholders.
- User value: Adds card grid, modal preview, and drag-and-drop board interactions.
- Target routes: `/task/templates`, `/task/board`

## In Scope

- Template Library page with card grid, category filter, search, modal preview
- Board View with multi-column layout, task cards, drag-and-drop
- Mock data for templates
- Scenario selectors on both pages
- E2E tests for both pages

## Out Of Scope

- Real template CRUD operations
- Backend integration
- Task creation from template
- Board column customization

## Delivery Constraints

- Reuse existing Ant Design components
- Use HTML5 Drag and Drop API (no external library)
- Reuse TaskDetailDrawer for board card detail
- data-testid attributes on all interactive elements

## Required Evidence

- Planned spec artifact path: `openspec/changes/enhance-task-center/specs/enhance-task-center.md`
- Planned design artifact path: `openspec/changes/enhance-task-center/design.md`
- Planned verify artifact path: `openspec/changes/enhance-task-center/verify.md`
- Planned E2E spec paths: `tests/e2e/task-templates-runtime.spec.ts`, `tests/e2e/task-board-runtime.spec.ts`

## Acceptance Direction

1. Template library must have card grid with 10+ templates, category filter, search, modal preview
2. Board view must have 4 columns (To Do/In Progress/In Review/Done), draggable cards, detail drawer
3. Both pages must have scenario selectors (loaded/loading/empty/error)
4. E2E tests must cover all interaction patterns
