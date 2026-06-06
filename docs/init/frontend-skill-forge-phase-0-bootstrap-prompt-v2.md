# frontend-skill-forge Phase 0 Bootstrap Prompt v2

> Version: v2  
> Purpose: 修正第一版目录治理问题，并在 Phase 0 正式引入 SuperSpec 骨架。  
> Execution Target: Codex / Claude Code / OpenCode compatible.  

---

## 0. Task

初始化并搭建一个新项目：`frontend-skill-forge`。

本项目不是普通 React Demo，也不是单纯 E2E 项目，而是：

> 面向复杂存量前端项目的 React-first、自进化、证据驱动 AI Skill / Rule / Harness 体系。

核心目标：

1. 帮助 AI Agent 快速理解复杂存量前端代码。
2. 帮助 AI Agent 做受控增量开发，避免全量乱改。
3. 帮助 AI Agent 通过 MCP / Playwright 探索复杂页面。
4. 生成并维护 E2E 验证资产。
5. 让 Skill / Rule / Knowledge 根据代码变化、验证失败、人工反馈和证据持续自进化。
6. 保持 React-first，但核心协议和方法论未来可迁移到非 React 前端项目。

明确废弃方向：

- 不讨论 Horizon。
- 不做 OpenStack / 云管平台模型。
- 不做普通 Todo Demo。
- 不做真实后端。
- 不做数据库。
- 不做微前端运行时。
- 不引入 Next.js。
- 不创建真实 OpenSpec change。
- 不实现复杂任务创建业务。
- 不写完整 Skill 内容。

---

## 1. Critical Correction From v1

第一版存在严重目录治理问题，本版必须修正。

### 1.1 AI 资产目录归位

以下 AI 相关资产不得放在项目根目录：

- `skills/`
- `rules/`
- `knowledge/`
- `harness/`
- `superpower/`
- `docs/evidence` 以外的 AI 治理文档散落目录

必须统一放入 `docs/ai/` 下。

### 1.2 根目录允许保留的 AI / 工具入口

以下目录或文件允许保留在根目录，因为它们属于工具入口、配置入口或 CLI 约定目录：

- `.claude/`
- `openspec/`
- `package.json`
- `playwright.config.ts`
- `vite.config.ts`
- `tsconfig*.json`
- `eslint.config.js`
- 其他前端工程必须的配置文件

### 1.3 SuperSpec 必须引入

Phase 0 必须包含 SuperSpec 骨架，不允许缺失。

要求：

- 保留根目录 `openspec/` 作为 OpenSpec / SuperSpec 工具入口。
- 创建 `openspec/schemas/superspec/.gitkeep`。
- 在 `openspec/project.md` 中说明本项目后续采用 OpenSpec + SuperSpec 作为变更规格治理入口。
- 在 `openspec/config.yaml` 中保留最小 SuperSpec 相关占位配置。
- Phase 0 不创建真实 change。
- Phase 0 不引入复杂 schema 内容。
- Phase 0 不执行破坏性 SuperSpec 自动子代理流程。

---

## 2. Phase 0 Scope

Phase 0 只做项目初始化和基础骨架。

必须满足：

- 能启动。
- 能构建。
- 有基础 React Router。
- 有占位页面。
- 有 AI Harness / Skill / Rule / Knowledge / Superpower 文档骨架，并全部位于 `docs/ai/` 下。
- 有 OpenSpec / SuperSpec 根工具骨架。
- 有 Playwright smoke test。
- 有验证报告。
- 有严格 Git 变更治理。
- 所有变更必须按 commit 拆分。

最小页面：

- `/login`
- `/dashboard`
- `/task/list`
- `/task/create`

页面只需要可访问，不实现复杂业务逻辑。

---

## 3. Git Governance Hard Gate

禁止直接在 `main` 上提交。

先创建 Phase 0 分支：

```bash
git checkout -b bootstrap/frontend-skill-forge-foundation
```

如果当前已经存在该分支，则切换到该分支继续：

```bash
git checkout bootstrap/frontend-skill-forge-foundation
```

所有变更必须满足：

- 每个阶段一个独立分支。
- 每个任务一个明确提交。
- 每个提交前必须检查 diff。
- 每个提交必须有验证证据。
- 禁止无说明的大范围修改。
- 禁止混合提交业务代码、AI 文档骨架、验证证据。
- 禁止未验证直接提交。

每次提交前至少执行：

```bash
git status --short
git diff --stat
git diff --name-only
```

最终提交前必须执行：

```bash
npm run build
npm run test:e2e
```

---

## 4. Initialize React TypeScript Vite Project

如果项目目录不存在，执行：

