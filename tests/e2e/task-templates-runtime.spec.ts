import { expect, test } from '@playwright/test';

test.describe('Task Templates Runtime Baseline', () => {
  test('loaded grid shows heading, filter bar, and template cards', async ({ page }) => {
    await page.goto('/task/templates');
    await expect(page.getByRole('heading', { name: /templates/i })).toBeVisible();
    await expect(page.getByTestId('template-filter-bar')).toBeVisible();
    await expect(page.getByTestId('template-grid')).toBeVisible();
    // Verify multiple template cards are visible
    const cardCount = await page.getByTestId('template-grid').locator('[data-testid^="template-card-"]').count();
    expect(cardCount).toBeGreaterThan(1);
  });

  test('category filter narrows visible templates', async ({ page }) => {
    await page.goto('/task/templates');
    await expect(page.getByTestId('template-grid')).toBeVisible();

    const initialCount = await page.getByTestId('template-grid').locator('[data-testid^="template-card-"]').count();
    expect(initialCount).toBeGreaterThan(0);

    // Apply category filter
    await page.getByTestId('template-category-filter').click();
    await page.getByTitle('design').click();

    const filteredCount = await page.getByTestId('template-grid').locator('[data-testid^="template-card-"]').count();
    expect(filteredCount).toBeLessThan(initialCount);
  });

  test('search filter narrows visible templates', async ({ page }) => {
    await page.goto('/task/templates');
    await expect(page.getByTestId('template-grid')).toBeVisible();

    const initialCount = await page.getByTestId('template-grid').locator('[data-testid^="template-card-"]').count();
    expect(initialCount).toBeGreaterThan(0);

    // Type in search input
    await page.getByTestId('template-search').fill('api');

    const filteredCount = await page.getByTestId('template-grid').locator('[data-testid^="template-card-"]').count();
    expect(filteredCount).toBeLessThan(initialCount);
  });

  test('clicking a card opens preview modal, closing removes it', async ({ page }) => {
    await page.goto('/task/templates');
    await expect(page.getByTestId('template-grid')).toBeVisible();

    // Click the first template card
    await page.getByTestId('template-grid').locator('[data-testid^="template-card-"]').first().click();

    // Preview modal should appear
    await expect(page.getByTestId('template-preview-modal').locator('.ant-modal')).toBeVisible();

    // Close the modal
    await page.getByTestId('template-preview-modal').locator('.ant-modal-close').click();
    await expect(page.getByTestId('template-preview-modal').locator('.ant-modal')).not.toBeVisible();
  });

  test('empty state shows explicit empty message', async ({ page }) => {
    await page.goto('/task/templates');

    // Switch to empty scenario
    await page.getByTestId('task-templates-scenario-select').click();
    await page.getByTitle('Empty').click();

    // Empty state should appear
    await expect(page.getByText('No templates match the current search criteria')).toBeVisible();
  });

  test('loading state shows skeleton UI', async ({ page }) => {
    await page.goto('/task/templates');

    // Switch to loading scenario
    await page.getByTestId('task-templates-scenario-select').click();
    await page.getByTitle('Loading').click();

    // Loading skeleton should appear
    await expect(page.getByTestId('task-templates-loading')).toBeVisible();
  });

  test('error state shows error with retry affordance', async ({ page }) => {
    await page.goto('/task/templates');

    // Switch to error scenario
    await page.getByTestId('task-templates-scenario-select').click();
    await page.getByTitle('Error').click();

    // Error state should appear
    await expect(page.getByTestId('task-templates-error')).toBeVisible();
    await expect(page.getByTestId('task-templates-error-retry-link')).toBeVisible();

    // Click retry to return to loaded state
    await page.getByTestId('task-templates-error-retry-link').click();
    await expect(page.getByTestId('task-templates-page')).toBeVisible();
    await expect(page.getByTestId('template-grid')).toBeVisible();
  });
});
