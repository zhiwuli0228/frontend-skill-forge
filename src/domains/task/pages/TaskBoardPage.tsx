import { useState, useCallback } from 'react';
import { Typography, Space, Select, Alert, Skeleton, Row, Col } from 'antd';
import { BoardContainer } from '../components/BoardContainer';
import { TaskDetailDrawer } from '../components/TaskDetailDrawer';
import { tasks, emptyTasks, type TaskItem } from '../data/mock-data';

const { Title, Text } = Typography;

type Scenario = 'loaded' | 'loading' | 'empty' | 'error';

function BoardSkeleton() {
  return (
    <div data-testid="task-board-loading">
      <Row gutter={16}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Col key={i} span={6}>
            <div style={{ background: '#fafafa', borderRadius: 8, padding: 12 }}>
              <Skeleton active paragraph={{ rows: 1 }} />
              <Skeleton.Input active block style={{ height: 80, marginTop: 12 }} />
              <Skeleton.Input active block style={{ height: 80, marginTop: 8 }} />
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

function BoardError({ onRetry }: { onRetry: () => void }) {
  return (
    <div data-testid="task-board-error">
      <Alert
        type="error"
        message="Board failed to load"
        description="An unexpected error occurred while loading the board. Please try again."
        showIcon
        action={
          <a onClick={onRetry} data-testid="task-board-error-retry-link">
            Retry
          </a>
        }
      />
    </div>
  );
}

export function TaskBoardPage() {
  const [scenario, setScenario] = useState<Scenario>('loaded');
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);
  const [taskList, setTaskList] = useState<TaskItem[]>(tasks);

  const baseTasks = scenario === 'empty' ? emptyTasks : taskList;

  const handleTaskMove = useCallback((taskId: string, newBoardStatus: string) => {
    const reverseMapping: Record<string, TaskItem['status']> = {
      todo: 'open',
      'in-progress': 'in-progress',
      done: 'completed',
      'in-review': 'blocked',
    };
    const newStatus = reverseMapping[newBoardStatus] ?? 'open';
    setTaskList((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
  }, []);

  const scenarioSelector = (
    <Space style={{ marginBottom: 16 }}>
      <Text>Scenario:</Text>
      <Select
        value={scenario}
        onChange={setScenario}
        options={[
          { value: 'loaded', label: 'Loaded' },
          { value: 'loading', label: 'Loading' },
          { value: 'empty', label: 'Empty' },
          { value: 'error', label: 'Error' },
        ]}
        data-testid="task-board-scenario-select"
      />
    </Space>
  );

  if (scenario === 'loading') {
    return (
      <div data-testid="task-board-page">
        <Title level={2}>Task Board</Title>
        {scenarioSelector}
        <BoardSkeleton />
      </div>
    );
  }

  if (scenario === 'error') {
    return (
      <div data-testid="task-board-page">
        <Title level={2}>Task Board</Title>
        {scenarioSelector}
        <BoardError onRetry={() => setScenario('loaded')} />
      </div>
    );
  }

  return (
    <div data-testid="task-board-page">
      <Title level={2}>Task Board</Title>
      {scenarioSelector}

      <BoardContainer
        tasks={baseTasks}
        onTaskClick={setSelectedTask}
        onTaskMove={handleTaskMove}
      />

      <TaskDetailDrawer
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
      />
    </div>
  );
}
