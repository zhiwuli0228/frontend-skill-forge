export interface TaskItem {
  id: string;
  title: string;
  status: 'open' | 'in-progress' | 'completed' | 'blocked' | 'archived';
  priority: 'critical' | 'high' | 'medium' | 'low';
  assignee: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  description: string;
}

export const tasks: TaskItem[] = [
  {
    id: 't1',
    title: 'Upgrade database connection pooling',
    status: 'in-progress',
    priority: 'critical',
    assignee: 'Alice',
    category: 'infrastructure',
    createdAt: '2026-06-01T10:00:00Z',
    updatedAt: '2026-06-07T09:00:00Z',
    description: 'Migrate from HikariCP 5.x to 6.x to resolve connection leak under high concurrency. Includes updating JDBC driver and running integration tests against staging.',
  },
  {
    id: 't2',
    title: 'Implement rate limiting for public API',
    status: 'open',
    priority: 'high',
    assignee: 'Bob',
    category: 'security',
    createdAt: '2026-06-02T14:00:00Z',
    updatedAt: '2026-06-05T11:00:00Z',
    description: 'Add token-bucket rate limiting to /api/v2/* endpoints. Target: 1000 req/min per client. Must include retry-after headers and 429 responses.',
  },
  {
    id: 't3',
    title: 'Fix timezone handling in scheduler',
    status: 'completed',
    priority: 'medium',
    assignee: 'Charlie',
    category: 'bugfix',
    createdAt: '2026-05-28T08:00:00Z',
    updatedAt: '2026-06-03T16:00:00Z',
    description: 'Scheduled jobs were running at wrong times for non-UTC tenants. Root cause: DateTimeFormatter was not applying zone offset from tenant config.',
  },
  {
    id: 't4',
    title: 'Add observability dashboard for queue depth',
    status: 'open',
    priority: 'medium',
    assignee: 'Alice',
    category: 'observability',
    createdAt: '2026-06-04T09:00:00Z',
    updatedAt: '2026-06-04T09:00:00Z',
    description: 'Create Grafana dashboard panels showing message queue depth, consumer lag, and dead-letter count per service. Alert on depth exceeding 10k.',
  },
  {
    id: 't5',
    title: 'Migrate auth tokens to JWT RS256',
    status: 'blocked',
    priority: 'high',
    assignee: 'Diana',
    category: 'security',
    createdAt: '2026-06-03T11:00:00Z',
    updatedAt: '2026-06-06T15:00:00Z',
    description: 'Replace HS256 symmetric tokens with RS256 asymmetric keys. Blocked on key-rotation infrastructure readiness. Requires coordination with platform team.',
  },
  {
    id: 't6',
    title: 'Optimize image thumbnail generation',
    status: 'in-progress',
    priority: 'low',
    assignee: 'Eve',
    category: 'performance',
    createdAt: '2026-06-05T13:00:00Z',
    updatedAt: '2026-06-07T08:00:00Z',
    description: 'Switch from server-side resizing to edge CDN transformation. Expected to reduce origin load by 60%. Need to validate quality at various breakpoints.',
  },
  {
    id: 't7',
    title: 'Write migration for user preferences schema',
    status: 'open',
    priority: 'medium',
    assignee: 'Bob',
    category: 'infrastructure',
    createdAt: '2026-06-06T10:00:00Z',
    updatedAt: '2026-06-06T10:00:00Z',
    description: 'Add nullable JSONB column for user preferences. Backfill from existing settings table. Must be backward-compatible with v1 API consumers.',
  },
  {
    id: 't8',
    title: 'Investigate memory leak in worker pods',
    status: 'in-progress',
    priority: 'critical',
    assignee: 'Charlie',
    category: 'bugfix',
    createdAt: '2026-06-07T07:00:00Z',
    updatedAt: '2026-06-07T10:00:00Z',
    description: 'Worker pods OOM-killed after ~6 hours. Heap dump shows growing ByteString allocation in gRPC response cache. Suspect missing close() on streaming call.',
  },
  {
    id: 't9',
    title: 'Decommission legacy v1 API endpoints',
    status: 'archived',
    priority: 'low',
    assignee: 'Frank',
    category: 'infrastructure',
    createdAt: '2025-11-15T09:00:00Z',
    updatedAt: '2026-01-20T14:00:00Z',
    description: 'Legacy v1 endpoints retired after v2 GA. Kept for audit reference. No active traffic since January 2026.',
  },
  {
    id: 't10',
    title: 'Pilot GraphQL gateway experiment',
    status: 'archived',
    priority: 'medium',
    assignee: 'Grace',
    category: 'infrastructure',
    createdAt: '2025-12-01T10:00:00Z',
    updatedAt: '2026-02-15T16:00:00Z',
    description: 'GraphQL gateway pilot concluded in February. Team decided to stay with REST for v2 API. Documentation archived for future reference.',
  },
];

export const emptyTasks: TaskItem[] = [];

export const taskStatuses = ['open', 'in-progress', 'completed', 'blocked', 'archived'] as const;
export const taskPriorities = ['critical', 'high', 'medium', 'low'] as const;
export const taskCategories = ['infrastructure', 'security', 'bugfix', 'observability', 'performance'] as const;
