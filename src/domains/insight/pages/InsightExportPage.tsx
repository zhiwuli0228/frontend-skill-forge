import { useState } from 'react';
import {
  Typography,
  Space,
  Select,
  Alert,
  Table,
  Tag,
  Button,
  Card,
  Input,
  Skeleton,
  Empty,
} from 'antd';
import { DownloadOutlined, ExportOutlined } from '@ant-design/icons';
import { exports, emptyExports, type ExportItem } from '../data/insight-mock-data';
import type { ColumnsType } from 'antd/es/table';

const { Title, Text } = Typography;

type Scenario = 'loaded' | 'loading' | 'empty' | 'error';

const statusColorMap: Record<ExportItem['status'], string> = {
  ready: 'green',
  processing: 'blue',
  failed: 'red',
};

const formatOptions = [
  { value: 'csv', label: 'CSV' },
  { value: 'json', label: 'JSON' },
  { value: 'pdf', label: 'PDF' },
];

const dataTypeOptions = [
  { value: 'tasks', label: 'Tasks' },
  { value: 'skills', label: 'Skills' },
  { value: 'workflows', label: 'Workflows' },
  { value: 'all', label: 'All Data' },
];

const historyColumns: ColumnsType<ExportItem> = [
  { title: 'Format', dataIndex: 'format', key: 'format' },
  { title: 'Date Range', dataIndex: 'dateRange', key: 'dateRange' },
  { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt' },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: ExportItem['status']) => (
      <Tag color={statusColorMap[status]}>{status}</Tag>
    ),
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (_: unknown, record: ExportItem) =>
      record.status === 'ready' ? (
        <Button type="link" icon={<DownloadOutlined />} size="small" href={record.downloadUrl}>
          Download
        </Button>
      ) : null,
  },
];

function ExportSkeleton() {
  return (
    <div data-testid="insight-export-loading">
      <Card>
        <Skeleton active paragraph={{ rows: 3 }} />
      </Card>
      <Skeleton active paragraph={{ rows: 6 }} style={{ marginTop: 16 }} />
    </div>
  );
}

function ExportError({ onRetry }: { onRetry: () => void }) {
  return (
    <div data-testid="insight-export-error">
      <Alert
        type="error"
        message="Export failed to load"
        description="An unexpected error occurred while loading the export data. Please try again."
        showIcon
        action={
          <a onClick={onRetry} data-testid="insight-export-retry-link">
            Retry
          </a>
        }
      />
    </div>
  );
}

export function InsightExportPage() {
  const [scenario, setScenario] = useState<Scenario>('loaded');
  const [format, setFormat] = useState<string>('csv');
  const [dataType, setDataType] = useState<string>('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const currentExports = scenario === 'empty' ? emptyExports : exports;

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
        data-testid="insight-export-scenario-select"
      />
    </Space>
  );

  if (scenario === 'loading') {
    return (
      <div>
        <Title level={2}>Insight Export</Title>
        {scenarioSelector}
        <ExportSkeleton />
      </div>
    );
  }

  if (scenario === 'error') {
    return (
      <div>
        <Title level={2}>Insight Export</Title>
        {scenarioSelector}
        <ExportError onRetry={() => setScenario('loaded')} />
      </div>
    );
  }

  return (
    <div data-testid="insight-export-page">
      <Title level={2}>Insight Export</Title>
      {scenarioSelector}

      <Card title="Export Configuration" data-testid="insight-export-form">
        <Space direction="vertical" style={{ width: '100%' }} size="middle">
          <Space wrap>
            <div>
              <Text style={{ display: 'block', marginBottom: 4 }}>Format</Text>
              <Select
                value={format}
                onChange={setFormat}
                options={formatOptions}
                style={{ width: 150 }}
                data-testid="insight-export-format-select"
              />
            </div>
            <div>
              <Text style={{ display: 'block', marginBottom: 4 }}>Data Type</Text>
              <Select
                value={dataType}
                onChange={setDataType}
                options={dataTypeOptions}
                style={{ width: 150 }}
                data-testid="insight-export-datatype-select"
              />
            </div>
            <div>
              <Text style={{ display: 'block', marginBottom: 4 }}>Start Date</Text>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                style={{ width: 150 }}
                data-testid="insight-export-start-date"
              />
            </div>
            <div>
              <Text style={{ display: 'block', marginBottom: 4 }}>End Date</Text>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                style={{ width: 150 }}
                data-testid="insight-export-end-date"
              />
            </div>
          </Space>
          <Button type="primary" icon={<ExportOutlined />} data-testid="insight-export-button">
            Export
          </Button>
        </Space>
      </Card>

      <Card title="Export History" style={{ marginTop: 16 }}>
        {currentExports.length === 0 ? (
          <Empty description="No export history" />
        ) : (
          <Table
            columns={historyColumns}
            dataSource={currentExports}
            rowKey="id"
            data-testid="insight-export-table"
          />
        )}
      </Card>
    </div>
  );
}
