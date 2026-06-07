# Release: Enhance Workflow

Status: Complete

## Release Summary

**Change:** enhance-workflow
**Schema:** superspec
**Version:** V2.8

### What Changed

- **Workflow List** (`/workflow/list`): Table with status toggle, scenario states
- **Workflow Editor** (`/workflow/editor`): Canvas with node palette, SVG connections, save/run buttons
- **Workflow History** (`/workflow/history`): Execution log table with status filter
- **Workflow Schedule** (`/workflow/schedule`): Schedule table with toggle, add modal
- **E2E tests**: 22 new tests across 4 pages — 92/92 total pass

### Exit Criteria

- [x] All 25 tasks complete
- [x] npm run lint passes
- [x] npm run build passes
- [x] npm run test:e2e passes (92/92)
