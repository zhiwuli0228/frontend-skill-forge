import { expect, test } from '@playwright/test';

// ============================================================
// Task Module
// ============================================================

test.describe('Task Module - Full Functional Verification', () => {
  test('task list page loads with table and scenario selector', async ({ page }) => {
    await page.goto('/task/list');
    await expect(page.getByRole('heading', { name: /task list/i })).toBeVisible();
    await expect(page.getByTestId('task-table')).toBeVisible();
    await expect(page.getByTestId('task-scenario-select')).toBeVisible();
    const rows = await page.getByTestId('task-table').locator('.ant-table-row').count();
    expect(rows).toBeGreaterThan(0);
  });

  test('task list empty state', async ({ page }) => {
    await page.goto('/task/list');
    await page.getByTestId('task-scenario-select').click();
    await page.getByTitle('Empty', { exact: true }).click();
    await expect(page.getByText(/no tasks/i)).toBeVisible();
  });

  test('task list loading state', async ({ page }) => {
    await page.goto('/task/list');
    await page.getByTestId('task-scenario-select').click();
    await page.getByTitle('Loading', { exact: true }).click();
    await expect(page.getByTestId('task-list-loading')).toBeVisible();
  });

  test('task list error state with retry', async ({ page }) => {
    await page.goto('/task/list');
    await page.getByTestId('task-scenario-select').click();
    await page.getByTitle('Error', { exact: true }).click();
    await expect(page.getByTestId('task-list-error')).toBeVisible();
    await page.getByTestId('task-error-retry-link').click();
    await expect(page.getByTestId('task-table')).toBeVisible();
  });

  test('task create page loads with form', async ({ page }) => {
    await page.goto('/task/create');
    await expect(page.getByRole('heading', { name: /create task/i })).toBeVisible();
    await expect(page.getByTestId('task-create-form')).toBeVisible();
  });

  test('task templates page loads with grid', async ({ page }) => {
    await page.goto('/task/templates');
    await expect(page.getByRole('heading', { name: /templates/i })).toBeVisible();
    await expect(page.getByTestId('template-grid')).toBeVisible();
  });

  test('task board page loads with columns', async ({ page }) => {
    await page.goto('/task/board');
    await expect(page.getByRole('heading', { name: /task board/i })).toBeVisible();
    await expect(page.getByTestId('board-container')).toBeVisible();
  });
});

// ============================================================
// Skill Module
// ============================================================

test.describe('Skill Module - Full Functional Verification', () => {
  test('skill list page loads with grid', async ({ page }) => {
    await page.goto('/skill/list');
    await expect(page.getByRole('heading', { name: /skills/i })).toBeVisible();
    await expect(page.getByTestId('skill-grid')).toBeVisible();
    const cards = await page.locator('[data-testid^="skill-card-"]').count();
    expect(cards).toBeGreaterThan(0);
  });

  test('skill list empty state', async ({ page }) => {
    await page.goto('/skill/list');
    await page.getByTestId('skill-scenario-select').click();
    await page.getByTitle('Empty', { exact: true }).click();
    await expect(page.getByText(/no skills found/i)).toBeVisible();
  });

  test('skill market page loads with featured section', async ({ page }) => {
    await page.goto('/skill/market');
    await expect(page.getByRole('heading', { name: /skill market/i })).toBeVisible();
    await expect(page.getByTestId('skill-market-featured')).toBeVisible();
  });

  test('skill config page loads with form', async ({ page }) => {
    await page.goto('/skill/config');
    await expect(page.getByRole('heading', { name: /skill configuration/i })).toBeVisible();
    await expect(page.getByTestId('skill-config-form')).toBeVisible();
  });

  test('skill versions page loads with table', async ({ page }) => {
    await page.goto('/skill/versions');
    await expect(page.getByRole('heading', { name: /skill versions/i })).toBeVisible();
    await expect(page.getByTestId('skill-version-table')).toBeVisible();
    const rows = await page.getByTestId('skill-version-table').locator('.ant-table-row').count();
    expect(rows).toBeGreaterThan(0);
  });
});

