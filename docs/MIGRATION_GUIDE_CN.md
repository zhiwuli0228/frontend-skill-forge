# Frontend Skill Forge 模板迁移指南（手工版）

## 一、项目概述

Frontend Skill Forge 是一个 **React 前端模板项目**，提供了完整的企业级前端应用骨架。它包含模拟业务代码（任务中心、技能库、工作流、数据洞察、系统设置5个模块），用于展示模板的各项能力。当你基于此模板创建新项目时，需要保留模板基础设施，替换模拟业务代码为你自己的业务代码。

### 技术栈

| 类别 | 技术 | 版本 |
|------|------|------|
| 框架 | React | 19 |
| 构建工具 | Vite | 8 |
| 类型系统 | TypeScript | 6 |
| UI 组件库 | Ant Design | 6 |
| 路由 | React Router | 7 |
| E2E 测试 | Playwright | 1.60 |
| 代码检查 | ESLint | 10 |

---

## 二、模板架构全景

### 2.1 分层架构

```
┌─────────────────────────────────────────────────┐
│  src/main.tsx         入口文件                    │
├─────────────────────────────────────────────────┤
│  src/app/             App 壳                     │
│  ├── App.tsx          组件树组装                  │
│  ├── providers.tsx    全局 Provider 注册点        │
│  └── router.tsx       全局路由定义                │
├─────────────────────────────────────────────────┤
│  src/shell/           布局与导航（核心骨架）       │
│  ├── config/          模块配置（驱动所有导航）      │
│  ├── layout/          GlobalShell + ModuleLayout │
│  └── navigation/      导航组件                    │
├─────────────────────────────────────────────────┤
│  src/domains/         业务领域（需要替换）          │
│  ├── auth/            认证（模拟）                │
│  ├── task/            任务中心                    │
│  ├── skill/           技能库                      │
│  ├── workflow/        工作流                      │
│  ├── insight/         数据洞察                    │
│  ├── settings/        系统设置                    │
│  └── dashboard/       仪表盘                      │
├─────────────────────────────────────────────────┤
│  src/shared/          共享 UI 组件                │
├─────────────────────────────────────────────────┤
│  src/testability/     可测试性基础设施             │
│  ├── selectors.ts     选择器注册表                │
│  ├── fixture.ts       场景夹具验证                │
│  ├── evidence.ts      证据路径工具                │
│  └── element-registry/ 元素注册系统               │
├─────────────────────────────────────────────────┤
│  src/adapters/        适配器（预留）               │
│  src/capabilities/    能力模块（预留）             │
│  src/variants/        功能变体（预留）             │
└─────────────────────────────────────────────────┘
```

### 2.2 导航架构（两级）

```
GlobalShell (Header + Drawer[ModuleSwitcher] + Content)
  └── ModuleLayout (TopTabNavigation + Sider[SidebarNavigation] + Breadcrumb + Content)
        └── Page Component
```

- **GlobalShell**：顶部导航栏包含应用标题、模块标签、抽屉触发按钮、搜索栏、用户头像下拉菜单。抽屉内是模块切换器（卡片网格）。
- **ModuleLayout**：接收 `moduleKey`，根据模块配置渲染顶部标签页、左侧边栏菜单和面包屑。

### 2.3 模块配置驱动

所有导航由 `src/shell/config/moduleConfig.tsx` 中的一个配置对象驱动。每个模块包含：
- `key`：模块唯一标识
- `label`：显示名称
- `icon`：图标组件
- `defaultRoute`：默认路由
- `tabs`：顶部标签页定义
- `sidebarMenu`：左侧菜单项定义

添加新模块只需在此配置中添加一条记录，然后在路由中定义对应路径。

### 2.4 场景驱动的页面模式

每个页面遵循统一的"场景模式"：页面内部维护一个 `Scenario` 状态（`'loaded' | 'loading' | 'empty' | 'error'`），通过下拉选择器手动切换。不同场景渲染不同的 UI：
- `loaded`：正常业务内容
- `loading`：骨架屏
- `empty`：空状态提示
- `error`：错误提示 + 重试链接

这是**开发/演示阶段**的模式。接入真实后端后，场景状态应由数据请求状态自然驱动，场景选择器可以移除。

---

## 三、迁移总览：保留 vs 替换 vs 修改

### 保留（模板基础设施，无需修改）

| 路径 | 说明 |
|------|------|
| `src/main.tsx` | 入口文件，结构不变 |
| `src/app/App.tsx` | App 组件树组装，结构不变 |
| `src/app/providers.tsx` | Provider 注册点，**可能需要追加新 Provider** |
| `src/shell/` | 全部布局和导航组件 |
| `src/shared/ui/PlaceholderPage.tsx` | 占位页面组件 |
| `src/testability/` | 全部可测试性基础设施 |
| `vite.config.ts` | Vite 配置 |
| `tsconfig.json` / `tsconfig.app.json` / `tsconfig.node.json` | TypeScript 配置 |
| `eslint.config.js` | ESLint 配置 |
| `playwright.config.ts` | Playwright 配置（可能需要调整 webServer 配置） |
| `index.html` | HTML 模板（可能需要修改标题） |
| `.gitignore` | Git 忽略规则 |
| `tests/helpers/fixture-loader.ts` | 夹具加载器 |
| `.claude/` | AI 辅助配置 |
| `.codex/` | Codex 技能配置 |
| `.opencode/` | OpenCode 配置 |
| `scripts/` | 工具脚本 |
| `frontend-skill-template/` | AI 技能模板 |

