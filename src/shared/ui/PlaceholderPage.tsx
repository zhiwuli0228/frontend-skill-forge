import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>{title}</Title>
      {description && <Paragraph>{description}</Paragraph>}
      <Paragraph type="secondary">
        This page is a placeholder. Implementation will be added in future phases.
      </Paragraph>
    </div>
  );
}