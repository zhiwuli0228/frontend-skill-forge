# Project Map

Status: Populated (V3.1)
Last Updated: 2026-06-07

## Purpose

Top-level overview of the frontend-skill-forge repository. Read this first to understand the module structure, dependencies, and where to add new code.

## High-Level Layout

```text
frontend-skill-forge/
├── src/
│   ├── app/              ← App composition (router, providers, App.tsx)
│   ├── shell/            ← App shell (layout, navigation)
│   │   ├── layout/       ← GlobalShell, ModuleLayout
│   │   ├── navigation/   ← ModuleSwitcher, TopTabNavigation, SidebarNavigation
│   │   └── config/       ← moduleConfig.tsx (module + sidebar definitions)
│   ├── domains/          ← Business pages by module
│   │   ├── auth/
│   │   ├── dashboard/    ← legacy, redirects to /task/list
│   │   ├── task/         ← 4 pages + 12 sub-components
│   │   ├── skill/        ← 4 pages + 7 sub-components
│   │   ├── workflow/     ← 4 pages, no domain sub-components
│   │   ├── insight/      ← 4 pages, no domain sub-components
│   │   └── settings/     ← 4 pages, no domain sub-components
│   ├── shared/           ← Shared UI primitives (PlaceholderPage, etc.)
│   ├── capabilities/     ← (empty — reserved for V4+)
│   ├── adapters/         ← (empty — reserved for V4+)
│   ├── variants/         ← (empty — reserved for V4+)
│   └── testability/      ← (empty — reserved for V4+)
├── tests/
│   └── e2e/              ← 25 Playwright spec files (181 tests)
├── docs/                 ← Governance and evidence
│   ├── 00-project/       ← Project overview, roadmap, status, glossary
│   ├── 01-architecture/  ← Architecture blueprint, layering, boundaries
│   ├── 02-harness/       ← General AI Harness + skills/rules/knowledge
│   ├── 03-openspec/      ← OpenSpec / SuperSpec / Superpower usage
│   ├── 04-development/   ← Coding, testing, evidence rules
│   ├── 05-domain/        ← Problem-space concept docs
│   ├── 06-operations/    ← Release notes, troubleshooting
│   ├── 07-evidence/      ← Phase verification reports
│   ├── 08-frontend-agent/← Frontend-specific governance (MCP, evidence, evolution)
│   └── 09-change-records/← V0/V1/V2/V3 baselines, releases, summaries, retros
├── openspec/             ← OpenSpec CLI tool data
│   ├── changes/          ← Active and archived change proposals
│   ├── schemas/          ← Schema definitions (superspec)
│   └── specs/            ← Current capability specs
├── playwright.config.ts
├── vite.config.ts
├── package.json
└── tsconfig*.json
```

## Module Summary

| Module | Purpose | Routes | Pages | Sub-Components | E2E Specs | Mock Data | Sidebar Items |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **auth** | Login surface (single page) | 1 | 1 | 0 | 0 | (none) | 0 |
| **dashboard** | Legacy dashboard, redirects to /task/list | 0 (redirect) | 1 | 3 | 1 | `dashboard/data/mock-data.ts` | 0 |
| **task** | Task lifecycle: list, create, templates, board | 4 | 4 | 12 | 4 | `task/data/mock-data.ts`, `task/data/template-mock-data.ts` | 5 (all, open, in-progress, completed, archived) |
| **skill** | Skill library: list, market, config, versions | 4 | 4 | 7 | 4 | `skill/data/skill-mock-data.ts` | 5 (all, text, image, data, tool) |
| **workflow** | Workflow: list, editor, history, schedule | 4 | 4 | 0 | 4 | `workflow/data/workflow-mock-data.ts` | 4 (all, active, inactive, draft) |
| **insight** | Data insight: overview, reports, analysis, export | 4 | 4 | 0 | 4 | `insight/data/insight-mock-data.ts` | 5 (all, today, week, month, quarter) |
| **settings** | System settings: users, permissions, params, logs | 4 | 4 | 0 | 4 | `settings/data/settings-mock-data.ts` | 4 (users, security, system config, audit logs) |

## Module-to-Route Map

```text
auth          /login
dashboard     (no direct route; /dashboard redirects to /task/list/all)
task          /task/list/:filter?, /task/create, /task/templates, /task/board
skill         /skill/list/:filter?, /skill/market, /skill/config, /skill/versions
workflow      /workflow/list/:filter?, /workflow/editor, /workflow/history, /workflow/schedule
insight       /insight/overview/:filter?, /insight/reports, /insight/analysis, /insight/export
settings      /settings/users, /settings/permissions, /settings/params, /settings/logs
```

## Key Files Outside `src/`

| File | Purpose | When to modify |
| --- | --- | --- |
| `src/app/router.tsx` | Defines all routes | Adding a new route or modifying route params |
| `src/shell/config/moduleConfig.tsx` | Module + sidebar definitions | Adding a new module, changing sidebar items |
| `src/app/providers.tsx` | Wraps app with context providers | Adding a new global provider |
| `playwright.config.ts` | Playwright config (base URL, webServer) | Adjusting e2e settings |
| `vite.config.ts` | Vite build config | Adjusting build settings |
| `eslint.config.js` | ESLint rules (includes react-hooks) | Adding a lint rule |
| `openspec/project.md` | OpenSpec project config | (rare) |
| `openspec/schemas/superspec/` | Superspec schema | Adding a new artifact type |
| `package.json` | Dependencies and scripts | Adding a dependency |

## Dependency Stack

- **Runtime**: React 19, React Router 7, Ant Design 6, TypeScript 6
- **Build**: Vite 8
- **Test**: Playwright
- **Lint**: ESLint with `react-hooks` plugin
- **No state management library**: only `useState` / `useReducer` / `useMemo` (intentional — see blueprint §19)
- **No HTTP client**: mock data is the only data source (intentional — see blueprint §2)

## Branching Strategy (per `docs/01-architecture` §15)

```text
main or master      stable
bootstrap/*         initialization (done)
harness/*           harness governance changes
evidence/*          evidence collection
test/*              e2e changes
docs/*              documentation-only
feature/*           runtime feature
fix/*               bug fix
experiment/*        exploration
```

The current V2 work was committed directly to `master` (this is a single-developer exploration repo, not a multi-PR project). The branching rules are documented but not yet enforced.

## Test Coverage Snapshot (V2.10)

- **25 spec files** under `tests/e2e/`
- **181 tests** total
- **216 unique `data-testid`** values
- **31 unique Ant Design components** imported
- **5 mock-data files** with 135 records total
- **23 page components** (22 actual routes + DashboardPage as legacy)

## Adding a New Page (canonical steps)

1. Add a mock-data interface and data to the appropriate `src/domains/<module>/data/` file
2. Add a page component to `src/domains/<module>/pages/`
3. Add sub-components to `src/domains/<module>/components/` if needed
4. Register the route in `src/app/router.tsx`
5. If the page should appear in the sidebar, add an entry to `moduleConfig.sidebarMenu` in `src/shell/config/moduleConfig.tsx`
6. Add an e2e spec to `tests/e2e/` following the scenario-selector pattern
7. Update `route-map.md` and `component-map.md` (this map)
8. Add the new mock data to `api-contract-map.md`
