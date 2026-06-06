# frontend-skill-forge Phase 0 Bootstrap Execution Prompt

## Task

Bootstrap `frontend-skill-forge` Phase 0 foundation.

You need to initialize and build the foundation of a new project named `frontend-skill-forge`.

---

## 0. Project Positioning

`frontend-skill-forge` is not a normal React demo and not a simple E2E testing project.

Its real goal is:

> A React-first, self-evolving, evidence-driven AI Skill / Rule / Harness system for complex legacy frontend projects.

Core capabilities:

1. Help AI Agents quickly understand complex existing frontend codebases.
2. Help AI Agents perform controlled incremental development and avoid uncontrolled broad changes.
3. Help AI Agents explore complex pages through MCP / Playwright.
4. Generate and maintain E2E verification assets.
5. Continuously evolve Skill / Rule / Knowledge based on code changes, verification failures, human feedback, and evidence.
6. Keep React as the first reference stack, while preserving a protocol and methodology that can later migrate to non-React frontend projects.

Explicitly forbidden directions:

- Do not discuss Horizon.
- Do not build an OpenStack / cloud management platform model.
- Do not build a normal Todo demo.
- Do not build a real backend.
- Do not introduce a database.
- Do not introduce a micro-frontend runtime.
- Do not introduce Next.js.
- Do not create a real OpenSpec change.
- Do not write full Skill content in Phase 0.

---

## 1. Phase 0 Goal

Phase 0 only covers project initialization and foundation skeleton.

The project must satisfy:

- Can start locally.
- Can build successfully.
- Has basic React Router setup.
- Has placeholder pages.
- Has AI Harness directories.
- Has Skill / Rule / Knowledge skeletons.
- Has OpenSpec / Superpower skeletons.
- Has Playwright smoke test.
- Has verification report.
- Has strict Git governance.
- All changes are split into clear commits.

Minimum pages:

- `/login`
- `/dashboard`
- `/task/list`
- `/task/create`

Pages only need to be reachable. Do not implement complex business logic.

---

## 2. Git Hard Gate

Do not commit directly on `main`.

Create the Phase 0 branch first:

```bash
git checkout -b bootstrap/frontend-skill-forge-foundation
```

If the branch already exists, switch to that branch and continue.

All changes must follow these rules:

- One independent branch per phase.
- One clear commit per task.
- Check diff before every commit.
- Every commit must have verification evidence.
- No unexplained broad changes.
- Do not mix business code, Skill, Rule, Harness, and verification evidence in one commit.
- Do not commit unverified changes.

Before every commit, execute at least:

```bash
git status --short
git diff --stat
git diff --name-only
```

Before the final submission, execute:

```bash
npm run build
npm run test:e2e
```

---

## 3. Initialize React TypeScript Vite Project

If the project directory does not exist, execute:

```bash
npm create vite@latest frontend-skill-forge -- --template react-ts
cd frontend-skill-forge
npm install
```

If the project directory already exists, continue in the existing directory. Do not overwrite existing content.

Install dependencies:

```bash
npm install react-router antd
npm install -D playwright @playwright/test
npx playwright install
```

`package.json` must contain at least:

```json
{
  "scripts": {
    "dev": "...",
    "build": "...",
    "preview": "...",
    "test:e2e": "playwright test"
  }
}
```

---

## 4. Required Directory Structure

Create or adjust to the following structure:

```text
frontend-skill-forge/
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
│   ├── adapters/
│   ├── variants/
│   ├── testability/
│   └── shared/
│       └── ui/PlaceholderPage.tsx
│
├── tests/
│   ├── e2e/
│   │   └── smoke.spec.ts
│   └── fixtures/
│
├── skills/
│   ├── frontend-project-reader/
│   │   └── SKILL.md
│   ├── frontend-incremental-coder/
│   │   └── SKILL.md
│   ├── frontend-e2e-explorer/
│   │   └── SKILL.md
│   └── skill-evolution-maintainer/
│       └── SKILL.md
│
├── rules/
│   ├── frontend-coding-rules.md
│   ├── frontend-change-boundary-rules.md
│   ├── frontend-verification-rules.md
│   └── skill-evolution-rules.md
│
├── knowledge/
│   ├── frontend/
│   │   ├── project-map.md
│   │   ├── route-map.md
│   │   ├── component-map.md
│   │   ├── api-contract-map.md
│   │   └── state-flow-map.md
│   └── evolution/
│       ├── skill-change-log.md
│       └── evidence-index.md
│
├── harness/
│   ├── workflow.md
│   ├── architecture_guide.md
│   ├── agent-rules.md
│   ├── verification-policy.md
│   ├── skill-evolution-policy.md
│   ├── migration-guide.md
│   └── git-governance.md
│
├── openspec/
│   ├── project.md
│   ├── config.yaml
│   ├── specs/.gitkeep
│   └── changes/.gitkeep
│
├── superpower/
│   ├── powers/.gitkeep
│   └── missions/.gitkeep
│
├── docs/
│   ├── architecture/
│   ├── benchmark/
│   ├── migration/
│   ├── paper/
│   └── evidence/
│       └── phase-0-bootstrap-verification.md
│
├── package.json
├── playwright.config.ts
└── README.md
```

---

## 5. React Application Requirements

Implement a minimal runnable React shell.

Requirements:

- Use React Router.
- Use Ant Design.
- Pages only need to be reachable.
- Do not implement complex business logic.
- Do not connect to a backend.
- Do not connect to a database.
- Do not create complex Mock API logic.

Routes:

