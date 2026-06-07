# Spec: Global Shell Layout

Status: Draft ready for implementation planning

## Purpose

Define the functional requirements and observable browser behavior for the global shell layout infrastructure.

## Scope

- Capability: multi-module layout foundation with header, module switcher, module-level tabs, sidebar, and breadcrumb
- Target routes: `/`, `/login`, `/task/*`, `/skill/*`, `/workflow/*`, `/insight/*`, `/settings/*`
- Related components: GlobalShell, ModuleSwitcher, ModuleLayout, TopTabNavigation, SidebarNavigation

## Functional Requirements

### Requirement: Global Header Renders Module Navigation

The system MUST render a global header bar containing a logo, a module switcher button (☰), and the current module name.

#### Scenario: Header visible on all authenticated routes

- GIVEN the user opens any route except `/login`
- WHEN the page loads
- THEN the header bar is visible with the logo on the left, the ☰ button, and the current module name label

#### Scenario: Header not visible on login page

- GIVEN the user navigates to `/login`
- WHEN the login page renders
- THEN no global header bar is shown

### Requirement: Module Switcher Opens Drawer

The system MUST provide a drawer-based module switcher that opens when the user clicks the ☰ button.

#### Scenario: Drawer opens on button click

- GIVEN the user is on any authenticated route
- WHEN the user clicks the ☰ button in the header
- THEN a drawer slides open showing a grid of 5 module cards: Task Center, Skill Library, Workflow, Data Insight, System Settings

#### Scenario: Drawer closes on backdrop click

- GIVEN the module switcher drawer is open
- WHEN the user clicks outside the drawer
- THEN the drawer closes

### Requirement: Module Card Navigates to Module Root

The system MUST navigate to the corresponding module root route when the user clicks a module card in the drawer.

#### Scenario: Click task center card

- GIVEN the module switcher drawer is open
- WHEN the user clicks the "Task Center" card
- THEN the drawer closes and the browser navigates to `/task/list`

#### Scenario: Click skill library card

- GIVEN the module switcher drawer is open
- WHEN the user clicks the "Skill Library" card
- THEN the drawer closes and the browser navigates to `/skill/list`

#### Scenario: Current module is highlighted

- GIVEN the user is on `/task/list`
- WHEN the module switcher drawer opens
- THEN the "Task Center" card shows a visual highlight indicating it is the current module

### Requirement: Module Layout Renders Tabs, Sidebar, and Content

The system MUST render a module-level layout with a tab bar, a sidebar menu, and a content area with breadcrumb.

#### Scenario: Module tabs render correctly

- GIVEN the user opens `/task/list`
- WHEN the module layout renders
- THEN a tab bar is visible showing the module's tabs (e.g., Task List, Create Task, Templates, Board)
- AND the active tab matches the current route

#### Scenario: Sidebar menu renders correctly

- GIVEN the user opens `/task/list`
- WHEN the module layout renders
- THEN a sidebar menu is visible on the left showing the module's navigation items
- AND the active menu item matches the current route

#### Scenario: Breadcrumb renders correctly

- GIVEN the user opens `/task/list`
- WHEN the module layout renders
- THEN a breadcrumb is visible showing the path (e.g., Task Center > Task List)

#### Scenario: Tab click navigates to route

- GIVEN the user is on `/task/list`
- WHEN the user clicks a different tab (e.g., "Create Task")
- THEN the browser navigates to `/task/create`

#### Scenario: Sidebar menu click navigates to route

- GIVEN the user is on `/task/list`
- WHEN the user clicks a different sidebar menu item
- THEN the browser navigates to the corresponding route

### Requirement: Root Route Redirects to Default Module

The system MUST redirect the root route `/` to the default module route `/task/list`.

#### Scenario: Root redirect

- GIVEN the user opens `/`
- WHEN the router processes the route
- THEN the browser is redirected to `/task/list`

### Requirement: Existing Pages Work in New Layout

The system MUST ensure existing Dashboard and Task pages render correctly within the new module layout structure.

#### Scenario: Dashboard page renders in new layout

- GIVEN the user navigates to `/dashboard` or the dashboard module
- WHEN the page loads
- THEN the DashboardPage renders correctly within the ModuleLayout
- AND all existing components (MetricBand, AlertQueue, ActivityFeed) display correctly

#### Scenario: Task list page renders in new layout

- GIVEN the user navigates to `/task/list`
- WHEN the page loads
- THEN the TaskListPage renders correctly within the ModuleLayout
- AND TaskFilterBar, TaskTable, and TaskDetailDrawer function correctly

#### Scenario: Task create page renders in new layout

- GIVEN the user navigates to `/task/create`
- WHEN the page loads
- THEN the TaskCreatePage renders correctly within the ModuleLayout
- AND TaskCreateForm and TaskPreview function correctly

### Requirement: Scenario Selector Continues to Work

The system MUST preserve the scenario selector pattern in all existing pages after layout restructuring.

#### Scenario: Scenario selector in dashboard

- GIVEN the user opens `/dashboard`
- WHEN the page loads
- THEN the scenario selector dropdown is visible and functional
- AND switching between loaded/loading/empty/error states works correctly

#### Scenario: Scenario selector in task list

- GIVEN the user opens `/task/list`
- WHEN the page loads
- THEN the scenario selector dropdown is visible and functional
- AND switching between loaded/loading/empty/error states works correctly

## End-To-End Verification Requirements

- Every user-visible requirement must map to a Playwright E2E scenario.
- The E2E scenario must run within the repository's existing `tests/e2e/` framework.
- Verification is incomplete if only unit tests or static checks exist.

## Traceability

| Requirement | Planned E2E Spec | Planned Evidence |
| --- | --- | --- |
| Global Header Renders Module Navigation | `tests/e2e/global-shell-navigation.spec.ts` | header visibility assertions |
| Module Switcher Opens Drawer | `tests/e2e/global-shell-navigation.spec.ts` | drawer open/close assertions |
| Module Card Navigates to Module Root | `tests/e2e/global-shell-navigation.spec.ts` | navigation assertions after card click |
| Module Layout Renders Tabs, Sidebar, and Content | `tests/e2e/global-shell-navigation.spec.ts` | tab/sidebar/breadcrumb visibility assertions |
| Root Route Redirects to Default Module | `tests/e2e/global-shell-navigation.spec.ts` | redirect assertion |
| Existing Pages Work in New Layout | `tests/e2e/dashboard-runtime.spec.ts`, `tests/e2e/task-list-runtime.spec.ts`, `tests/e2e/task-create-runtime.spec.ts` | existing test pass after layout change |
| Scenario Selector Continues to Work | `tests/e2e/dashboard-runtime.spec.ts`, `tests/e2e/task-list-runtime.spec.ts` | scenario selector assertions |