### 替换（模拟业务代码）

| 路径 | 说明 |
|------|------|
| `src/domains/task/` | 整个任务领域目录 |
| `src/domains/skill/` | 整个技能领域目录 |
| `src/domains/workflow/` | 整个工作流领域目录 |
| `src/domains/insight/` | 整个洞察领域目录 |
| `src/domains/settings/` | 整个设置领域目录 |
| `src/domains/dashboard/` | 整个仪表盘领域目录 |
| `src/assets/hero.png` | 品牌图片资源 |

### 修改（保留结构，替换内容）

| 路径 | 修改内容 |
|------|----------|
| `src/app/router.tsx` | 替换所有业务路由，保留 AuthGuard + GlobalShell + ModuleLayout 的结构模式 |
| `src/shell/config/moduleConfig.tsx` | 替换模块定义为你的业务模块 |
| `src/domains/auth/` | 替换模拟认证为真实认证逻辑 |
| `tests/e2e/` | 替换所有 E2E 测试 |
| `tests/fixtures/` | 替换所有测试夹具 |
| `docs/` | 保留架构文档结构，替换领域文档 |
| `src/app/providers.tsx` | 根据需要追加 Provider（如状态管理、Query 客户端等） |
| `package.json` | 修改项目名称、描述，根据需要增减依赖 |

---

## 四、逐步迁移操作

### 第1步：项目初始化

```bash
# 1. 克隆模板仓库或复制模板目录
cp -r frontend-skill-forge my-new-project
cd my-new-project

# 2. 修改 package.json
#    - name: "my-new-project"
#    - description: 你的项目描述
#    - 根据需要增减 dependencies/devDependencies

# 3. 安装依赖
npm install

# 4. 修改 index.html 中的 <title>
#    <title>My New Project</title>
```

### 第2步：清理模拟业务代码

```bash
# 删除所有模拟业务领域
rm -rf src/domains/task
rm -rf src/domains/skill
rm -rf src/domains/workflow
rm -rf src/domains/insight
rm -rf src/domains/settings
rm -rf src/domains/dashboard

# 删除模拟测试
rm -rf tests/e2e/*
rm -rf tests/fixtures/*

# 删除品牌资源
rm -f src/assets/hero.png
```

### 第3步：配置你的模块

编辑 `src/shell/config/moduleConfig.tsx`，将 `modules` 对象替换为你的业务模块。

你需要确定每个模块的：
- **key**：URL 路径段（如 `orders`）
- **label**：中文显示名（如 `订单管理`）
- **icon**：从 `@ant-design/icons` 选择合适的图标
- **defaultRoute**：进入模块时的默认路由
- **tabs**：顶部标签页列表（每个 tab 对应一个子页面）
- **sidebarMenu**：左侧过滤/导航菜单项

示例：
```tsx
export const modules: Record<string, ModuleConfig> = {
  orders: {
    key: 'orders',
    label: '订单管理',
    icon: <ShoppingCartOutlined />,
    defaultRoute: '/orders/list',
    tabs: [
      { key: '/orders/list', label: '订单列表' },
      { key: '/orders/create', label: '新建订单' },
    ],
    sidebarMenu: [
      { key: 'all', label: '全部', path: '/orders/list/all' },
      { key: 'pending', label: '待处理', path: '/orders/list/pending' },
      { key: 'done', label: '已完成', path: '/orders/list/done' },
    ],
  },
  // ... 更多模块
}
```

### 第4步：重写路由

编辑 `src/app/router.tsx`，按照现有的三层嵌套模式替换路由：

```tsx
export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,        // 你的登录页
  },
  {
    path: '/',
    element: <AuthGuard />,        // 保留认证守卫
    children: [{
      element: <GlobalShell />,     // 保留全局壳
      children: [
        {
          index: true,
          loader: () => redirect('/orders/list'),  // 你的默认首页
        },
        {
          path: 'orders',
          element: <ModuleLayout moduleKey="orders" />,  // 与 moduleConfig 的 key 一致
          children: [
            { index: true, loader: () => redirect('/orders/list') },
            { path: 'list/:filter?', element: <OrderListPage /> },
            { path: 'create', element: <OrderCreatePage /> },
          ],
        },
        // ... 更多模块路由
      ],
    }],
  },
])
```

### 第5步：替换认证逻辑

编辑 `src/domains/auth/` 下的文件：

1. **`context/useAuth.ts`**：保留 `AuthContext` 的类型定义，修改 `AuthContextValue` 接口以匹配你的认证模型
2. **`context/AuthContext.tsx`**：替换模拟 `login` 为真实 API 调用
3. **`data/auth-mock-data.ts`**：删除或替换为真实的认证常量和类型

