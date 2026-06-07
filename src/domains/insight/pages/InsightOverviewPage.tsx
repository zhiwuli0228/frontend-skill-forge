import { useState, useMemo } from 'react';
import { useParams } from 'react-router';
import {
  Typography,
  Space,
  Select,
  Alert,
  Row,
  Col,
  Card,
  Skeleton,
  Empty,
  Statistic,
  Tag,
} from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, MinusOutlined } from '@ant-design/icons';
import {
  statCards,
  taskTrendData,
  skillUsageData,
  type StatCard,
  type ChartDataPoint,
} from '../data/insight-mock-data';

const { Title, Text } = Typography;

type Scenario = 'loaded' | 'loading' | 'empty' | 'error';

function trendIcon(trendType: StatCard['trendType']) {
  if (trendType === 'up') return <ArrowUpOutlined style={{ color: '#52c41a' }} />;
  if (trendType === 'down') return <ArrowDownOutlined style={{ color: '#ff4d4f' }} />;
  return <MinusOutlined style={{ color: '#999' }} />;
}

function StatCards({ cards }: { cards: StatCard[] }) {
  return (
    <Row gutter={16} data-testid="insight-stat-cards">
      {cards.map((card) => (
        <Col span={6} key={card.title}>
          <Card>
            <Statistic title={card.title} value={card.value} />
            <Space style={{ marginTop: 8 }}>
              {trendIcon(card.trendType)}
              <Text type={card.trendType === 'down' ? 'danger' : 'success'}>
                {card.trend}
              </Text>
            </Space>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

function SkillUsageChart({ data }: { data: ChartDataPoint[] }) {
  const maxValue = Math.max(...data.map((d) => d.value));
  return (
    <Card title="Skill Usage" data-testid="insight-chart">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {data.map((point) => (
          <div key={point.label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Text style={{ width: 50, textAlign: 'right' }}>{point.label}</Text>
            <div
              style={{
                flex: 1,
                background: '#f0f0f0',
                borderRadius: 4,
                height: 24,
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: `${(point.value / maxValue) * 100}%`,
                  background: '#1890ff',
                  borderRadius: 4,
                  height: '100%',
                  transition: 'width 0.3s',
                }}
              />
            </div>
            <Text style={{ width: 30 }}>{point.value}</Text>
          </div>
        ))}
      </div>
    </Card>
  );
}

function TrendChart({ data }: { data: ChartDataPoint[] }) {
  const maxValue = Math.max(...data.map((d) => d.value));
  return (
    <Card title="Task Completion Trend">
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: 8,
          height: 160,
          padding: '0 16px',
        }}
      >
        {data.map((point, idx) => (
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
                background:
                  idx === data.length - 1
                    ? '#1890ff'
                    : '#91caff',
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

function OverviewSkeleton() {
  return (
    <div data-testid="insight-overview-loading">
      <Row gutter={16}>
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
            <Skeleton active paragraph={{ rows: 6 }} />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Skeleton active paragraph={{ rows: 6 }} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

function OverviewError({ onRetry }: { onRetry: () => void }) {
  return (
    <div data-testid="insight-overview-error">
      <Alert
        type="error"
        message="Insight overview failed to load"
        description="An unexpected error occurred while loading the overview data. Please try again."
        showIcon
        action={
          <a onClick={onRetry} data-testid="insight-overview-retry-link">
            Retry
          </a>
        }
      />
    </div>
  );
}

export function InsightOverviewPage() {
  const { filter } = useParams<{ filter?: string }>();
  const [scenario, setScenario] = useState<Scenario>('loaded');

  const rangeFactor: Record<string, number> = {
    today: 0.05,
    week: 0.25,
    month: 1,
    quarter: 3,
    all: 6,
  };
  const factor = rangeFactor[filter ?? 'all'] ?? 1;

  const scaledStatCards = useMemo<StatCard[]>(
    () =>
      statCards.map((card) => {
        const numMatch = card.value.match(/^([\d.]+)(.*)$/);
        if (!numMatch) return card;
        const base = parseFloat(numMatch[1]);
        const suffix = numMatch[2];
        const scaled = (base * factor).toFixed(suffix === '%' ? 1 : 0);
        return { ...card, value: `${scaled}${suffix}` };
      }),
    [factor],
  );

  const scaledSkillUsage = useMemo<ChartDataPoint[]>(
    () => skillUsageData.map((p) => ({ ...p, value: Math.round(p.value * factor) })),
    [factor],
  );

  const scaledTaskTrend = useMemo<ChartDataPoint[]>(
    () => taskTrendData.map((p) => ({ ...p, value: Math.round(p.value * factor) })),
    [factor],
  );

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
        data-testid="insight-overview-scenario-select"
      />
    </Space>
  );

  if (scenario === 'loading') {
    return (
      <div>
        <Title level={2}>Insight Overview</Title>
        {scenarioSelector}
        <OverviewSkeleton />
      </div>
    );
  }

  if (scenario === 'error') {
    return (
      <div>
        <Title level={2}>Insight Overview</Title>
        {scenarioSelector}
        <OverviewError onRetry={() => setScenario('loaded')} />
      </div>
    );
  }

  if (scenario === 'empty') {
    return (
      <div data-testid="insight-overview-page">
        <Title level={2}>Insight Overview</Title>
        {scenarioSelector}
        <Empty description="No insight data available" />
      </div>
    );
  }

  return (
    <div data-testid="insight-overview-page">
      <Title level={2}>Insight Overview</Title>
      {scenarioSelector}

      {filterLabel && (
        <div style={{ marginBottom: 8 }} data-testid="sidebar-filter-indicator">
          <Text>Time range: </Text>
          <Tag color="blue">{filterLabel}</Tag>
        </div>
      )}

      <StatCards cards={scaledStatCards} />

      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={12}>
          <SkillUsageChart data={scaledSkillUsage} />
        </Col>
        <Col span={12}>
          <TrendChart data={scaledTaskTrend} />
        </Col>
      </Row>
    </div>
  );
}
