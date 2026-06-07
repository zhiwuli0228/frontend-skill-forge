import { Card, Col, Row, Statistic, Tag } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, MinusOutlined } from '@ant-design/icons';
import type { MetricCard } from '../data/mock-data';

interface MetricBandProps {
  metrics: MetricCard[];
  selectedMetric: string | null;
  onMetricSelect: (filterKey: string | null) => void;
}

const trendIcon = {
  up: <ArrowUpOutlined style={{ color: '#52c41a' }} />,
  down: <ArrowDownOutlined style={{ color: '#ff4d4f' }} />,
  stable: <MinusOutlined style={{ color: '#faad14' }} />,
};

export function MetricBand({ metrics, selectedMetric, onMetricSelect }: MetricBandProps) {
  return (
    <Row gutter={16} data-testid="metric-band">
      {metrics.map((metric) => {
        const isSelected = selectedMetric === metric.filterKey;
        return (
          <Col span={6} key={metric.id}>
            <Card
              hoverable
              onClick={() => onMetricSelect(isSelected ? null : metric.filterKey)}
              style={{
                borderLeft: isSelected ? '3px solid #1677ff' : undefined,
                cursor: 'pointer',
              }}
              data-testid={`metric-card-${metric.filterKey}`}
            >
              <Statistic
                title={metric.title}
                value={metric.value}
                suffix={
                  <>
                    <span style={{ fontSize: 14, marginLeft: 4 }}>{metric.unit}</span>
                    <Tag
                      icon={trendIcon[metric.trend]}
                      style={{ marginLeft: 8, border: 'none', background: 'transparent' }}
                    />
                  </>
                }
              />
              {isSelected && (
                <Tag color="blue" style={{ marginTop: 8 }}>
                  Filtering
                </Tag>
              )}
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}
