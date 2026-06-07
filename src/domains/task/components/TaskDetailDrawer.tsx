import { Drawer, Descriptions, Tag, Typography } from 'antd';
import type { TaskItem } from '../data/mock-data';

const { Paragraph } = Typography;

interface TaskDetailDrawerProps {
  task: TaskItem | null;
  onClose: () => void;
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

export function TaskDetailDrawer({ task, onClose }: TaskDetailDrawerProps) {
  return (
    <Drawer
      title={task?.title ?? 'Task Detail'}
      open={task !== null}
      onClose={onClose}
      width={480}
      data-testid="task-detail-drawer"
    >
      {task && (
        <Descriptions column={1} bordered size="small">
          <Descriptions.Item label="Status">
            <Tag color={statusColor[task.status]}>{task.status}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Priority">
            <Tag color={priorityColor[task.priority]}>{task.priority}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Assignee">{task.assignee}</Descriptions.Item>
          <Descriptions.Item label="Category">{task.category}</Descriptions.Item>
          <Descriptions.Item label="Created">
            {new Date(task.createdAt).toLocaleDateString()}
          </Descriptions.Item>
          <Descriptions.Item label="Updated">
            {new Date(task.updatedAt).toLocaleDateString()}
          </Descriptions.Item>
          <Descriptions.Item label="Description">
            <Paragraph>{task.description}</Paragraph>
          </Descriptions.Item>
        </Descriptions>
      )}
    </Drawer>
  );
}
