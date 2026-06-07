# E2E Evidence Driven Loop Verification

Last Updated: 2026-06-08
Status: Verified
Run ID: 2026-06-08-e2e-fixture-driven-loop

## Purpose

Document the verification of the fixture-driven E2E testing loop introduced in this commit. The goal is to confirm that:

1. Fixture data can be loaded by Playwright tests
2. Tests assert against fixture expectations instead of hardcoded strings
3. Testability helpers are usable from the `src/testability` module
4. Lint, build, and e2e commands all pass

## Scope

- 4 refactored Playwright spec files
- 3 new helper modules in `src/testability/`
- 18 fixture files across 4 domains
- 2 new contract docs

## Verification Steps

### 1. Lint

```bash
npm run lint
```

Expected: 0 errors, 0 warnings.

### 2. Build

```bash
npm run build
```

Expected: TypeScript compilation succeeds, Vite bundle generated under `dist/`.

### 3. E2E

```bash
npm run test:e2e
```

Expected: All fixture-driven specs pass.

## Fixture Coverage Matrix

| Domain | Page | Loaded | Empty | Error |
|--------|------|--------|-------|-------|
| skill | `/skill/list/all` | yes | yes | yes |
| task | `/task/list/all` | yes | yes | yes |
| task | `/task/templates` | yes | yes | yes |
| skill | `/skill/market` | yes | n/a | n/a |
| skill | `/skill/versions` | yes | n/a | n/a |
| task | `/task/board` | yes | n/a | n/a |
| workflow | `/workflow/list/all` | yes | n/a | n/a |
| workflow | `/workflow/editor` | yes | n/a | n/a |
| workflow | `/workflow/history` | yes | n/a | n/a |
| insight | `/dashboard` | yes | n/a | n/a |
| insight | `/insight/reports` | yes | n/a | n/a |
| insight | `/insight/export` | yes | n/a | n/a |

## Testability Helpers

### `src/testability/selectors.ts`

Defines a stable selector registry with priority metadata. The registry covers 21 selectors across 4 pages and exposes `getSelector(id)` and `listSelectors()` helpers.

### `src/testability/fixture.ts`

Loads a JSON fixture from `tests/fixtures/`, validates its top-level shape, and returns a typed `ScenarioFixture`. Throws on missing or malformed fields.

### `src/testability/evidence.ts`

Builds deterministic artifact paths and `finding.md` content for any run. Pure functions, no I/O, safe to call from tests.

### `src/testability/index.ts`

Re-exports the public surface. Tests and frontend agents should import from this entry point.

## Refactored Specs

| File | Specs | Fixture used |
|------|-------|--------------|
| `tests/e2e/skill-list-fixture.spec.ts` | 3 | skill-list.json, skill-list-empty.json, skill-list-error.json |
| `tests/e2e/task-list-fixture.spec.ts` | 3 | task-list.json, task-list-empty.json, task-list-error.json |
| `tests/e2e/workflow-list-fixture.spec.ts` | 1 | workflow-list.json |
| `tests/e2e/dashboard-fixture.spec.ts` | 1 | dashboard.json |

## Results

| Check | Outcome |
|-------|---------|
| Lint | pass |
| Build | pass |
| E2E (fixture specs) | pass |
| Existing E2E specs | unchanged |

## Findings

- The fixture loader is intentionally duplicated between `src/testability/fixture.ts` (for source-side consumers) and `tests/helpers/fixture-loader.ts` (for Playwright test files). This is required because `tsc -b` does not type-check files under `tests/` and Playwright test runners expect local helpers.
- `data-testid` and `role` selectors coexist in the registry. The `priority` field documents which to try first; tests should follow the same order.

## Next Step

With the loop in place, the next iteration should:

1. Generate HTML reports and traces for every fixture run under `artifacts/validation/`
2. Wire `finding.md` emission into a custom Playwright reporter
3. Use the selector registry in `frontend-e2e-explorer` skill so the agent can pick selectors without re-discovering them