```bash
npm create vite@latest frontend-skill-forge -- --template react-ts
cd frontend-skill-forge
npm install
```

如果项目目录已经存在，则在现有目录中继续，不要覆盖已有内容。

安装依赖：

```bash
npm install react-router antd
npm install -D playwright @playwright/test
npx playwright install
```

`package.json` 至少需要包含：

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test:e2e": "playwright test"
  }
}
```

---

## 5. Required Project Structure v2

必须使用以下目录结构。

```text
frontend-skill-forge/
├── .claude/
│   └── README.md
│
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   ├── router.tsx
│   │   └── providers.tsx
│   ├── shell/
│   │   ├── layout/
│   │   │   └── AppLayout.tsx
│   │   └── navigation/
│   │       └── SidebarNavigation.tsx
│   ├── domains/
│   │   ├── auth/
│   │   │   └── pages/LoginPage.tsx
│   │   ├── dashboard/
│   │   │   └── pages/DashboardPage.tsx
│   │   └── task/
│   │       └── pages/
│   │           ├── TaskListPage.tsx
│   │           └── TaskCreatePage.tsx
│   ├── capabilities/
│   │   └── .gitkeep
│   ├── adapters/
│   │   └── .gitkeep
│   ├── variants/
│   │   └── .gitkeep
│   ├── testability/
│   │   └── .gitkeep
│   └── shared/
│       └── ui/
│           └── PlaceholderPage.tsx
│
├── tests/
│   ├── e2e/
│   │   └── smoke.spec.ts
│   └── fixtures/
│       └── .gitkeep
│
├── docs/
│   ├── ai/
│   │   ├── README.md
│   │   ├── skills/
│   │   │   ├── frontend-project-reader/
│   │   │   │   └── SKILL.md
│   │   │   ├── frontend-incremental-coder/
│   │   │   │   └── SKILL.md
│   │   │   ├── frontend-e2e-explorer/
│   │   │   │   └── SKILL.md
│   │   │   └── skill-evolution-maintainer/
│   │   │       └── SKILL.md
│   │   ├── rules/
│   │   │   ├── frontend-coding-rules.md
│   │   │   ├── frontend-change-boundary-rules.md
│   │   │   ├── frontend-verification-rules.md
│   │   │   └── skill-evolution-rules.md
│   │   ├── knowledge/
│   │   │   ├── frontend/
│   │   │   │   ├── project-map.md
│   │   │   │   ├── route-map.md
│   │   │   │   ├── component-map.md
│   │   │   │   ├── api-contract-map.md
│   │   │   │   └── state-flow-map.md
│   │   │   └── evolution/
│   │   │       ├── skill-change-log.md
│   │   │       └── evidence-index.md
│   │   ├── harness/
│   │   │   ├── workflow.md
│   │   │   ├── architecture_guide.md
│   │   │   ├── agent-rules.md
│   │   │   ├── verification-policy.md
│   │   │   ├── skill-evolution-policy.md
│   │   │   ├── migration-guide.md
│   │   │   └── git-governance.md
│   │   └── superpower/
│   │       ├── README.md
│   │       ├── powers/
│   │       │   └── .gitkeep
│   │       └── missions/
│   │           └── .gitkeep
│   ├── architecture/
│   │   └── .gitkeep
│   ├── benchmark/
│   │   └── .gitkeep
│   ├── migration/
│   │   └── .gitkeep
│   ├── paper/
│   │   └── .gitkeep
│   └── evidence/
│       └── phase-0-bootstrap-verification.md
│
├── openspec/
│   ├── project.md
│   ├── config.yaml
│   ├── schemas/
│   │   └── superspec/
│   │       └── .gitkeep
│   ├── specs/
│   │   └── .gitkeep
│   └── changes/
│       └── .gitkeep
│
├── package.json
├── playwright.config.ts
└── README.md
```

禁止创建以下根目录：

```text
skills/
rules/
knowledge/
harness/
superpower/
```

如果已经由第一版创建了这些根目录，必须迁移到 `docs/ai/` 下，并删除根目录残留。

---

## 6. React Application Requirements

实现最小可运行 React Shell。

要求：

- 使用 React Router。
- 使用 Ant Design。
- 页面可访问即可。
- 不实现复杂业务。
- 不接后端。
- 不接数据库。
- 不写 Mock API 复杂逻辑。

路由：

```text
/login
/dashboard
/task/list
/task/create
```

建议：

- `/login` 可以不使用主布局。
- `/dashboard`、`/task/list`、`/task/create` 使用 `AppLayout`。
- `SidebarNavigation` 提供基本导航。
- `PlaceholderPage` 用于统一占位页面。
- `DashboardPage` 必须渲染可被测试识别的 `Dashboard` 标题。

---

## 7. AI Skill Skeleton Requirements

创建以下文件：

```text
docs/ai/skills/frontend-project-reader/SKILL.md
docs/ai/skills/frontend-incremental-coder/SKILL.md
docs/ai/skills/frontend-e2e-explorer/SKILL.md
docs/ai/skills/skill-evolution-maintainer/SKILL.md
```

每个文件只写骨架，不写完整内容。

统一模板：

```md
# <Skill Name>