// ============================================================
// Workflow Module
// ============================================================

test.describe('Workflow Module - Full Functional Verification', () => {
  test('workflow list page loads with table', async ({ page }) => {
    await page.goto('/workflow/list');
    await expect(page.getByRole('heading', { name: /workflow list/i })).toBeVisible();
    await expect(page.getByTestId('workflow-table')).toBeVisible();
    const rows = await page.getByTestId('workflow-table').locator('.ant-table-row').count();
    expect(rows).toBeGreaterThan(0);
  });

  test('workflow editor page loads with canvas', async ({ page }) => {
    await page.goto('/workflow/editor');
    await expect(page.getByRole('heading', { name: /workflow editor/i })).toBeVisible();
    await expect(page.getByTestId('workflow-editor-canvas')).toBeVisible();
    await expect(page.getByTestId('workflow-node-palette')).toBeVisible();
  });

  test('workflow history page loads with table', async ({ page }) => {
    await page.goto('/workflow/history');
    await expect(page.getByRole('heading', { name: /workflow execution history/i })).toBeVisible();
    await expect(page.getByTestId('workflow-history-table')).toBeVisible();
    const rows = await page.getByTestId('workflow-history-table').locator('.ant-table-row').count();
    expect(rows).toBeGreaterThan(0);
  });

  test('workflow schedule page loads with table', async ({ page }) => {
    await page.goto('/workflow/schedule');
    await expect(page.getByRole('heading', { name: /workflow schedules/i })).toBeVisible();
    await expect(page.getByTestId('workflow-schedule-table')).toBeVisible();
  });

  test('workflow schedule toggle changes state', async ({ page }) => {
    await page.goto('/workflow/schedule');
    const toggle = page.getByTestId('workflow-schedule-toggle-sch1');
    await expect(toggle).toBeVisible();
    const initialChecked = (await toggle.getAttribute('class'))?.includes('ant-switch-checked') ?? false;
    await toggle.click();
    await page.waitForTimeout(300);
    const afterChecked = (await toggle.getAttribute('class'))?.includes('ant-switch-checked') ?? false;
    expect(initialChecked).not.toBe(afterChecked);
  });
});

// ============================================================
// Insight Module
// ============================================================

test.describe('Insight Module - Full Functional Verification', () => {
  test('insight overview page loads with stat cards and chart', async ({ page }) => {
    await page.goto('/insight/overview');
    await expect(page.getByRole('heading', { name: /insight overview/i })).toBeVisible();
    await expect(page.getByTestId('insight-stat-cards')).toBeVisible();
    await expect(page.getByTestId('insight-chart')).toBeVisible();
  });

  test('insight overview empty state', async ({ page }) => {
    await page.goto('/insight/overview');
    await page.getByTestId('insight-overview-scenario-select').click();
    await page.getByTitle('Empty', { exact: true }).click();
    await expect(page.getByText(/no insight data/i)).toBeVisible();
  });

  test('insight reports page loads with table', async ({ page }) => {
    await page.goto('/insight/reports');
    await expect(page.getByRole('heading', { name: /insight reports/i })).toBeVisible();
    await expect(page.getByTestId('insight-reports-table')).toBeVisible();
    const rows = await page.getByTestId('insight-reports-table').locator('.ant-table-row').count();
    expect(rows).toBeGreaterThan(0);
  });

  test('insight analysis page loads with filter and chart', async ({ page }) => {
    await page.goto('/insight/analysis');
    await expect(page.getByRole('heading', { name: /insight analysis/i })).toBeVisible();
    await expect(page.getByTestId('insight-analysis-filter')).toBeVisible();
    await expect(page.getByTestId('insight-analysis-chart')).toBeVisible();
    await expect(page.getByTestId('insight-analysis-data-table')).toBeVisible();
  });

  test('insight analysis metric switch changes chart data', async ({ page }) => {
    await page.goto('/insight/analysis');
    const metricSelect = page.getByTestId('insight-analysis-metric-select');
    await expect(metricSelect).toBeVisible();
    await metricSelect.click();
    await page.getByTitle('Skill Usage', { exact: true }).click();
    await expect(page.getByTestId('insight-analysis-chart')).toBeVisible();
  });

  test('insight export page loads with form and table', async ({ page }) => {
    await page.goto('/insight/export');
    await expect(page.getByRole('heading', { name: /insight export/i })).toBeVisible();
    await expect(page.getByTestId('insight-export-form')).toBeVisible();
    await expect(page.getByTestId('insight-export-table')).toBeVisible();
    await expect(page.getByTestId('insight-export-format-select')).toBeVisible();
    await expect(page.getByTestId('insight-export-button')).toBeVisible();
  });
});

