import { expect, test } from '@playwright/test';

test.describe('Workflow Editor Runtime Baseline', () => {
  test('loaded page shows heading, canvas, and palette', async ({ page }) => {
    await page.goto('/workflow/editor');
    await expect(page.getByRole('heading', { name: /workflow editor/i })).toBeVisible();
    await expect(page.getByTestId('workflow-editor-canvas')).toBeVisible();
    await expect(page.getByTestId('workflow-node-palette')).toBeVisible();
  });

  test('canvas has multiple nodes', async ({ page }) => {
    await page.goto('/workflow/editor');
    await expect(page.getByTestId('workflow-editor-canvas')).toBeVisible();

    const nodeCount = await page.getByTestId(/^workflow-node-/).count();
    expect(nodeCount).toBeGreaterThan(1);
  });

  test('save and run buttons are visible', async ({ page }) => {
    await page.goto('/workflow/editor');
    await expect(page.getByTestId('workflow-editor-save')).toBeVisible();
    await expect(page.getByTestId('workflow-editor-run')).toBeVisible();
  });

  test('empty state shows empty message', async ({ page }) => {
    await page.goto('/workflow/editor');

    await page.getByTestId('workflow-editor-scenario-select').click();
    await page.getByTitle('Empty').click();

    await expect(page.getByText('No nodes in this workflow')).toBeVisible();
  });

  test('loading state shows loading indicator', async ({ page }) => {
    await page.goto('/workflow/editor');

    await page.getByTestId('workflow-editor-scenario-select').click();
    await page.getByTitle('Loading').click();

    await expect(page.getByTestId('workflow-editor-loading')).toBeVisible();
  });

  test('error state shows error with retry affordance', async ({ page }) => {
    await page.goto('/workflow/editor');

    await page.getByTestId('workflow-editor-scenario-select').click();
    await page.getByTitle('Error').click();

    await expect(page.getByTestId('workflow-editor-error')).toBeVisible();
    await expect(page.getByTestId('workflow-editor-error-retry-link')).toBeVisible();

    // Click retry to return to loaded state
    await page.getByTestId('workflow-editor-error-retry-link').click();
    await expect(page.getByTestId('workflow-editor-page')).toBeVisible();
    await expect(page.getByTestId('workflow-editor-canvas')).toBeVisible();
  });
});