关键要保持 `AuthProvider` 的接口不变（`user`, `isAuthenticated`, `login`, `logout`），因为 `GlobalShell` 和 `AuthGuard` 依赖它们。

### 第6步：追加 Provider

编辑 `src/app/providers.tsx`，追加你需要的全局 Provider。常见的追加项：

```tsx
export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      {/* 如有需要，在此追加： */}
      {/* <QueryClientProvider client={queryClient}> */}
      {/*   <StoreProvider> */}
          {children}
      {/*   </StoreProvider> */}
      {/* </QueryClientProvider> */}
    </AuthProvider>
  )
}
```

### 第7步：创建你的业务领域

按照 `src/domains/<your-domain>/` 的结构创建业务代码。推荐的目录结构：

```
src/domains/orders/
├── components/        # 领域专用组件
│   ├── OrderTable.tsx
│   ├── OrderFilterBar.tsx
│   └── OrderDetailDrawer.tsx
├── data/              # 模拟数据和类型（接入后端后移除）
│   └── mock-data.ts
├── pages/             # 页面组件
│   ├── OrderListPage.tsx
│   └── OrderCreatePage.tsx
└── hooks/             # 领域专用 hooks（可选）
    └── useOrders.ts
```

页面组件参考原模板中的场景模式（见 2.4 节）。开发/演示阶段保留 `Scenario` 选择器，便于在不同 UI 状态间切换。接入真实后端后移除选择器，让状态由数据请求自然驱动。

### 第8步：更新测试

1. 编辑 `playwright.config.ts`，确认 `webServer.command` 和端口配置正确
2. 在 `tests/e2e/` 下创建新的 E2E 测试文件
3. 在 `tests/fixtures/` 下创建新的测试夹具 JSON 文件
4. 编辑 `src/testability/selectors.ts`，注册新页面的元素选择器

选择器注册格式：
```tsx
'order-list.heading': {
  id: 'order-list.heading',
  priority: 'role',
  selector: 'role=heading[name=/订单列表/i]',
  description: '订单列表页面标题',
},
```

### 第9步：文档本地化与生成

模板自带了丰富的 AI 辅助文档体系（`docs/` 下共 13 个子目录，60+ 个文件）。迁移后需要对这些文档进行分类处理：部分保留、部分更新引用、部分从零重新生成。

#### 9.1 文档分类处理总览

| 目录 | 处理方式 | 说明 |
|------|----------|------|
| `docs/02-harness/` | **保留** | AI 治理层：Agent 工作流、Git 治理、验证策略、技能生命周期——跨项目通用 |
| `docs/03-openspec/` | **保留** | OpenSpec 规范管理流程——模板基础设施 |
| `docs/08-frontend-agent/` | **保留** | 前端 AI 治理：MCP 协议、E2E 资产、UI 证据、演进——跨项目通用 |
| `docs/01-architecture/` | **保留结构，更新引用** | 分层、模块边界、路由架构等模式是通用的，但示例中引用了 task/skill 等模板模块名，需替换 |
| `docs/04-development/` | **保留结构，更新引用** | 编码规范、测试指南等通用，但示例代码需替换为你的模块 |
| `docs/00-project/` | **重新生成** | 项目概述、术语表、路线图——全部与模板身份绑定 |
| `docs/05-domain/` | **重新生成** | 领域文档描述的是模拟业务，需替换为你的领域 |
| `docs/09-change-records/` | **重置** | 归档模板的版本记录，为你的项目新建 |
| `docs/06-operations/` | **更新** | 发布说明重写，故障排除保留通用部分 |
| `docs/07-evidence/` | **清理重建** | 归档旧证据，迁移后重新产出 |
| `docs/README.md` | **更新** | 更新文档索引和目录说明 |

---

#### 9.2 每份文档的详细说明与生成方案

以下逐一说明 `docs/` 下每份文档迁移后的用途、内容要求、生成方式。标记为 "Agent 生成" 的给出了可直接使用的完整 Prompt。

---

##### `docs/README.md` — 文档总索引

**用途**：文档体系的入口，列出所有子目录及其职责说明。

**迁移后内容**：更新各目录描述（如果项目定位有变化），更新文件统计。

**生成方式**：手动更新。对照上方分类表，将目录描述中的模板项目名称替换为你的项目名称即可。

---

##### `docs/00-project/README.md` — 项目文档索引

**用途**：`00-project/` 目录的文件索引。

**迁移后内容**：列出本目录下的文件及一句话说明。

**生成方式**：Agent 生成。

**输入来源**：本目录下实际存在的文件列表。

**Agent Prompt（中文）**：

```
请读取 docs/00-project/ 目录下的所有 .md 文件（除 README.md 自身外），
然后重写 docs/00-project/README.md，内容为：
1. 标题："项目文档"
2. 一句话说明本目录的用途
3. 列出每个文件的文件名和一句话描述（描述从文件内容中提取）
格式参考：每个文件一行 "- `文件名.md` — 一句话描述"
```

---

##### `docs/00-project/project-overview.md` — 项目概述

