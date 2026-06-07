import { useState } from 'react';
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
import { EyeOutlined, FileTextOutlined } from '@ant-design/icons';
import { reports, emptyReports, type ReportItem } from '../data/insight-mock-data';
import type { ColumnsType } from 'antd/es/table';

const { Title, Text } = Typography;

type Scenario = 'loaded' | 'loading' | 'empty' | 'error';

const statusColorMap: Record<ReportItem['status'], string> = {
  completed: 'green',
  pending: 'blue',
  failed: 'red',
};

const columns: ColumnsType<ReportItem> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: ReportItem['status']) => (
      <Tag color={statusColorMap[status]}>{status}</Tag>
    ),
  },
  {
    title: 'Actions',
    key: 'actions',
    render: () => (
      <Button type="link" icon={<EyeOutlined />} size="small">
        View
      </Button>
    ),
  },
];

function ReportsSkeleton() {
  return (
    <div data-testid="insight-reports-loading">
      <Skeleton.Input active block style={{ height: 40, marginBottom: 16 }} />
      <Skeleton active paragraph={{ rows: 8 }} />
    </div>
  );
}

function ReportsError({ onRetry }: { onRetry: () => void }) {
  return (
    <div data-testid="insight-reports-error">
      <Alert
        type="error"
        message="Reports failed to load"
        description="An unexpected error occurred while loading the reports. Please try again."
        showIcon
        action={
          <a onClick={onRetry} data-testid="insight-reports-retry-link">
            Retry
          </a>
        }
      />
    </div>
  );
}

export function InsightReportsPage() {
  const [scenario, setScenario] = useState<Scenario>('loaded');

  const currentReports = scenario === 'empty' ? emptyReports : reports;

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
        data-testid="insight-reports-scenario-select"
      />
    </Space>
  );

  if (scenario === 'loading') {
    return (
      <div>
        <Title level={2}>Insight Reports</Title>
        {scenarioSelector}
        <ReportsSkeleton />
      </div>
    );
  }

  if (scenario === 'error') {
    return (
      <div>
        <Title level={2}>Insight Reports</Title>
        {scenarioSelector}
        <ReportsError onRetry={() => setScenario('loaded')} />
      </div>
    );
  }

  return (
    <div data-testid="insight-reports-page">
      <Title level={2}>Insight Reports</Title>
      {scenarioSelector}

      <div style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<FileTextOutlined />}>
          Generate Report
        </Button>
      </div>

      {scenario === 'empty' && currentReports.length === 0 ? (
        <Empty description="No reports available" />
      ) : (
        <Table
          columns={columns}
          dataSource={currentReports}
          rowKey="id"
          data-testid="insight-reports-table"
        />
      )}
    </div>
  );
}
