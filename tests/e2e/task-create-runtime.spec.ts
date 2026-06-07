import { expect, test } from '@playwright/test';

test.describe('Task Create Runtime Baseline', () => {
  test('loads with form, steps, and preview panel', async ({ page }) => {
    await page.goto('/task/create');
    await expect(page.getByRole('heading', { name: /create task/i })).toBeVisible();
    await expect(page.getByTestId('task-create-form')).toBeVisible();
    await expect(page.getByTestId('form-steps')).toBeVisible();
    await expect(page.getByTestId('task-preview')).toBeVisible();
  });

  test('default loaded state shows prefilled form and preview', async ({ page }) => {
    await page.goto('/task/create');
    await expect(page.getByTestId('task-preview')).toBeVisible();

    // Preview should show the sample values
    await expect(page.getByTestId('task-preview').getByText('Upgrade database connection pooling')).toBeVisible();
    await expect(page.getByTestId('task-preview').getByText('critical')).toBeVisible();
  });

  test('step navigation changes visible form section', async ({ page }) => {
    await page.goto('/task/create');
    await expect(page.getByTestId('step-basic-info')).toBeVisible();

    // Go to step 2 (Details)
    await page.getByTestId('btn-next').click();
    await expect(page.getByTestId('step-details')).toBeVisible();
    await expect(page.getByTestId('step-basic-info')).not.toBeVisible();

    // Go to step 3 (Review)
    await page.getByTestId('btn-next').click();
    await expect(page.getByTestId('step-review')).toBeVisible();

    // Go back to step 2 (Details)
    await page.getByTestId('btn-prev').click();
    await expect(page.getByTestId('step-details')).toBeVisible();

    // Go back to step 1 (Basic Info)
    await page.getByTestId('btn-prev').click();
    await expect(page.getByTestId('step-basic-info')).toBeVisible();
  });

  test('editing form fields updates preview', async ({ page }) => {
    await page.goto('/task/create');
    await expect(page.getByTestId('task-create-form')).toBeVisible();

    // Clear title and type new one
    await page.getByTestId('input-title').clear();
    await page.getByTestId('input-title').fill('New test task');

    // Preview should update
    await expect(page.getByTestId('task-preview').getByText('New test task')).toBeVisible();
  });

  test('empty state shows blank form with preview placeholder', async ({ page }) => {
    await page.goto('/task/create');

    // Switch to empty scenario
    await page.getByTestId('task-create-scenario-select').click();
    await page.getByTitle('Empty').click();

    // Preview should show empty state
    await expect(page.getByTestId('task-preview-empty')).toBeVisible();
  });

  test('validation state shows field errors', async ({ page }) => {
    await page.goto('/task/create');

    // Switch to validation scenario
    await page.getByTestId('task-create-scenario-select').click();
    await page.getByTitle('Validation').click();

    // Validation errors on step 1 (Basic Info) should appear
    await expect(page.getByText('Title is required')).toBeVisible();
    await expect(page.getByText('Priority is required')).toBeVisible();

    // Navigate to step 2 (Details) to see category error
    await page.getByTestId('btn-next').click();
    await expect(page.getByText('Category is required')).toBeVisible();
  });

  test('submit with missing required fields triggers validation', async ({ page }) => {
    await page.goto('/task/create');

    // Switch to empty scenario
    await page.getByTestId('task-create-scenario-select').click();
    await page.getByTitle('Empty').click();

    // Navigate to review step
    await page.getByTestId('btn-next').click();
    await page.getByTestId('btn-next').click();

    // Submit
    await page.getByTestId('btn-submit').click();

    // Should jump back to step 1 and show validation errors
    await expect(page.getByTestId('step-basic-info')).toBeVisible();
    await expect(page.getByText('Title is required')).toBeVisible();
  });

  test('submit with valid data shows success modal', async ({ page }) => {
    await page.goto('/task/create');

    // Navigate to review step (form is prefilled in loaded scenario)
    await page.getByTestId('btn-next').click();
    await page.getByTestId('btn-next').click();

    // Submit
    await page.getByTestId('btn-submit').click();

    // Success modal should appear
    await expect(page.locator('.ant-modal-confirm-title')).toHaveText('Task Created');
    await page.getByRole('button', { name: /ok/i }).click();
  });

  test('loading state shows skeleton UI', async ({ page }) => {
    await page.goto('/task/create');

    // Switch to loading scenario
    await page.getByTestId('task-create-scenario-select').click();
    await page.getByTitle('Loading').click();

    // Loading skeleton should appear
    await expect(page.getByTestId('task-create-loading')).toBeVisible();
  });

  test('error state shows error with retry affordance', async ({ page }) => {
    await page.goto('/task/create');

    // Switch to error scenario
    await page.getByTestId('task-create-scenario-select').click();
    await page.getByTitle('Error').click();

    // Error state should appear
    await expect(page.getByTestId('task-create-error')).toBeVisible();
    await expect(page.getByText('Task creation form failed to load')).toBeVisible();
    await expect(page.getByTestId('task-create-error-retry-link')).toBeVisible();

    // Click retry to return to loaded state
    await page.getByTestId('task-create-error-retry-link').click();
    await expect(page.getByTestId('task-create-page')).toBeVisible();
    await expect(page.getByTestId('task-create-form')).toBeVisible();
  });
});
