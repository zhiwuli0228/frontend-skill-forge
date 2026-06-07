import { expect, test } from '@playwright/test';

test.describe('Task Board Runtime Baseline', () => {
  test('loaded board shows heading, board container, and all 4 columns', async ({ page }) => {
    await page.goto('/task/board');
    await expect(page.getByRole('heading', { name: /task board/i })).toBeVisible();
    await expect(page.getByTestId('task-board-page')).toBeVisible();
    await expect(page.getByTestId('board-container')).toBeVisible();

    // Verify all 4 columns are visible
    await expect(page.getByTestId('board-column-todo')).toBeVisible();
    await expect(page.getByTestId('board-column-in-progress')).toBeVisible();
    await expect(page.getByTestId('board-column-in-review')).toBeVisible();
    await expect(page.getByTestId('board-column-done')).toBeVisible();

    // Verify multiple task cards are visible across columns
    const cardCount = await page.getByTestId(/^board-task-card-/).count();
    expect(cardCount).toBeGreaterThan(1);
  });

  test('clicking a task card opens the detail drawer', async ({ page }) => {
    await page.goto('/task/board');
    await expect(page.getByTestId('board-container')).toBeVisible();

    // Click the first task card
    await page.getByTestId(/^board-task-card-/).first().click();

    // Detail drawer should appear
    await expect(page.getByTestId('task-detail-drawer')).toBeVisible();

    // Close the drawer
    await page.getByTestId('task-detail-drawer').locator('.ant-drawer-close').click();
    await expect(page.getByTestId('task-detail-drawer')).not.toBeVisible();
  });

  test('drag and drop moves a card between columns', async ({ page }) => {
    await page.goto('/task/board');
    await expect(page.getByTestId('board-container')).toBeVisible();

    // Get the first card in the todo column
    const todoColumn = page.getByTestId('board-column-todo');
    const firstCard = todoColumn.getByTestId(/^board-task-card-/).first();
    await expect(firstCard).toBeVisible();

    const initialTodoCount = await todoColumn.getByTestId(/^board-task-card-/).count();

    // Get the in-progress column as drop target
    const inProgressColumn = page.getByTestId('board-column-in-progress');

    // Drag the card from todo to in-progress
    await firstCard.dragTo(inProgressColumn);

    // Verify the card moved: todo column should have fewer cards
    await expect(async () => {
      const newTodoCount = await todoColumn.getByTestId(/^board-task-card-/).count();
      expect(newTodoCount).toBeLessThan(initialTodoCount);
    }).toPass();
  });

  test('empty state shows empty message per column', async ({ page }) => {
    await page.goto('/task/board');

    // Switch to empty scenario
    await page.getByTestId('task-board-scenario-select').click();
    await page.getByTitle('Empty').click();

    // Board should still be visible but columns should show empty states
    await expect(page.getByTestId('board-container')).toBeVisible();

    // Each column should have no task cards
    const totalCards = await page.getByTestId(/^board-task-card-/).count();
    expect(totalCards).toBe(0);
  });

  test('loading state shows skeleton UI', async ({ page }) => {
    await page.goto('/task/board');

    // Switch to loading scenario
    await page.getByTestId('task-board-scenario-select').click();
    await page.getByTitle('Loading').click();

    // Loading skeleton should appear
    await expect(page.getByTestId('task-board-loading')).toBeVisible();
  });

  test('error state shows error with retry affordance', async ({ page }) => {
    await page.goto('/task/board');

    // Switch to error scenario
    await page.getByTestId('task-board-scenario-select').click();
    await page.getByTitle('Error').click();

    // Error state should appear
    await expect(page.getByTestId('task-board-error')).toBeVisible();
    await expect(page.getByText(/failed to load/i)).toBeVisible();
    await expect(page.getByTestId('task-board-error-retry-link')).toBeVisible();

    // Click retry to return to loaded state
    await page.getByTestId('task-board-error-retry-link').click();
    await expect(page.getByTestId('task-board-page')).toBeVisible();
    await expect(page.getByTestId('board-container')).toBeVisible();
  });
});
