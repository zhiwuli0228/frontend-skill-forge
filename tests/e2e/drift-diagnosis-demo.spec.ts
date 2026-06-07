import { expect, test } from '@playwright/test';

// V3.4 Drift Diagnosis Demo
// ------------------------
// This spec demonstrates the failure-diagnosis workflow documented in
// docs/08-frontend-agent/evidence/failure-diagnoses/2026-06-07-V2-sidebar-drift.md
//
// It contains:
// 1. A positive control: stable selector works
// 2. A documented negative control marked as test.fixme() — the body shows
//    what a real drift-failure test would look like, but is not executed
//    by default so the suite stays green
// 3. A selector-stability assertion that uses the recommended pattern

test.describe('Drift Diagnosis Demo (V3.4)', () => {
  test('positive control: stable data-testid selector works', async ({ page }) => {
    await page.goto('/task/list/all');
    // This selector is stable per docs/02-harness/knowledge/frontend/route-map.md
    await expect(page.getByTestId('task-list-page')).toBeVisible();
    await expect(page.getByTestId('task-table')).toBeVisible();
  });

  test.fixme('negative control: documents the expected drift-failure pattern (disabled by default)', async ({ page }) => {
    // This test is marked .fixme() so it does not run by default. To activate it
    // (e.g., during a V4+ demo of the failure-diagnosis workflow), change to `test(...)`.
    //
    // The body below shows what a real drift-failure test would look like:
    //
    //   await page.goto('/task/list/all');
    //   // INTENTIONAL FAILURE: the testid 'task-list-page-old' does not exist.
    //   // In a real drift scenario, this test was passing before a refactor and
    //   // started failing after the data-testid was renamed or removed.
    //   await expect(page.getByTestId('task-list-page-old')).toBeVisible();
    //
    // When activated, this test will fail with "element(s) not found", which is
    // exactly the failure mode a failure-diagnosis record should capture.
    await page.goto('/task/list/all');
    await expect(page.getByTestId('task-list-page-old')).toBeVisible();
  });

  test('selector stability check: data-testid beats CSS class', async ({ page }) => {
    await page.goto('/task/list/all');
    // Per docs/08-frontend-agent/mcp/selector-stability-guide.md:
    // - Primary: data-testid (high stability)
    // - Fallback: text content (medium stability)
    // - Forbidden: generated CSS classes (low stability)
    //
    // This test verifies the primary selector still works. If it ever fails,
    // it indicates a drift in the data-testid convention.
    const table = page.getByTestId('task-table');
    await expect(table).toBeVisible();
    const rowCount = await table.locator('.ant-table-row').count();
    expect(rowCount).toBeGreaterThan(0);
  });
});
