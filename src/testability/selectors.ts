export type SelectorPriority = 'role' | 'testid' | 'text' | 'css';

export interface SelectorEntry {
  id: string;
  priority: SelectorPriority;
  selector: string;
  description: string;
}

export const SELECTOR_REGISTRY: Record<string, SelectorEntry> = {
  'skill-list.heading': {
    id: 'skill-list.heading',
    priority: 'role',
    selector: 'role=heading[name=/skills/i]',
    description: 'Skill list page heading',
  },
  'skill-list.filter-bar': {
    id: 'skill-list.filter-bar',
    priority: 'testid',
    selector: 'data-testid=skill-filter-bar',
    description: 'Skill filter bar',
  },
  'skill-list.grid': {
    id: 'skill-list.grid',
    priority: 'testid',
    selector: 'data-testid=skill-grid',
    description: 'Skill grid container',
  },
  'skill-list.list-view': {
    id: 'skill-list.list-view',
    priority: 'testid',
    selector: 'data-testid=skill-list-view',
    description: 'Skill list view container',
  },
  'skill-list.search': {
    id: 'skill-list.search',
    priority: 'testid',
    selector: 'data-testid=skill-search',
    description: 'Skill search input',
  },
  'skill-list.category-filter': {
    id: 'skill-list.category-filter',
    priority: 'testid',
    selector: 'data-testid=skill-category-filter',
    description: 'Skill category filter select',
  },
  'skill-list.scenario-select': {
    id: 'skill-list.scenario-select',
    priority: 'testid',
    selector: 'data-testid=skill-scenario-select',
    description: 'Skill list scenario selector',
  },
  'skill-list.grid-btn': {
    id: 'skill-list.grid-btn',
    priority: 'testid',
    selector: 'data-testid=skill-grid-btn',
    description: 'Skill grid view toggle button',
  },
  'skill-list.list-btn': {
    id: 'skill-list.list-btn',
    priority: 'testid',
    selector: 'data-testid=skill-list-btn',
    description: 'Skill list view toggle button',
  },
  'skill-list.detail-modal': {
    id: 'skill-list.detail-modal',
    priority: 'testid',
    selector: 'data-testid=skill-detail-modal',
    description: 'Skill detail modal container',
  },
  'skill-list.loading': {
    id: 'skill-list.loading',
    priority: 'testid',
    selector: 'data-testid=skill-loading',
    description: 'Skill list loading skeleton',
  },
  'skill-list.error': {
    id: 'skill-list.error',
    priority: 'testid',
    selector: 'data-testid=skill-error',
    description: 'Skill list error alert',
  },
  'skill-list.retry-link': {
    id: 'skill-list.retry-link',
    priority: 'testid',
    selector: 'data-testid=skill-error-retry-link',
    description: 'Skill list error retry link',
  },
  'task-list.heading': {
    id: 'task-list.heading',
    priority: 'role',
    selector: 'role=heading[name=/task list/i]',
    description: 'Task list page heading',
  },
  'task-list.filter-bar': {
    id: 'task-list.filter-bar',
    priority: 'testid',
    selector: 'data-testid=task-filter-bar',
    description: 'Task filter bar',
  },
  'task-list.table': {
    id: 'task-list.table',
    priority: 'testid',
    selector: 'data-testid=task-table',
    description: 'Task table container',
  },
  'task-list.scenario-select': {
    id: 'task-list.scenario-select',
    priority: 'testid',
    selector: 'data-testid=task-scenario-select',
    description: 'Task list scenario selector',
  },
  'task-list.empty': {
    id: 'task-list.empty',
    priority: 'testid',
    selector: 'data-testid=task-table-empty',
    description: 'Task list empty state',
  },
  'task-list.loading': {
    id: 'task-list.loading',
    priority: 'testid',
    selector: 'data-testid=task-list-loading',
    description: 'Task list loading skeleton',
  },
  'task-list.error': {
    id: 'task-list.error',
    priority: 'testid',
    selector: 'data-testid=task-list-error',
    description: 'Task list error alert',
  },
  'task-list.retry-link': {
    id: 'task-list.retry-link',
    priority: 'testid',
    selector: 'data-testid=task-error-retry-link',
    description: 'Task list error retry link',
  },
  'task-list.detail-drawer': {
    id: 'task-list.detail-drawer',
    priority: 'testid',
    selector: 'data-testid=task-detail-drawer',
    description: 'Task detail drawer container',
  },
  'workflow-list.heading': {
    id: 'workflow-list.heading',
    priority: 'role',
    selector: 'role=heading[name=/workflow list/i]',
    description: 'Workflow list page heading',
  },
  'dashboard.metrics': {
    id: 'dashboard.metrics',
    priority: 'testid',
    selector: 'data-testid=metric-band',
    description: 'Dashboard metric cards band',
  },
};

export function getSelector(id: string): SelectorEntry {
  const entry = SELECTOR_REGISTRY[id];
  if (!entry) {
    throw new Error(`Unknown selector id: ${id}`);
  }
  return entry;
}

export function listSelectors(): SelectorEntry[] {
  return Object.values(SELECTOR_REGISTRY);
}