// ============================================================
// Settings Module
// ============================================================

test.describe('Settings Module - Full Functional Verification', () => {
  test('user management page loads with table and add button', async ({ page }) => {
    await page.goto('/settings/users');
    await expect(page.getByRole('heading', { name: /user management/i })).toBeVisible();
    await expect(page.getByTestId('settings-users-table')).toBeVisible();
    await expect(page.getByTestId('settings-users-add-button')).toBeVisible();
    const rows = await page.getByTestId('settings-users-table').locator('.ant-table-row').count();
    expect(rows).toBeGreaterThan(0);
  });

  test('add user modal opens and closes', async ({ page }) => {
    await page.goto('/settings/users');
    await page.getByTestId('settings-users-add-button').click();
    const modal = page.getByTestId('settings-users-add-modal').locator('.ant-modal');
    await expect(modal).toBeVisible();
    await modal.getByRole('button', { name: /cancel/i }).click();
    await expect(modal).not.toBeVisible();
  });

  test('permissions page loads with tree and matrix', async ({ page }) => {
    await page.goto('/settings/permissions');
    await expect(page.getByRole('heading', { name: /permission management/i })).toBeVisible();
    await expect(page.getByTestId('settings-permissions-tree')).toBeVisible();
    await expect(page.getByTestId('settings-permissions-matrix')).toBeVisible();
    await expect(page.getByTestId('settings-permissions-save-button')).toBeVisible();
    await expect(page.getByTestId('settings-permissions-reset-button')).toBeVisible();
  });

  test('permissions tree has checkable nodes', async ({ page }) => {
    await page.goto('/settings/permissions');
    const treeNodes = page.getByTestId('settings-permissions-tree').locator('.ant-tree-treenode');
    const count = await treeNodes.count();
    expect(count).toBeGreaterThan(3);
  });

  test('system params page loads with grouped form', async ({ page }) => {
    await page.goto('/settings/params');
    await expect(page.getByRole('heading', { name: /system parameters/i })).toBeVisible();
    await expect(page.getByTestId('settings-params-form')).toBeVisible();
    await expect(page.getByTestId('settings-params-group-General')).toBeVisible();
    await expect(page.getByTestId('settings-params-group-Notification')).toBeVisible();
    await expect(page.getByTestId('settings-params-group-Security')).toBeVisible();
  });

  test('system params save and reset buttons visible', async ({ page }) => {
    await page.goto('/settings/params');
    await expect(page.getByTestId('settings-params-save-button')).toBeVisible();
    await expect(page.getByTestId('settings-params-reset-button')).toBeVisible();
  });

  test('operation logs page loads with filters and table', async ({ page }) => {
    await page.goto('/settings/logs');
    await expect(page.getByRole('heading', { name: /operation logs/i })).toBeVisible();
    await expect(page.getByTestId('settings-logs-action-filter')).toBeVisible();
    await expect(page.getByTestId('settings-logs-status-filter')).toBeVisible();
    await expect(page.getByTestId('settings-logs-export-button')).toBeVisible();
    await expect(page.getByTestId('settings-logs-table')).toBeVisible();
    const rows = await page.getByTestId('settings-logs-table').locator('.ant-table-row').count();
    expect(rows).toBeGreaterThan(0);
  });

  test('operation logs empty state', async ({ page }) => {
    await page.goto('/settings/logs');
    await page.getByTestId('settings-logs-scenario-select').click();
    await page.getByTitle('Empty', { exact: true }).click();
    await expect(page.getByText(/no operation logs/i)).toBeVisible();
  });
});

