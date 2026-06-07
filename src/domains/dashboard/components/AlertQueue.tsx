import { List, Tag, Typography, Empty } from 'antd';
import { AlertOutlined } from '@ant-design/icons';
import type { AlertItem } from '../data/mock-data';

const { Text } = Typography;

interface AlertQueueProps {
  alerts: AlertItem[];
  onItemClick: (item: AlertItem) => void;
}

const severityColor = {
  critical: 'red',
  warning: 'orange',
  info: 'blue',
};

const statusLabel = {
  open: 'Open',
  acknowledged: 'Acknowledged',
  resolved: 'Resolved',
};

export function AlertQueue({ alerts, onItemClick }: AlertQueueProps) {
  if (alerts.length === 0) {
    return (
      <div data-testid="alert-queue-empty">
        <Empty
          image={<AlertOutlined style={{ fontSize: 48, color: '#d9d9d9' }} />}
          description="No alerts match the current filter"
        />
      </div>
    );
  }

  return (
    <List
      data-testid="alert-queue"
      header={<Text strong>Alert Queue</Text>}
      bordered
      dataSource={alerts}
      renderItem={(item) => (
        <List.Item
          style={{ cursor: 'pointer' }}
          onClick={() => onItemClick(item)}
          data-testid={`alert-item-${item.id}`}
          actions={[
            <Tag color={severityColor[item.severity]} key="severity">
              {item.severity.toUpperCase()}
            </Tag>,
            <Tag key="status">{statusLabel[item.status]}</Tag>,
          ]}
        >
          <List.Item.Meta
            title={item.title}
            description={
              <Text type="secondary" style={{ fontSize: 12 }}>
                {item.source} &middot; {new Date(item.timestamp).toLocaleTimeString()}
              </Text>
            }
          />
        </List.Item>
      )}
    />
  );
}
