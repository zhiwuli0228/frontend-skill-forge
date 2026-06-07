import { Card, Tag, Typography } from 'antd';
import type { TaskItem } from '../data/mock-data';

const { Text } = Typography;

const priorityColor: Record<string, string> = {
  critical: 'red',
  high: 'orange',
  medium: 'blue',
  low: 'green',
};

interface BoardTaskCardProps {
  task: TaskItem;
  onClick: () => void;
  onDragStart: (e: React.DragEvent) => void;
}

export function BoardTaskCard({ task, onClick, onDragStart }: BoardTaskCardProps) {
  return (
    <Card
      size="small"
      hoverable
      draggable
      onClick={onClick}
      onDragStart={onDragStart}
      data-testid={`board-task-card-${task.id}`}
      style={{ marginBottom: 8, cursor: 'grab' }}
    >
      <div style={{ marginBottom: 4 }}>
        <Text strong style={{ fontSize: 13 }}>{task.title}</Text>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Tag color={priorityColor[task.priority]}>{task.priority}</Tag>
        <Text type="secondary" style={{ fontSize: 12 }}>{task.assignee}</Text>
      </div>
    </Card>
  );
}
