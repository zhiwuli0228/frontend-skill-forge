# Enhance Task Center Brainstorm

Status: Finalized for proposal handoff

## Purpose

Define the exploration scope before a change artifact is created.

## Problem

V2.5 建立了多模块布局基础，任务中心只有任务列表和创建任务两个页面。
需要增强任务中心的复杂度，新增模板库和看板视图，覆盖卡片网格、拖拽排序等交互模式。

当前任务中心路由：
- `/task/list` — 任务列表（已完成）
- `/task/create` — 创建任务（已完成）
- `/task/templates` — 模板库（PlaceholderPage）
- `/task/board` — 看板视图（PlaceholderPage）

## Brainstorm Source

```yaml
source_mode: fallback-local
required_skill: openspec-explore
fallback_reason: No Superpowers brainstorm artifact generated.
canonical_brainstorm_path: openspec/changes/enhance-task-center/brainstorm.md
redirect_approved: true
path_compliance: pass
```

## Frontend Context

- Target routes: `/task/templates`, `/task/board`
- Existing domain modules touched: `src/domains/task/`
- Existing UI or workflow pain points: 模板库和看板页面是 PlaceholderPage，无实际功能
- Existing Playwright coverage: task-list-runtime (8 tests), task-create-runtime (10 tests)

## Template Library Design

页面结构：
- 顶部：搜索栏 + 分类筛选（全部/开发/设计/测试/运维）
- 主体：卡片网格展示模板
- 点击卡片：Modal 预览模板详情 + "使用此模板"按钮
- 场景选择器：loaded/loading/empty/error

组件拆分：
- `TemplateFilterBar` — 搜索 + 分类筛选
- `TemplateCard` — 单个模板卡片（图标、标题、描述、标签）
- `TemplateGrid` — 卡片网格容器
- `TemplatePreviewModal` — 模板详情模态框

Mock 数据：
- `TemplateItem` 接口：id, title, description, category, tags, icon
- 10-15 个模板数据
- 空状态数据

## Board View Design

页面结构：
- 顶部：看板标题 + 新建任务按钮
- 主体：多列看板（To Do / In Progress / In Review / Done）
- 每列：可拖拽的任务卡片
- 点击卡片：Drawer 展示任务详情
- 场景选择器：loaded/loading/empty/error

组件拆分：
- `BoardColumn` — 单列（标题 + 任务卡片列表）
- `BoardTaskCard` — 任务卡片（标题、优先级标签、负责人）
- `BoardContainer` — 多列容器
- 复用 `TaskDetailDrawer` 展示详情

Mock 数据：
- 复用现有 `TaskItem` 接口和 mock 数据
- 按状态分组到各列
- 空状态数据

## Risks

- 看板拖拽需要引入拖拽库或使用 HTML5 Drag and Drop API
- 模板库的卡片网格布局需要响应式设计
- 复用现有 TaskDetailDrawer 需要确认接口兼容

## Acceptance Direction

- 模板库页面必须有卡片网格、分类筛选、模态框预览
- 看板视图必须有多列布局、任务卡片、拖拽排序
- 场景选择器必须在两个新页面中正常工作
- Playwright E2E 测试必须覆盖新页面的交互
