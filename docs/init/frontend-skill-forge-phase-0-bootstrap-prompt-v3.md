# frontend-skill-forge Phase 0 Bootstrap Prompt v3

> Version: v3  
> Purpose: Correct Phase 0 bootstrap plan with the previously agreed unified Harness architecture.  
> Scope: Project initialization, React shell, governance skeleton, OpenSpec/SuperSpec skeleton, Playwright smoke test, and Git evidence.

---

# 1. Task

Bootstrap a new project named:

```text
frontend-skill-forge
```

This is not a normal React demo, not a Todo demo, and not a pure E2E testing project.

The real project goal is:

> A React-first, self-evolving, evidence-driven AI Skill / Rule / Harness system for complex legacy frontend projects.

The project must help AI Agents:

1. Understand complex existing frontend codebases.
2. Perform controlled incremental frontend changes.
3. Explore complex UI pages through Playwright / MCP.
4. Maintain E2E verification assets.
5. Evolve Skill / Rule / Knowledge from code changes, validation failures, evidence, and human feedback.
6. Start with React, but keep the protocol and method portable to non-React frontend projects.

---

# 2. Hard Boundaries

Do not implement unrelated directions.

Forbidden in Phase 0:

- Do not discuss or model Horizon.
- Do not build OpenStack / cloud management domain models.
- Do not build a normal Todo demo.
- Do not add a real backend.
- Do not add a database.
- Do not add Next.js.
- Do not add a micro-frontend runtime.
- Do not create a real OpenSpec change.
- Do not write complete Skill content.
- Do not create large business pages.
- Do not make broad unreviewed changes.

---

# 3. Correct Unified Harness Architecture

## 3.1 Root directory principle

Root directory must only contain:

1. Source code and build/runtime configuration.
2. Tool-specific entry directories that must stay at root.
3. Minimal repository entry files.

AI governance documents must not be scattered at root.

Allowed root-level tool/config entries include:

```text
.claude/
openspec/
src/
tests/
public/
package.json
package-lock.json
vite.config.ts
tsconfig.json
tsconfig.app.json
tsconfig.node.json
eslint.config.js
playwright.config.ts
README.md
.gitignore
```

Forbidden root-level AI document directories:

```text
skills/
rules/
knowledge/
harness/
superpower/
```

These must be placed under the unified `docs/` architecture.

---

## 3.2 Unified docs architecture

Use the previously agreed project governance architecture:

```text
docs/
├── 00-project/
│   ├── README.md
│   ├── project-overview.md
│   ├── current-status.md
│   ├── glossary.md
│   └── roadmap.md
│
├── 01-architecture/
│   ├── README.md
│   ├── architecture-guide.md
│   ├── module-boundary.md
│   ├── route-architecture.md
│   ├── frontend-layering.md
│   └── decisions/
│       └── .gitkeep
│
├── 02-harness/
│   ├── README.md
│   ├── workflow.md
│   ├── agent-rules.md
│   ├── verification-policy.md
│   ├── git-governance.md
│   ├── skill-evolution-policy.md
│   ├── migration-guide.md
│   ├── skills/
│   │   ├── frontend-project-reader/
│   │   │   └── SKILL.md
│   │   ├── frontend-incremental-coder/
│   │   │   └── SKILL.md
│   │   ├── frontend-e2e-explorer/
│   │   │   └── SKILL.md
│   │   └── skill-evolution-maintainer/
│   │       └── SKILL.md
│   ├── rules/
│   │   ├── frontend-coding-rules.md
│   │   ├── frontend-change-boundary-rules.md
│   │   ├── frontend-verification-rules.md
│   │   └── skill-evolution-rules.md
│   └── knowledge/
│       ├── frontend/
│       │   ├── project-map.md
│       │   ├── route-map.md
│       │   ├── component-map.md
│       │   ├── api-contract-map.md
│       │   └── state-flow-map.md
│       └── evolution/
│           ├── skill-change-log.md
│           └── evidence-index.md
│
├── 03-openspec/
│   ├── README.md
│   ├── openspec-usage.md
│   ├── superspec-usage.md
│   ├── change-governance.md
│   └── superpower/
│       ├── README.md
│       ├── powers/
│       │   └── .gitkeep
│       └── missions/
│           └── .gitkeep
│
├── 04-development/
│   ├── README.md
│   ├── local-development.md
│   ├── coding-guide.md
│   ├── testing-guide.md
│   └── evidence-rules.md
│
├── 05-domain/
│   ├── README.md
│   ├── frontend-understanding-domain.md
│   ├── incremental-coding-domain.md
│   └── e2e-exploration-domain.md
│
├── 06-operations/
│   ├── README.md
│   ├── troubleshooting.md
│   └── release-notes.md
│
└── 07-evidence/
    ├── README.md
    └── phase-0-bootstrap-verification.md
```

