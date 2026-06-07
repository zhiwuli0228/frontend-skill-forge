export interface TemplateItem {
  id: string;
  title: string;
  description: string;
  category: 'development' | 'design' | 'testing' | 'operations';
  tags: string[];
  icon: string; // Ant Design icon name
}

export const templates: TemplateItem[] = [
  { id: 't1', title: 'Bug Fix', description: 'Standard bug fix workflow with reproduction, fix, and verification steps.', category: 'development', tags: ['bug', 'fix'], icon: 'BugOutlined' },
  { id: 't2', title: 'Feature Implementation', description: 'Full feature implementation from design to deployment.', category: 'development', tags: ['feature', 'new'], icon: 'RocketOutlined' },
  { id: 't3', title: 'Code Review', description: 'Structured code review checklist and process.', category: 'development', tags: ['review', 'quality'], icon: 'EyeOutlined' },
  { id: 't4', title: 'UI Design Review', description: 'Design review with accessibility and usability checks.', category: 'design', tags: ['ui', 'review'], icon: 'SkinOutlined' },
  { id: 't5', title: 'Wireframe Task', description: 'Create wireframes for new page or feature.', category: 'design', tags: ['wireframe', 'design'], icon: 'EditOutlined' },
  { id: 't6', title: 'Design System Update', description: 'Update design tokens and component library.', category: 'design', tags: ['design-system', 'tokens'], icon: 'AppstoreOutlined' },
  { id: 't7', title: 'Unit Test Suite', description: 'Create comprehensive unit test suite for a module.', category: 'testing', tags: ['unit', 'testing'], icon: 'CheckCircleOutlined' },
  { id: 't8', title: 'E2E Test Plan', description: 'End-to-end test plan with Playwright scenarios.', category: 'testing', tags: ['e2e', 'playwright'], icon: 'PlayCircleOutlined' },
  { id: 't9', title: 'Performance Test', description: 'Load testing and performance benchmark setup.', category: 'testing', tags: ['performance', 'load'], icon: 'ThunderboltOutlined' },
  { id: 't10', title: 'Deployment Checklist', description: 'Pre-deployment verification and rollback plan.', category: 'operations', tags: ['deploy', 'checklist'], icon: 'CloudUploadOutlined' },
  { id: 't11', title: 'Incident Response', description: 'Incident response playbook with escalation paths.', category: 'operations', tags: ['incident', 'ops'], icon: 'AlertOutlined' },
  { id: 't12', title: 'Monitoring Setup', description: 'Set up monitoring dashboards and alerts.', category: 'operations', tags: ['monitoring', 'alerts'], icon: 'DashboardOutlined' },
];

export const emptyTemplates: TemplateItem[] = [];

export const templateCategories = ['all', 'development', 'design', 'testing', 'operations'] as const;