```text
/login
/dashboard
/task/list
/task/create
```

Recommended implementation:

- `/login` may avoid the main layout.
- `/dashboard`, `/task/list`, and `/task/create` should use `AppLayout`.
- `SidebarNavigation` should provide basic navigation.
- `PlaceholderPage` should be used for shared placeholder pages.
- `DashboardPage` must render a heading that can be matched as `Dashboard` by the E2E smoke test.

---

## 6. Skill Skeleton Requirements

Create the following files:

```text
skills/frontend-project-reader/SKILL.md
skills/frontend-incremental-coder/SKILL.md
skills/frontend-e2e-explorer/SKILL.md
skills/skill-evolution-maintainer/SKILL.md
```

Each file only contains a skeleton. Do not write full content.

Unified template:

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

## 7. Rules Skeleton Requirements

Create:

```text
rules/frontend-coding-rules.md
rules/frontend-change-boundary-rules.md
rules/frontend-verification-rules.md
rules/skill-evolution-rules.md
```

Each file only contains a title and Draft status.

Example:

```md
# Frontend Coding Rules

Status: Draft
```

---

## 8. Knowledge Skeleton Requirements

Create:

```text
knowledge/frontend/project-map.md
knowledge/frontend/route-map.md
knowledge/frontend/component-map.md
knowledge/frontend/api-contract-map.md
knowledge/frontend/state-flow-map.md
knowledge/evolution/skill-change-log.md
knowledge/evolution/evidence-index.md
```

Each file only contains a title and Draft status.

---

## 9. Harness Skeleton Requirements

Create:

```text
harness/workflow.md
harness/architecture_guide.md
harness/agent-rules.md
harness/verification-policy.md
harness/skill-evolution-policy.md
harness/migration-guide.md
harness/git-governance.md
```

Each file only contains a title and Draft status.

Note:

`harness/git-governance.md` must exist. It will be used later to formally define Git governance rules.

---

## 10. OpenSpec / Superpower Skeleton Requirements

Create:

```text
openspec/project.md
openspec/config.yaml
openspec/specs/.gitkeep
openspec/changes/.gitkeep
superpower/powers/.gitkeep
superpower/missions/.gitkeep
```

Phase 0 must not create a real OpenSpec change.

`openspec/project.md` should only contain project introduction and Draft status.

`openspec/config.yaml` should remain minimal. Do not introduce complex schemas.

---

## 11. Playwright Requirements

Create:

```text
playwright.config.ts
tests/e2e/smoke.spec.ts
```

Smoke test requirements:

- Start the app.
- Visit `/dashboard`.
- Verify that a `Dashboard` heading exists.

`tests/e2e/smoke.spec.ts` can be similar to:

```ts
import { expect, test } from '@playwright/test';

test('dashboard page is reachable', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible();
});
```

`playwright.config.ts` must configure `webServer` to start the local app through `npm run dev`.

---

## 12. Verification Report

Create:

```text
docs/evidence/phase-0-bootstrap-verification.md
```

Template:

```md
# Phase 0 Bootstrap Verification

## Branch

## Commit List

## Changed Files Summary

## Validation Commands

| Command | Result | Notes |
|---|---|---|

## Known Issues

## Next Phase Recommendation
```

The verification report must record:

- Current branch.
- Commit list.
- Main changed files.
- `npm run build` result.
- `npm run test:e2e` result.
- Known issues.
- Next phase recommendation.

---

## 13. Commit Splitting Requirements

Must split commits as follows. Do not create one large commit.

### Commit 1

```bash
git commit -m "chore: initialize react typescript vite project"
```

Content:

- Vite React TypeScript initialization.
- Basic `package.json`.
- Initial dependencies.
- Must not include Harness / Skill / Rule skeletons.

### Commit 2

```bash
git commit -m "feat: add frontend application shell and placeholder routes"
```

Content:

- `src/app`
- `src/shell`
- `src/domains`
- `PlaceholderPage`
- React Router
- Ant Design base layout
- `/login`
- `/dashboard`
- `/task/list`
- `/task/create`

### Commit 3

```bash
git commit -m "chore: add ai harness and skill governance skeleton"
```

Content:

- `skills`
- `rules`
- `knowledge`
- `harness`
- `openspec`
- `superpower`
- `docs` directory skeleton

### Commit 4

```bash
git commit -m "test: add playwright smoke test foundation"
```

Content:

- `playwright.config.ts`
- `tests/e2e/smoke.spec.ts`
- `test:e2e` script

### Commit 5

```bash
git commit -m "docs: add phase 0 bootstrap verification report"
```

Content:

- `docs/evidence/phase-0-bootstrap-verification.md`

---

## 14. Final Verification

Must execute:

```bash
npm run build
npm run test:e2e
```

If E2E fails because browsers are not installed, execute:

```bash
npx playwright install
npm run test:e2e
```

---

## 15. Final Output Required

After completion, return the following information:

1. Project repository path
2. Current branch
3. Key commands executed
4. Commit list
5. Changed file summary
6. `npm run build` result
7. `npm run test:e2e` result
8. Verification report path
9. SHA of each commit
10. Any unresolved issue

Do not output a generic summary. You must provide real execution results.

---

## 16. Information to Return to ChatGPT After Execution

After the task is complete, paste back the following:

```md
1. 项目仓库路径：
2. 当前分支：
3. 执行命令：
4. Commit 列表：
5. npm run build：
6. npm run test:e2e：
7. 验证报告路径：
8. 提交 SHA：
9. 失败日志 / 未解决问题：
```