This structure is mandatory.

Do not replace it with a flat `docs/ai/` directory.

---

# 4. OpenSpec / SuperSpec Root Tooling

The root `openspec/` directory is allowed because it is a tool entrypoint.

Create:

```text
openspec/
├── project.md
├── config.yaml
├── specs/
│   └── .gitkeep
├── changes/
│   └── .gitkeep
└── schemas/
    └── superspec/
        └── .gitkeep
```

Phase 0 must introduce SuperSpec skeleton.

`openspec/config.yaml` must include a minimal SuperSpec default declaration.

Use a minimal shape like:

```yaml
project: frontend-skill-forge
schema:
  default: superspec
```

Do not introduce complex schema content in Phase 0.

Do not create a real OpenSpec change.

---

# 5. Superpower Governance Location

Do not create root-level `superpower/`.

Superpower governance documents belong under:

```text
docs/03-openspec/superpower/
```

Create:

```text
docs/03-openspec/superpower/
├── README.md
├── powers/
│   └── .gitkeep
└── missions/
    └── .gitkeep
```

This keeps Superpower as part of the OpenSpec/SuperSpec governance layer, not an independent root-level AI document system.

---

# 6. Phase 0 Technical Stack

Use:

- React
- TypeScript
- Vite
- React Router
- Ant Design
- Playwright
- Playwright test runner
- Markdown / YAML knowledge assets

Do not use:

- Next.js
- Real backend
- Database
- Micro-frontend runtime
- Complex schema
- Real OpenSpec change

---

# 7. Bootstrap Commands

If the project does not exist:

```bash
npm create vite@latest frontend-skill-forge -- --template react-ts
cd frontend-skill-forge
npm install
```

If the project already exists, continue in the existing directory. Do not overwrite uncommitted work.

Install dependencies:

```bash
npm install react-router antd
npm install -D playwright @playwright/test
npx playwright install
```

`package.json` must include at least:

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

# 8. Git Governance

This is a hard gate.

Do not commit directly to `main`.

Create or switch to:

```bash
git checkout -b bootstrap/frontend-skill-forge-foundation
```

If the branch already exists:

```bash
git checkout bootstrap/frontend-skill-forge-foundation
```

Rules:

1. One phase, one branch.
2. One task, one clear commit.
3. Every commit must be traceable.
4. Every commit must be rollback-safe.
5. Every commit must have validation evidence.
6. Check diff before every commit.
7. Do not mix source code, Harness docs, OpenSpec/SuperSpec tooling, tests, and evidence in one commit.
8. Do not commit unverified changes.

Before every commit, run:

```bash
git status --short
git diff --stat
git diff --name-only
```

Final validation must run:

```bash
npm run build
npm run test:e2e
```

---

# 9. React Source Structure

Create the React shell structure:

```text
src/
├── app/
│   ├── App.tsx
│   ├── router.tsx
│   └── providers.tsx
├── shell/
│   ├── layout/
│   │   └── AppLayout.tsx
│   └── navigation/
│       └── SidebarNavigation.tsx
├── domains/
│   ├── auth/
│   │   └── pages/
│   │       └── LoginPage.tsx
│   ├── dashboard/
│   │   └── pages/
│   │       └── DashboardPage.tsx
│   └── task/
│       └── pages/
│           ├── TaskListPage.tsx
│           └── TaskCreatePage.tsx
├── capabilities/
│   └── .gitkeep
├── adapters/
│   └── .gitkeep
├── variants/
│   └── .gitkeep
├── testability/
│   └── .gitkeep
└── shared/
    └── ui/
        └── PlaceholderPage.tsx
```

