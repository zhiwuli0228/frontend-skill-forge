import { useState, useMemo } from 'react';
import { Typography, Space, Select, Alert, Row, Col, Card, Skeleton } from 'antd';
import { MetricBand } from '../components/MetricBand';
import { AlertQueue } from '../components/AlertQueue';
import { ActivityFeed } from '../components/ActivityFeed';
import { DetailDrawer } from '../components/DetailDrawer';
import {
  metrics,
  alerts,
  activities,
  emptyAlerts,
  emptyActivities,
  type AlertItem,
} from '../data/mock-data';

const { Title, Text } = Typography;

type Scenario = 'loaded' | 'loading' | 'empty' | 'error';

function filterByMetric<T extends { category: string }>(
  items: T[],
  filterKey: string | null,
): T[] {
  if (!filterKey) return items;
  return items.filter((item) => item.category === filterKey);
}

function DashboardSkeleton() {
  return (
    <div data-testid="dashboard-loading">
      <Skeleton active paragraph={{ rows: 1 }} />
      <Row gutter={16} style={{ marginTop: 16 }}>
        {[1, 2, 3, 4].map((i) => (
          <Col span={6} key={i}>
            <Card>
              <Skeleton active paragraph={{ rows: 1 }} />
            </Card>
          </Col>
        ))}
      </Row>
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={12}>
          <Card>
            <Skeleton active paragraph={{ rows: 4 }} />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Skeleton active paragraph={{ rows: 4 }} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

function DashboardError({ onRetry }: { onRetry: () => void }) {
  return (
    <div data-testid="dashboard-error">
      <Alert
        type="error"
        message="Dashboard failed to load"
        description="An unexpected error occurred while loading the dashboard data. Please try again."
        showIcon
        action={
          <a onClick={onRetry} data-testid="error-retry-link">
            Retry
          </a>
        }
      />
    </div>
  );
}

export function DashboardPage() {
  const [scenario, setScenario] = useState<Scenario>('loaded');
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [selectedAlert, setSelectedAlert] = useState<AlertItem | null>(null);

  const currentAlerts = scenario === 'empty' ? emptyAlerts : alerts;
  const currentActivities = scenario === 'empty' ? emptyActivities : activities;

  const filteredAlerts = useMemo(
    () => filterByMetric(currentAlerts, selectedMetric),
    [currentAlerts, selectedMetric],
  );

  const filteredActivities = useMemo(
    () => filterByMetric(currentActivities, selectedMetric),
    [currentActivities, selectedMetric],
  );

  if (scenario === 'loading') {
    return (
      <div>
        <Title level={2}>Dashboard</Title>
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
            data-testid="scenario-select"
          />
        </Space>
        <DashboardSkeleton />
      </div>
    );
  }

  if (scenario === 'error') {
    return (
      <div>
        <Title level={2}>Dashboard</Title>
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
            data-testid="scenario-select"
          />
        </Space>
        <DashboardError onRetry={() => setScenario('loaded')} />
      </div>
    );
  }

  return (
    <div data-testid="dashboard-page">
      <Title level={2}>Dashboard</Title>

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
          data-testid="scenario-select"
        />
      </Space>

      <MetricBand
        metrics={metrics}
        selectedMetric={selectedMetric}
        onMetricSelect={setSelectedMetric}
      />

      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={12}>
          <AlertQueue alerts={filteredAlerts} onItemClick={setSelectedAlert} />
        </Col>
        <Col span={12}>
          <ActivityFeed activities={filteredActivities} />
        </Col>
      </Row>

      <DetailDrawer item={selectedAlert} onClose={() => setSelectedAlert(null)} />
    </div>
  );
}
