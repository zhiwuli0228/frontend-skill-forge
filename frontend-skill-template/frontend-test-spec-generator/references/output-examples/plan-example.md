# Plan Example: SkillListPage

This is an annotated example of a generated `plan.md` for SkillListPage E2E verification.

---

# Plan: E2E Test for SkillListPage

Status: Draft

## Purpose

Execute automated E2E verification for SkillListPage using Playwright MCP and the existing test framework. No source code changes required.

## Execution Sequence

| Order | Objective | Depends On | Output |
|---|---|---|---|
| 1 | Resolve route and component structure | (none) | route-map + component-map entries confirmed |
| 2 | Extract testable elements from source | 1 | Element table (12 elements, 7 scenario groups) |
| 3 | Generate spec.md with scenarios | 2 | `specs/skill-list-e2e/spec.md` (6 requirements, 13 scenarios) |
| 4 | Write Playwright E2E spec file | 2, 3 | `tests/e2e/skill-list-verification.spec.ts` |
| 5 | Run E2E suite for the new spec | 4 | Pass/fail + evidence artifacts |
| 6 | Capture evidence and write verify.md | 5 | `verify.md` with actual results |

## Skill Dispatch Plan

| Step | Skill | Scope Boundary | Deliverable |
|---|---|---|---|
| 1–3 | `frontend-test-spec-generator` | Read-only: source analysis + map cross-reference | spec.md, plan.md, tasks.md |
| 4 | `frontend-incremental-coder` | Write E2E test file only; no source changes | `tests/e2e/skill-list-verification.spec.ts` |
| 5–6 | `frontend-e2e-explorer` | Execute test via `npm run test:e2e`, capture evidence | verify.md + screenshots |

## MCP And Tool Plan

| Step | Tool / MCP | Target | Evidence |
|---|---|---|---|
| 2 (optional) | Playwright MCP `browser_snapshot` | `/skill/list/all` | Page State Summary (confirms element visibility) |
| 5 | `npm run test:e2e -- tests/e2e/skill-list-verification.spec.ts` | New spec file | HTML report, pass/fail output |
| 6 | Playwright MCP `browser_snapshot` | `/skill/list/all` post-test | Screenshot of loaded state |

## Verification Plan

- E2E spec files to add: `tests/e2e/skill-list-verification.spec.ts`
- Browser flows to execute:
  1. Page initial render (loaded/loading/empty/error states)
  2. Search filter interaction
  3. Category filter interaction
  4. Grid/list view toggle
  5. Card click → detail modal → close
  6. URL filter parameter (`/skill/list/text`)
- Evidence files to capture:
  - `artifacts/validation/screenshots/skill-list-loaded.png`
  - `artifacts/validation/screenshots/skill-list-loading.png`
  - `artifacts/validation/screenshots/skill-list-empty.png`
  - `artifacts/validation/screenshots/skill-list-error.png`
  - `artifacts/validation/screenshots/skill-list-detail-modal.png`
  - `artifacts/validation/playwright-html/skill-list-report/`
- Failure conditions:
  - Any scenario not passing (non-zero exit from `test:e2e`)
  - Missing data-testid element (selector assertion failure)
  - Page crash or blank render (console error detection)

## Exit Criteria

1. spec.md has complete GIVEN/WHEN/THEN for all 7 scenario groups
2. tasks.md has executable checklist items across 4 sections
3. `npm run test:e2e -- tests/e2e/skill-list-verification.spec.ts` passes (all 13 scenarios)
4. Evidence artifacts saved under `artifacts/validation/`
5. verify.md updated with actual pass/fail results and conclusions
