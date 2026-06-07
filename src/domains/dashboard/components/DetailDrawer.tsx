import { Drawer, Descriptions, Tag, Typography } from 'antd';
import type { AlertItem } from '../data/mock-data';

const { Paragraph } = Typography;

interface DetailDrawerProps {
  item: AlertItem | null;
  onClose: () => void;
}

const severityColor = {
  critical: 'red',
  warning: 'orange',
  info: 'blue',
};

export function DetailDrawer({ item, onClose }: DetailDrawerProps) {
  return (
    <Drawer
      title={item?.title ?? 'Alert Detail'}
      open={item !== null}
      onClose={onClose}
      width={480}
      data-testid="detail-drawer"
    >
      {item && (
        <Descriptions column={1} bordered size="small">
          <Descriptions.Item label="Severity">
            <Tag color={severityColor[item.severity]}>{item.severity.toUpperCase()}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            <Tag>{item.status}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Source">{item.source}</Descriptions.Item>
          <Descriptions.Item label="Category">{item.category}</Descriptions.Item>
          <Descriptions.Item label="Time">
            {new Date(item.timestamp).toLocaleString()}
          </Descriptions.Item>
          <Descriptions.Item label="Description">
            <Paragraph>{item.description}</Paragraph>
          </Descriptions.Item>
        </Descriptions>
      )}
    </Drawer>
  );
}
