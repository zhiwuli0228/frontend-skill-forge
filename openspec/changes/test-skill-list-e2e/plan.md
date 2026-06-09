# Plan: E2E Test for SkillListPage

Status: Draft

## Purpose

Execute automated E2E verification for SkillListPage using Playwright MCP and the existing `tests/e2e/` framework. No source code changes required — this is a test-only change.

## Execution Sequence

| Order | Objective | Depends On | Output |
|---|---|---|---|
| 1 | Resolve route and component structure from knowledge maps | (none) | route-map row #8 + component-map rows #7,#13-#17 confirmed |
| 2 | Extract testable elements from source code | 1 | 18 data-testid + 4 scenario states + 8 interaction types |
| 3 | Generate spec.md with scenarios | 2 | `specs/skill-list-e2e/spec.md` (9 requirements, 20 scenarios) |
| 4 | Write Playwright E2E spec file | 2, 3 | `tests/e2e/skill-list-verification.spec.ts` |
| 5 | Run E2E suite for the new spec | 4 | pass/fail output + HTML report |
| 6 | Capture evidence and write verify.md | 5 | `verify.md` with actual results + screenshots |

## Skill Dispatch Plan

| Step | Skill | Scope Boundary | Deliverable |
|---|---|---|---|
| 1–3 | `frontend-test-spec-generator` | Read-only: source code analysis + knowledge map cross-reference + scenario generation | spec.md, plan.md, tasks.md |
| 4 | `frontend-incremental-coder` | Write E2E test file only; no source code changes to `src/` | `tests/e2e/skill-list-verification.spec.ts` |
| 5–6 | `frontend-e2e-explorer` | Execute `npm run test:e2e`, capture evidence screenshots per scenario state | verify.md + screenshots in `artifacts/validation/` |

## MCP And Tool Plan

| Step | Tool / MCP | Target | Evidence |
|---|---|---|---|
| 2 (optional) | Playwright MCP `browser_snapshot` | `/skill/list/all` | Page State Summary confirming element visibility |
| 5 | `npm run test:e2e -- tests/e2e/skill-list-verification.spec.ts` | New spec | HTML report, pass/fail exit code |
| 6 | Playwright MCP screenshots | `/skill/list/all` states | PNG screenshots per scenario state |

## Verification Plan

- **E2E spec files to add**: `tests/e2e/skill-list-verification.spec.ts`
- **Browser flows to execute**:
  1. Page initial render — heading, filter bar, grid, scenario selector (loaded default)
  2. Scenario state switching — loading → empty → error → retry → loaded
  3. Search filter — type keyword → verify narrow → clear → verify restore
  4. Category filter — select "Text" → verify narrow → select "All" → verify restore
  5. Tags filter — select "nlp" → verify narrow → deselect → verify restore
  6. Sort — switch "Name" ↔ "Category" → verify order change
  7. View mode toggle — grid→list→grid with visibility assertions per mode
  8. Card click → detail modal open → verify fields → close → return to list
  9. List item click → detail modal open → close → return to list
  10. URL filter param — navigate `/skill/list/text` → sidebar indicator + data filtered
  11. User category overrides sidebar — nav `/skill/list/text` → select "Image" → image data shown
- **Evidence files to capture**:
  - `artifacts/validation/screenshots/skill-list-loaded.png`
  - `artifacts/validation/screenshots/skill-list-loading.png`
  - `artifacts/validation/screenshots/skill-list-empty.png`
  - `artifacts/validation/screenshots/skill-list-error.png`
  - `artifacts/validation/screenshots/skill-list-grid-view.png`
  - `artifacts/validation/screenshots/skill-list-list-view.png`
  - `artifacts/validation/screenshots/skill-list-detail-modal.png`
  - `artifacts/validation/playwright-html/skill-list-verification/`
- **Failure conditions that must block completion**:
  - Any scenario returning non-zero exit from `test:e2e`
  - Missing data-testid element (selector assertion failure)
  - Page crash or blank render (console error detection)
  - Modal failing to open on card click
  - URL filter not driving sidebar indicator

## Exit Criteria

1. spec.md has 9 requirements with 20 GIVEN/WHEN/THEN scenarios covering all 8 interaction types
2. tasks.md has executable checklist items across 4 sections (Discovery → Impl → E2E → Gates)
3. `npm run test:e2e -- tests/e2e/skill-list-verification.spec.ts` passes (all 20 scenarios)
4. Evidence screenshots saved for all 7 key states
5. No regressions in existing 35 E2E specs
6. verify.md updated with actual pass/fail per scenario and conclusions
