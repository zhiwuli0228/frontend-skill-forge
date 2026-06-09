import type { ReactNode } from 'react'
import {
  UnorderedListOutlined,
  ThunderboltOutlined,
  BranchesOutlined,
  BarChartOutlined,
  SettingOutlined,
} from '@ant-design/icons'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TabItem {
  key: string
  label: string
}

export interface SidebarMenuItem {
  key: string
  label: string
  path?: string
  children?: SidebarMenuItem[]
}

export interface ModuleConfig {
  key: string
  label: string
  icon: ReactNode
  defaultRoute: string
  tabs: TabItem[]
  sidebarMenu: SidebarMenuItem[]
}

// ---------------------------------------------------------------------------
// Module definitions
// ---------------------------------------------------------------------------

export const modules: Record<string, ModuleConfig> = {
  task: {
    key: 'task',
    label: 'Task Center',
    icon: <UnorderedListOutlined />,
    defaultRoute: '/task/list',
    tabs: [
      { key: '/task/list', label: 'Task List' },
      { key: '/task/create', label: 'Create Task' },
      { key: '/task/templates', label: 'Templates' },
      { key: '/task/board', label: 'Board' },
    ],
    sidebarMenu: [
      { key: 'all', label: 'All', path: '/task/list/all' },
      { key: 'open', label: 'Open', path: '/task/list/open' },
      { key: 'in-progress', label: 'In Progress', path: '/task/list/in-progress' },
      { key: 'completed', label: 'Completed', path: '/task/list/completed' },
      { key: 'archived', label: 'Archived', path: '/task/list/archived' },
    ],
  },
  skill: {
    key: 'skill',
    label: 'Skill Library',
    icon: <ThunderboltOutlined />,
    defaultRoute: '/skill/list',
    tabs: [
      { key: '/skill/list', label: 'Skill List' },
      { key: '/skill/market', label: 'Skill Market' },
      { key: '/skill/config', label: 'Config Center' },
      { key: '/skill/versions', label: 'Version Management' },
      { key: '/skill/create-task', label: 'Task Creator' },
    ],
    sidebarMenu: [
      { key: 'all', label: 'All', path: '/skill/list/all' },
      { key: 'text', label: 'Text Processing', path: '/skill/list/text' },
      { key: 'image', label: 'Image Generation', path: '/skill/list/image' },
      { key: 'data', label: 'Data Analysis', path: '/skill/list/data' },
      { key: 'tool', label: 'Tool Invocation', path: '/skill/list/tool' },
    ],
  },
  workflow: {
    key: 'workflow',
    label: 'Workflow',
    icon: <BranchesOutlined />,
    defaultRoute: '/workflow/list',
    tabs: [
      { key: '/workflow/list', label: 'Workflow List' },
      { key: '/workflow/editor', label: 'Editor' },
      { key: '/workflow/history', label: 'Execution History' },
      { key: '/workflow/schedule', label: 'Schedule Management' },
    ],
    sidebarMenu: [
      { key: 'all', label: 'All', path: '/workflow/list/all' },
      { key: 'active', label: 'Active', path: '/workflow/list/active' },
      { key: 'inactive', label: 'Inactive', path: '/workflow/list/inactive' },
      { key: 'draft', label: 'Draft', path: '/workflow/list/draft' },
    ],
  },
  insight: {
    key: 'insight',
    label: 'Data Insight',
    icon: <BarChartOutlined />,
    defaultRoute: '/insight/overview',
    tabs: [
      { key: '/insight/overview', label: 'Overview' },
      { key: '/insight/reports', label: 'Reports' },
      { key: '/insight/analysis', label: 'Analysis' },
      { key: '/insight/export', label: 'Export' },
    ],
    sidebarMenu: [
      { key: 'all', label: 'All Time', path: '/insight/overview/all' },
      { key: 'today', label: 'Today', path: '/insight/overview/today' },
      { key: 'week', label: 'This Week', path: '/insight/overview/week' },
      { key: 'month', label: 'This Month', path: '/insight/overview/month' },
      { key: 'quarter', label: 'This Quarter', path: '/insight/overview/quarter' },
    ],
  },
  settings: {
    key: 'settings',
    label: 'System Settings',
    icon: <SettingOutlined />,
    defaultRoute: '/settings/users',
    tabs: [
      { key: '/settings/users', label: 'User Management' },
      { key: '/settings/permissions', label: 'Permissions' },
      { key: '/settings/params', label: 'System Params' },
      { key: '/settings/logs', label: 'Operation Logs' },
    ],
    sidebarMenu: [
      { key: '/settings/users', label: 'Users & Roles', path: '/settings/users' },
      { key: '/settings/permissions', label: 'Security', path: '/settings/permissions' },
      { key: '/settings/params', label: 'System Config', path: '/settings/params' },
      { key: '/settings/logs', label: 'Audit Logs', path: '/settings/logs' },
    ],
  },
}

// ---------------------------------------------------------------------------
// Convenience exports for header display
// ---------------------------------------------------------------------------

export const MODULE_LABELS: Record<string, string> = Object.fromEntries(
  Object.entries(modules).map(([key, mod]) => [key, mod.label]),
)

export const MODULE_ICONS: Record<string, ReactNode> = Object.fromEntries(
  Object.entries(modules).map(([key, mod]) => [key, mod.icon]),
)

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function getModuleConfig(key: string): ModuleConfig | undefined {
  return modules[key]
}
