// ---------------------------------------------------------------------------
// Settings Module - Mock Data
// ---------------------------------------------------------------------------

// ---- User Management ----

export interface UserItem {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user' | 'viewer';
  status: 'active' | 'disabled';
  createdAt: string;
  lastLogin: string;
}

export const users: UserItem[] = [
  {
    id: 'u001',
    username: 'zhangwei',
    email: 'zhangwei@example.com',
    role: 'admin',
    status: 'active',
    createdAt: '2025-01-15T09:30:00Z',
    lastLogin: '2026-06-07T08:12:00Z',
  },
  {
    id: 'u002',
    username: 'liuna',
    email: 'liuna@example.com',
    role: 'user',
    status: 'active',
    createdAt: '2025-03-22T14:00:00Z',
    lastLogin: '2026-06-06T17:45:00Z',
  },
  {
    id: 'u003',
    username: 'wangfeng',
    email: 'wangfeng@example.com',
    role: 'viewer',
    status: 'active',
    createdAt: '2025-05-10T10:15:00Z',
    lastLogin: '2026-06-05T11:30:00Z',
  },
  {
    id: 'u004',
    username: 'chenxiaoli',
    email: 'chenxiaoli@example.com',
    role: 'user',
    status: 'disabled',
    createdAt: '2025-06-01T08:45:00Z',
    lastLogin: '2026-04-12T09:20:00Z',
  },
  {
    id: 'u005',
    username: 'john.doe',
    email: 'john.doe@example.com',
    role: 'admin',
    status: 'active',
    createdAt: '2025-02-18T11:00:00Z',
    lastLogin: '2026-06-07T07:55:00Z',
  },
  {
    id: 'u006',
    username: 'zhaojing',
    email: 'zhaojing@example.com',
    role: 'user',
    status: 'active',
    createdAt: '2025-08-14T16:30:00Z',
    lastLogin: '2026-06-04T14:10:00Z',
  },
  {
    id: 'u007',
    username: 'sarah.miller',
    email: 'sarah.miller@example.com',
    role: 'viewer',
    status: 'disabled',
    createdAt: '2025-09-20T13:00:00Z',
    lastLogin: '2026-03-01T10:05:00Z',
  },
  {
    id: 'u008',
    username: 'sunliang',
    email: 'sunliang@example.com',
    role: 'user',
    status: 'active',
    createdAt: '2025-11-05T09:00:00Z',
    lastLogin: '2026-06-06T20:30:00Z',
  },
];

export const emptyUsers: UserItem[] = [];

// ---- Permission Management ----

export interface PermissionNode {
  key: string;
  title: string;
  description: string;
  children: PermissionNode[];
}

export const permissionTree: PermissionNode[] = [
  {
    key: 'task',
    title: 'Task Management',
    description: 'Manage task lifecycle and operations',
    children: [
      { key: 'task.view', title: 'View Tasks', description: 'Browse and search tasks', children: [] },
      { key: 'task.create', title: 'Create Tasks', description: 'Create new tasks', children: [] },
      { key: 'task.edit', title: 'Edit Tasks', description: 'Modify existing tasks', children: [] },
      { key: 'task.delete', title: 'Delete Tasks', description: 'Remove tasks from the system', children: [] },
    ],
  },
  {
    key: 'skill',
    title: 'Skill Management',
    description: 'Manage skill installation and configuration',
    children: [
      { key: 'skill.view', title: 'View Skills', description: 'Browse available skills', children: [] },
      { key: 'skill.install', title: 'Install Skills', description: 'Install new skills', children: [] },
      { key: 'skill.configure', title: 'Configure Skills', description: 'Modify skill settings and parameters', children: [] },
    ],
  },
  {
    key: 'workflow',
    title: 'Workflow Management',
    description: 'Manage workflow definitions and execution',
    children: [
      { key: 'workflow.view', title: 'View Workflows', description: 'Browse workflow definitions', children: [] },
      { key: 'workflow.create', title: 'Create Workflows', description: 'Define new workflows', children: [] },
      { key: 'workflow.execute', title: 'Execute Workflows', description: 'Run and manage workflow instances', children: [] },
    ],
  },
  {
    key: 'system',
    title: 'System Admin',
    description: 'System-level administration',
    children: [
      { key: 'system.users', title: 'Manage Users', description: 'Add, edit, and deactivate users', children: [] },
      { key: 'system.permissions', title: 'Manage Permissions', description: 'Assign and revoke permissions', children: [] },
      { key: 'system.logs', title: 'View Logs', description: 'Access system audit logs', children: [] },
      { key: 'system.settings', title: 'System Settings', description: 'Modify global system parameters', children: [] },
    ],
  },
];

// ---- System Parameters ----

export interface SystemParam {
  key: string;
  label: string;
  value: string | number | boolean;
  type: 'input' | 'select' | 'toggle' | 'number';
  group: string;
  description: string;
  options: string[];
}

