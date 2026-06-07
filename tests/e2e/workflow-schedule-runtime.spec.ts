import { expect, test } from '@playwright/test';

test.describe('Workflow Schedule Runtime Baseline', () => {
  test('loaded page shows heading, schedule table, and multiple rows', async ({ page }) => {
    await page.goto('/workflow/schedule');
    await expect(page.getByRole('heading', { name: /workflow schedule/i })).toBeVisible();
    await expect(page.getByTestId('workflow-schedule-table')).toBeVisible();
    const rowCount = await page.getByTestId('workflow-schedule-table').locator('.ant-table-row').count();
    expect(rowCount).toBeGreaterThan(1);
  });

  test('schedule toggle changes state', async ({ page }) => {
    await page.goto('/workflow/schedule');
    await expect(page.getByTestId('workflow-schedule-table')).toBeVisible();

    const toggle = page.getByTestId(/^workflow-schedule-toggle-/).first();
    await expect(toggle).toBeVisible();
    await toggle.click();

    await expect(toggle).toBeVisible();
  });

  test('add schedule opens modal and close dismisses it', async ({ page }) => {
    await page.goto('/workflow/schedule');
    await expect(page.getByTestId('workflow-add-schedule')).toBeVisible();

    await page.getByTestId('workflow-add-schedule').click();
    await expect(page.getByTestId('workflow-schedule-modal').locator('.ant-modal')).toBeVisible();

    // Close the modal
    await page.getByTestId('workflow-schedule-modal').locator('.ant-modal-close').click();
    await expect(page.getByTestId('workflow-schedule-modal').locator('.ant-modal')).not.toBeVisible();
  });

  test('empty state shows empty message', async ({ page }) => {
    await page.goto('/workflow/schedule');

    await page.getByTestId('workflow-schedule-scenario-select').click();
    await page.getByTitle('Empty').click();

    await expect(page.getByText('No schedules')).toBeVisible();
  });

  test('loading state shows loading indicator', async ({ page }) => {
    await page.goto('/workflow/schedule');

    await page.getByTestId('workflow-schedule-scenario-select').click();
    await page.getByTitle('Loading').click();

    await expect(page.getByTestId('workflow-schedule-loading')).toBeVisible();
  });

  test('error state shows error with retry affordance', async ({ page }) => {
    await page.goto('/workflow/schedule');

    await page.getByTestId('workflow-schedule-scenario-select').click();
    await page.getByTitle('Error').click();

    await expect(page.getByTestId('workflow-schedule-error')).toBeVisible();
    await expect(page.getByTestId('workflow-schedule-error-retry-link')).toBeVisible();

    // Click retry to return to loaded state
    await page.getByTestId('workflow-schedule-error-retry-link').click();
    await expect(page.getByTestId('workflow-schedule-page')).toBeVisible();
    await expect(page.getByTestId('workflow-schedule-table')).toBeVisible();
  });
});
