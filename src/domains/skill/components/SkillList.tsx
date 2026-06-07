import { List, Avatar, Tag, Typography } from 'antd';
import * as Icons from '@ant-design/icons';
import type { ComponentType } from 'react';

import type { SkillItem } from '../data/skill-mock-data';

const { Text } = Typography;

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

interface SkillListProps {
  skills: SkillItem[];
  onCardClick: (skill: SkillItem) => void;
}

export function SkillList({ skills, onCardClick }: SkillListProps) {
  const icons = Icons as unknown as Record<string, ComponentType<{ style?: React.CSSProperties }>>;

  return (
    <List
      data-testid="skill-list-view"
      dataSource={skills}
      renderItem={(skill) => {
        const IconComponent = icons[skill.icon];
        return (
          <List.Item
            onClick={() => onCardClick(skill)}
            style={{ cursor: 'pointer' }}
            data-testid={`skill-list-item-${skill.id}`}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  icon={IconComponent ? <IconComponent /> : undefined}
                  style={{ backgroundColor: '#1677ff' }}
                />
              }
              title={skill.name}
              description={
                <div>
                  <Text type="secondary" ellipsis>{skill.description}</Text>
                  <div style={{ marginTop: 4, display: 'flex', gap: 8, alignItems: 'center' }}>
                    <Tag color={categoryColors[skill.category] ?? 'default'}>
                      {skill.category}
                    </Tag>
                    <Tag color={statusColors[skill.status] ?? 'default'}>
                      {skill.status}
                    </Tag>
                    <Text type="secondary" style={{ fontSize: 12 }}>v{skill.version}</Text>
                  </div>
                </div>
              }
            />
          </List.Item>
        );
      }}
    />
  );
}
