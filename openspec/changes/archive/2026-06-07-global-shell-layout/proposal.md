# Proposal: Global Shell Layout

Status: Draft ready for specs

## Purpose

Define why the frontend change is needed, what is in scope, and what evidence the delivery must produce.

## Change Summary

- Problem: 当前 AppLayout 是简单的 Sider + Content 二栏布局，无法支撑多模块架构。缺少全局 Header、模块切换机制、模块内 Tabs 栏。
- User value: 为后续 5 个业务模块提供统一的布局基础设施，支持复杂页面自动化工具探索。
- Target routes / screens: `/` (root), `/login`, `/task/*`, `/skill/*`, `/workflow/*`, `/insight/*`, `/settings/*`

## In Scope

- 创建 GlobalShell 组件：Header（Logo + ☰ 模块切换按钮 + 当前模块名 + 搜索 + 用户头像）
- 创建 ModuleSwitcher 组件：Drawer 内的模块卡片网格（5 个模块）
- 创建 ModuleLayout 组件：模块内 Tabs + Sidebar + Content + Breadcrumb
- 重构 router.tsx：模块分组路由结构
- 重构 SidebarNavigation：接收 menuItems prop，按模块动态渲染
- 创建 TopTabNavigation 组件：模块内 Tab 栏
- 适配现有 Dashboard 和 Task 页面到新布局
- 更新 E2E 测试覆盖模块切换和导航场景

## Out Of Scope

- 新业务模块的具体页面实现（技能库、工作流、数据洞察、系统设置）
- 全局状态管理库引入（保持 useState 模式）
- 后端 API 集成
- 主题定制或深色模式
- 国际化支持

## Delivery Constraints

- Reuse the existing frontend framework and repository structure.
- Any user-visible validation must be implemented through the existing Playwright end-to-end framework in `tests/e2e/`.
- Verification is incomplete if it only provides unit-level or static-only checks.
- 保持现有组件（MetricBand, AlertQueue, TaskTable 等）不变
- 保持 data-testid 属性兼容

## Required Skills And MCP Usage

| Activity | Required Skill | MCP / Tool | Expected Output |
| --- | --- | --- | --- |
| project reading | frontend-project-reader | CLI | route, shell, and component boundary understanding |
| browser exploration | frontend-e2e-explorer | Playwright | layout observations and navigation evidence |
| implementation | frontend-incremental-coder | local editor / CLI | GlobalShell, ModuleLayout, router code change |
| verification | verification workflow | Playwright + CLI | executed E2E and build results |

## Required Evidence

- Planned spec artifact path: `openspec/changes/global-shell-layout/specs/global-shell-layout.md`
- Planned design artifact path: `openspec/changes/global-shell-layout/design.md`
- Planned verify artifact path: `openspec/changes/global-shell-layout/verify.md`
- Planned E2E spec path: `tests/e2e/global-shell-navigation.spec.ts`
- Planned evidence paths: change-local `verify.md` plus any repository evidence paths chosen during verification

## Acceptance Direction

1. The change must produce specs, design, plan, tasks, implementation, and verify artifacts.
2. Verification must include executed E2E results against the module switching and navigation flow.
3. The final record must state whether verification passed, failed, or remains blocked.
4. GlobalShell Header 必须正确渲染 Logo、☰ 按钮、模块名
5. 模块切换 Drawer 必须展示 5 个模块卡片并支持点击导航
6. ModuleLayout 必须渲染 Tabs、Sidebar、Content、Breadcrumb
7. 现有 Dashboard 和 Task 页面必须在新布局中正常工作
