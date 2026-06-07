import { Badge, Empty, Typography } from 'antd';
import type { TaskItem } from '../data/mock-data';
import { BoardTaskCard } from './BoardTaskCard';

const { Title } = Typography;

interface BoardColumnProps {
  title: string;
  status: string;
  tasks: TaskItem[];
  onTaskClick: (task: TaskItem) => void;
  onDrop: (taskId: string) => void;
}

export function BoardColumn({ title, status, tasks, onTaskClick, onDrop }: BoardColumnProps) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    if (taskId) {
      onDrop(taskId);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      data-testid={`board-column-${status}`}
      style={{
        background: '#fafafa',
        borderRadius: 8,
        padding: 12,
        minHeight: 400,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <Title level={5} style={{ margin: 0 }}>{title}</Title>
        <Badge count={tasks.length} data-testid={`board-card-count-${status}`} />
      </div>

      {tasks.length === 0 ? (
        <Empty description="No tasks" image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        tasks.map((task) => (
          <BoardTaskCard
            key={task.id}
            task={task}
            onClick={() => onTaskClick(task)}
            onDragStart={(e) => {
              e.dataTransfer.setData('text/plain', task.id);
            }}
          />
        ))
      )}
    </div>
  );
}
