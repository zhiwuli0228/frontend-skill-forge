import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

export function DashboardPage() {
  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Dashboard</Title>
      <Paragraph>
        This page is a placeholder. Dashboard functionality will be implemented in future phases.
      </Paragraph>
    </div>
  );
}