Routes:

```text
/login
/dashboard
/task/list
/task/create
```

Requirements:

- Use React Router.
- Use Ant Design.
- `/login` can be outside the main layout.
- `/dashboard`, `/task/list`, `/task/create` must use `AppLayout`.
- `DashboardPage` must render a heading named `Dashboard`.
- Pages only need placeholders.
- Do not implement complex business logic.

---

# 10. Skill Skeleton

Create Skill skeletons under `docs/02-harness/skills/`.

Files:

```text
docs/02-harness/skills/frontend-project-reader/SKILL.md
docs/02-harness/skills/frontend-incremental-coder/SKILL.md
docs/02-harness/skills/frontend-e2e-explorer/SKILL.md
docs/02-harness/skills/skill-evolution-maintainer/SKILL.md
```

Each `SKILL.md` must use this minimal template:

```md
# <Skill Name>

Status: Draft

Purpose:

Scope:

Inputs:

Outputs:

Rules:
```

Do not write full Skill content in Phase 0.

---

# 11. Rule Skeleton

Create under `docs/02-harness/rules/`:

```text
docs/02-harness/rules/frontend-coding-rules.md
docs/02-harness/rules/frontend-change-boundary-rules.md
docs/02-harness/rules/frontend-verification-rules.md
docs/02-harness/rules/skill-evolution-rules.md
```

Each file only needs:

```md
# <Rule Name>

Status: Draft
```

---

# 12. Knowledge Skeleton

Create under `docs/02-harness/knowledge/`:

```text
docs/02-harness/knowledge/frontend/project-map.md
docs/02-harness/knowledge/frontend/route-map.md
docs/02-harness/knowledge/frontend/component-map.md
docs/02-harness/knowledge/frontend/api-contract-map.md
docs/02-harness/knowledge/frontend/state-flow-map.md
docs/02-harness/knowledge/evolution/skill-change-log.md
docs/02-harness/knowledge/evolution/evidence-index.md
```

Each file only needs:

```md
# <Knowledge Asset Name>

Status: Draft
```

---

# 13. Harness Skeleton

Create under `docs/02-harness/`:

```text
docs/02-harness/workflow.md
docs/02-harness/agent-rules.md
docs/02-harness/verification-policy.md
docs/02-harness/git-governance.md
docs/02-harness/skill-evolution-policy.md
docs/02-harness/migration-guide.md
```

Each file only needs:

```md
# <Harness Asset Name>

Status: Draft
```

`docs/02-harness/git-governance.md` is mandatory.

---

# 14. Project Governance Docs

Create the required README / placeholder files for all governance directories.

Minimum required files:

```text
docs/00-project/README.md
docs/00-project/project-overview.md
docs/00-project/current-status.md
docs/00-project/glossary.md
docs/00-project/roadmap.md

docs/01-architecture/README.md
docs/01-architecture/architecture-guide.md
docs/01-architecture/module-boundary.md
docs/01-architecture/route-architecture.md
docs/01-architecture/frontend-layering.md
docs/01-architecture/decisions/.gitkeep

docs/02-harness/README.md

docs/03-openspec/README.md
docs/03-openspec/openspec-usage.md
docs/03-openspec/superspec-usage.md
docs/03-openspec/change-governance.md

docs/04-development/README.md
docs/04-development/local-development.md
docs/04-development/coding-guide.md
docs/04-development/testing-guide.md
docs/04-development/evidence-rules.md

docs/05-domain/README.md
docs/05-domain/frontend-understanding-domain.md
docs/05-domain/incremental-coding-domain.md
docs/05-domain/e2e-exploration-domain.md

docs/06-operations/README.md
docs/06-operations/troubleshooting.md
docs/06-operations/release-notes.md

docs/07-evidence/README.md
docs/07-evidence/phase-0-bootstrap-verification.md
```

Each placeholder file must have a meaningful title and `Status: Draft`.

---

# 15. Playwright

Create:

```text
playwright.config.ts
tests/e2e/smoke.spec.ts
tests/fixtures/.gitkeep
```

Smoke test requirement:

1. Start the app.
2. Visit `/dashboard`.
3. Verify a visible heading named `Dashboard`.

