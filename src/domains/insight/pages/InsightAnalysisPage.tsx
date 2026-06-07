import { useState, useMemo } from 'react';
import {
  Typography,
  Space,
  Select,
  Alert,
  Row,
  Col,
  Card,
  Table,
  Skeleton,
  Empty,
} from 'antd';
import { taskTrendData, skillUsageData, type ChartDataPoint } from '../data/insight-mock-data';
import type { ColumnsType } from 'antd/es/table';

const { Title, Text } = Typography;

type Scenario = 'loaded' | 'loading' | 'empty' | 'error';

const metricOptions = [
  { value: 'taskCompletion', label: 'Task Completion' },
  { value: 'skillUsage', label: 'Skill Usage' },
];

const timeRangeOptions = [
  { value: 'last7days', label: 'Last 7 Days' },
  { value: 'last30days', label: 'Last 30 Days' },
  { value: 'last90days', label: 'Last 90 Days' },
  { value: 'lastYear', label: 'Last Year' },
];

const metricDataMap: Record<string, ChartDataPoint[]> = {
  taskCompletion: taskTrendData,
  skillUsage: skillUsageData,
};

const tableColumns: ColumnsType<ChartDataPoint> = [
  { title: 'Label', dataIndex: 'label', key: 'label' },
  { title: 'Value', dataIndex: 'value', key: 'value' },
];

function AnalysisBarChart({ data }: { data: ChartDataPoint[] }) {
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <Card title="Analysis Chart" data-testid="insight-analysis-chart">
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: 12,
          height: 200,
          padding: '0 16px',
        }}
      >
        {data.map((point) => (
          <div
            key={point.label}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%',
              justifyContent: 'flex-end',
            }}
          >
            <Text style={{ marginBottom: 4, fontSize: 12 }}>{point.value}</Text>
            <div
              style={{
                width: '100%',
                height: `${(point.value / maxValue) * 100}%`,
                background: '#1890ff',
                borderRadius: '4px 4px 0 0',
                minHeight: 8,
              }}
            />
            <Text style={{ marginTop: 4, fontSize: 12 }}>{point.label}</Text>
          </div>
        ))}
      </div>
    </Card>
  );
}

function AnalysisSkeleton() {
  return (
    <div data-testid="insight-analysis-loading">
      <Skeleton.Input active block style={{ height: 40, marginBottom: 16 }} />
      <Card>
        <Skeleton active paragraph={{ rows: 8 }} />
      </Card>
    </div>
  );
}

function AnalysisError({ onRetry }: { onRetry: () => void }) {
  return (
    <div data-testid="insight-analysis-error">
      <Alert
        type="error"
        message="Analysis failed to load"
        description="An unexpected error occurred while loading the analysis data. Please try again."
        showIcon
        action={
          <a onClick={onRetry} data-testid="insight-analysis-retry-link">
            Retry
          </a>
        }
      />
    </div>
  );
}

export function InsightAnalysisPage() {
  const [scenario, setScenario] = useState<Scenario>('loaded');
  const [metric, setMetric] = useState<string>('taskCompletion');
  const [timeRange, setTimeRange] = useState<string>('last30days');

  const chartData = useMemo(() => metricDataMap[metric] ?? [], [metric]);

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
        data-testid="insight-analysis-scenario-select"
      />
    </Space>
  );

  if (scenario === 'loading') {
    return (
      <div>
        <Title level={2}>Insight Analysis</Title>
        {scenarioSelector}
        <AnalysisSkeleton />
      </div>
    );
  }

  if (scenario === 'error') {
    return (
      <div>
        <Title level={2}>Insight Analysis</Title>
        {scenarioSelector}
        <AnalysisError onRetry={() => setScenario('loaded')} />
      </div>
    );
  }

  if (scenario === 'empty') {
    return (
      <div data-testid="insight-analysis-page">
        <Title level={2}>Insight Analysis</Title>
        {scenarioSelector}
        <Empty description="No analysis data available" />
      </div>
    );
  }

  return (
    <div data-testid="insight-analysis-page">
      <Title level={2}>Insight Analysis</Title>
      {scenarioSelector}

      <Space style={{ marginBottom: 16 }} data-testid="insight-analysis-filter">
        <Select
          value={metric}
          onChange={setMetric}
          options={metricOptions}
          style={{ width: 180 }}
          data-testid="insight-analysis-metric-select"
        />
        <Select
          value={timeRange}
          onChange={setTimeRange}
          options={timeRangeOptions}
          style={{ width: 180 }}
          data-testid="insight-analysis-time-select"
        />
      </Space>

      <Row gutter={16}>
        <Col span={24}>
          <AnalysisBarChart data={chartData} />
        </Col>
      </Row>

      <Card title="Data Table" style={{ marginTop: 16 }}>
        <Table
          columns={tableColumns}
          dataSource={chartData}
          rowKey="label"
          pagination={false}
          data-testid="insight-analysis-data-table"
        />
      </Card>
    </div>
  );
}
