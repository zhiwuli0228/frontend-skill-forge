import { expect, test } from '@playwright/test';

test.describe('Skill Config page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/skill/config');
    await page.waitForSelector('[data-testid="skill-config-page"]');
  });

  test('loaded page shows heading, form, save and reset buttons', async ({ page }) => {
    await expect(page.getByText('Skill Config')).toBeVisible();
    await expect(page.locator('[data-testid="skill-config-form"]')).toBeVisible();
    await expect(page.locator('[data-testid="skill-config-save"]')).toBeVisible();
    await expect(page.locator('[data-testid="skill-config-reset"]')).toBeVisible();
  });

  test('JSON toggle switches between form and JSON editor', async ({ page }) => {
    // Form should be visible by default
    await expect(page.locator('[data-testid="skill-config-form"]')).toBeVisible();

    // Switch to JSON view
    await page.locator('[data-testid="skill-config-view-toggle"]').click();
    await page.getByText('JSON').click();
    await expect(page.locator('[data-testid="skill-json-editor"]')).toBeVisible();
    await expect(page.locator('[data-testid="skill-json-textarea"]')).toBeVisible();

    // Switch back to form view
    await page.locator('[data-testid="skill-config-view-toggle"]').click();
    await page.getByText('Form').click();
    await expect(page.locator('[data-testid="skill-config-form"]')).toBeVisible();
  });

  test('empty state shows empty message', async ({ page }) => {
    await page.locator('[data-testid="skill-config-scenario-select"]').click();
    await page.getByTitle('Empty').click();

    await expect(page.getByText('No skills available')).toBeVisible();
  });

  test('loading state shows loading indicator', async ({ page }) => {
    await page.locator('[data-testid="skill-config-scenario-select"]').click();
    await page.getByTitle('Loading').click();

    await expect(page.locator('[data-testid="skill-config-loading"]')).toBeVisible();
  });

  test('error state shows error and retry returns to loaded', async ({ page }) => {
    await page.locator('[data-testid="skill-config-scenario-select"]').click();
    await page.getByTitle('Error').click();

    await expect(page.locator('[data-testid="skill-config-error"]')).toBeVisible();

    // Click retry link
    await page.locator('[data-testid="skill-config-error-retry-link"]').click();

    // Should return to loaded state
    await expect(page.locator('[data-testid="skill-config-form"]')).toBeVisible();
  });
});
