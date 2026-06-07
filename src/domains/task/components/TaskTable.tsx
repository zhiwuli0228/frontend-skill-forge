import { Table, Tag, Empty } from 'antd';
import type { TaskItem } from '../data/mock-data';

interface TaskTableProps {
  tasks: TaskItem[];
  selectedTaskId: string | null;
  onSelect: (task: TaskItem) => void;
}

const statusColor: Record<string, string> = {
  open: 'blue',
  'in-progress': 'orange',
  completed: 'green',
  blocked: 'red',
};

const priorityColor: Record<string, string> = {
  critical: 'red',
  high: 'orange',
  medium: 'blue',
  low: 'default',
};

export function TaskTable({ tasks, selectedTaskId, onSelect }: TaskTableProps) {
  if (tasks.length === 0) {
    return (
      <div data-testid="task-table-empty">
        <Empty description="No tasks match the current filter" />
      </div>
    );
  }

  return (
    <Table<TaskItem>
      dataSource={tasks}
      rowKey="id"
      size="middle"
      data-testid="task-table"
      rowClassName={(record) =>
        record.id === selectedTaskId ? 'ant-table-row-selected' : ''
      }
      onRow={(record) => ({
        onClick: () => onSelect(record),
        style: { cursor: 'pointer' },
      })}
      columns={[
        {
          title: 'Title',
          dataIndex: 'title',
          ellipsis: true,
        },
        {
          title: 'Status',
          dataIndex: 'status',
          width: 130,
          render: (status: string) => (
            <Tag color={statusColor[status]}>{status}</Tag>
          ),
        },
        {
          title: 'Priority',
          dataIndex: 'priority',
          width: 110,
          render: (priority: string) => (
            <Tag color={priorityColor[priority]}>{priority}</Tag>
          ),
        },
        {
          title: 'Assignee',
          dataIndex: 'assignee',
          width: 120,
        },
        {
          title: 'Category',
          dataIndex: 'category',
          width: 140,
        },
      ]}
      pagination={false}
    />
  );
}
