# 前端页面探索指南

> 面向开发者：迁移完成或接手项目后，如何快速了解前端页面状态、开展探索、利用探索结果推动后续工作。

## 全貌速览

```
迁移完成 / 接手项目
        │
        ▼
┌─────────────────────────────────────────────────────────────────┐
│  第 1 层  全量冒烟 (10 min)                                       │
│  npm run test:e2e  →  得到 通过/失败 清单                         │
│  告诉你：哪些页面值得关注                                           │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│  第 2 层  失败页面深度诊断 (按需)                                   │
│  用 Playwright MCP 打开失败页面 → 区分 drift vs failure           │
│  告诉你：问题是什么性质（迁移损坏 vs 选择器过时）                      │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│  第 3 层  修复 + 更新 E2E 资产 (按需)                              │
│  修 bug 或更新选择器 → 更新对应 spec → 重新跑通                    │
│  告诉你：修复后页面是否恢复正常                                      │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│  第 4 层  全量回归 (最终确认)                                      │
│  全部 181 case 通过 = 迁移/改动 完成                               │
└─────────────────────────────────────────────────────────────────┘
```

## 第 1 层：全量冒烟 —— 拿到全局视图

这是你接手项目后应该做的第一件事。不需要手动一个页面一个页面去点。

```bash
npm run dev          # 终端 1: 启动开发服务器
npx playwright test  # 终端 2: 跑全量 e2e
```

跑完后打开 `playwright-report/index.html`，你会立刻看到所有页面的通过/失败状态。

### 如果大部分通过

项目状态健康，直接跳到第 2 层，只看失败的页面。

### 如果大量失败

说明迁移对页面结构造成了广泛影响。此时不要逐个修测试——先走第 2 层做一次全量 drift 扫描，区分两类失败：
- **Drift**：功能正常但 DOM 结构变了 → 更新测试选择器
- **Failure**：功能真的坏了 → 修应用代码

## 第 2 层：MCP 逐页探索 —— 收集证据

对需要关注的页面，用 Playwright MCP 做深度探索。每一步探索只关注一个页面。

### 探索前的准备：了解路由

项目当前有 **24 条可访问路由**，分布在 5 个模块下：

| 模块 | 路由 | 代表页面 |
|------|------|----------|
| Task | `/task/list/:filter?`, `/task/create`, `/task/board`, `/task/templates` | 任务中心 |
| Skill | `/skill/list/:filter?`, `/skill/market`, `/skill/config`, `/skill/versions` | Skill 库 |
| Workflow | `/workflow/list/:filter?`, `/workflow/editor`, `/workflow/history`, `/workflow/schedule` | 工作流 |
| Insight | `/insight/overview/:filter?`, `/insight/reports`, `/insight/analysis`, `/insight/export` | 数据洞察 |
| Settings | `/settings/users`, `/settings/permissions`, `/settings/params`, `/settings/logs` | 系统设置 |

完整路由索引见 `docs/02-harness/knowledge/frontend/route-map.md`。

### 每次探索的操作步骤

```
打开页面 → 截图 → DOM快照 → 查看控制台 → 检查网络请求 → 记录状态摘要
```

**对 AI Agent 说类似这样的话：**

> "打开 http://localhost:5173/skill/list/all，截图，取快照，记录控制台和网络请求，按 page-state-summary-compact 模板输出状态摘要"

### 每次探索的 4 项产出

| 产出 | 存放位置 | 用途 |
|------|----------|------|
| 截图 (screenshot) | `artifacts/browser-snapshots/` | 视觉对照，UI 漂移检测 |
| DOM 快照 (snapshot) | `artifacts/browser-snapshots/` | 选择器稳定性分析 |
| 控制台日志 (console) | 页面状态摘要中记录关键信息 | 发现 JS 运行时错误 |
| 网络请求 (network) | 页面状态摘要中记录关键信息 | 发现 API 调用异常 |

⚠️ **重要**：不要直接把原始 DOM 或完整快照贴到对话里。每次快照后立即按 `docs/08-frontend-agent/page-state-summary-compact.md` 模板整理成**页面状态摘要**，原始数据存到 `artifacts/` 目录。

## 第 3 层：利用初步探索结果

### 探索结果分别有什么用途

