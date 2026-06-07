# E2E Baseline Stabilization Report

Last Updated: 2026-06-08
Status: Verified
Run ID: 2026-06-08-e2e-baseline-stabilize

## Purpose

Document the stabilization of the full Playwright E2E baseline after the V9 fixture-driven loop landed. Before this change, one pre-existing test was failing; after the fix, the entire suite is green so future agents can treat test failures as meaningful regression signals instead of legacy noise.

## Failing Test Before Fix

- **Spec file**: `tests/e2e/ui-validation-task-templates.spec.ts`
- **Test name**: `task templates real interaction validation`
- **Line**: `tests/e2e/ui-validation-task-templates.spec.ts:61`

### Original Assertion

```ts
await previewDialog.getByRole('button', { name: /close/i }).click();
```

### Failure Output

```text
locator.click: Error: strict mode violation:
getByRole('dialog').getByRole('button', { name: /close/i }) resolved to 2 elements:
    1) <button type="button" aria-label="Close" class="ant-modal-close">…</button>
       aka getByRole('button', { name: 'Close' }).first()
    2) <button type="button" class="ant-btn …">Close</button>
       aka locator('button').filter({ hasText: 'Close' })
```

### Evidence Path

- `test-results/ui-validation-task-templat-d4cf3-real-interaction-validation/error-context.md`
- `test-results/ui-validation-task-templat-d4cf3-real-interaction-validation/trace.zip`

## Root Cause

Test-side selector ambiguity. `TemplatePreviewModal` renders two close affordances:

1. The default Ant Design X button (`aria-label="Close"`, class `ant-modal-close`).
2. An explicit footer `<Button>Close</Button>` defined in `TemplatePreviewModal.tsx:36-38`.

Both have the accessible name "Close" (case-insensitive). The selector `name: /close/i` matched both, and Playwright's strict mode refused to click an ambiguous locator.

This is **not a product defect** — both buttons correctly close the modal. The two affordances are intentional (X for keyboard users, footer button for pointer users). The test was the unstable side.

## Classification

- Type: **outdated test expectation / unstable selector**
- Product side changes required: none
- Test side change required: yes

## Fix Applied

```diff
- await previewDialog.getByRole('button', { name: /close/i }).click();
+ await previewDialog.getByRole('button', { name: /close/i }).first().click();
```

The Ant Design X close button is always the first matching element in the DOM, so `.first()` selects the intended affordance deterministically.

### Why This Fix

- Smallest possible diff (1 character class).
- No product code change.
- No new CSS selector.
- No new testid.
- No timeout sleep.
- No new dependency.
- Reuses the existing role-based selector.

## Changed Files

| File | Change |
|------|--------|
| `tests/e2e/ui-validation-task-templates.spec.ts` | Added `.first()` to ambiguous close-button selector (1 line) |

No product files touched. No fixture files touched. No testability helpers touched.

## Verification Commands

```bash
npm run lint
npm run build
npm run test:e2e
```

## Final Result

| Check | Outcome |
|-------|---------|
| `npm run lint` | pass (0 errors, 0 warnings) |
| `npm run build` | pass (tsc + vite, bundle 2.49 MB / gzip 626 kB) |
| `npm run test:e2e` | 196 passed, 1 skipped, 0 failed |
| Previously failing test (`ui-validation-task-templates`) | pass |

### Suite Composition

- 4 fixture-driven specs (V9): 8 tests
- 19 runtime-baseline specs: ~150 tests
- 5 UI validation specs (V8): 5 tests
- Other: remaining tests
- Total: 197 tests; 196 pass, 1 skipped (intentional, not a regression)

## Remaining Risks

- The modal still has two "close" affordances. If a future agent adds a third button whose accessible name contains "close", the same selector will become ambiguous again. Mitigation candidates: add a `data-testid` to the X button and reference it from the selector registry, or use `getByLabel('Close', { exact: true })` once Ant Design guarantees only the X uses that exact label.
- The fix relies on DOM order, which Ant Design currently preserves. If a future Ant Design upgrade reshuffles modal internals, the test may need a more explicit selector.
- The 1 skipped test (in the runtime baseline) was skipped before this change and is unrelated; it should be reviewed separately if a full green baseline is required.

## Follow-up Suggestions

1. Add an entry to `src/testability/selectors.ts` for `task-templates.modal-close-x` so future tests pick it from the registry.
2. Extend the fixture contract to include `actions` describing which affordance to use when multiple exist for the same intent.
3. Add a small lint rule (or pre-commit hook) that flags `getByRole(...).click()` calls without `.first()` or `.nth(...)` when used inside `getByRole('dialog')`.
