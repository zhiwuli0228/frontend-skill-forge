# Brainstorm: Enhance Workflow

Status: Complete

## Context

The Workflow module (`/workflow/*`) currently has PlaceholderPage for all routes except `/workflow/list`. Need to build out workflow list, editor, history, and schedule pages.

## Target Routes

- `/workflow/list` — Workflow list with table/grid
- `/workflow/editor` — Visual workflow editor with node canvas
- `/workflow/history` — Execution history log table
- `/workflow/schedule` — Schedule management with cron configs

## UI Patterns

### Workflow List Page
- Table with workflow name, status, last run, actions
- Start/stop toggle per workflow
- Create new workflow button
- Scenario selector

### Workflow Editor Page
- Simplified canvas with draggable nodes
- Node palette sidebar (Trigger, Process, Condition, Output)
- Connection lines between nodes (simplified with CSS/SVG)
- Save/run buttons
- Scenario selector

### Workflow History Page
- Execution log table (workflow, start time, duration, status, actions)
- Status filters (success/failed/running)
- View details drawer
- Scenario selector

### Workflow Schedule Page
- Schedule list table (workflow, cron expression, next run, enabled toggle)
- Add/edit schedule modal
- Enable/disable toggle
- Scenario selector
