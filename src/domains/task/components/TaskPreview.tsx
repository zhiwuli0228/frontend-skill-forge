import { Card, Descriptions, Tag, Typography, Empty } from 'antd';
import type { TaskFormValues } from './TaskCreateForm';

const { Paragraph } = Typography;

interface TaskPreviewProps {
  values: TaskFormValues;
}

const priorityColor: Record<string, string> = {
  critical: 'red',
  high: 'orange',
  medium: 'blue',
  low: 'default',
};

export function TaskPreview({ values }: TaskPreviewProps) {
  const hasContent = values.title || values.priority || values.category;

  if (!hasContent) {
    return (
      <Card title="Preview" data-testid="task-preview">
        <Empty
          description="Start filling the form to see a preview"
          data-testid="task-preview-empty"
        />
      </Card>
    );
  }

  return (
    <Card title="Preview" data-testid="task-preview">
      <Descriptions column={1} size="small" bordered>
        <Descriptions.Item label="Title">
          {values.title || <span style={{ color: '#ccc' }}>Not set</span>}
        </Descriptions.Item>
        <Descriptions.Item label="Priority">
          {values.priority ? (
            <Tag color={priorityColor[values.priority]}>{values.priority}</Tag>
          ) : (
            <span style={{ color: '#ccc' }}>Not set</span>
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Assignee">
          {values.assignee || <span style={{ color: '#ccc' }}>Unassigned</span>}
        </Descriptions.Item>
        <Descriptions.Item label="Category">
          {values.category || <span style={{ color: '#ccc' }}>Not set</span>}
        </Descriptions.Item>
        <Descriptions.Item label="Description">
          {values.description ? (
            <Paragraph>{values.description}</Paragraph>
          ) : (
            <span style={{ color: '#ccc' }}>No description</span>
          )}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
}
