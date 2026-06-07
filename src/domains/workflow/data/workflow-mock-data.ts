export interface WorkflowItem {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'draft';
  nodeCount: number;
  lastRun: string;
  createdAt: string;
}

export interface ExecutionLog {
  id: string;
  workflowId: string;
  workflowName: string;
  startTime: string;
  duration: string;
  status: 'success' | 'failed' | 'running';
  trigger: string;
}

export interface ScheduleItem {
  id: string;
  workflowId: string;
  workflowName: string;
  cron: string;
  nextRun: string;
  enabled: boolean;
}

export interface EditorNode {
  id: string;
  type: 'trigger' | 'process' | 'condition' | 'output';
  label: string;
  x: number;
  y: number;
}

export interface EditorEdge {
  id: string;
  source: string;
  target: string;
}

export const workflows: WorkflowItem[] = [
  {
    id: 'wf1',
    name: 'Deploy Staging',
    description: 'Automated staging deployment pipeline with health checks and rollback support.',
    status: 'active',
    nodeCount: 5,
    lastRun: '2026-06-07T08:30:00Z',
    createdAt: '2026-05-15T10:00:00Z',
  },
  {
    id: 'wf2',
    name: 'Nightly Data Sync',
    description: 'Sync production data to analytics warehouse every night at 2 AM UTC.',
    status: 'active',
    nodeCount: 8,
    lastRun: '2026-06-07T02:00:00Z',
    createdAt: '2026-04-20T14:00:00Z',
  },
  {
    id: 'wf3',
    name: 'User Onboarding Email',
    description: 'Send welcome email series to new users over their first 7 days.',
    status: 'active',
    nodeCount: 4,
    lastRun: '2026-06-06T18:00:00Z',
    createdAt: '2026-05-01T09:00:00Z',
  },
  {
    id: 'wf4',
    name: 'Error Alert Escalation',
    description: 'Monitor error rates and escalate to PagerDuty when thresholds are breached.',
    status: 'inactive',
    nodeCount: 6,
    lastRun: '2026-06-05T14:22:00Z',
    createdAt: '2026-03-10T11:00:00Z',
  },
  {
    id: 'wf5',
    name: 'Invoice Generation',
    description: 'Generate and email monthly invoices for active subscriptions.',
    status: 'active',
    nodeCount: 7,
    lastRun: '2026-06-01T06:00:00Z',
    createdAt: '2026-02-28T16:00:00Z',
  },
  {
    id: 'wf6',
    name: 'Cache Invalidation',
    description: 'Invalidate CDN and application caches when content is published.',
    status: 'inactive',
    nodeCount: 3,
    lastRun: '2026-06-04T11:45:00Z',
    createdAt: '2026-04-15T08:00:00Z',
  },
  {
    id: 'wf7',
    name: 'Backup Verification',
    description: 'Verify database backups are restorable by performing trial restores weekly.',
    status: 'active',
    nodeCount: 5,
    lastRun: '2026-06-06T03:00:00Z',
    createdAt: '2026-01-20T10:00:00Z',
  },
  {
    id: 'wf8',
    name: 'Slack Standup Bot',
    description: 'Collect standup updates from team members and post summary at 10 AM.',
    status: 'draft',
    nodeCount: 4,
    lastRun: '',
    createdAt: '2026-06-07T09:00:00Z',
  },
  {
    id: 'wf9',
    name: 'PR Auto-Label',
    description: 'Automatically label pull requests based on changed file paths and labels.',
    status: 'active',
    nodeCount: 3,
    lastRun: '2026-06-07T07:15:00Z',
    createdAt: '2026-05-10T12:00:00Z',
  },
  {
    id: 'wf10',
    name: 'Compliance Report',
    description: 'Generate quarterly compliance reports from audit logs and access records.',
    status: 'draft',
    nodeCount: 9,
    lastRun: '',
    createdAt: '2026-06-06T15:00:00Z',
  },
];

export const emptyWorkflows: WorkflowItem[] = [];