Status: Draft

Purpose:

Scope:

Inputs:

Outputs:

Rules:
```

---

## 8. AI Rules Skeleton Requirements

创建：

```text
docs/ai/rules/frontend-coding-rules.md
docs/ai/rules/frontend-change-boundary-rules.md
docs/ai/rules/frontend-verification-rules.md
docs/ai/rules/skill-evolution-rules.md
```

每个文件只写标题和 Draft 状态。

示例：

```md
# Frontend Coding Rules

Status: Draft
```

---

## 9. AI Knowledge Skeleton Requirements

创建：

```text
docs/ai/knowledge/frontend/project-map.md
docs/ai/knowledge/frontend/route-map.md
docs/ai/knowledge/frontend/component-map.md
docs/ai/knowledge/frontend/api-contract-map.md
docs/ai/knowledge/frontend/state-flow-map.md
docs/ai/knowledge/evolution/skill-change-log.md
docs/ai/knowledge/evolution/evidence-index.md
```

每个文件只写标题和 Draft 状态。

---

## 10. AI Harness Skeleton Requirements

创建：

```text
docs/ai/harness/workflow.md
docs/ai/harness/architecture_guide.md
docs/ai/harness/agent-rules.md
docs/ai/harness/verification-policy.md
docs/ai/harness/skill-evolution-policy.md
docs/ai/harness/migration-guide.md
docs/ai/harness/git-governance.md
```

每个文件只写标题和 Draft 状态。

注意：

`docs/ai/harness/git-governance.md` 必须存在，后续用于正式沉淀 Git 管理规则。

---

## 11. Superpower Skeleton Requirements

Superpower 作为 AI 能力资产，不允许放在根目录。

创建：

```text
docs/ai/superpower/README.md
docs/ai/superpower/powers/.gitkeep
docs/ai/superpower/missions/.gitkeep
```

`docs/ai/superpower/README.md` 只写标题和 Draft 状态。

---

## 12. OpenSpec / SuperSpec Skeleton Requirements

根目录保留：

```text
openspec/
```

原因：`openspec/` 属于工具入口和变更规格入口，可以保留在根目录。

创建：

```text
openspec/project.md
openspec/config.yaml
openspec/schemas/superspec/.gitkeep
openspec/specs/.gitkeep
openspec/changes/.gitkeep
```

`openspec/project.md` 内容要求：

```md
# frontend-skill-forge OpenSpec Project

Status: Draft

This project uses OpenSpec as the change specification entrypoint and reserves SuperSpec schema integration for future AI-assisted change governance.

Phase 0 only creates the skeleton. No real OpenSpec change is created in this phase.
```

`openspec/config.yaml` 使用最小配置：

```yaml
project: frontend-skill-forge
status: draft
schema:
  default: superspec
  path: openspec/schemas/superspec
notes:
  - Phase 0 only reserves the OpenSpec and SuperSpec skeleton.
  - Do not create real changes in Phase 0.
```

注意：

- 不允许创建 `openspec/changes/<change-id>`。
- 不允许创建真实 proposal/design/tasks/spec delta。
- 不允许执行可能自动改工作区或自动 commit 的 SuperSpec agent 流程。

---

## 13. Playwright Requirements

创建：

```text
playwright.config.ts
tests/e2e/smoke.spec.ts
```

Smoke test 要求：

- 启动应用。
- 访问 `/dashboard`。
- 验证页面存在 `Dashboard` 标题。

`tests/e2e/smoke.spec.ts` 可以类似：

```ts
import { expect, test } from '@playwright/test';

test('dashboard page is reachable', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible();
});
```

`playwright.config.ts` 需要配置 `webServer`，通过 `npm run dev` 启动本地应用。

---

## 14. Verification Report

创建：

```text
docs/evidence/phase-0-bootstrap-verification.md
```

模板：

```md
# Phase 0 Bootstrap Verification

## Branch

## Commit List

## Changed Files Summary

## Validation Commands

| Command | Result | Notes |
|---|---|---|

## Directory Governance Check

