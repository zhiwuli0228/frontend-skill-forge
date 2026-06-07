import { expect, test } from '@playwright/test';

test.describe('Skill List Runtime Baseline', () => {
  test('loaded grid shows heading, filter bar, and skill cards', async ({ page }) => {
    await page.goto('/skill/list');
    await expect(page.getByRole('heading', { name: /skills/i })).toBeVisible();
    await expect(page.getByTestId('skill-filter-bar')).toBeVisible();
    await expect(page.getByTestId('skill-grid')).toBeVisible();
    // Verify multiple skill cards are visible
    const cardCount = await page.locator('[data-testid^="skill-card-"]').count();
    expect(cardCount).toBeGreaterThan(1);
  });

  test('view toggle switches between grid and list', async ({ page }) => {
    await page.goto('/skill/list');
    await expect(page.getByTestId('skill-grid')).toBeVisible();

    // Switch to list view
    await page.getByTestId('skill-list-btn').click();
    await expect(page.getByTestId('skill-list-view')).toBeVisible();
    await expect(page.getByTestId('skill-grid')).not.toBeVisible();

    // Switch back to grid view
    await page.getByTestId('skill-grid-btn').click();
    await expect(page.getByTestId('skill-grid')).toBeVisible();
    await expect(page.getByTestId('skill-list-view')).not.toBeVisible();
  });

  test('category filter narrows visible skills', async ({ page }) => {
    await page.goto('/skill/list');
    await expect(page.getByTestId('skill-grid')).toBeVisible();

    const initialCount = await page.locator('[data-testid^="skill-card-"]').count();
    expect(initialCount).toBeGreaterThan(1);

    // Apply category filter
    await page.getByTestId('skill-category-filter').click();
    await page.getByTitle('Text').click();

    const filteredCount = await page.locator('[data-testid^="skill-card-"]').count();
    expect(filteredCount).toBeLessThan(initialCount);
  });

  test('search filter narrows visible skills', async ({ page }) => {
    await page.goto('/skill/list');
    await expect(page.getByTestId('skill-grid')).toBeVisible();

    const initialCount = await page.locator('[data-testid^="skill-card-"]').count();
    expect(initialCount).toBeGreaterThan(1);

    // Type into search input
    await page.getByTestId('skill-search').fill('summar');

    const filteredCount = await page.locator('[data-testid^="skill-card-"]').count();
    expect(filteredCount).toBeLessThan(initialCount);
  });

  test('clicking a skill card opens detail modal', async ({ page }) => {
    await page.goto('/skill/list');
    await expect(page.getByTestId('skill-grid')).toBeVisible();

    // Click the first skill card
    await page.locator('[data-testid^="skill-card-"]').first().click();

    // Detail modal should appear
    await expect(page.getByTestId('skill-detail-modal').locator('.ant-modal')).toBeVisible();

    // Close the modal
    await page.getByTestId('skill-detail-modal').locator('.ant-modal-close').click();
    await expect(page.getByTestId('skill-detail-modal').locator('.ant-modal')).not.toBeVisible();
  });

  test('empty state shows empty message', async ({ page }) => {
    await page.goto('/skill/list');

    // Switch to empty scenario
    await page.getByTestId('skill-scenario-select').click();
    await page.getByTitle('Empty').click();

    // Empty state should appear with no cards
    const cardCount = await page.locator('[data-testid^="skill-card-"]').count();
    expect(cardCount).toBe(0);
  });

  test('loading state shows skeleton UI', async ({ page }) => {
    await page.goto('/skill/list');

    // Switch to loading scenario
    await page.getByTestId('skill-scenario-select').click();
    await page.getByTitle('Loading').click();

    // Loading skeleton should appear
    await expect(page.getByTestId('skill-loading')).toBeVisible();
  });

  test('error state shows error with retry affordance', async ({ page }) => {
    await page.goto('/skill/list');

    // Switch to error scenario
    await page.getByTestId('skill-scenario-select').click();
    await page.getByTitle('Error').click();

    // Error state should appear
    await expect(page.getByTestId('skill-error')).toBeVisible();
    await expect(page.getByTestId('skill-error-retry-link')).toBeVisible();

    // Click retry to return to loaded state
    await page.getByTestId('skill-error-retry-link').click();
    await expect(page.getByTestId('skill-list-page')).toBeVisible();
    await expect(page.getByTestId('skill-grid')).toBeVisible();
  });
});
