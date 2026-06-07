# Plan: Global Shell Layout

Status: Ready for task decomposition

## Purpose

Define the execution sequence, dispatch boundaries, MCP usage order, and evidence checkpoints before implementation starts.

## Execution Sequence

| Order | Objective | Depends On | Output |
| --- | --- | --- | --- |
| 1 | Create module configuration | none | `src/shell/config/moduleConfig.ts` |
| 2 | Create GlobalShell component | module config | `src/shell/layout/GlobalShell.tsx` |
| 3 | Create ModuleSwitcher component | module config | `src/shell/navigation/ModuleSwitcher.tsx` |
| 4 | Create TopTabNavigation component | module config | `src/shell/navigation/TopTabNavigation.tsx` |
| 5 | Create ModuleLayout component | module config, TopTabNavigation, SidebarNavigation | `src/shell/layout/ModuleLayout.tsx` |
| 6 | Refactor SidebarNavigation to accept dynamic items | module config | `src/shell/navigation/SidebarNavigation.tsx` |
| 7 | Create placeholder pages for new modules | none | `src/domains/skill/`, `src/domains/workflow/`, `src/domains/insight/`, `src/domains/settings/` |
| 8 | Refactor router to module-group structure | GlobalShell, ModuleLayout, placeholder pages | `src/app/router.tsx` |
| 9 | Verify App.tsx | router | `src/app/App.tsx` |
| 10 | Delete old AppLayout | router | remove `src/shell/layout/AppLayout.tsx` |
| 11 | Adapt existing pages to new layout | ModuleLayout | `src/domains/dashboard/pages/DashboardPage.tsx`, `src/domains/task/pages/TaskListPage.tsx`, `src/domains/task/pages/TaskCreatePage.tsx` |
| 12 | Update existing E2E tests | layout changes | `tests/e2e/dashboard-runtime.spec.ts`, `tests/e2e/task-list-runtime.spec.ts`, `tests/e2e/task-create-runtime.spec.ts` |
| 13 | Create global shell navigation E2E test | all above | `tests/e2e/global-shell-navigation.spec.ts` |
| 14 | Run verification (lint + build + test:e2e) | all above | verify.md |

## Skill Dispatch Plan

| Step | Skill | Scope Boundary | Deliverable |
| --- | --- | --- | --- |
| 1-7 | frontend-incremental-coder | new files only, no existing file changes | new components and config |
| 8-10 | frontend-incremental-coder | router.tsx, App.tsx, AppLayout.tsx | route restructure + old layout cleanup |
| 11 | frontend-incremental-coder | page files only, no component changes | layout adaptation |
| 12-13 | frontend-e2e-explorer | test files only | E2E test updates |
| 14 | verification workflow | no code changes | verification results |

## MCP And Tool Plan

| Step | Tool / MCP | Target | Evidence |
| --- | --- | --- | --- |
| pre-impl | CLI | `npm run dev` | confirm current app runs |
| post-impl | Playwright MCP | `/task/list`, `/task/create`, `/dashboard` | page snapshots after layout change |
| post-impl | Playwright MCP | module switcher drawer | drawer interaction evidence |
| verify | CLI | `npm run lint` | lint result |
| verify | CLI | `npm run build` | build result |
| verify | CLI | `npm run test:e2e` | E2E pass/fail result |

## Verification Plan

- E2E spec files to add or update:
  - `tests/e2e/global-shell-navigation.spec.ts` (new)
  - `tests/e2e/dashboard-runtime.spec.ts` (update if needed)
  - `tests/e2e/task-list-runtime.spec.ts` (update if needed)
  - `tests/e2e/task-create-runtime.spec.ts` (update if needed)

- Browser flows to execute:
  - Header visibility on authenticated routes
  - Module switcher drawer open/close
  - Module card navigation
  - Module tab switching
  - Sidebar menu navigation
  - Breadcrumb rendering
  - Root redirect
  - Login page (no header)

- Evidence files or logs to capture:
  - `npm run lint` output
  - `npm run build` output
  - `npm run test:e2e` output
  - Playwright page snapshots

- Failure conditions that must block completion:
  - `npm run lint` errors
  - `npm run build` failure
  - Any E2E test failure
  - Existing pages not rendering in new layout

## Exit Criteria

1. The task list is specific enough to execute without inventing hidden scope.
2. Required skills and MCP usage are named explicitly.
3. Verification has executable commands and expected evidence outputs.
4. All 14 execution steps completed.
5. `npm run lint && npm run build && npm run test:e2e` all pass.
