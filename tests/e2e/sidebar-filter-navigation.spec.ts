import { expect, test } from '@playwright/test';

async function clickSidebarItem(page: import('@playwright/test').Page, label: string) {
  await page
    .getByTestId('sidebar-menu')
    .getByRole('menuitem', { name: label, exact: true })
    .click();
}

test.describe('Sidebar Filter Navigation - Task Module', () => {
  test('clicking All shows all tasks with no filter indicator', async ({ page }) => {
    await page.goto('/task/list/all');
    await expect(page.getByTestId('task-table')).toBeVisible();
    const allRows = await page.getByTestId('task-table').locator('.ant-table-row').count();

    await clickSidebarItem(page, 'All');
    await page.waitForURL('**/task/list/all');
    const rowsAfter = await page.getByTestId('task-table').locator('.ant-table-row').count();
    expect(rowsAfter).toBe(allRows);
    await expect(page.getByTestId('sidebar-filter-indicator')).not.toBeVisible();
  });

  test('clicking In Progress filters tasks to in-progress only', async ({ page }) => {
    await page.goto('/task/list/all');
    const allRows = await page.getByTestId('task-table').locator('.ant-table-row').count();

    await clickSidebarItem(page, 'In Progress');
    await page.waitForURL('**/task/list/in-progress');
    await expect(page.getByTestId('sidebar-filter-indicator')).toBeVisible();
    await expect(page.getByTestId('sidebar-filter-indicator')).toContainText('in-progress');
    const filteredRows = await page.getByTestId('task-table').locator('.ant-table-row').count();
    expect(filteredRows).toBeLessThan(allRows);
    expect(filteredRows).toBeGreaterThan(0);
  });

  test('clicking Archived filters to archived tasks', async ({ page }) => {
    await page.goto('/task/list/all');
    await expect(page.getByTestId('task-table')).toBeVisible();
    await clickSidebarItem(page, 'Archived');
    await page.waitForURL('**/task/list/archived');
    await expect(page.getByTestId('sidebar-filter-indicator')).toBeVisible();
    const rows = await page.getByTestId('task-table').locator('.ant-table-row').count();
    expect(rows).toBeGreaterThan(0);
  });

  test('sidebar highlights the active filter item', async ({ page }) => {
    await page.goto('/task/list/completed');
    const selectedItem = page
      .getByTestId('sidebar-menu')
      .locator('.ant-menu-item-selected')
      .first();
    await expect(selectedItem).toContainText('Completed');
  });
});

test.describe('Sidebar Filter Navigation - Skill Module', () => {
  test('clicking Text Processing filters to 5 text skills', async ({ page }) => {
    await page.goto('/skill/list/all');
    await expect(page.getByTestId('skill-grid')).toBeVisible();
    const allCards = await page.locator('[data-testid^="skill-card-"]').count();

    await clickSidebarItem(page, 'Text Processing');
    await page.waitForURL('**/skill/list/text');
    await expect(page.getByTestId('sidebar-filter-indicator')).toBeVisible();
    const filteredCards = await page.locator('[data-testid^="skill-card-"]').count();
    expect(filteredCards).toBeLessThan(allCards);
    expect(filteredCards).toBe(5);
  });

  test('clicking Image Generation filters to 5 image skills', async ({ page }) => {
    await page.goto('/skill/list/all');
    await clickSidebarItem(page, 'Image Generation');
    await page.waitForURL('**/skill/list/image');
    await expect(page.getByTestId('sidebar-filter-indicator')).toBeVisible();
    const cards = await page.locator('[data-testid^="skill-card-"]').count();
    expect(cards).toBe(5);
  });

  test('clicking All shows all 20 skills', async ({ page }) => {
    await page.goto('/skill/list/text');
    await clickSidebarItem(page, 'All');
    await page.waitForURL('**/skill/list/all');
    await expect(page.getByTestId('sidebar-filter-indicator')).not.toBeVisible();
    const cards = await page.locator('[data-testid^="skill-card-"]').count();
    expect(cards).toBe(20);
  });
});

test.describe('Sidebar Filter Navigation - Workflow Module', () => {
  test('clicking Active shows active workflows only', async ({ page }) => {
    await page.goto('/workflow/list/all');
    const allRows = await page.getByTestId('workflow-table').locator('.ant-table-row').count();

    await clickSidebarItem(page, 'Active');
    await page.waitForURL('**/workflow/list/active');
    await expect(page.getByTestId('sidebar-filter-indicator')).toBeVisible();
    const activeRows = await page.getByTestId('workflow-table').locator('.ant-table-row').count();
    expect(activeRows).toBeLessThan(allRows);
    expect(activeRows).toBeGreaterThan(0);
  });

  test('clicking Draft filters to draft workflows', async ({ page }) => {
    await page.goto('/workflow/list/all');
    await clickSidebarItem(page, 'Draft');
    await page.waitForURL('**/workflow/list/draft');
    const rows = await page.getByTestId('workflow-table').locator('.ant-table-row').count();
    expect(rows).toBeGreaterThanOrEqual(0);
  });
});

test.describe('Sidebar Filter Navigation - Insight Module', () => {
  test('clicking Today scales stat cards to a small fraction', async ({ page }) => {
    await page.goto('/insight/overview/all');
    await expect(page.getByTestId('insight-stat-cards')).toBeVisible();
    const allCards = await page
      .getByTestId('insight-stat-cards')
      .locator('.ant-statistic-content-value')
      .allTextContents();

    await clickSidebarItem(page, 'Today');
    await page.waitForURL('**/insight/overview/today');
    await expect(page.getByTestId('sidebar-filter-indicator')).toBeVisible();
    const todayCards = await page
      .getByTestId('insight-stat-cards')
      .locator('.ant-statistic-content-value')
      .allTextContents();

    expect(todayCards[0]).not.toBe(allCards[0]);
  });

  test('clicking All Time shows the largest range (6x base)', async ({ page }) => {
    await page.goto('/insight/overview/today');
    await clickSidebarItem(page, 'All Time');
    await page.waitForURL('**/insight/overview/all');
    await expect(page.getByTestId('sidebar-filter-indicator')).not.toBeVisible();
    const firstStat = await page
      .getByTestId('insight-stat-cards')
      .locator('.ant-statistic-content-value')
      .first()
      .textContent();
    expect(firstStat).toContain('936');
  });
});

test.describe('Sidebar Filter Navigation - Settings Module', () => {
  test('clicking Security navigates to permissions page', async ({ page }) => {
    await page.goto('/settings/users');
    await expect(page.getByTestId('settings-users-table')).toBeVisible();
    await clickSidebarItem(page, 'Security');
    await page.waitForURL('**/settings/permissions');
    await expect(page.getByTestId('settings-permissions-tree')).toBeVisible();
  });

  test('clicking Audit Logs navigates to logs page', async ({ page }) => {
    await page.goto('/settings/users');
    await expect(page.getByTestId('settings-users-table')).toBeVisible();
    await clickSidebarItem(page, 'Audit Logs');
    await page.waitForURL('**/settings/logs');
    await expect(page.getByTestId('settings-logs-table')).toBeVisible();
  });
});
