import { List, Typography, Tag, Empty } from 'antd';
import { HistoryOutlined } from '@ant-design/icons';
import type { ActivityItem } from '../data/mock-data';

const { Text } = Typography;

interface ActivityFeedProps {
  activities: ActivityItem[];
}

const categoryColor: Record<string, string> = {
  tasks: 'blue',
  alerts: 'red',
  success: 'green',
  performance: 'purple',
};

export function ActivityFeed({ activities }: ActivityFeedProps) {
  if (activities.length === 0) {
    return (
      <div data-testid="activity-feed-empty">
        <Empty
          image={<HistoryOutlined style={{ fontSize: 48, color: '#d9d9d9' }} />}
          description="No recent activity"
        />
      </div>
    );
  }

  return (
    <List
      data-testid="activity-feed"
      header={<Text strong>Activity Feed</Text>}
      bordered
      dataSource={activities}
      renderItem={(item) => (
        <List.Item data-testid={`activity-item-${item.id}`}>
          <List.Item.Meta
            title={
              <span>
                <Text strong>{item.action}</Text> {item.target}
              </span>
            }
            description={
              <span>
                <Text type="secondary">{item.actor}</Text>
                <Text type="secondary" style={{ marginLeft: 8 }}>
                  {new Date(item.timestamp).toLocaleTimeString()}
                </Text>
                <Tag color={categoryColor[item.category] ?? 'default'} style={{ marginLeft: 8 }}>
                  {item.category}
                </Tag>
              </span>
            }
          />
        </List.Item>
      )}
    />
  );
}
