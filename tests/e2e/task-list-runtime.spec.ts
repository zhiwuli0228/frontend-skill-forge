import { expect, test } from '@playwright/test';

test.describe('Task List Runtime Baseline', () => {
  test('loads with filter bar, task table, and visible rows', async ({ page }) => {
    await page.goto('/task/list');
    await expect(page.getByRole('heading', { name: /task list/i })).toBeVisible();
    await expect(page.getByTestId('task-filter-bar')).toBeVisible();
    await expect(page.getByTestId('task-table')).toBeVisible();
    // Verify multiple task rows are visible
    const rowCount = await page.getByTestId('task-table').locator('.ant-table-row').count();
    expect(rowCount).toBeGreaterThan(1);
  });

  test('status filter narrows visible tasks', async ({ page }) => {
    await page.goto('/task/list');
    await expect(page.getByTestId('task-table')).toBeVisible();

    const initialCount = await page.getByTestId('task-table').locator('.ant-table-row').count();
    expect(initialCount).toBeGreaterThan(0);

    // Apply status filter
    await page.getByTestId('filter-status').click();
    await page.getByTitle('blocked').click();

    const filteredCount = await page.getByTestId('task-table').locator('.ant-table-row').count();
    expect(filteredCount).toBeLessThan(initialCount);

    // Clear filter
    await page.getByTestId('filter-status').locator('.ant-select-clear').click();
    const clearedCount = await page.getByTestId('task-table').locator('.ant-table-row').count();
    expect(clearedCount).toBe(initialCount);
  });

  test('priority filter narrows visible tasks', async ({ page }) => {
    await page.goto('/task/list');
    await expect(page.getByTestId('task-table')).toBeVisible();

    await page.getByTestId('filter-priority').click();
    await page.getByTitle('critical').click();

    const filteredCount = await page.getByTestId('task-table').locator('.ant-table-row').count();
    expect(filteredCount).toBeGreaterThan(0);
    expect(filteredCount).toBeLessThan(8);
  });

  test('clicking a row opens task detail drawer', async ({ page }) => {
    await page.goto('/task/list');
    await expect(page.getByTestId('task-table')).toBeVisible();

    // Click the first row
    await page.getByTestId('task-table').locator('.ant-table-row').first().click();

    // Detail drawer should appear
    await expect(page.getByTestId('task-detail-drawer')).toBeVisible();

    // Close the drawer
    await page.getByTestId('task-detail-drawer').locator('.ant-drawer-close').click();
    await expect(page.getByTestId('task-detail-drawer')).not.toBeVisible();
  });

  test('empty state shows explicit empty message', async ({ page }) => {
    await page.goto('/task/list');

    // Switch to empty scenario
    await page.getByTestId('task-scenario-select').click();
    await page.getByTitle('Empty').click();

    // Empty state should appear
    await expect(page.getByTestId('task-table-empty')).toBeVisible();
    await expect(page.getByText('No tasks match the current filter')).toBeVisible();
  });

  test('loading state shows skeleton UI', async ({ page }) => {
    await page.goto('/task/list');

    // Switch to loading scenario
    await page.getByTestId('task-scenario-select').click();
    await page.getByTitle('Loading').click();

    // Loading skeleton should appear
    await expect(page.getByTestId('task-list-loading')).toBeVisible();
  });

  test('error state shows error with retry affordance', async ({ page }) => {
    await page.goto('/task/list');

    // Switch to error scenario
    await page.getByTestId('task-scenario-select').click();
    await page.getByTitle('Error').click();

    // Error state should appear
    await expect(page.getByTestId('task-list-error')).toBeVisible();
    await expect(page.getByText('Task list failed to load')).toBeVisible();
    await expect(page.getByTestId('task-error-retry-link')).toBeVisible();

    // Click retry to return to loaded state
    await page.getByTestId('task-error-retry-link').click();
    await expect(page.getByTestId('task-list-page')).toBeVisible();
    await expect(page.getByTestId('task-table')).toBeVisible();
  });

  test('combined filters narrow results together', async ({ page }) => {
    await page.goto('/task/list');
    await expect(page.getByTestId('task-table')).toBeVisible();

    // Apply status filter
    await page.getByTestId('filter-status').click();
    await page.getByTitle('open').click();

    const statusOnlyCount = await page.getByTestId('task-table').locator('.ant-table-row').count();

    // Apply category filter on top
    await page.getByTestId('filter-category').click();
    await page.getByTitle('security').click();

    const combinedCount = await page.getByTestId('task-table').locator('.ant-table-row').count();
    expect(combinedCount).toBeLessThanOrEqual(statusOnlyCount);
  });
});