**用途**：新成员了解项目的第一份文档。描述项目是什么、用什么技术栈、有哪些模块、架构亮点。

**迁移后内容**：
- 项目名称和定位（1-2 句话）
- 技术栈表（React 19, Vite 8, TypeScript 6, Ant Design 6, React Router 7 等）
- 模块列表（从 `moduleConfig.tsx` 提取，每个模块的名称和功能描述）
- 架构亮点（两层导航、模块配置驱动、场景模式）

**生成方式**：Agent 生成。

**输入来源**：`package.json` + `src/shell/config/moduleConfig.tsx` + `src/app/router.tsx` + 你的项目背景描述。

**Agent Prompt（中文）**：

```
请基于以下信息生成 docs/00-project/project-overview.md：

【项目背景】
<这里填写你的项目背景，例如：这是一个面向企业内部使用的订单管理系统，支持订单的创建、追踪、审批和报表导出。>

【技术栈来源】
读取 package.json 中的 dependencies 和 devDependencies，提取主要技术及版本。

【模块信息来源】
读取 src/shell/config/moduleConfig.tsx，提取所有模块的 key、label 和 tabs 信息。

【架构信息来源】
读取 src/app/router.tsx 了解路由结构，读取 src/shell/layout/GlobalShell.tsx 和 ModuleLayout.tsx 了解布局结构。

文档结构要求：
1. 标题："<项目名称> — 项目概述"
2. "项目定位"：1-2 段话描述项目的业务目标
3. "技术栈"：表格列出关键技术及版本
4. "模块概览"：表格，每行列出一个模块（模块名、功能描述、包含页面列表）
5. "架构特点"：3-5 个要点（如：模块配置驱动的两级导航、场景驱动的页面开发模式、基于 data-testid 的 E2E 测试策略、AI 辅助文档体系）
6. "项目结构"：src/ 下关键目录的简要说明树

参考原模板 docs/00-project/project-overview.md 的章节结构，但内容全部替换。
先读取原文件了解其格式，再生成新内容。
```

---

##### `docs/00-project/glossary.md` — 术语表

**用途**：统一项目中所有术语的定义，避免沟通歧义。

**迁移后内容**：
- 模块术语（每个模块的正式名称、缩写）
- 实体术语（每个业务实体的定义，如 Order、Customer）
- 状态术语（每个状态值的含义，如 pending/processing/completed）
- 技术术语（shell、module、scenario、selector、fixture 等）

**生成方式**：Agent 生成。

**输入来源**：`moduleConfig.tsx` + 各领域 `mock-data.ts` + 技术约定。

**Agent Prompt（中文）**：

```
请生成 docs/00-project/glossary.md，定义项目中的所有关键术语。

【信息来源】
1. 读取 src/shell/config/moduleConfig.tsx — 获取所有模块名称和技术术语
2. 读取 src/domains/*/data/mock-data.ts（所有模块的模拟数据文件）— 获取实体类型定义和状态值

【文档结构】
1. 标题："术语表"
2. "模块术语"：表格（术语、英文、说明），每个模块一行，例如：
   | 订单管理 | Order Management | 负责订单全生命周期的模块 |
3. "实体术语"：表格（实体名、英文、所属模块、说明），从 mock-data.ts 中的类型定义提取
4. "状态术语"：表格（状态值、英文、所属实体、说明），从 mock-data.ts 中的 status 字段提取
5. "技术术语"：表格（术语、说明），至少包含：
   - Shell（壳层）— 应用的全局布局框架
   - Module（模块）— 壳层内的一个业务功能域
   - Scenario（场景）— 页面 UI 状态的枚举，含 loaded/loading/empty/error 四种
   - Selector（选择器）— 用于 E2E 测试定位元素的 testid 注册项
   - Fixture（夹具）— E2E 测试用的预定义测试数据集
   - ModuleLayout — 模块级布局组件
   - GlobalShell — 全局壳层布局组件

格式参考：先读取原模板 docs/00-project/glossary.md 了解格式，再用你的业务内容替换。
```

---

##### `docs/00-project/current-status.md` — 当前状态

**用途**：记录项目当前所处的阶段、已完成和待完成的工作。

**迁移后内容**：
- 当前版本号（如 v0.1.0-migration）
- 迁移完成状态（哪些步骤已完成）
- 模块实现状态（每个模块的页面完成度）
- 已知问题
- 下一步计划

**生成方式**：Agent 生成。

**输入来源**：git log + 迁移进度 + 手动补充。

**Agent Prompt（中文）**：

```
请生成 docs/00-project/current-status.md。

【当前项目状态】
- 刚完成从 frontend-skill-forge 模板的迁移
- <列出你已完成的工作和待完成的工作>

【文档结构】
1. 标题："当前项目状态"
2. "版本信息"：当前版本号、迁移日期
3. "迁移状态"：列出迁移步骤的完成情况（已完成/进行中/待开始）
4. "模块实现状态"：表格，每行一个模块（模块名、页面数、完成度、备注）
5. "已知问题"：列表
6. "下一步计划"：列表

请同时运行 `git log --oneline -10` 获取最近的提交记录，在文档中引用。
```

