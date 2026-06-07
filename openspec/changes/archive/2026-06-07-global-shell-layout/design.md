# Design: Global Shell Layout

Status: Draft ready for implementation handoff

## Purpose

Convert approved specs into a frontend implementation design with explicit verification design.

## Design Basis

- Linked proposal: `proposal.md`
- Linked specs: `specs/global-shell-layout.md`
- Related architecture docs: `docs/01-architecture/frontend-skill-forge-architecture-blueprint.md`, `docs/09-change-records/versions/V2.5-multi-module-layout-design.md`

## Affected Frontend Surfaces

| Surface | Type | Change |
| --- | --- | --- |
| `/` | route | redirect to `/task/list` |
| `/login` | page | keep standalone, outside GlobalShell |
| `/task/*` | route group | wrap in TaskModuleLayout with tabs + sidebar |
| `/skill/*` | route group | placeholder module layout |
| `/workflow/*` | route group | placeholder module layout |
| `/insight/*` | route group | placeholder module layout |
| `/settings/*` | route group | placeholder module layout |
| global header | shell | new GlobalShell with Header + Drawer |
| module sidebar | shell | refactor SidebarNavigation to accept dynamic menu items |

## Technical Design

### UI And Interaction Design

**GlobalShell 组件结构:**

```
GlobalShell
├── Header
│   ├── ☰ Button (opens Drawer)
│   ├── Logo / Title
│   ├── Current Module Tag
│   ├── Search Input (placeholder)
│   └── User Avatar (placeholder)
├── Content
│   └── <Outlet /> (renders ModuleLayout)
└── Drawer
    └── ModuleSwitcher (5 module cards in grid)
```

**ModuleLayout 组件结构:**

```
ModuleLayout
├── TopTabNavigation (Tabs)
├── Layout
│   ├── Sider
│   │   └── SidebarNavigation (Menu, dynamic items)
│   └── Content
│       ├── Breadcrumb
│       └── <Outlet /> (renders Page)
```

**状态流:**
- 当前模块：通过 `location.pathname.split('/')[1]` 确定
- 当前 Tab：通过 `location.pathname` 匹配
- Drawer 开关：`useState(false)` 本地状态
- 无需全局状态管理

**错误状态:**
- 无效路由重定向到模块默认页
- 模块不存在时重定向到 `/task/list`

**加载状态:**
- 路由切换时无额外加载状态（组件同步渲染）

### Data And Integration Design

- API or mock integration points: 无，纯布局组件
- Local state changes: Drawer 开关状态
- Routing changes:
  - 新增 GlobalShell 作为根布局
  - 每个模块有独立的 ModuleLayout 路由
  - `/` 重定向到 `/task/list`
  - `/login` 保持独立

### File Boundary

- Files expected to change:
  - `src/app/router.tsx` — 重构为模块分组路由
  - `src/app/App.tsx` — 适配新布局
  - `src/shell/layout/AppLayout.tsx` — 替换为 GlobalShell + ModuleLayout
  - `src/shell/navigation/SidebarNavigation.tsx` — 改为接收动态 menuItems
  - `src/domains/dashboard/pages/DashboardPage.tsx` — 适配新布局
  - `src/domains/task/pages/TaskListPage.tsx` — 适配新布局
  - `src/domains/task/pages/TaskCreatePage.tsx` — 适配新布局
  - `tests/e2e/` — 新增全局导航测试，更新现有测试

- Files explicitly protected from change:
  - `src/domains/dashboard/components/**` — 保持不变
  - `src/domains/dashboard/data/**` — 保持不变
  - `src/domains/task/components/**` — 保持不变
  - `src/domains/task/data/**` — 保持不变
  - `src/domains/auth/**` — 保持不变
  - `src/shared/**` — 保持不变

- New files to create:
  - `src/shell/layout/GlobalShell.tsx` — 全局壳组件
  - `src/shell/layout/ModuleLayout.tsx` — 模块布局组件
  - `src/shell/navigation/ModuleSwitcher.tsx` — 模块切换器
  - `src/shell/navigation/TopTabNavigation.tsx` — 模块内 Tab 栏
  - `src/shell/config/moduleConfig.ts` — 模块配置（tabs、sidebar、labels）
  - `src/domains/skill/pages/SkillListPage.tsx` — 技能库占位页
  - `src/domains/workflow/pages/WorkflowListPage.tsx` — 工作流占位页
  - `src/domains/insight/pages/InsightOverviewPage.tsx` — 数据洞察占位页
  - `src/domains/settings/pages/SettingsUsersPage.tsx` — 系统设置占位页
  - `tests/e2e/global-shell-navigation.spec.ts` — 全局导航 E2E 测试

