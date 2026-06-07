import { Row, Col } from 'antd';
import type { TaskItem } from '../data/mock-data';
import { BoardColumn } from './BoardColumn';

const BOARD_COLUMNS = [
  { title: 'To Do', status: 'todo' },
  { title: 'In Progress', status: 'in-progress' },
  { title: 'In Review', status: 'in-review' },
  { title: 'Done', status: 'done' },
] as const;

/** Map existing TaskItem statuses to board column statuses. */
function toBoardStatus(taskStatus: string): string {
  const mapping: Record<string, string> = {
    open: 'todo',
    'in-progress': 'in-progress',
    completed: 'done',
    blocked: 'in-review',
  };
  return mapping[taskStatus] ?? 'todo';
}

interface BoardContainerProps {
  tasks: TaskItem[];
  onTaskClick: (task: TaskItem) => void;
  onTaskMove: (taskId: string, newStatus: string) => void;
}

export function BoardContainer({ tasks, onTaskClick, onTaskMove }: BoardContainerProps) {
  const tasksByStatus = BOARD_COLUMNS.map((col) => ({
    ...col,
    tasks: tasks.filter((t) => toBoardStatus(t.status) === col.status),
  }));

  return (
    <div data-testid="board-container">
      <Row gutter={16}>
        {tasksByStatus.map((col) => (
          <Col key={col.status} span={6}>
            <BoardColumn
              title={col.title}
              status={col.status}
              tasks={col.tasks}
              onTaskClick={onTaskClick}
              onDrop={(taskId) => onTaskMove(taskId, col.status)}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}