---

##### `docs/00-project/roadmap.md` — 路线图

**用途**：描述项目的未来规划。

**迁移后内容**：按阶段列出计划实现的功能和改进。

**生成方式**：手动编写（需要产品决策，Agent 无法替代）。如果暂无规划，写入 "TBD — 迁移完成后制定"。

---

##### `docs/01-architecture/` — 架构文档（全部 6 个文件）

**处理方式**：保留结构，更新引用。

这些文档描述的是通用架构模式（分层、模块边界、路由设计），而非特定业务。迁移后需要：

1. 全文搜索以下关键词并替换：
   - `task` / `skill` / `workflow` / `insight` / `settings` → 你的模块 key
   - `Task Center` / `Skill Library` / `Workflow` / `Data Insight` / `System Settings` → 你的模块 label
   - `Frontend Skill Forge` → 你的项目名称

2. 更新架构蓝图中 `frontend-skill-forge-architecture-blueprint.md` 的模块列表

**Agent Prompt（中文）**：

```
请逐文件更新 docs/01-architecture/ 下的所有 .md 文件。

【更新规则】
读取 src/shell/config/moduleConfig.tsx 获取目标项目的模块列表。
对每个 .md 文件执行以下替换：
- "task" → "<你的模块key_1>"（仅当 task 作为模块名使用时，不要替换英文单词 task）
- "skill" → "<你的模块key_2>"
- "workflow" → "<你的模块key_3>"
- "insight" → "<你的模块key_4>"
- "settings" → "<你的模块key_5>"
- "Task Center" → "<你的模块label_1>"
- "Skill Library" → "<你的模块label_2>"
- "Workflow" → "<你的模块label_3>"
- "Data Insight" → "<你的模块label_4>"
- "System Settings" → "<你的模块label_5>"
- "Frontend Skill Forge" → "<你的项目名称>"

注意：
1. 不要修改架构概念和模式描述，只替换示例中的具体模块名
2. 如果某个引用是作为"例如"出现的，保留"例如"的语义，只替换名称
3. 修改后确保 Markdown 结构完整，链接不损坏
```

##### `docs/04-development/` — 开发指南（全部 5 个文件）

**处理方式**：同 `01-architecture/`，保留结构，更新引用。

**各文件说明**：

| 文件 | 迁移后内容 | 处理 |
|------|-----------|------|
| `README.md` | 开发文档索引 | 更新文件列表 |
| `coding-guide.md` | 编码规范：TypeScript 约定、组件模式、命名规范、data-testid 规则 | 更新示例代码中的模块名 |
| `testing-guide.md` | 测试指南：Playwright 使用、夹具格式、选择器注册、场景测试模式 | 更新测试示例中的模块名 |
| `local-development.md` | 本地开发：环境搭建、启动、调试 | 如果端口/工具链不变则保留 |
| `evidence-rules.md` | 证据规则：截图、痕迹、报告产出规范 | 保留（跨项目通用） |

**Agent Prompt（中文）**：

```
请更新 docs/04-development/ 下的 .md 文件。

【更新规则】
1. 读取 src/shell/config/moduleConfig.tsx 获取目标模块列表
2. 对 coding-guide.md 和 testing-guide.md 中的示例代码：
   - 将 import 路径中的模板模块名替换为目标模块名
   - 将 data-testid 值中的模板前缀替换为目标前缀
   - 将组件名中的 Task/Skill/Workflow 等替换为目标实体名
3. 对 local-development.md：检查端口、命令、Node 版本等是否需要更新
4. 对 evidence-rules.md：保留不变
5. 更新 README.md 的文件列表

注意：只替换示例中的具体名称，不改变技术指导的内容。
```

---

##### `docs/05-domain/` — 领域文档（全部 4 个文件）

**处理方式**：全部重新生成。这些文档描述的是模板的模拟业务领域（任务、技能、工作流等），与你的项目完全无关。

**各文件说明**：

| 文件 | 用途 | 生成方式 |
|------|------|----------|
| `README.md` | 领域文档索引 | Agent 生成 |
| `e2e-exploration-domain.md` | E2E 探索领域：描述 AI Agent 应如何探索每个页面，包含每个模块的页面清单、关键元素、探索步骤 | Agent 生成 |
| `frontend-understanding-domain.md` | 前端理解领域：描述每个模块的组件树、数据流、状态管理模式 | Agent 生成 |
| `incremental-coding-domain.md` | 增量编码领域：描述每个模块的编码模式、模拟数据约定、测试模式 | Agent 生成 |

**Agent Prompt — README.md**：

```
请生成 docs/05-domain/README.md。

读取本目录下的所有 .md 文件（除 README.md 自身外），列出文件名和从文件中提取的一句话描述。
标题："领域文档"
```

**Agent Prompt — e2e-exploration-domain.md**：

