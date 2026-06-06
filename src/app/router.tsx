import { createBrowserRouter } from 'react-router';
import { AppLayout } from '../shell/layout/AppLayout';
import { LoginPage } from '../domains/auth/pages/LoginPage';
import { DashboardPage } from '../domains/dashboard/pages/DashboardPage';
import { TaskListPage } from '../domains/task/pages/TaskListPage';
import { TaskCreatePage } from '../domains/task/pages/TaskCreatePage';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'task/list',
        element: <TaskListPage />,
      },
      {
        path: 'task/create',
        element: <TaskCreatePage />,
      },
    ],
  },
]);