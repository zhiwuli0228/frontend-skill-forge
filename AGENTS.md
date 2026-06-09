# Repository Guidelines

## Project Structure & Module Organization
This repository is a Vite + React + TypeScript frontend. Source code lives in `src/`:
- `src/main.tsx` bootstraps the app.
- `src/app/` contains app shell, router, and providers.
- `src/shell/` holds shared layout/navigation UI.
- `src/domains/` groups feature code by domain, such as `auth/`, `dashboard/`, and `task/`.
- `src/shared/` is for reusable UI and utilities.

Static assets belong in `src/assets/` or `public/`. Documentation and process guidance live under `docs/`. End-to-end tests are in `tests/e2e/`.

## Build, Test, and Development Commands
- `npm run dev`: start the Vite dev server with HMR.
- `npm run build`: type-check the app and produce a production bundle.
- `npm run lint`: run ESLint across the repository.
- `npm run preview`: serve the production build locally.
- `npm run test:e2e`: run Playwright E2E tests in `tests/e2e/`.

## Coding Style & Naming Conventions
Use TypeScript and React function components. Follow the existing ESLint setup in `eslint.config.js`; there is no separate formatter configured here, so keep diffs consistent with surrounding code. Use 2-space indentation, `PascalCase` for components and pages, and `camelCase` for variables, functions, and hooks. Prefer domain-based filenames such as `TaskListPage.tsx` and colocate page-specific logic with the owning domain.

## Testing Guidelines
This repo currently relies on Playwright for browser coverage. Keep smoke and regression scenarios in `tests/e2e/`, and name specs with the `*.spec.ts` pattern, for example `smoke.spec.ts`. Add or update E2E coverage when changing routing, navigation, or critical user flows. Run `npm run test:e2e` before merging changes that affect UI behavior.

## Commit & Pull Request Guidelines
Recent commits use short, imperative subjects, often prefixed by scope or type, such as `test: add playwright smoke test foundation` or `docs: update governance index`. Keep commit messages concise and descriptive. Pull requests should include a brief summary, the commands you ran, and screenshots or recordings for visible UI changes. Link related issues or specs when applicable.

## Agent-Specific Notes
Before changing behavior, inspect the relevant docs in `docs/` and keep changes aligned with the repository’s harness and evidence workflow. Avoid introducing unrelated refactors in the same change set.

## Playwright MCP Context Guard

When using Playwright MCP, follow these hard rules:

1. Do not paste raw DOM, full browser snapshots, accessibility trees, trace dumps, console dumps, or network dumps into the conversation or docs.
2. After every `browser_snapshot`, immediately convert the result into a compact Page State Summary.
3. Use the Page State Summary as the working context, not the raw snapshot.
4. Store large evidence under `artifacts/playwright/`.
5. Treat Playwright element refs as temporary. Refs are valid only for the current snapshot.
6. Do not reuse refs after a new snapshot, navigation, refresh, modal/drawer change, or page state change.
7. Prefer semantic anchors over refs: route, page name, region, role, label, visible text, and stable test id.
8. Do not repeatedly snapshot the same page unless the page state changed or failure diagnosis requires it.
9. Stop UI exploration once enough evidence is collected.
10. If context budget is at risk, summarize before continuing.