```
请生成 docs/05-domain/e2e-exploration-domain.md，描述 AI Agent 应如何对每个模块进行 E2E 探索。

【信息来源】
1. 读取 src/shell/config/moduleConfig.tsx — 获取所有模块及其 tab 页面列表
2. 读取 src/app/router.tsx — 获取完整的路由树
3. 读取 src/domains/*/pages/*.tsx — 了解每个页面的 data-testid 和场景模式

【文档结构】
1. 标题："E2E 探索领域"
2. 对每个模块，写一个子章节：
   - 模块名称和路由前缀
   - 页面清单（表格：页面名、路由路径、data-testid 前缀、场景支持）
   - 探索路径（自然语言描述：先访问哪个页面→点击什么→期望看到什么）
   - 关键断言点（至少 3 个：标题可见、场景可切换、侧边栏过滤可用）
3. "跨模块探索"章节：描述需要跨模块导航的场景
4. "探索检查清单"：一个 checkbox 列表

格式参考：先读取原模板 docs/05-domain/e2e-exploration-domain.md 了解格式。
```

**Agent Prompt — frontend-understanding-domain.md**：

```
请生成 docs/05-domain/frontend-understanding-domain.md，描述每个模块的前端实现细节。

【信息来源】
1. 读取每个 src/domains/*/pages/*.tsx — 了解页面组件结构和场景模式
2. 读取每个 src/domains/*/components/*.tsx — 了解领域组件
3. 读取每个 src/domains/*/data/mock-data.ts — 了解实体类型和数据结构
4. 读取 src/shell/config/moduleConfig.tsx — 了解模块配置

【文档结构】
1. 标题："前端理解领域"
2. 对每个模块，写一个子章节：
   - "组件树"：从 ModuleLayout 开始画组件嵌套关系（文本树形图）
   - "数据模型"：列出实体类型定义（TypeScript interface，从 mock-data.ts 提取）
   - "状态管理"：描述页面内部状态（useState 变量及用途）
   - "路由参数"：描述 :filter? 等参数的解析和使用方式
3. "共享模式"章节：列出跨模块的通用模式（场景选择器、侧边栏过滤、mock 数据导出）

格式参考：先读取原模板 docs/05-domain/frontend-understanding-domain.md 了解格式。
```

**Agent Prompt — incremental-coding-domain.md**：

```
请生成 docs/05-domain/incremental-coding-domain.md，描述每个模块的编码规范和新增页面的标准流程。

【信息来源】
1. 读取一个完整的领域实现（选择一个模块，读取其所有文件）
2. 读取 src/shared/ui/PlaceholderPage.tsx — 了解占位组件
3. 读取 src/testability/selectors.ts — 了解选择器注册格式
4. 读取 tests/helpers/fixture-loader.ts — 了解夹具加载方式

【文档结构】
1. 标题："增量编码领域"
2. "新增模块的标准流程"：
   - Step 1: 在 moduleConfig.tsx 添加配置
   - Step 2: 在 router.tsx 添加路由
   - Step 3: 创建目录结构（components/, data/, pages/）
   - Step 4: 编写 mock-data.ts
   - Step 5: 编写页面组件（遵循场景模式）
   - Step 6: 编写领域组件
   - Step 7: 注册 selectors
   - Step 8: 编写 E2E 测试和夹具
3. "页面组件模板"：给出完整的可复制代码模板
4. "领域组件模板"：给出 Table、FilterBar、DetailDrawer 的代码模板
5. "Mock 数据模板"：给出 mock-data.ts 的代码模板
6. "命名速查表"：列出所有命名约定

每条模板都应该可以直接复制使用，将 {{placeholder}} 替换为实际名称即可。
```

---

##### `docs/06-operations/` — 运维文档（3 个文件）

| 文件 | 迁移后内容 | 生成方式 |
|------|-----------|----------|
| `README.md` | 运维文档索引 | 手动更新目录描述 |
| `release-notes.md` | 首个版本发布说明 | Agent 生成 |
| `troubleshooting.md` | 故障排除 | 保留通用问题（构建、lint），追加项目特定问题 |

**Agent Prompt — release-notes.md**：

```
请生成 docs/06-operations/release-notes.md。

【版本信息】
- 版本号：v0.1.0
- 发布日期：<今天日期>
- 版本主题：从 frontend-skill-forge 模板迁移完成

【内容要求】
1. 标题："发布说明"
2. "v0.1.0 — 初始迁移"：
   - 迁移来源：frontend-skill-forge 模板
   - 技术栈：React 19 + Vite 8 + TypeScript 6 + Ant Design 6
   - 已实现模块：<从 moduleConfig.tsx 列出所有模块>
   - 已实现页面：<统计总页面数>
   - 已知限制：<列出，如：暂无后端集成、使用模拟数据>
3. "安装与运行"：
   ```bash
   npm install
   npm run dev
   ```
```

---

##### `docs/07-evidence/` — 验证证据

**处理方式**：清理重建。

1. 将现有证据全部移动到 `docs/07-evidence/archive/template-reference/`
2. 新建 `README.md` 描述证据目录结构
3. 迁移完成并运行测试后，将新产出的截图、痕迹、报告放入对应子目录

**Agent Prompt**：

