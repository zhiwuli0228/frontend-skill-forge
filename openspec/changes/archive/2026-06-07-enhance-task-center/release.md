# Release: Enhance Task Center

Status: Complete

## Release Summary

**Change:** enhance-task-center
**Schema:** superspec
**Version:** V2.6

### What Changed

- **Template Library** (`/task/templates`): Grid of 12 templates across 4 categories with search, category filter, preview modal, and scenario states (loaded/loading/empty/error)
- **Task Board** (`/task/board`): 4-column Kanban board with HTML5 drag-and-drop, task detail drawer, and scenario states
- **Router updates**: Both new pages wired into the task module routes
- **Sidebar fix**: Resolved duplicate key warnings in sidebar menu configuration
- **E2E tests**: 13 new tests (7 templates + 6 board) — 46/46 total pass

### Exit Criteria

- [x] All 24 tasks complete
- [x] `npm run lint` passes
- [x] `npm run build` passes
- [x] `npm run test:e2e` passes (46/46)

## Gate Decision

Release approved.
