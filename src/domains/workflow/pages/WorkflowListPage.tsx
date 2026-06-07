import { useState, useMemo } from 'react';
import { useParams } from 'react-router';
import { Typography, Table, Tag, Switch, Select, Space, Alert, Skeleton, Empty } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { workflows, emptyWorkflows, type WorkflowItem } from '../data/workflow-mock-data';

const { Title, Text } = Typography;

type Scenario = 'loaded' | 'loading' | 'empty' | 'error';

const statusColor: Record<string, string> = {
  active: 'green',
  inactive: 'gray',
  draft: 'blue',
};

function WorkflowListSkeleton() {
  return (
    <div data-testid="workflow-loading">
      <Skeleton active paragraph={{ rows: 1 }} />
      <Skeleton.Input active block style={{ height: 40, marginTop: 16 }} />
      <Skeleton active paragraph={{ rows: 8 }} style={{ marginTop: 16 }} />
    </div>
  );
}

function WorkflowListError({ onRetry }: { onRetry: () => void }) {
  return (
    <div data-testid="workflow-error">
      <Alert
        type="error"
        message="Workflow list failed to load"
        description="An unexpected error occurred while loading the workflow list. Please try again."
        showIcon
        action={
          <a onClick={onRetry} data-testid="workflow-error-retry-link">
            Retry
          </a>
        }
      />
    </div>
  );
}

export function WorkflowListPage() {
  const { filter } = useParams<{ filter?: string }>();
  const [scenario, setScenario] = useState<Scenario>('loaded');
  const [statusToggle, setStatusToggle] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    workflows.forEach((wf) => {
      initial[wf.id] = wf.status === 'active';
    });
    return initial;
  });

  const baseWorkflows = scenario === 'empty' ? emptyWorkflows : workflows;

  const displayWorkflows = useMemo(() => {
    return baseWorkflows.map((wf) => ({
      ...wf,
      status: statusToggle[wf.id] ? ('active' as const) : ('inactive' as const),
    }));
  }, [baseWorkflows, statusToggle]);

  const filteredWorkflows = useMemo(() => {
    if (!filter || filter === 'all') return displayWorkflows;
    return displayWorkflows.filter((wf) => {
      if (filter === 'draft') return wf.lastRun === '' && wf.status !== 'active';
      return wf.status === filter;
    });
  }, [displayWorkflows, filter]);

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
        data-testid="workflow-scenario-select"
      />
    </Space>
  );

  if (scenario === 'loading') {
    return (
      <div>
        <Title level={2}>Workflow List</Title>
        {scenarioSelector}
        <WorkflowListSkeleton />
      </div>
    );
  }

  if (scenario === 'error') {
    return (
      <div>
        <Title level={2}>Workflow List</Title>
        {scenarioSelector}
        <WorkflowListError onRetry={() => setScenario('loaded')} />
      </div>
    );
  }

  if (filteredWorkflows.length === 0) {
    return (
      <div data-testid="workflow-list-page">
        <Title level={2}>Workflow List</Title>
        {scenarioSelector}
        {filterLabel && (
          <div style={{ marginBottom: 8 }} data-testid="sidebar-filter-indicator">
            <Text>Sidebar filter: </Text>
            <Tag color="blue">{filterLabel}</Tag>
          </div>
        )}
        <Empty description="No workflows found" />
      </div>
    );
  }

  return (
    <div data-testid="workflow-list-page">
      <Title level={2}>Workflow List</Title>
      {scenarioSelector}

      {filterLabel && (
        <div style={{ marginBottom: 8 }} data-testid="sidebar-filter-indicator">
          <Text>Sidebar filter: </Text>
          <Tag color="blue">{filterLabel}</Tag>
        </div>
      )}

      <Table<WorkflowItem>
        dataSource={filteredWorkflows}
        rowKey="id"
        size="middle"
        data-testid="workflow-table"
        pagination={false}
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
            ellipsis: true,
          },
          {
            title: 'Status',
            dataIndex: 'status',
            width: 110,
            render: (status: string) => (
              <Tag color={statusColor[status]}>{status}</Tag>
            ),
          },
          {
            title: 'Node Count',
            dataIndex: 'nodeCount',
            width: 110,
            align: 'center',
          },
          {
            title: 'Last Run',
            dataIndex: 'lastRun',
            width: 180,
            render: (val: string) => (val ? new Date(val).toLocaleString() : '--'),
          },
          {
            title: 'Actions',
            width: 180,
            render: (_: unknown, record: WorkflowItem) => (
              <Space>
                <Switch
                  checked={statusToggle[record.id] ?? false}
                  onChange={(checked) =>
                    setStatusToggle((prev) => ({ ...prev, [record.id]: checked }))
                  }
                  checkedChildren="On"
                  unCheckedChildren="Off"
                  data-testid={`workflow-status-toggle-${record.id}`}
                />
                <a data-testid={`workflow-edit-${record.id}`}>
                  <EditOutlined /> Edit
                </a>
              </Space>
            ),
          },
        ]}
      />
    </div>
  );
}
