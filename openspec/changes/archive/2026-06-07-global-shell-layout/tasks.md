# Tasks: Global Shell Layout

Status: Complete

## Purpose

Break the approved plan into trackable implementation and verification tasks.

## Rules

- Every implementation task that affects user-visible behavior must map to at least one E2E verification task.
- Verification tasks must reference the existing Playwright framework under `tests/e2e/`.
- A task is not complete if it lacks a recorded verification result.

## Task List

### 1. Discovery And Setup

- [x] 1.1 Read `src/app/router.tsx`, `src/shell/layout/AppLayout.tsx`, `src/shell/navigation/SidebarNavigation.tsx` to confirm current route structure and layout component API.
- [x] 1.2 Read `src/domains/dashboard/pages/DashboardPage.tsx`, `src/domains/task/pages/TaskListPage.tsx`, `src/domains/task/pages/TaskCreatePage.tsx` to confirm how pages consume the current layout.
- [x] 1.3 Read `tests/e2e/*.spec.ts` to confirm existing E2E test structure and selectors.
- [x] 1.4 Confirm Dashboard is kept as a standalone module (not merged into Insight) — decision: keep as-is for V2.5.

### 2. Module Configuration

- [x] 2.1 Create `src/shell/config/moduleConfig.ts` with module definitions (key, label, icon, defaultRoute, tabs, sidebarMenu) for all 5 modules: task, skill, workflow, insight, settings.
- [x] 2.2 Export `ModuleConfig` interface and `modules` record.
- [x] 2.3 Export `MODULE_LABELS` and `MODULE_ICONS` for header display.

### 3. GlobalShell Component

- [x] 3.1 Create `src/shell/layout/GlobalShell.tsx` with Header (☰ button, Logo, module tag, search placeholder, user avatar placeholder), Content (<Outlet />), and Drawer.
- [x] 3.2 Implement drawer open/close state management.
- [x] 3.3 Implement current module detection from `location.pathname`.
- [x] 3.4 Add `data-testid` attributes: `global-shell`, `header`, `module-switcher-btn`, `module-drawer`, `module-tag`.

### 4. ModuleSwitcher Component

- [x] 4.1 Create `src/shell/navigation/ModuleSwitcher.tsx` with 5 module cards in a grid layout.
- [x] 4.2 Implement card click navigation to module default route.
- [x] 4.3 Implement current module highlight.
- [x] 4.4 Add `data-testid` attributes: `module-card-{key}`.

### 5. TopTabNavigation Component

- [x] 5.1 Create `src/shell/navigation/TopTabNavigation.tsx` with Ant Design Tabs component.
- [x] 5.2 Implement tab items from module config.
- [x] 5.3 Implement tab click navigation.
- [x] 5.4 Implement active tab detection from `location.pathname`.
- [x] 5.5 Add `data-testid` attributes: `module-tabs`, `tab-{key}`.

### 6. SidebarNavigation Refactor

- [x] 6.1 Refactor `src/shell/navigation/SidebarNavigation.tsx` to accept `menuItems` prop.
- [x] 6.2 Preserve existing menu behavior (inline mode, selectedKeys, defaultOpenKeys).
- [x] 6.3 Update `data-testid` attributes to support dynamic menus.

### 7. ModuleLayout Component

- [x] 7.1 Create `src/shell/layout/ModuleLayout.tsx` with TopTabNavigation, Sider (SidebarNavigation), Content (Breadcrumb + <Outlet />).
- [x] 7.2 Implement module config lookup by `moduleKey` prop.
- [x] 7.3 Implement breadcrumb generation from route path.
- [x] 7.4 Add `data-testid` attributes: `module-layout`, `module-sider`, `module-content`, `breadcrumb`.

### 8. Placeholder Pages for New Modules

- [x] 8.1 Create `src/domains/skill/pages/SkillListPage.tsx` using PlaceholderPage.
- [x] 8.2 Create `src/domains/workflow/pages/WorkflowListPage.tsx` using PlaceholderPage.
- [x] 8.3 Create `src/domains/insight/pages/InsightOverviewPage.tsx` using PlaceholderPage.
- [x] 8.4 Create `src/domains/settings/pages/SettingsUsersPage.tsx` using PlaceholderPage.

### 9. Router Restructure

- [x] 9.1 Refactor `src/app/router.tsx` to use GlobalShell as root layout.
- [x] 9.2 Add module route groups (task, skill, workflow, insight, settings) with ModuleLayout.
- [x] 9.3 Add root redirect from `/` to `/task/list`.
- [x] 9.4 Keep `/login` outside GlobalShell.
- [x] 9.5 Preserve existing dashboard and task routes within new structure.

### 10. App.tsx Update

- [x] 10.1 Verify `src/app/App.tsx` does not need changes (Providers + ConfigProvider + RouterProvider composition remains valid). If router import path changes, update the import.

### 11. Old Layout Cleanup

- [x] 11.1 Delete `src/shell/layout/AppLayout.tsx` (replaced by GlobalShell + ModuleLayout).
- [x] 11.2 Remove any remaining imports of `AppLayout` from router.tsx or other files.

### 12. Existing Page Adaptation

- [x] 12.1 Adapt `src/domains/dashboard/pages/DashboardPage.tsx` to work within ModuleLayout (no component changes expected; verify rendering).
- [x] 12.2 Adapt `src/domains/task/pages/TaskListPage.tsx` to work within ModuleLayout (no component changes expected; verify rendering).
- [x] 12.3 Adapt `src/domains/task/pages/TaskCreatePage.tsx` to work within ModuleLayout (no component changes expected; verify rendering).
- [x] 12.4 Verify scenario selector continues to work in all adapted pages.

### 13. E2E Test Updates

- [x] 13.1 Update `tests/e2e/dashboard-runtime.spec.ts` for new layout (if routes changed).
- [x] 13.2 Update `tests/e2e/task-list-runtime.spec.ts` for new layout.
- [x] 13.3 Update `tests/e2e/task-create-runtime.spec.ts` for new layout.
- [x] 13.4 Create `tests/e2e/global-shell-navigation.spec.ts` with tests for:
  - Header visibility on authenticated routes
  - Header not visible on `/login`
  - Module switcher drawer open/close
  - Module card navigation
  - Module tab switching
  - Sidebar menu navigation
  - Breadcrumb rendering
  - Root redirect to `/task/list`

### 14. End-To-End Verification

- [x] 14.1 Run `npm run test:e2e` against all flows.
- [x] 14.2 Capture pass/fail result and relevant evidence.

### 15. Quality Gates

- [x] 15.1 Run `npm run lint`.
- [x] 15.2 Run `npm run build`.
- [x] 15.3 Update the verify artifact with actual command outputs and conclusions.
