# Global Shell Layout Brainstorm

Status: Finalized for proposal handoff

## Purpose

Define the exploration scope before a change artifact is created.

This change does not have a separate Superpowers-generated brainstorm file. This
artifact is the canonical brainstorm record for the change.

## Problem

V2.4 的布局结构为简单的 Sider + Content 二栏布局，仅支持 Dashboard 和 Task 两个业务域。
作为复杂页面自动化工具探索项目，当前布局无法支撑多模块架构。需要重构为：

- 全局壳（GlobalShell）：Header 含 Logo + 模块切换按钮 + 当前模块名
- 模块布局（ModuleLayout）：每个模块有自己的 Tabs + Sidebar + Content
- 模块切换交互：点击 ☰ 按钮打开 Drawer，展示模块卡片网格

这是后续所有新模块（技能库、工作流、数据洞察、系统设置）的基础设施，必须先于其他模块变更完成。

## Brainstorm Source

```yaml
source_mode: fallback-local
required_skill: openspec-explore
fallback_reason: No repository-local Superpowers brainstorm artifact was generated for this change handoff.
canonical_brainstorm_path: openspec/changes/global-shell-layout/brainstorm.md
redirect_approved: true
path_compliance: pass
```

## Redirect Rule

- If `Source mode` is `superpowers`, the canonical file must be under `docs/superpowers/specs/`.
- If `Source mode` is `fallback-local`, this file itself is the canonical brainstorm artifact.
- Any other redirect target is non-compliant.

## Redirect Audit Checklist

| Check | Result | Notes |
| --- | --- | --- |
| `source_mode` is declared | pass | `fallback-local` is declared. |
| `required_skill` is declared | pass | `openspec-explore` is declared as fallback. |
| `canonical_brainstorm_path` is declared | pass | This file is the canonical artifact. |
| Superpowers redirect stays under `docs/superpowers/specs/` | n/a | No external redirect is used. |
| Fallback reason is present when `source_mode=fallback-local` | pass | Fallback reason is recorded. |
| No alternate redirect target is used | pass | No alternate redirect target is referenced. |

## Frontend Context

- Target routes or pages: `/` (root), `/task/*`, `/skill/*`, `/workflow/*`, `/insight/*`, `/settings/*`
- Existing domain modules touched: `src/app/router.tsx`, `src/shell/layout/AppLayout.tsx`, `src/shell/navigation/SidebarNavigation.tsx`
- Existing UI or workflow pain points:
  - 当前 AppLayout 只有 Sider + Content，无 Header
  - 路由是扁平结构，不支持模块分组
  - SidebarNavigation 是静态菜单，不支持按模块切换
- Existing Playwright coverage related to this area: smoke tests for `/dashboard`, `/task/list`, `/task/create`

## Architecture Decision

### 组件层级

```
App
└── Providers → ConfigProvider → RouterProvider
    └── GlobalShell (Header + Drawer)
        └── ModuleLayout (Tabs + Sidebar + Content)
            └── Page Components
```

### 路由策略

- 模块作为路由前缀：`/task/*`, `/skill/*`, `/workflow/*`, `/insight/*`, `/settings/*`
- 每个模块有独立的 Layout 路由，内部嵌套子页面
- `/login` 保持独立，不经过 GlobalShell
- `/` 重定向到 `/task`

### 状态管理

- 当前模块通过 URL 路径第一段确定（无需额外状态）
- 模块内 Tab 通过 URL 路径第二段确定
- 不引入全局状态管理库，保持 useState 模式

### 兼容性

- 现有 Dashboard 和 Task 页面需要适配新布局
- 保留现有组件（MetricBand, AlertQueue, TaskTable 等）不变
- data-testid 属性保持兼容

## Risks

- 路由重构可能导致现有 E2E 测试失败，需要同步更新
- GlobalShell + ModuleLayout 的嵌套层级增加，需要确保性能不受影响
- 模块切换抽屉的交互设计需要保持简洁，避免过度复杂
- 现有页面适配新布局时可能引入样式问题

## Skill And MCP Direction

| Need | Planned Skill | Planned MCP / Tool | Why |
| --- | --- | --- | --- |
| repository reading | frontend-project-reader | CLI | 理解现有路由、shell、domain 边界 |
| implementation planning | planning/decomposition workflow | CLI | 将设计转化为可执行任务 |
| implementation | frontend-incremental-coder | local editor / CLI | 实现 GlobalShell、ModuleLayout、路由重构 |
| browser verification | frontend-e2e-explorer | Playwright | 验证模块切换、导航、布局渲染 |

## Design Sketch

### GlobalShell 组件

```tsx
function GlobalShell() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const currentModule = location.pathname.split('/')[1] || 'task';

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', padding: '0 24px' }}>
        <Button icon={<MenuOutlined />} onClick={() => setDrawerOpen(true)} />
        <Title level={4} style={{ margin: '0 16px', color: '#fff' }}>Frontend Skill Forge</Title>
        <Tag color="blue">{MODULE_LABELS[currentModule]}</Tag>
      </Header>
      <Content>
        <Outlet />
      </Content>
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <ModuleSwitcher />
      </Drawer>
    </Layout>
  );
}
```

### ModuleLayout 组件

```tsx
function ModuleLayout({ tabs, sidebarMenu, title }) {
  return (
    <Layout>
      <Tabs items={tabs} />
      <Layout>
        <Sider>
          <Menu items={sidebarMenu} />
        </Sider>
        <Content>
          <Breadcrumb />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
```

### 路由结构

```tsx
const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  {
    path: '/',
    element: <GlobalShell />,
    children: [
      { index: true, redirect: '/task' },
      {
        path: 'task',
        element: <TaskModuleLayout />,
        children: [
          { path: 'list', element: <TaskListPage /> },
          { path: 'create', element: <TaskCreatePage /> },
          { path: 'templates', element: <TaskTemplatesPage /> },
          { path: 'board', element: <TaskBoardPage /> },
        ],
      },
      // skill, workflow, insight, settings 模块类似
    ],
  },
]);
```

## Acceptance Direction

- GlobalShell 必须渲染 Header（Logo + ☰ 按钮 + 模块名）
- 点击 ☰ 按钮必须打开 Drawer，展示模块卡片网格
- 点击模块卡片必须导航到对应模块路由
- ModuleLayout 必须渲染 Tabs + Sidebar + Content
- 模块内 Tab 切换必须更新路由
- 侧边菜单导航必须正常工作
- 面包屑必须显示正确的路径
- 现有 Dashboard 和 Task 页面必须在新布局中正常工作
- Playwright E2E 测试必须覆盖模块切换和导航场景
