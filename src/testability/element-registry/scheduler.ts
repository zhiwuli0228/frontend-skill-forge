export type StitchPriority = 'e2e-failure' | 'commit' | 'periodic';
export type QueueStatus = 'pending' | 'running' | 'done' | 'error';

export interface QueuedStitch {
  id: string;
  routes: string[];
  priority: StitchPriority;
  reason: string;
  status: QueueStatus;
  queuedAt: string;
  startedAt?: string;
  completedAt?: string;
}

export interface SchedulerStats {
  totalProcessed: number;
  pendingCount: number;
  lastRunAt?: string;
  lastRunDurationMs?: number;
}

const PRIORITY_ORDER: Record<StitchPriority, number> = {
  'e2e-failure': 0,
  commit: 1,
  periodic: 2,
};

export class StitchScheduler {
  private queue: QueuedStitch[] = [];
  private dedupWindowMs: number;
  private processed = 0;
  private idCounter = 0;

  constructor(options?: { dedupWindowMs?: number }) {
    this.dedupWindowMs = options?.dedupWindowMs ?? 5000;
  }

  /** Add routes to the stitch queue with deduplication. */
  enqueue(routes: string[], priority: StitchPriority, reason: string): void {
    const now = Date.now();

    // Dedup: if same routes already queued within window, upgrade priority
    for (const existing of this.queue) {
      if (existing.status !== 'pending') continue;
      const age = now - new Date(existing.queuedAt).getTime();
      if (age > this.dedupWindowMs) continue;

      const overlap = existing.routes.some((r) => routes.includes(r));
      if (overlap) {
        // Merge routes and upgrade to higher priority
        existing.routes = [...new Set([...existing.routes, ...routes])];
        if (PRIORITY_ORDER[priority] < PRIORITY_ORDER[existing.priority]) {
          existing.priority = priority;
          existing.reason = reason;
        }
        return;
      }
    }

    this.queue.push({
      id: `stitch-${++this.idCounter}`,
      routes: [...routes],
      priority,
      reason,
      status: 'pending',
      queuedAt: new Date().toISOString(),
    });
  }

  /** Get the next pending batch (highest priority first). */
  dequeue(): QueuedStitch | null {
    // Sort by priority then queue time
    this.queue.sort((a, b) => {
      const pDiff = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
      if (pDiff !== 0) return pDiff;
      return new Date(a.queuedAt).getTime() - new Date(b.queuedAt).getTime();
    });

    const next = this.queue.find((q) => q.status === 'pending');
    if (!next) return null;

    next.status = 'running';
    next.startedAt = new Date().toISOString();
    return next;
  }

  /** Mark a queued stitch as complete. */
  complete(id: string): void {
    const entry = this.queue.find((q) => q.id === id);
    if (entry) {
      entry.status = 'done';
      entry.completedAt = new Date().toISOString();
      this.processed++;
    }
  }

  /** Mark a queued stitch as errored. */
  error(id: string): void {
    const entry = this.queue.find((q) => q.id === id);
    if (entry) {
      entry.status = 'error';
      entry.completedAt = new Date().toISOString();
    }
  }

  getStats(): SchedulerStats {
    return {
      totalProcessed: this.processed,
      pendingCount: this.queue.filter((q) => q.status === 'pending').length,
    };
  }

  /** Remove all completed/errored entries older than keepMinutes. */
  prune(keepMinutes = 60): void {
    const cutoff = Date.now() - keepMinutes * 60 * 1000;
    this.queue = this.queue.filter(
      (q) =>
        q.status === 'pending' ||
        q.status === 'running' ||
        new Date(q.completedAt || q.queuedAt).getTime() > cutoff,
    );
  }
}