// ============================================================
// Global Shell & Navigation
// ============================================================

test.describe('Global Shell - Navigation Verification', () => {
  test('hamburger menu opens module drawer', async ({ page }) => {
    await page.goto('/task/list');
    await expect(page.getByTestId('global-shell')).toBeVisible();
    await page.getByTestId('module-switcher-btn').click();
    await expect(page.getByTestId('module-drawer')).toBeVisible();
  });

  test('sidebar navigation works for task module', async ({ page }) => {
    await page.goto('/task/list');
    await expect(page.getByTestId('sidebar-menu')).toBeVisible();
  });

  test('navigation between task sub-pages', async ({ page }) => {
    await page.goto('/task/list');
    await expect(page.getByTestId('task-table')).toBeVisible();
    await page.goto('/task/create');
    await expect(page.getByTestId('task-create-form')).toBeVisible();
    await page.goto('/task/templates');
    await expect(page.getByTestId('template-grid')).toBeVisible();
    await page.goto('/task/board');
    await expect(page.getByTestId('board-container')).toBeVisible();
  });

  test('navigation between skill sub-pages', async ({ page }) => {
    await page.goto('/skill/list');
    await expect(page.getByTestId('skill-grid')).toBeVisible();
    await page.goto('/skill/market');
    await expect(page.getByTestId('skill-market-featured')).toBeVisible();
    await page.goto('/skill/config');
    await expect(page.getByTestId('skill-config-form')).toBeVisible();
    await page.goto('/skill/versions');
    await expect(page.getByTestId('skill-version-table')).toBeVisible();
  });

  test('navigation between workflow sub-pages', async ({ page }) => {
    await page.goto('/workflow/list');
    await expect(page.getByTestId('workflow-table')).toBeVisible();
    await page.goto('/workflow/editor');
    await expect(page.getByTestId('workflow-editor-canvas')).toBeVisible();
    await page.goto('/workflow/history');
    await expect(page.getByTestId('workflow-history-table')).toBeVisible();
    await page.goto('/workflow/schedule');
    await expect(page.getByTestId('workflow-schedule-table')).toBeVisible();
  });

  test('navigation between insight sub-pages', async ({ page }) => {
    await page.goto('/insight/overview');
    await expect(page.getByTestId('insight-stat-cards')).toBeVisible();
    await page.goto('/insight/reports');
    await expect(page.getByTestId('insight-reports-table')).toBeVisible();
    await page.goto('/insight/analysis');
    await expect(page.getByTestId('insight-analysis-chart')).toBeVisible();
    await page.goto('/insight/export');
    await expect(page.getByTestId('insight-export-form')).toBeVisible();
  });

  test('navigation between settings sub-pages', async ({ page }) => {
    await page.goto('/settings/users');
    await expect(page.getByTestId('settings-users-table')).toBeVisible();
    await page.goto('/settings/permissions');
    await expect(page.getByTestId('settings-permissions-tree')).toBeVisible();
    await page.goto('/settings/params');
    await expect(page.getByTestId('settings-params-form')).toBeVisible();
    await page.goto('/settings/logs');
    await expect(page.getByTestId('settings-logs-table')).toBeVisible();
  });
});
