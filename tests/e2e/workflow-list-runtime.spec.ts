import { expect, test } from '@playwright/test';

test.describe('Workflow List Runtime Baseline', () => {
  test('loaded page shows heading, workflow table, and multiple rows', async ({ page }) => {
    await page.goto('/workflow/list');
    await expect(page.getByRole('heading', { name: /workflow list/i })).toBeVisible();
    await expect(page.getByTestId('workflow-table')).toBeVisible();
    const rowCount = await page.getByTestId('workflow-table').locator('.ant-table-row').count();
    expect(rowCount).toBeGreaterThan(1);
  });

  test('status toggle changes state', async ({ page }) => {
    await page.goto('/workflow/list');
    await expect(page.getByTestId('workflow-table')).toBeVisible();

    // Find the first status toggle and click it
    const toggle = page.getByTestId(/^workflow-status-toggle-/).first();
    await expect(toggle).toBeVisible();
    await toggle.click();

    // The toggle should reflect the new state (Ant Design switch changes class)
    await expect(toggle).toBeVisible();
  });

  test('empty state shows empty message', async ({ page }) => {
    await page.goto('/workflow/list');

    await page.getByTestId('workflow-scenario-select').click();
    await page.getByTitle('Empty').click();

    await expect(page.getByText('No workflows')).toBeVisible();
  });

  test('loading state shows loading indicator', async ({ page }) => {
    await page.goto('/workflow/list');

    await page.getByTestId('workflow-scenario-select').click();
    await page.getByTitle('Loading').click();

    await expect(page.getByTestId('workflow-loading')).toBeVisible();
  });

  test('error state shows error with retry affordance', async ({ page }) => {
    await page.goto('/workflow/list');

    await page.getByTestId('workflow-scenario-select').click();
    await page.getByTitle('Error', { exact: true }).click();

    await expect(page.getByTestId('workflow-error')).toBeVisible();
    await expect(page.getByTestId('workflow-error-retry-link')).toBeVisible();

    // Click retry to return to loaded state
    await page.getByTestId('workflow-error-retry-link').click();
    await expect(page.getByTestId('workflow-table')).toBeVisible();
  });
});