```
请整理 docs/07-evidence/ 目录。

1. 创建 docs/07-evidence/archive/template-reference/ 目录
2. 将当前 docs/07-evidence/ 下除 archive/ 和 README.md 外的所有内容移动到 archive/template-reference/
3. 创建或更新 docs/07-evidence/README.md，内容为：
   - 标题："验证证据"
   - 说明：本目录存放项目验证过程中产出的截图、Playwright 痕迹、HTML 报告等
   - 子目录结构说明（screenshots/, traces/, reports/ 等）
   - 要求所有证据文件以模块名+场景名+时间戳命名
```

---

##### `docs/08-frontend-agent/` — 前端 AI 治理层

**处理方式**：保留。这个目录是模板基础设施的核心部分，包含 MCP 探索协议、E2E 资产生命周期管理、UI 证据收集规范、前端技能演进规则等。这些内容跨项目通用，不需要修改。

---

##### `docs/09-change-records/` — 变更台账

**处理方式**：归档模板记录，重置为你项目的变更台账。

**操作步骤**：

```bash
# 1. 创建归档目录
mkdir -p docs/09-change-records/archive/template-history

# 2. 移动所有模板的版本记录到归档
# 将 baselines/, changes/, releases/, summaries/, versions/ 中与模板相关的文件
# 移动到 archive/template-history/ 下

# 3. 清理 current/, indices/, issues/, optimizations/, process/ 目录
# 删除与模板相关的内容

# 4. 创建你的首个版本记录
```

**Agent Prompt**：

```
请重置 docs/09-change-records/ 目录，使其成为新项目的变更台账。

【操作步骤】
1. 创建 docs/09-change-records/archive/template-history/ 目录
2. 读取当前 docs/09-change-records/ 下的所有目录和文件
3. 将以下内容移动到 archive/template-history/：
   - baselines/ 下所有文件
   - changes/ 下所有文件
   - releases/ 下所有文件
   - summaries/ 下所有文件
   - versions/ 下所有文件
4. 清空 current/, issues/, optimizations/ 的内容（保留目录结构和 .gitkeep）
5. 在 versions/ 下创建 v0.1.0-migration.md，内容为：
   - 版本号：v0.1.0
   - 日期：<今天日期>
   - 主题：从 frontend-skill-forge 模板迁移
   - 变更摘要：列出新增的模块（从 moduleConfig.tsx 提取）
6. 在 current/ 下创建 migration-record.md，记录迁移决策：
   - 迁移日期
   - 源模板
   - 目标项目名称
   - 模块清单
   - 关键决策（如：保留场景模式、使用模拟数据、暂不引入状态库等）
7. 更新 process/README.md（如果存在）
```

---

#### 9.3 文档生成的推荐顺序

文档之间有依赖关系，建议按以下顺序生成：

```
1. moduleConfig.tsx 已定稿         ← 所有文档的输入来源
       │
2. docs/00-project/project-overview.md  ← 最先：定义项目身份
3. docs/00-project/glossary.md          ← 定义术语，后续文档引用
       │
4. docs/05-domain/frontend-understanding-domain.md  ← 领域文档
5. docs/05-domain/incremental-coding-domain.md
6. docs/05-domain/e2e-exploration-domain.md
       │
7. docs/01-architecture/*.md          ← 更新引用
8. docs/04-development/*.md           ← 更新引用
       │
9. docs/06-operations/release-notes.md   ← 运维文档
10. docs/00-project/current-status.md     ← 状态文档（最后：反映完成情况）
11. docs/00-project/roadmap.md            ← 路线图（手动）
       │
12. docs/00-project/README.md         ← 索引（最后：文件列表已确定）
13. docs/05-domain/README.md
14. docs/README.md                    ← 总索引（最后更新）
```

---

#### 9.4 文档质量检查清单

生成完成后逐项检查：

- [ ] 所有文档中引用的模块名与 `moduleConfig.tsx` 一致
- [ ] 所有文档中引用的路由路径与 `router.tsx` 一致
- [ ] 所有文档中引用的实体类型名与 `mock-data.ts` 一致
- [ ] Markdown 内部链接（`[text](./path/to/file.md)`）目标文件存在
- [ ] 没有残留模板项目的名称（搜索：`task`、`skill`、`workflow`、`Frontend Skill Forge`）
- [ ] 代码示例中的 `data-testid` 值与页面组件中的实际值一致
- [ ] 代码示例中的 import 路径与实际文件结构一致

### 第10步：验证

```bash
# 类型检查
npm run build

# 代码检查
npm run lint

# 启动开发服务器，手动验证所有页面
npm run dev

# 运行 E2E 测试
npm run test:e2e
```

---

## 五、关键约定速查

### TypeScript

- `verbatimModuleSyntax: true` — type 导入必须使用 `import type { ... }`，否则构建失败
- 路径别名：无。所有导入使用相对路径
- JSX：`react-jsx`，无需在每个文件写 `import React from 'react'`

### 组件模式

- 所有交互元素携带 `data-testid` 属性，用于 Playwright 选择器
- 页面组件遵循场景模式（loaded/loading/empty/error）
- 无 CSS 文件方案，全部使用 Ant Design 组件 + `style={}` 内联样式
- 无全局状态管理，页面状态使用 `useState`

