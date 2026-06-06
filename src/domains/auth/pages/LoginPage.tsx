import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

export function LoginPage() {
  return (
    <div style={{ padding: 24, maxWidth: 400, margin: '100px auto' }}>
      <Title level={2}>Login</Title>
      <Paragraph>
        This page is a placeholder. Login functionality will be implemented in future phases.
      </Paragraph>
    </div>
  );
}