### Module Configuration Design

```typescript
// src/shell/config/moduleConfig.ts

interface ModuleConfig {
  key: string;
  label: string;
  icon: React.ReactNode;
  defaultRoute: string;
  tabs: TabItem[];
  sidebarMenu: MenuItem[];
}

const modules: Record<string, ModuleConfig> = {
  task: {
    key: 'task',
    label: 'Task Center',
    icon: <UnorderedListOutlined />,
    defaultRoute: '/task/list',
    tabs: [
      { key: '/task/list', label: 'Task List' },
      { key: '/task/create', label: 'Create Task' },
      { key: '/task/templates', label: 'Templates' },
      { key: '/task/board', label: 'Board' },
    ],
    sidebarMenu: [
      // filter items
    ],
  },
  skill: { ... },
  workflow: { ... },
  insight: { ... },
  settings: { ... },
};
```

### Route Structure Design

```typescript
// src/app/router.tsx

const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  {
    path: '/',
    element: <GlobalShell />,
    children: [
      { index: true, loader: () => redirect('/task/list') },
      {
        path: 'task',
        element: <ModuleLayout moduleKey="task" />,
        children: [
          { index: true, loader: () => redirect('/task/list') },
          { path: 'list', element: <TaskListPage /> },
          { path: 'create', element: <TaskCreatePage /> },
          { path: 'templates', element: <PlaceholderPage title="Templates" /> },
          { path: 'board', element: <PlaceholderPage title="Board" /> },
        ],
      },
      {
        path: 'skill',
        element: <ModuleLayout moduleKey="skill" />,
        children: [
          { index: true, loader: () => redirect('/skill/list') },
          { path: 'list', element: <SkillListPage /> },
          { path: 'market', element: <PlaceholderPage title="Skill Market" /> },
          { path: 'config', element: <PlaceholderPage title="Skill Config" /> },
          { path: 'versions', element: <PlaceholderPage title="Versions" /> },
        ],
      },
      // workflow, insight, settings 类似
    ],
  },
]);
```

## Skill And MCP Execution Design

| Step | Skill | MCP / Tool | Expected Use |
| --- | --- | --- | --- |
| read | frontend-project-reader | CLI | gather shell, router, and navigation context |
| explore | frontend-e2e-explorer | Playwright | inspect current layout and navigation behavior |
| implement | frontend-incremental-coder | CLI / editor | build GlobalShell, ModuleLayout, refactor router |
| verify | verification workflow | Playwright / CLI | execute build, lint, and E2E checks |

## Verification Design

### Mandatory Commands

- `npm run lint`
- `npm run build`
- `npm run test:e2e`

### Mandatory E2E Coverage

- Affected route or user flow: global navigation, module switching, module internal navigation
- Expected happy-path scenario:
  - Header visible on authenticated routes
  - ☰ button opens drawer with 5 module cards
  - Module card click navigates to module root
  - Module tabs and sidebar render correctly
  - Tab/sidebar click navigates to correct route
  - Breadcrumb shows correct path
- Expected failure or edge scenario:
  - `/login` does not show header
  - Invalid route redirects to module default
  - Root `/` redirects to `/task/list`
- Evidence to capture: route assertions, drawer interaction assertions, navigation assertions, breadcrumb assertions

### Non-Acceptable Verification

- Unit-only verification
- Statement of expected success without executed result
- Manual browser claim without captured evidence or command result

## Risks

| Risk | Impact | Control |
| --- | --- | --- |
| Route restructure breaks existing E2E tests | high | update existing tests in same change, run full suite before merge |
| ModuleLayout nesting adds render overhead | low | keep component tree shallow, avoid unnecessary re-renders |
| Placeholder pages feel incomplete | low | use PlaceholderPage component consistently, clearly mark as future scope |
| SidebarNavigation refactor breaks existing menu behavior | medium | preserve existing menu item structure, extend with props |