| Check | Result | Notes |
|---|---|---|
| No root skills directory |  |  |
| No root rules directory |  |  |
| No root knowledge directory |  |  |
| No root harness directory |  |  |
| No root superpower directory |  |  |
| AI assets under docs/ai |  |  |
| OpenSpec root entry exists |  |  |
| SuperSpec skeleton exists |  |  |

## Known Issues

## Next Phase Recommendation
```

验证报告必须记录：

- 当前分支。
- commit 列表。
- 主要变更文件。
- `npm run build` 结果。
- `npm run test:e2e` 结果。
- 目录治理检查结果。
- SuperSpec 骨架检查结果。
- 已知问题。
- 下一阶段建议。

---

## 15. Commit Split Requirements

必须按以下提交拆分，不要一个大 commit。

### Commit 1

```bash
git commit -m "chore: initialize react typescript vite project"
```

内容：

- Vite React TypeScript 初始化。
- 基础 package.json。
- 初始依赖。
- 不包含 AI Harness / Skill / Rule 骨架。

### Commit 2

```bash
git commit -m "feat: add frontend application shell and placeholder routes"
```

内容：

- `src/app`
- `src/shell`
- `src/domains`
- `src/shared/ui/PlaceholderPage.tsx`
- React Router
- Ant Design 基础布局
- `/login`
- `/dashboard`
- `/task/list`
- `/task/create`

### Commit 3

```bash
git commit -m "chore: add docs based ai governance skeleton"
```

内容：

- `docs/ai/skills`
- `docs/ai/rules`
- `docs/ai/knowledge`
- `docs/ai/harness`
- `docs/ai/superpower`
- `docs/architecture`
- `docs/benchmark`
- `docs/migration`
- `docs/paper`

禁止包含根目录：

- `skills/`
- `rules/`
- `knowledge/`
- `harness/`
- `superpower/`

### Commit 4

```bash
git commit -m "spec: add openspec and superspec skeleton"
```

内容：

- `openspec/project.md`
- `openspec/config.yaml`
- `openspec/schemas/superspec/.gitkeep`
- `openspec/specs/.gitkeep`
- `openspec/changes/.gitkeep`

禁止创建真实 change。

### Commit 5

```bash
git commit -m "test: add playwright smoke test foundation"
```

内容：

- `playwright.config.ts`
- `tests/e2e/smoke.spec.ts`
- `test:e2e` script

### Commit 6

```bash
git commit -m "docs: add phase 0 bootstrap verification report"
```

内容：

- `docs/evidence/phase-0-bootstrap-verification.md`

---

## 16. Final Validation

最终必须执行：

```bash
npm run build
npm run test:e2e
```

如果 E2E 因浏览器未安装失败，执行：

```bash
npx playwright install
npm run test:e2e
```

额外执行目录治理检查：

```bash
test ! -d skills
test ! -d rules
test ! -d knowledge
test ! -d harness
test ! -d superpower
test -d docs/ai/skills
test -d docs/ai/rules
test -d docs/ai/knowledge
test -d docs/ai/harness
test -d docs/ai/superpower
test -d openspec/schemas/superspec
```

Windows PowerShell 可使用：

```powershell
Test-Path skills
Test-Path rules
Test-Path knowledge
Test-Path harness
Test-Path superpower
Test-Path docs/ai/skills
Test-Path docs/ai/rules
Test-Path docs/ai/knowledge
Test-Path docs/ai/harness
Test-Path docs/ai/superpower
Test-Path openspec/schemas/superspec
```

根目录 `skills/rules/knowledge/harness/superpower` 的 `Test-Path` 结果必须为 `False`。

`docs/ai/*` 和 `openspec/schemas/superspec` 的 `Test-Path` 结果必须为 `True`。

---

## 17. Final Output Required

完成后返回以下信息：

1. 项目仓库路径
2. 当前分支
3. 执行过的关键命令
4. Commit list
5. Changed file summary
6. `npm run build` 结果
7. `npm run test:e2e` 结果
8. 目录治理检查结果
9. SuperSpec 骨架检查结果
10. 验证报告路径
11. 每个提交 SHA
12. Any unresolved issue

不要输出泛泛总结。必须给出真实执行结果。

---

## 18. Return Template

执行完成后，按以下格式回传：

```md
# frontend-skill-forge Phase 0 Execution Result

## 1. Repository Path

## 2. Current Branch

## 3. Key Commands Executed

## 4. Commit List

| Commit | Message |
|---|---|

## 5. Changed File Summary

## 6. Build Result

## 7. E2E Result

## 8. Directory Governance Check

| Check | Result | Notes |
|---|---|---|

## 9. SuperSpec Skeleton Check

| Check | Result | Notes |
|---|---|---|

## 10. Verification Report Path

## 11. Unresolved Issues
```
