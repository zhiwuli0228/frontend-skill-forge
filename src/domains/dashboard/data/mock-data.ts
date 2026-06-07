export interface MetricCard {
  id: string;
  title: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  filterKey: string;
}

export interface AlertItem {
  id: string;
  title: string;
  severity: 'critical' | 'warning' | 'info';
  source: string;
  timestamp: string;
  description: string;
  status: 'open' | 'acknowledged' | 'resolved';
  category: string;
}

export interface ActivityItem {
  id: string;
  action: string;
  actor: string;
  target: string;
  timestamp: string;
  category: string;
}

export const metrics: MetricCard[] = [
  { id: 'm1', title: 'Active Tasks', value: 24, unit: 'tasks', trend: 'up', filterKey: 'tasks' },
  { id: 'm2', title: 'Open Alerts', value: 7, unit: 'alerts', trend: 'down', filterKey: 'alerts' },
  { id: 'm3', title: 'Success Rate', value: 98.2, unit: '%', trend: 'stable', filterKey: 'success' },
  { id: 'm4', title: 'Avg Response', value: 142, unit: 'ms', trend: 'down', filterKey: 'performance' },
];

export const alerts: AlertItem[] = [
  {
    id: 'a1',
    title: 'High memory usage on worker-3',
    severity: 'critical',
    source: 'Infrastructure',
    timestamp: '2026-06-07T09:15:00Z',
    description: 'Memory usage exceeded 90% threshold on worker node 3. Immediate attention required to prevent service degradation.',
    status: 'open',
    category: 'tasks',
  },
  {
    id: 'a2',
    title: 'Deployment pipeline delayed',
    severity: 'warning',
    source: 'CI/CD',
    timestamp: '2026-06-07T08:45:00Z',
    description: 'Build queue is backing up. Current wait time: 15 minutes. Consider scaling build agents.',
    status: 'acknowledged',
    category: 'performance',
  },
  {
    id: 'a3',
    title: 'New API rate limit policy applied',
    severity: 'info',
    source: 'Platform',
    timestamp: '2026-06-07T07:30:00Z',
    description: 'Rate limits updated for external API integrations. Review current usage patterns.',
    status: 'open',
    category: 'alerts',
  },
  {
    id: 'a4',
    title: 'SSL certificate expiring in 7 days',
    severity: 'warning',
    source: 'Security',
    timestamp: '2026-06-07T06:00:00Z',
    description: 'Certificate for api.example.com expires on 2026-06-14. Renewal process should be initiated.',
    status: 'open',
    category: 'alerts',
  },
  {
    id: 'a5',
    title: 'Task queue processing resumed',
    severity: 'info',
    source: 'Scheduler',
    timestamp: '2026-06-07T05:20:00Z',
    description: 'Background task processing has resumed after scheduled maintenance window.',
    status: 'resolved',
    category: 'tasks',
  },
  {
    id: 'a6',
    title: 'Database connection pool exhausted',
    severity: 'critical',
    source: 'Database',
    timestamp: '2026-06-07T04:10:00Z',
    description: 'Connection pool reached maximum capacity. Queuing incoming requests.',
    status: 'acknowledged',
    category: 'performance',
  },
];

export const activities: ActivityItem[] = [
  { id: 'act1', action: 'Deployed', actor: 'CI Bot', target: 'v2.4.1 to production', timestamp: '2026-06-07T09:00:00Z', category: 'success' },
  { id: 'act2', action: 'Scaled', actor: 'Auto-scaler', target: 'worker pool from 3 to 5 nodes', timestamp: '2026-06-07T08:30:00Z', category: 'performance' },
  { id: 'act3', action: 'Resolved', actor: 'Ops Team', target: 'database latency spike', timestamp: '2026-06-07T08:00:00Z', category: 'tasks' },
  { id: 'act4', action: 'Updated', actor: 'Security Bot', target: 'firewall rules for region-east', timestamp: '2026-06-07T07:15:00Z', category: 'alerts' },
  { id: 'act5', action: 'Completed', actor: 'Scheduler', target: 'nightly data aggregation job', timestamp: '2026-06-07T06:00:00Z', category: 'success' },
  { id: 'act6', action: 'Triggered', actor: 'Monitoring', target: 'alert for memory threshold breach', timestamp: '2026-06-07T05:45:00Z', category: 'alerts' },
];

export const emptyAlerts: AlertItem[] = [];
export const emptyActivities: ActivityItem[] = [];
