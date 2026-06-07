import { useState } from 'react';
import { Table, Tag, Empty, Space, Button, Popconfirm, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import type { TaskItem } from '../data/mock-data';

interface TaskTableProps {
  tasks: TaskItem[];
  selectedTaskId: string | null;
  onSelect: (task: TaskItem) => void;
  onBatchDelete?: (taskIds: string[]) => void;
  onBatchStatusChange?: (taskIds: string[], status: string) => void;
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

export function TaskTable({ tasks, selectedTaskId, onSelect, onBatchDelete, onBatchStatusChange }: TaskTableProps) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: React.Key[]) => {
      setSelectedRowKeys(keys);
    },
  };

  const hasSelected = selectedRowKeys.length > 0;

  if (tasks.length === 0) {
    return (
      <div data-testid="task-table-empty">
        <Empty description="No tasks match the current filter" />
      </div>
    );
  }

  return (
    <div>
      {hasSelected && (
        <div style={{ marginBottom: 16 }} data-testid="task-batch-actions">
          <Space>
            <span>Selected {selectedRowKeys.length} tasks</span>
            <Popconfirm
              title="Are you sure to delete selected tasks?"
              onConfirm={() => {
                onBatchDelete?.(selectedRowKeys as string[]);
                setSelectedRowKeys([]);
                message.success('Tasks deleted');
              }}
            >
              <Button icon={<DeleteOutlined />} danger data-testid="btn-batch-delete">
                Delete
              </Button>
            </Popconfirm>
            <Button
              onClick={() => {
                onBatchStatusChange?.(selectedRowKeys as string[], 'completed');
                setSelectedRowKeys([]);
                message.success('Tasks marked as completed');
              }}
              data-testid="btn-batch-complete"
            >
              Mark Completed
            </Button>
          </Space>
        </div>
      )}

      <Table<TaskItem>
        dataSource={tasks}
        rowKey="id"
        size="middle"
        data-testid="task-table"
        rowSelection={rowSelection}
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
            sorter: (a, b) => a.title.localeCompare(b.title),
          },
          {
            title: 'Status',
            dataIndex: 'status',
            width: 130,
            render: (status: string) => (
              <Tag color={statusColor[status]}>{status}</Tag>
            ),
            filters: [
              { text: 'Open', value: 'open' },
              { text: 'In Progress', value: 'in-progress' },
              { text: 'Completed', value: 'completed' },
              { text: 'Blocked', value: 'blocked' },
              { text: 'Archived', value: 'archived' },
            ],
            onFilter: (value, record) => record.status === value,
          },
          {
            title: 'Priority',
            dataIndex: 'priority',
            width: 110,
            render: (priority: string) => (
              <Tag color={priorityColor[priority]}>{priority}</Tag>
            ),
            sorter: (a, b) => {
              const order = { critical: 0, high: 1, medium: 2, low: 3 };
              return order[a.priority] - order[b.priority];
            },
          },
          {
            title: 'Assignee',
            dataIndex: 'assignee',
            width: 120,
            filters: [
              { text: 'Alice', value: 'Alice' },
              { text: 'Bob', value: 'Bob' },
              { text: 'Charlie', value: 'Charlie' },
              { text: 'Diana', value: 'Diana' },
              { text: 'Eve', value: 'Eve' },
            ],
            onFilter: (value, record) => record.assignee === value,
          },
          {
            title: 'Category',
            dataIndex: 'category',
            width: 140,
            filters: [
              { text: 'Infrastructure', value: 'infrastructure' },
              { text: 'Security', value: 'security' },
              { text: 'Bugfix', value: 'bugfix' },
              { text: 'Observability', value: 'observability' },
              { text: 'Performance', value: 'performance' },
            ],
            onFilter: (value, record) => record.category === value,
          },
          {
            title: 'Created',
            dataIndex: 'createdAt',
            width: 120,
            render: (date: string) => new Date(date).toLocaleDateString(),
            sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
          },
        ]}
        pagination={{
          pageSize: 5,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `Total ${total} tasks`,
        }}
      />
    </div>
  );
}
