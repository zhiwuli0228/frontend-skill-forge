import { Avatar, Tag, Typography, Button } from 'antd';
import { ExportOutlined } from '@ant-design/icons';
import * as Icons from '@ant-design/icons';
import type { ComponentType } from 'react';
import { useNavigate } from 'react-router';

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
  const navigate = useNavigate();

  return (
    <div data-testid="skill-list-view" style={{ display: 'grid', gap: 12 }}>
      {skills.map((skill) => {
        const IconComponent = icons[skill.icon];

        return (
          <div
            key={skill.id}
            onClick={() => onCardClick(skill)}
            style={{
              cursor: 'pointer',
              border: '1px solid #f0f0f0',
              borderRadius: 8,
              padding: 16,
              background: '#fff',
            }}
            data-testid={`skill-list-item-${skill.id}`}
          >
            <div style={{ display: 'flex', gap: 12 }}>
              <div>
                <Avatar
                  icon={IconComponent ? <IconComponent /> : undefined}
                  style={{ backgroundColor: '#1677ff' }}
                />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text strong>{skill.name}</Text>
                  {skill.actionRoute && (
                    <Button
                      size="small"
                      type="primary"
                      icon={<ExportOutlined />}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(skill.actionRoute!);
                      }}
                      data-testid={`skill-list-open-${skill.id}`}
                    >
                      Open
                    </Button>
                  )}
                </div>
                <div>
                  <Text type="secondary" ellipsis>{skill.description}</Text>
                </div>
                <div
                  style={{
                    marginTop: 4,
                    display: 'flex',
                    gap: 8,
                    alignItems: 'center',
                    flexWrap: 'wrap',
                  }}
                >
                  <Tag color={categoryColors[skill.category] ?? 'default'}>
                    {skill.category}
                  </Tag>
                  <Tag color={statusColors[skill.status] ?? 'default'}>
                    {skill.status}
                  </Tag>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    v{skill.version}
                  </Text>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
