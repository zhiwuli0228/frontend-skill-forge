import { createBrowserRouter, redirect } from 'react-router';
import { GlobalShell } from '../shell/layout/GlobalShell';
import ModuleLayout from '../shell/layout/ModuleLayout';

import { AuthGuard } from '../domains/auth/guards/AuthGuard';
import { LoginPage } from '../domains/auth/pages/LoginPage';
import { TaskListPage } from '../domains/task/pages/TaskListPage';
import { TaskCreatePage } from '../domains/task/pages/TaskCreatePage';
import { TaskTemplatesPage } from '../domains/task/pages/TaskTemplatesPage';
import { TaskBoardPage } from '../domains/task/pages/TaskBoardPage';
import { SkillListPage } from '../domains/skill/pages/SkillListPage';
import { SkillMarketPage } from '../domains/skill/pages/SkillMarketPage';
import { SkillConfigPage } from '../domains/skill/pages/SkillConfigPage';
import { SkillVersionsPage } from '../domains/skill/pages/SkillVersionsPage';
import { WorkflowListPage } from '../domains/workflow/pages/WorkflowListPage';
import { WorkflowEditorPage } from '../domains/workflow/pages/WorkflowEditorPage';
import { WorkflowHistoryPage } from '../domains/workflow/pages/WorkflowHistoryPage';
import { WorkflowSchedulePage } from '../domains/workflow/pages/WorkflowSchedulePage';
import { InsightOverviewPage } from '../domains/insight/pages/InsightOverviewPage';
import { InsightReportsPage } from '../domains/insight/pages/InsightReportsPage';
import { InsightAnalysisPage } from '../domains/insight/pages/InsightAnalysisPage';
import { InsightExportPage } from '../domains/insight/pages/InsightExportPage';
import { SettingsUsersPage } from '../domains/settings/pages/SettingsUsersPage';
import { SettingsPermissionsPage } from '../domains/settings/pages/SettingsPermissionsPage';
import { SettingsParamsPage } from '../domains/settings/pages/SettingsParamsPage';
import { SettingsLogsPage } from '../domains/settings/pages/SettingsLogsPage';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <AuthGuard />,
    children: [{
      element: <GlobalShell />,
    children: [
      {
        index: true,
        loader: () => redirect('/task/list'),
      },
      {
        path: 'dashboard',
        loader: () => redirect('/task/list'),
      },
      {
        path: 'task',
        element: <ModuleLayout moduleKey="task" />,
        children: [
          { index: true, loader: () => redirect('/task/list') },
          { path: 'list/:filter?', element: <TaskListPage /> },
          { path: 'create', element: <TaskCreatePage /> },
          { path: 'templates', element: <TaskTemplatesPage /> },
          { path: 'board', element: <TaskBoardPage /> },
        ],
      },
      {
        path: 'skill',
        element: <ModuleLayout moduleKey="skill" />,
        children: [
          { index: true, loader: () => redirect('/skill/list/all') },
          { path: 'list/:filter?', element: <SkillListPage /> },
          { path: 'market', element: <SkillMarketPage /> },
          { path: 'config', element: <SkillConfigPage /> },
          { path: 'versions', element: <SkillVersionsPage /> },
        ],
      },
      {
        path: 'workflow',
        element: <ModuleLayout moduleKey="workflow" />,
        children: [
          { index: true, loader: () => redirect('/workflow/list/all') },
          { path: 'list/:filter?', element: <WorkflowListPage /> },
          { path: 'editor', element: <WorkflowEditorPage /> },
          { path: 'history', element: <WorkflowHistoryPage /> },
          { path: 'schedule', element: <WorkflowSchedulePage /> },
        ],
      },
      {
        path: 'insight',
        element: <ModuleLayout moduleKey="insight" />,
        children: [
          { index: true, loader: () => redirect('/insight/overview/all') },
          { path: 'overview/:filter?', element: <InsightOverviewPage /> },
          { path: 'reports', element: <InsightReportsPage /> },
          { path: 'analysis', element: <InsightAnalysisPage /> },
          { path: 'export', element: <InsightExportPage /> },
        ],
      },
      {
        path: 'settings',
        element: <ModuleLayout moduleKey="settings" />,
        children: [
          { index: true, loader: () => redirect('/settings/users') },
          { path: 'users', element: <SettingsUsersPage /> },
          { path: 'permissions', element: <SettingsPermissionsPage /> },
          { path: 'params', element: <SettingsParamsPage /> },
          { path: 'logs', element: <SettingsLogsPage /> },
        ],
      },
      ],
    },
    ],
  },
]);