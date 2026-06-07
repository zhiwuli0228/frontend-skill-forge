import { useState, useMemo } from 'react';
import { useParams } from 'react-router';
import { Typography, Space, Select, Alert, Skeleton, Tag } from 'antd';
import { TaskFilterBar } from '../components/TaskFilterBar';
import { TaskTable } from '../components/TaskTable';
import { TaskDetailDrawer } from '../components/TaskDetailDrawer';
import { tasks, emptyTasks, type TaskItem } from '../data/mock-data';

const { Title, Text } = Typography;

type Scenario = 'loaded' | 'loading' | 'empty' | 'error';

function TaskListSkeleton() {
  return (
    <div data-testid="task-list-loading">
      <Skeleton active paragraph={{ rows: 1 }} />
      <Skeleton.Input active block style={{ height: 40, marginTop: 16 }} />
      <Skeleton active paragraph={{ rows: 8 }} style={{ marginTop: 16 }} />
    </div>
  );
}

function TaskListError({ onRetry }: { onRetry: () => void }) {
  return (
    <div data-testid="task-list-error">
      <Alert
        type="error"
        message="Task list failed to load"
        description="An unexpected error occurred while loading the task list. Please try again."
        showIcon
        action={
          <a onClick={onRetry} data-testid="task-error-retry-link">
            Retry
          </a>
        }
      />
    </div>
  );
}

export function TaskListPage() {
  const { filter } = useParams<{ filter?: string }>();
  const [scenario, setScenario] = useState<Scenario>('loaded');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);
  const [taskList, setTaskList] = useState<TaskItem[]>(tasks);

  const baseTasks = scenario === 'empty' ? emptyTasks : taskList;

  const filteredTasks = useMemo(() => {
    let result = baseTasks;
    if (filter && filter !== 'all') {
      result = result.filter((t) => t.status === filter);
    }
    if (statusFilter) result = result.filter((t) => t.status === statusFilter);
    if (priorityFilter) result = result.filter((t) => t.priority === priorityFilter);
    if (categoryFilter) result = result.filter((t) => t.category === categoryFilter);
    return result;
  }, [baseTasks, filter, statusFilter, priorityFilter, categoryFilter]);

  const handleBatchDelete = (taskIds: string[]) => {
    setTaskList((prev) => prev.filter((t) => !taskIds.includes(t.id)));
  };

  const handleBatchStatusChange = (taskIds: string[], status: string) => {
    setTaskList((prev) =>
      prev.map((t) =>
        taskIds.includes(t.id) ? { ...t, status: status as TaskItem['status'] } : t
      )
    );
  };

  const filterLabel = filter && filter !== 'all' ? filter : null;

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
        data-testid="task-scenario-select"
      />
    </Space>
  );

  if (scenario === 'loading') {
    return (
      <div>
        <Title level={2}>Task List</Title>
        {scenarioSelector}
        <TaskListSkeleton />
      </div>
    );
  }

  if (scenario === 'error') {
    return (
      <div>
        <Title level={2}>Task List</Title>
        {scenarioSelector}
        <TaskListError onRetry={() => setScenario('loaded')} />
      </div>
    );
  }

  return (
    <div data-testid="task-list-page">
      <Title level={2}>Task List</Title>
      {scenarioSelector}

      <TaskFilterBar
        statusFilter={statusFilter}
        priorityFilter={priorityFilter}
        categoryFilter={categoryFilter}
        onStatusChange={setStatusFilter}
        onPriorityChange={setPriorityFilter}
        onCategoryChange={setCategoryFilter}
      />

      {filterLabel && (
        <div style={{ marginTop: 16, marginBottom: 8 }} data-testid="sidebar-filter-indicator">
          <Text>Sidebar filter: </Text>
          <Tag color="blue">{filterLabel}</Tag>
        </div>
      )}

      <div style={{ marginTop: 16 }}>
        <TaskTable
          tasks={filteredTasks}
          selectedTaskId={selectedTask?.id ?? null}
          onSelect={setSelectedTask}
          onBatchDelete={handleBatchDelete}
          onBatchStatusChange={handleBatchStatusChange}
        />
      </div>

      <TaskDetailDrawer
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
      />
    </div>
  );
}