export const systemParams: SystemParam[] = [
  // General
  {
    key: 'site_name',
    label: 'Site Name',
    value: 'Frontend Skill Forge',
    type: 'input',
    group: 'General',
    description: 'The display name shown in the browser tab and header',
    options: [],
  },
  {
    key: 'language',
    label: 'Language',
    value: 'zh-CN',
    type: 'select',
    group: 'General',
    description: 'Default UI language',
    options: ['zh-CN', 'en-US', 'ja-JP'],
  },
  {
    key: 'timezone',
    label: 'Timezone',
    value: 'Asia/Shanghai',
    type: 'select',
    group: 'General',
    description: 'System timezone for scheduling and display',
    options: ['Asia/Shanghai', 'America/New_York', 'Europe/London', 'Asia/Tokyo'],
  },
  {
    key: 'date_format',
    label: 'Date Format',
    value: 'YYYY-MM-DD',
    type: 'select',
    group: 'General',
    description: 'Date display format used across the application',
    options: ['YYYY-MM-DD', 'DD/MM/YYYY', 'MM/DD/YYYY'],
  },
  // Notification
  {
    key: 'email_enabled',
    label: 'Email Notifications',
    value: true,
    type: 'toggle',
    group: 'Notification',
    description: 'Enable or disable email notifications',
    options: [],
  },
  {
    key: 'webhook_url',
    label: 'Webhook URL',
    value: 'https://hooks.example.com/notify',
    type: 'input',
    group: 'Notification',
    description: 'Endpoint for webhook event delivery',
    options: [],
  },
  {
    key: 'alert_threshold',
    label: 'Alert Threshold',
    value: 80,
    type: 'number',
    group: 'Notification',
    description: 'Error rate percentage that triggers an alert',
    options: [],
  },
  {
    key: 'daily_digest',
    label: 'Daily Digest',
    value: true,
    type: 'toggle',
    group: 'Notification',
    description: 'Send a daily summary email to active users',
    options: [],
  },
  // Security
  {
    key: 'session_timeout',
    label: 'Session Timeout (min)',
    value: 30,
    type: 'number',
    group: 'Security',
    description: 'Idle session timeout in minutes',
    options: [],
  },
  {
    key: 'max_login_attempts',
    label: 'Max Login Attempts',
    value: 5,
    type: 'number',
    group: 'Security',
    description: 'Number of failed login attempts before account lockout',
    options: [],
  },
  {
    key: 'password_min_length',
    label: 'Password Min Length',
    value: 8,
    type: 'number',
    group: 'Security',
    description: 'Minimum required password length',
    options: [],
  },
  {
    key: 'two_factor_required',
    label: '2FA Required',
    value: false,
    type: 'toggle',
    group: 'Security',
    description: 'Require two-factor authentication for all users',
    options: [],
  },
];

// ---- System Logs ----

export interface LogEntry {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  status: 'success' | 'failed';
  ip: string;
}

export const logs: LogEntry[] = [
  {
    id: 'log001',
    timestamp: '2026-06-07T08:12:00Z',
    user: 'zhangwei',
    action: 'login',
    resource: '/api/auth/login',
    status: 'success',
    ip: '192.168.1.101',
  },
  {
    id: 'log002',
    timestamp: '2026-06-07T08:05:00Z',
    user: 'liuna',
    action: 'create',
    resource: '/api/tasks',
    status: 'success',
    ip: '192.168.1.102',
  },
  {
    id: 'log003',
    timestamp: '2026-06-07T07:55:00Z',
    user: 'john.doe',
    action: 'update',
    resource: '/api/settings/security',
    status: 'success',
    ip: '10.0.0.55',
  },
  {
    id: 'log004',
    timestamp: '2026-06-07T07:42:00Z',
    user: 'unknown',
    action: 'login',
    resource: '/api/auth/login',
    status: 'failed',
    ip: '203.0.113.42',
  },
  {
    id: 'log005',
    timestamp: '2026-06-06T20:30:00Z',
    user: 'sunliang',
    action: 'execute',
    resource: '/api/workflows/wf-12/run',
    status: 'success',
    ip: '192.168.1.108',
  },
  {
    id: 'log006',
    timestamp: '2026-06-06T17:45:00Z',
    user: 'liuna',
    action: 'delete',
    resource: '/api/tasks/task-88',
    status: 'success',
    ip: '192.168.1.102',
  },
  {
    id: 'log007',
    timestamp: '2026-06-06T15:20:00Z',
    user: 'zhaojing',
    action: 'install',
    resource: '/api/skills/skill-nlp/install',
    status: 'failed',
    ip: '192.168.1.106',
  },
  {
    id: 'log008',
    timestamp: '2026-06-06T14:10:00Z',
    user: 'zhaojing',
    action: 'install',
    resource: '/api/skills/skill-nlp/install',
    status: 'success',
    ip: '192.168.1.106',
  },
  {
    id: 'log009',
    timestamp: '2026-06-05T11:30:00Z',
    user: 'wangfeng',
    action: 'view',
    resource: '/api/reports/summary',
    status: 'success',
    ip: '192.168.1.103',
  },
  {
    id: 'log010',
    timestamp: '2026-06-05T09:00:00Z',
    user: 'zhangwei',
    action: 'update',
    resource: '/api/users/u004/disable',
    status: 'success',
    ip: '192.168.1.101',
  },
];

export const emptyLogs: LogEntry[] = [];
