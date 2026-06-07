import { useMemo, useState } from 'react';
import {
  Typography,
  Space,
  Select,
  Alert,
  Table,
  Tag,
  Button,
  Skeleton,
  Empty,
} from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { logs, emptyLogs, type LogEntry } from '../data/settings-mock-data';
import type { ColumnsType } from 'antd/es/table';

const { Title, Text } = Typography;

type Scenario = 'loaded' | 'loading' | 'empty' | 'error';

const statusColorMap: Record<LogEntry['status'], string> = {
  success: 'green',
  failed: 'red',
};

const columns: ColumnsType<LogEntry> = [
  {
    title: 'Timestamp',
    dataIndex: 'timestamp',
    key: 'timestamp',
  },
  {
    title: 'User',
    dataIndex: 'user',
    key: 'user',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
  },
  {
    title: 'Resource',
    dataIndex: 'resource',
    key: 'resource',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: LogEntry['status']) => (
      <Tag color={statusColorMap[status]}>{status}</Tag>
    ),
  },
  {
    title: 'IP Address',
    dataIndex: 'ip',
    key: 'ip',
  },
];

function LogsSkeleton() {
  return (
    <div data-testid="settings-logs-loading">
      <Skeleton.Input active block style={{ height: 40, marginBottom: 16 }} />
      <Skeleton active paragraph={{ rows: 8 }} />
    </div>
  );
}

function LogsError({ onRetry }: { onRetry: () => void }) {
  return (
    <div data-testid="settings-logs-error">
      <Alert
        type="error"
        message="Logs failed to load"
        description="An unexpected error occurred while loading the operation logs. Please try again."
        showIcon
        action={
          <a onClick={onRetry} data-testid="settings-logs-retry-link">
            Retry
          </a>
        }
      />
    </div>
  );
}

export function SettingsLogsPage() {
  const [scenario, setScenario] = useState<Scenario>('loaded');
  const [actionFilter, setActionFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const currentLogs = scenario === 'empty' ? emptyLogs : logs;

  const filteredLogs = useMemo(() => {
    return currentLogs.filter((log) => {
      const matchesAction =
        actionFilter === 'all' || log.action === actionFilter;
      const matchesStatus =
        statusFilter === 'all' || log.status === statusFilter;
      return matchesAction && matchesStatus;
    });
  }, [currentLogs, actionFilter, statusFilter]);

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
        data-testid="settings-logs-scenario-select"
      />
    </Space>
  );

  if (scenario === 'loading') {
    return (
      <div>
        <Title level={2}>Operation Logs</Title>
        {scenarioSelector}
        <LogsSkeleton />
      </div>
    );
  }

  if (scenario === 'error') {
    return (
      <div>
        <Title level={2}>Operation Logs</Title>
        {scenarioSelector}
        <LogsError onRetry={() => setScenario('loaded')} />
      </div>
    );
  }

  return (
    <div data-testid="settings-logs-page">
      <Title level={2}>Operation Logs</Title>
      {scenarioSelector}

      <Space style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          data-testid="settings-logs-export-button"
        >
          Export
        </Button>
      </Space>

      <Space style={{ marginBottom: 16 }}>
        <Select
          value={actionFilter}
          onChange={setActionFilter}
          style={{ width: 160 }}
          options={[
            { value: 'all', label: 'All Actions' },
            { value: 'login', label: 'Login' },
            { value: 'create', label: 'Create' },
            { value: 'update', label: 'Update' },
            { value: 'delete', label: 'Delete' },
          ]}
          data-testid="settings-logs-action-filter"
        />
        <Select
          value={statusFilter}
          onChange={setStatusFilter}
          style={{ width: 160 }}
          options={[
            { value: 'all', label: 'All Statuses' },
            { value: 'success', label: 'Success' },
            { value: 'failed', label: 'Failed' },
          ]}
          data-testid="settings-logs-status-filter"
        />
      </Space>

      {scenario === 'empty' && filteredLogs.length === 0 ? (
        <Empty description="No operation logs" />
      ) : (
        <Table
          columns={columns}
          dataSource={filteredLogs}
          rowKey="id"
          data-testid="settings-logs-table"
        />
      )}
    </div>
  );
}
