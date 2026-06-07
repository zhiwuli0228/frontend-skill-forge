import { expect, test } from '@playwright/test';

test.describe('Skill Versions page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/skill/versions');
    await page.waitForSelector('[data-testid="skill-versions-page"]');
  });

  test('loaded page shows heading, table with multiple rows', async ({ page }) => {
    await expect(page.getByText('Skill Versions')).toBeVisible();
    await expect(page.locator('[data-testid="skill-version-table"]')).toBeVisible();

    const rows = page.locator('[data-testid="skill-version-table"] tbody tr');
    await expect(rows).toHaveCount(5, { timeout: 5000 });
  });

  test('rollback button exists for non-current version and can be clicked', async ({ page }) => {
    const rollbackBtn = page.locator('[data-testid="skill-rollback-btn-1.0.0"]');
    await expect(rollbackBtn).toBeVisible();
    await rollbackBtn.click();
  });

  test('empty state shows empty message', async ({ page }) => {
    await page.locator('[data-testid="skill-scenario-select"]').click();
    await page.getByTitle('Empty').click();

    await expect(page.locator('[data-testid="skill-versions-empty"]')).toBeVisible();
  });

  test('loading state shows loading indicator', async ({ page }) => {
    await page.locator('[data-testid="skill-scenario-select"]').click();
    await page.getByTitle('Loading').click();

    await expect(page.locator('[data-testid="skill-versions-loading"]')).toBeVisible();
  });

  test('error state shows error and retry returns to loaded', async ({ page }) => {
    await page.locator('[data-testid="skill-scenario-select"]').click();
    await page.getByTitle('Error').click();

    await expect(page.locator('[data-testid="skill-versions-error"]')).toBeVisible();

    // Click retry link
    await page.locator('[data-testid="skill-versions-error-retry-link"]').click();

    // Should return to loaded state
    await expect(page.locator('[data-testid="skill-version-table"]')).toBeVisible();
  });
});
