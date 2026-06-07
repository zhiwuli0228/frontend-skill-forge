import { Space, Select, Typography } from 'antd';
import { taskStatuses, taskPriorities, taskCategories } from '../data/mock-data';

const { Text } = Typography;

interface TaskFilterBarProps {
  statusFilter: string | null;
  priorityFilter: string | null;
  categoryFilter: string | null;
  onStatusChange: (value: string | null) => void;
  onPriorityChange: (value: string | null) => void;
  onCategoryChange: (value: string | null) => void;
}

export function TaskFilterBar({
  statusFilter,
  priorityFilter,
  categoryFilter,
  onStatusChange,
  onPriorityChange,
  onCategoryChange,
}: TaskFilterBarProps) {
  return (
    <Space wrap data-testid="task-filter-bar">
      <Space>
        <Text>Status:</Text>
        <Select
          allowClear
          placeholder="All"
          style={{ width: 140 }}
          value={statusFilter ?? undefined}
          onChange={(v) => onStatusChange(v ?? null)}
          options={taskStatuses.map((s) => ({ value: s, label: s }))}
          data-testid="filter-status"
        />
      </Space>
      <Space>
        <Text>Priority:</Text>
        <Select
          allowClear
          placeholder="All"
          style={{ width: 140 }}
          value={priorityFilter ?? undefined}
          onChange={(v) => onPriorityChange(v ?? null)}
          options={taskPriorities.map((p) => ({ value: p, label: p }))}
          data-testid="filter-priority"
        />
      </Space>
      <Space>
        <Text>Category:</Text>
        <Select
          allowClear
          placeholder="All"
          style={{ width: 160 }}
          value={categoryFilter ?? undefined}
          onChange={(v) => onCategoryChange(v ?? null)}
          options={taskCategories.map((c) => ({ value: c, label: c }))}
          data-testid="filter-category"
        />
      </Space>
    </Space>
  );
}
