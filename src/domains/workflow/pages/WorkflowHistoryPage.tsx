import { useState, useMemo } from 'react';
import { Typography, Table, Tag, Select, Space, Alert, Skeleton, Empty } from 'antd';
import { executionLogs, emptyExecutionLogs, type ExecutionLog } from '../data/workflow-mock-data';

const { Title, Text } = Typography;

type Scenario = 'loaded' | 'loading' | 'empty' | 'error';

const statusColor: Record<string, string> = {
  success: 'green',
  failed: 'red',
  running: 'blue',
};

function WorkflowHistorySkeleton() {
  return (
    <div data-testid="workflow-history-loading">
      <Skeleton active paragraph={{ rows: 1 }} />
      <Skeleton.Input active block style={{ height: 40, marginTop: 16 }} />
      <Skeleton active paragraph={{ rows: 8 }} style={{ marginTop: 16 }} />
    </div>
  );
}

function WorkflowHistoryError({ onRetry }: { onRetry: () => void }) {
  return (
    <div data-testid="workflow-history-error">
      <Alert
        type="error"
        message="Execution history failed to load"
        description="An unexpected error occurred while loading execution history. Please try again."
        showIcon
        action={
          <a onClick={onRetry} data-testid="workflow-history-error-retry-link">
            Retry
          </a>
        }
      />
    </div>
  );
}

export function WorkflowHistoryPage() {
  const [scenario, setScenario] = useState<Scenario>('loaded');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const baseLogs = scenario === 'empty' ? emptyExecutionLogs : executionLogs;

  const filteredLogs = useMemo(() => {
    if (!statusFilter) return baseLogs;
    return baseLogs.filter((log) => log.status === statusFilter);
  }, [baseLogs, statusFilter]);

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
        data-testid="workflow-history-scenario-select"
      />
    </Space>
  );

  if (scenario === 'loading') {
    return (
      <div>
        <Title level={2}>Workflow Execution History</Title>
        {scenarioSelector}
        <WorkflowHistorySkeleton />
      </div>
    );
  }

  if (scenario === 'error') {
    return (
      <div>
        <Title level={2}>Workflow Execution History</Title>
        {scenarioSelector}
        <WorkflowHistoryError onRetry={() => setScenario('loaded')} />
      </div>
    );
  }

  return (
    <div data-testid="workflow-history-page">
      <Title level={2}>Workflow Execution History</Title>
      {scenarioSelector}

      <Space style={{ marginBottom: 16 }}>
        <Text>Filter by status:</Text>
        <Select
          value={statusFilter}
          onChange={setStatusFilter}
          placeholder="All statuses"
          allowClear
          options={[
            { value: 'success', label: 'Success' },
            { value: 'failed', label: 'Failed' },
            { value: 'running', label: 'Running' },
          ]}
          data-testid="workflow-history-status-filter"
          style={{ width: 160 }}
        />
      </Space>

      {filteredLogs.length === 0 ? (
        <Empty description="No execution logs match the current filter" />
      ) : (
        <Table<ExecutionLog>
          dataSource={filteredLogs}
          rowKey="id"
          size="middle"
          data-testid="workflow-history-table"
          pagination={false}
          columns={[
            {
              title: 'Workflow Name',
              dataIndex: 'workflowName',
              ellipsis: true,
            },
            {
              title: 'Start Time',
              dataIndex: 'startTime',
              width: 200,
              render: (val: string) => new Date(val).toLocaleString(),
            },
            {
              title: 'Duration',
              dataIndex: 'duration',
              width: 120,
              render: (val: string) => val || '--',
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
              title: 'Trigger',
              dataIndex: 'trigger',
              width: 120,
            },
          ]}
        />
      )}
    </div>
  );
}