### 导航模式

- 跨模块跳转：使用 `useNavigate()` + 目标路由路径
- 模块内页面切换：通过 TopTabNavigation 或 SidebarNavigation 自动处理
- 面包屑自动从 `moduleConfig.tabs` 推导

### 模拟数据

- 所有模拟数据直接导出为常量，无 API 调用
- 每个数据集同时提供 `loaded` 和 `empty` 两个版本（如 `tasks` 和 `emptyTasks`）

---

## 六、常见问题

### Q: 如何增减顶部标签页？
修改 `moduleConfig.tsx` 中对应模块的 `tabs` 数组，然后在 `router.tsx` 中增减对应的子路由。

### Q: 如何增减左侧边栏菜单项？
修改 `moduleConfig.tsx` 中对应模块的 `sidebarMenu` 数组。如果菜单项对应路由过滤参数（如 `/orders/list/pending`），确保对应页面能处理该参数。

### Q: 如何添加新的全局模块？
三步操作：
1. 在 `moduleConfig.tsx` 的 `modules` 对象中添加新条目
2. 在 `router.tsx` 中添加新的路由分支（`path + ModuleLayout + children`）
3. 在 `src/domains/` 下创建对应的业务领域目录

### Q: 如何接入真实后端 API？
推荐的渐进路径：
1. 保持页面场景模式，将模拟数据替换为 `useEffect` + `fetch` / `axios` 调用
2. 添加数据请求状态管理（建议引入 `@tanstack/react-query`）
3. 在 `src/app/providers.tsx` 中追加 `QueryClientProvider`
4. 移除场景选择器，让 loading/error/empty 状态由请求状态自然驱动
5. 在 `src/adapters/` 中封装 API 客户端

### Q: AI 辅助系统（docs/, .claude/, .codex/）需要保留吗？
建议保留。这些目录包含 AI Agent 辅助系统的配置和知识库，有助于后续使用 AI 辅助开发和维护。如果你确定不需要 AI 辅助，可以删除。

### Q: frontend-skill-template/ 目录是什么？
包含 AI 前端技能模板（元素注册表维护、E2E 探索、增量编码等）。如果你不需要 AI Agent 辅助前端开发，可以删除。

### Q: 如何用 AI Agent 批量生成文档？
第9步中标注为 "Agent 生成" 的文档都附有完整的中文 Prompt。操作流程：
1. 确保 `moduleConfig.tsx` 和 `router.tsx` 已定稿（这两个文件是所有文档的输入来源）
2. 按 9.3 节的推荐顺序逐个执行 Prompt
3. 每个 Prompt 都是独立的，可以发给 AI Agent（如 Claude Code、Cursor、Copilot 等）执行
4. 执行后检查输出内容，重点核对模块名、路由路径、实体名是否与源码一致
5. 全部生成完成后，跑一次 9.4 节的质量检查清单

### Q: 文档中的 Prompt 需要如何调整？
每个 Prompt 中的尖括号 `< >` 部分需要替换为你的实际信息。例如：
- `<今天日期>` → `2026-06-09`
- `<你的模块key_1>` → 你 moduleConfig 中的第一个模块 key
- `<项目背景描述>` → 你的项目的业务背景

其余部分可以直接复制使用，AI Agent 会基于读取到的源码文件自动填充具体内容。

---

## 七、迁移检查清单

- [ ] `package.json` — 已修改项目名称和描述
- [ ] `index.html` — 已修改页面标题
- [ ] `src/shell/config/moduleConfig.tsx` — 已替换为你的业务模块
- [ ] `src/app/router.tsx` — 已替换为你的业务路由
- [ ] `src/domains/auth/` — 已替换为真实认证逻辑
- [ ] `src/domains/<your-domain>/` — 已创建所有业务领域
- [ ] `src/app/providers.tsx` — 已追加必要的全局 Provider
- [ ] `src/shared/` — 已添加共享 UI 组件（如有需要）
- [ ] `tests/e2e/` — 已创建 E2E 测试
- [ ] `tests/fixtures/` — 已创建测试夹具
- [ ] `src/testability/selectors.ts` — 已注册新页面选择器
- [ ] `docs/README.md` — 已更新文档总索引
- [ ] `docs/00-project/` — 已重新生成项目概述、术语表、当前状态、路线图
- [ ] `docs/01-architecture/` — 已更新架构文档中的模块名称引用
- [ ] `docs/04-development/` — 已更新开发指南中的示例代码
- [ ] `docs/05-domain/` — 已重新生成领域文档（探索、理解、编码）
- [ ] `docs/06-operations/` — 已更新发布说明和故障排除
- [ ] `docs/07-evidence/` — 已归档旧证据，重置目录结构
- [ ] `docs/09-change-records/` — 已归档模板记录，创建首个版本记录
- [ ] 文档内部链接 — 无损坏引用，所有 .md 路径有效
- [ ] `npm run build` — 通过
- [ ] `npm run lint` — 通过
- [ ] `npm run dev` — 所有页面可正常访问
- [ ] `npm run test:e2e` — 通过
