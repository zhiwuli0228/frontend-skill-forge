import { Card, Tag, Badge, Typography } from 'antd';
import * as Icons from '@ant-design/icons';
import type { ComponentType } from 'react';

import type { SkillItem } from '../data/skill-mock-data';

const { Text, Paragraph } = Typography;

const categoryColors: Record<string, string> = {
  text: 'blue',
  image: 'purple',
  data: 'green',
  tool: 'orange',
};

const statusColors: Record<string, string> = {
  active: 'green',
  inactive: 'default',
  draft: 'gold',
};

interface SkillCardProps {
  skill: SkillItem;
  onClick: () => void;
}

export function SkillCard({ skill, onClick }: SkillCardProps) {
  const icons = Icons as unknown as Record<string, ComponentType<{ style?: React.CSSProperties }>>;
  const IconComponent = icons[skill.icon];

  return (
    <Badge.Ribbon text={skill.version} color="blue">
      <Card
        hoverable
        onClick={onClick}
        data-testid={`skill-card-${skill.id}`}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
          {IconComponent && <IconComponent style={{ fontSize: 20, marginRight: 8 }} />}
          <Text strong>{skill.name}</Text>
        </div>
        <Paragraph
          type="secondary"
          ellipsis={{ rows: 2 }}
          style={{ marginBottom: 8 }}
        >
          {skill.description}
        </Paragraph>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Tag color={categoryColors[skill.category] ?? 'default'}>
            {skill.category}
          </Tag>
          <Badge
            status={statusColors[skill.status] as 'success' | 'default' | 'warning' | 'error' | 'processing'}
            text={<Text type="secondary" style={{ fontSize: 12 }}>{skill.status}</Text>}
          />
        </div>
      </Card>
    </Badge.Ribbon>
  );
}
