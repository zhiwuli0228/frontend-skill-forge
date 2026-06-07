import { Card, Tag, Typography } from 'antd';
import * as Icons from '@ant-design/icons';
import type { ComponentType } from 'react';

import type { TemplateItem } from '../data/template-mock-data';

const { Text, Paragraph } = Typography;

const categoryColors: Record<string, string> = {
  development: 'blue',
  design: 'purple',
  testing: 'green',
  operations: 'orange',
};

interface TemplateCardProps {
  template: TemplateItem;
  onClick: () => void;
}

export function TemplateCard({ template, onClick }: TemplateCardProps) {
  const icons = Icons as unknown as Record<string, ComponentType<{ style?: React.CSSProperties }>>;
  const IconComponent = icons[template.icon];

  return (
    <Card
      hoverable
      onClick={onClick}
      data-testid={`template-card-${template.id}`}
    >
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
        {IconComponent && <IconComponent style={{ fontSize: 20, marginRight: 8 }} />}
        <Text strong>{template.title}</Text>
      </div>
      <Paragraph
        type="secondary"
        ellipsis={{ rows: 2 }}
        style={{ marginBottom: 8 }}
      >
        {template.description}
      </Paragraph>
      <Tag color={categoryColors[template.category] ?? 'default'}>
        {template.category}
      </Tag>
    </Card>
  );
}