Example:

```ts
import { expect, test } from '@playwright/test';

test('dashboard page is reachable', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible();
});
```

`playwright.config.ts` must configure `webServer` using `npm run dev`.

---

# 16. Commit Plan

Do not create one large commit.

Use the following commit split.

## Commit 1

```bash
git commit -m "chore: initialize react typescript vite project"
```

Scope:

- Vite React TypeScript project
- Package setup
- Base install files only

## Commit 2

```bash
git commit -m "feat: add frontend application shell and placeholder routes"
```

Scope:

- `src/app`
- `src/shell`
- `src/domains`
- `src/shared`
- Placeholder routing
- Ant Design shell

## Commit 3

```bash
git commit -m "harness: add unified docs governance skeleton"
```

Scope:

- `docs/00-project`
- `docs/01-architecture`
- `docs/02-harness`
- `docs/04-development`
- `docs/05-domain`
- `docs/06-operations`
- `docs/07-evidence`
- Skill / Rule / Knowledge skeletons under `docs/02-harness`

## Commit 4

```bash
git commit -m "spec: add openspec superspec and superpower skeleton"
```

Scope:

- Root `openspec/`
- `openspec/schemas/superspec`
- `docs/03-openspec`
- `docs/03-openspec/superpower`

## Commit 5

```bash
git commit -m "test: add playwright smoke test foundation"
```

Scope:

- `playwright.config.ts`
- `tests/e2e/smoke.spec.ts`
- `tests/fixtures/.gitkeep`
- `test:e2e` script

## Commit 6

```bash
git commit -m "docs: add phase 0 bootstrap verification report"
```

Scope:

- `docs/07-evidence/phase-0-bootstrap-verification.md`

---

# 17. Verification Report

Create:

```text
docs/07-evidence/phase-0-bootstrap-verification.md
```

Use this template:

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

## Known Issues

## Next Phase Recommendation
```

The report must include:

1. Current branch.
2. Commit list.
3. Changed files summary.
4. `npm run build` result.
5. `npm run test:e2e` result.
6. Root directory governance validation.
7. SuperSpec skeleton validation.
8. Known issues.
9. Next phase recommendation.

---

# 18. Mandatory Validation Commands

Run:

```bash
npm run build
npm run test:e2e
```

If E2E fails because browsers are not installed:

```bash
npx playwright install
npm run test:e2e
```

Also run directory governance checks:

```bash
test ! -d skills
test ! -d rules
test ! -d knowledge
test ! -d harness
test ! -d superpower
test -d docs/02-harness/skills
test -d docs/02-harness/rules
test -d docs/02-harness/knowledge
test -d docs/03-openspec/superpower
test -d openspec/schemas/superspec
```

On Windows PowerShell, use equivalent checks:

```powershell
if (Test-Path skills) { throw "Root skills directory is forbidden" }
if (Test-Path rules) { throw "Root rules directory is forbidden" }
if (Test-Path knowledge) { throw "Root knowledge directory is forbidden" }
if (Test-Path harness) { throw "Root harness directory is forbidden" }
if (Test-Path superpower) { throw "Root superpower directory is forbidden" }

if (-not (Test-Path docs/02-harness/skills)) { throw "Missing docs/02-harness/skills" }
if (-not (Test-Path docs/02-harness/rules)) { throw "Missing docs/02-harness/rules" }
if (-not (Test-Path docs/02-harness/knowledge)) { throw "Missing docs/02-harness/knowledge" }
if (-not (Test-Path docs/03-openspec/superpower)) { throw "Missing docs/03-openspec/superpower" }
if (-not (Test-Path openspec/schemas/superspec)) { throw "Missing openspec/schemas/superspec" }
```

---

# 19. Final Output Required

Return only factual execution results.

Must include:

1. Project repository path.
2. Current branch.
3. Key commands executed.
4. Commit list.
5. Changed file summary.
6. `npm run build` result.
7. `npm run test:e2e` result.
8. Directory governance check result.
9. SuperSpec skeleton check result.
10. Verification report path.
11. Commit SHAs.
12. Any unresolved issue.

Do not provide vague summaries.
Do not claim success without command output.