export const executionLogs: ExecutionLog[] = [
  { id: 'el1', workflowId: 'wf1', workflowName: 'Deploy Staging', startTime: '2026-06-07T08:30:00Z', duration: '3m 12s', status: 'success', trigger: 'manual' },
  { id: 'el2', workflowId: 'wf2', workflowName: 'Nightly Data Sync', startTime: '2026-06-07T02:00:00Z', duration: '47m 5s', status: 'success', trigger: 'schedule' },
  { id: 'el3', workflowId: 'wf1', workflowName: 'Deploy Staging', startTime: '2026-06-06T17:45:00Z', duration: '2m 58s', status: 'failed', trigger: 'manual' },
  { id: 'el4', workflowId: 'wf3', workflowName: 'User Onboarding Email', startTime: '2026-06-06T18:00:00Z', duration: '15s', status: 'success', trigger: 'webhook' },
  { id: 'el5', workflowId: 'wf5', workflowName: 'Invoice Generation', startTime: '2026-06-01T06:00:00Z', duration: '12m 30s', status: 'success', trigger: 'schedule' },
  { id: 'el6', workflowId: 'wf4', workflowName: 'Error Alert Escalation', startTime: '2026-06-05T14:22:00Z', duration: '8s', status: 'success', trigger: 'webhook' },
  { id: 'el7', workflowId: 'wf7', workflowName: 'Backup Verification', startTime: '2026-06-06T03:00:00Z', duration: '25m 10s', status: 'success', trigger: 'schedule' },
  { id: 'el8', workflowId: 'wf9', workflowName: 'PR Auto-Label', startTime: '2026-06-07T07:15:00Z', duration: '2s', status: 'success', trigger: 'webhook' },
  { id: 'el9', workflowId: 'wf2', workflowName: 'Nightly Data Sync', startTime: '2026-06-06T02:00:00Z', duration: '1h 2m', status: 'failed', trigger: 'schedule' },
  { id: 'el10', workflowId: 'wf1', workflowName: 'Deploy Staging', startTime: '2026-06-05T10:00:00Z', duration: '3m 5s', status: 'success', trigger: 'manual' },
  { id: 'el11', workflowId: 'wf6', workflowName: 'Cache Invalidation', startTime: '2026-06-04T11:45:00Z', duration: '5s', status: 'success', trigger: 'webhook' },
  { id: 'el12', workflowId: 'wf3', workflowName: 'User Onboarding Email', startTime: '2026-06-05T18:00:00Z', duration: '18s', status: 'success', trigger: 'webhook' },
  { id: 'el13', workflowId: 'wf5', workflowName: 'Invoice Generation', startTime: '2026-05-01T06:00:00Z', duration: '11m 45s', status: 'success', trigger: 'schedule' },
  { id: 'el14', workflowId: 'wf1', workflowName: 'Deploy Staging', startTime: '2026-06-07T10:00:00Z', duration: '', status: 'running', trigger: 'manual' },
  { id: 'el15', workflowId: 'wf7', workflowName: 'Backup Verification', startTime: '2026-05-30T03:00:00Z', duration: '24m 50s', status: 'success', trigger: 'schedule' },
];

export const emptyExecutionLogs: ExecutionLog[] = [];

export const schedules: ScheduleItem[] = [
  { id: 'sch1', workflowId: 'wf2', workflowName: 'Nightly Data Sync', cron: '0 2 * * *', nextRun: '2026-06-08T02:00:00Z', enabled: true },
  { id: 'sch2', workflowId: 'wf5', workflowName: 'Invoice Generation', cron: '0 6 1 * *', nextRun: '2026-07-01T06:00:00Z', enabled: true },
  { id: 'sch3', workflowId: 'wf7', workflowName: 'Backup Verification', cron: '0 3 * * 0', nextRun: '2026-06-08T03:00:00Z', enabled: true },
  { id: 'sch4', workflowId: 'wf4', workflowName: 'Error Alert Escalation', cron: '*/5 * * * *', nextRun: '2026-06-07T10:05:00Z', enabled: false },
  { id: 'sch5', workflowId: 'wf8', workflowName: 'Slack Standup Bot', cron: '0 10 * * 1-5', nextRun: '2026-06-09T10:00:00Z', enabled: false },
];

export const emptySchedules: ScheduleItem[] = [];

export const editorNodes: EditorNode[] = [
  { id: 'n1', type: 'trigger', label: 'Webhook Trigger', x: 50, y: 200 },
  { id: 'n2', type: 'process', label: 'Validate Payload', x: 250, y: 200 },
  { id: 'n3', type: 'condition', label: 'Is Valid?', x: 450, y: 200 },
  { id: 'n4', type: 'process', label: 'Transform Data', x: 650, y: 120 },
  { id: 'n5', type: 'output', label: 'Send to Queue', x: 850, y: 120 },
  { id: 'n6', type: 'output', label: 'Log Error', x: 650, y: 300 },
];

export const editorEdges: EditorEdge[] = [
  { id: 'e1', source: 'n1', target: 'n2' },
  { id: 'e2', source: 'n2', target: 'n3' },
  { id: 'e3', source: 'n3', target: 'n4' },
  { id: 'e4', source: 'n4', target: 'n5' },
  { id: 'e5', source: 'n3', target: 'n6' },
];