```
初步探索产出
    │
    ├── ① 页面状态摘要 ──→ 判断页面是否存活
    │                      加载成功？有报错？控制台有没有红色？
    │
    ├── ② 选择器稳定性报告 ──→ 标注哪些 data-testid 可靠、哪些变了
    │                          为后续写/修 E2E 测试提供依据
    │
    ├── ③ 组件发现清单 ──→ 更新 component-map.md
    │                      标记迁移后哪些组件正常渲染、哪些缺失
    │
    ├── ④ 交互追踪 ──→ 记录页面支持的操作（点击/输入/导航）
    │                  直接作为 smoke test 的素材
    │
    └── ⑤ 路由可达性确认 ──→ 更新 route-map.md
                             确认 24 条路由在迁移后全部可达
```

### 用探索结果推动后续页面

这是一个**逐层递进**的过程：

```
第 1 页探索完成 → 产出状态摘要
    ↓
如果页面正常 → 可以将交互追踪直接转为 smoke test
    ↓ 这个测试用来回归保护该页面
    ↓
如果页面异常 → 进入失败诊断流程
    ↓ 区分 drift vs failure
    ↓ drift: 更新选择器 → 更新测试
    ↓ failure: 修代码 → 修完再测
    ↓
第 2 页重复上述流程...
    ↓
全部页面探索完成 → 全量回归验证
```

## E2E 资产的演进路径

每条路由的测试资产有自己的生命周期：

```
Discovery ──→ Smoke Contract ──→ Regression ──→ Stable ──→ Retirement
(发现)        (冒烟契约)         (回归候选)     (稳定)      (退役)
```

| 阶段 | 含义 | 你的操作 |
|------|------|----------|
| Discovery | 刚被发现，还没测试 | MCP 探索，记录页面状态 |
| Smoke | 有基础冒烟测试 | 页面能加载、关键元素存在、基本交互正常 |
| Regression | 覆盖关键用户流程 | 多页面端到端流程，含边界情况 |
| Stable | 长期稳定，进 CI | 监控 flakiness，周期性检查 |
| Retirement | 下线或替换 | 归档并记录退役原因 |

当前项目有 **26 个 spec、181 个 case**，详情见 `docs/08-frontend-agent/e2e-assets/registry.md`。

## 探索结果存储地图

```
artifacts/                              ← 原始产物（截图、trace、报告）
  ├── browser-snapshots/                ← Playwright MCP 快照
  └── validation/                       ← 验证输出

playwright-report/                      ← Playwright HTML 报告（跑完测试自动生成）

docs/08-frontend-agent/evidence/        ← 结构化分析后的证据
  ├── evidence-index/                   ← ★ 证据总索引（从这里开始看）
  ├── route-snapshots/                  ← 每页的路由 DOM 快照
  ├── component-discoveries/            ← 组件发现记录
  ├── interaction-traces/               ← 交互追踪
  ├── failure-diagnoses/                ← 失败诊断报告
  └── stitch-reports/                   ← 跨页面缝合报告

tests/fixtures/                         ← E2E 测试场景数据
tests/e2e/                              ← E2E 测试脚本
```

## 核心规则

1. **原始数据不入对话** —— MCP 快照存 `artifacts/`，对话里只保留页面状态摘要
2. **元素引用仅当次有效** —— 每次 snapshot 后 ref 即失效，用语义锚点（route、label、data-testid）定位元素
3. **不反复快照同一页面** —— 除非状态变化或做失败诊断
4. **证据够了就停** —— 不要无休止地探索，收集到的证据足够判断页面状态即可

## 相关文档索引

| 文档 | 内容 |
|------|------|
| `docs/08-frontend-agent/mcp-exploration-protocol.md` | MCP 探索标准循环 |
| `docs/08-frontend-agent/page-state-summary-compact.md` | 页面状态摘要模板 |
| `docs/08-frontend-agent/e2e-asset-lifecycle.md` | E2E 资产生命周期规范 |
| `docs/08-frontend-agent/e2e-assets/registry.md` | E2E 用例注册表（181 case 明细） |
| `docs/08-frontend-agent/self-evolution-mechanism.md` | 自我进化机制 |
| `docs/08-frontend-agent/frontend-agent-architecture.md` | 前端 Agent 架构分层 |
| `docs/02-harness/knowledge/frontend/route-map.md` | 完整路由地图 |
| `docs/02-harness/knowledge/frontend/component-map.md` | 组件地图 |
| `AGENTS.md` | MCP 上下文守卫硬规则 |
| `CLAUDE.md` | 项目架构与命令 |
