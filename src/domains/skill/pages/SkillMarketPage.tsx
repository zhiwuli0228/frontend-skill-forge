import { useState, useMemo, useCallback } from 'react';
import { Typography, Space, Select, Alert, Skeleton, Empty, Card, Row, Col, Button, Tag } from 'antd';
import { ExportOutlined } from '@ant-design/icons';
import * as Icons from '@ant-design/icons';
import type { ComponentType } from 'react';
import { useNavigate } from 'react-router';

import { SkillDetailModal } from '../components/SkillDetailModal';
import { skills, emptySkills, type SkillItem } from '../data/skill-mock-data';

const { Title, Text, Paragraph } = Typography;

type Scenario = 'loaded' | 'loading' | 'empty' | 'error';

const categoryColors: Record<string, string> = {
  text: 'blue',
  image: 'purple',
  data: 'green',
  tool: 'orange',
};

function MarketSkeleton() {
  return (
    <div data-testid="skill-market-loading">
      <Skeleton.Input active block style={{ height: 40 }} />
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        {[1, 2, 3].map((i) => (
          <Col span={8} key={i}>
            <Card>
              <Skeleton active paragraph={{ rows: 4 }} />
            </Card>
          </Col>
        ))}
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Col span={8} key={i}>
            <Card>
              <Skeleton active paragraph={{ rows: 3 }} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

function MarketError({ onRetry }: { onRetry: () => void }) {
  return (
    <div data-testid="skill-market-error">
      <Alert
        type="error"
        message="Skill market failed to load"
        description="An unexpected error occurred while loading skills. Please try again."
        showIcon
        action={
          <a onClick={onRetry} data-testid="skill-market-error-retry-link">
            Retry
          </a>
        }
      />
    </div>
  );
}

interface SkillCardProps {
  skill: SkillItem;
  installed: boolean;
  featured?: boolean;
  onToggleInstall: (skill: SkillItem) => void;
  onClick: (skill: SkillItem) => void;
}

function SkillCard({ skill, installed, featured, onToggleInstall, onClick }: SkillCardProps) {
  const icons = Icons as unknown as Record<string, ComponentType<{ style?: React.CSSProperties }>>;
  const IconComponent = icons[skill.icon];
  const navigate = useNavigate();

  return (
    <Card
      hoverable
      onClick={() => onClick(skill)}
      style={featured ? { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff' } : undefined}
      data-testid={`skill-card-${skill.id}`}
    >
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
        {IconComponent && (
          <IconComponent style={{ fontSize: featured ? 28 : 20, marginRight: 8, color: featured ? '#fff' : undefined }} />
        )}
        <Text strong style={featured ? { color: '#fff', fontSize: 18 } : undefined}>
          {skill.name}
        </Text>
      </div>
      <Paragraph
        type={featured ? undefined : 'secondary'}
        ellipsis={{ rows: 2 }}
        style={featured ? { color: 'rgba(255,255,255,0.85)' } : undefined}
      >
        {skill.description}
      </Paragraph>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
        <Space>
          <Tag color={categoryColors[skill.category] ?? 'default'}>{skill.category}</Tag>
          <Text type={featured ? undefined : 'secondary'} style={featured ? { color: 'rgba(255,255,255,0.65)' } : undefined}>
            v{skill.version}
          </Text>
        </Space>
        <Space>
          {skill.actionRoute && (
            <Button
              size="small"
              type={featured ? 'default' : 'primary'}
              ghost={featured}
              icon={<ExportOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                navigate(skill.actionRoute!);
              }}
              data-testid={`skill-market-open-${skill.id}`}
            >
              Open
            </Button>
          )}
          <Button
            size="small"
            type={installed ? 'default' : 'primary'}
            danger={installed}
            onClick={(e) => {
              e.stopPropagation();
              onToggleInstall(skill);
            }}
            data-testid={`skill-install-${skill.id}`}
          >
            {installed ? 'Uninstall' : 'Install'}
          </Button>
        </Space>
      </div>
      <div style={{ marginTop: 8 }}>
        <Space size={[0, 4]} wrap>
          {skill.tags.map((tag) => (
            <Tag key={tag} style={featured ? { color: 'rgba(255,255,255,0.85)', borderColor: 'rgba(255,255,255,0.45)' } : undefined}>
              {tag}
            </Tag>
          ))}
        </Space>
      </div>
      <div style={{ marginTop: 8 }}>
        <Text type={featured ? undefined : 'secondary'} style={featured ? { color: 'rgba(255,255,255,0.65)' } : undefined}>
          {skill.downloads.toLocaleString()} downloads
        </Text>
      </div>
    </Card>
  );
}

export function SkillMarketPage() {
  const [scenario, setScenario] = useState<Scenario>('loaded');
  const [installedIds, setInstalledIds] = useState<Set<string>>(new Set());
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);

  const baseSkills = scenario === 'empty' ? emptySkills : skills;

  const featuredSkills = useMemo(() => baseSkills.slice(0, 3), [baseSkills]);
  const recommendedSkills = useMemo(() => baseSkills.slice(3), [baseSkills]);

  const handleToggleInstall = useCallback((skill: SkillItem) => {
    setInstalledIds((prev) => {
      const next = new Set(prev);
      if (next.has(skill.id)) {
        next.delete(skill.id);
      } else {
        next.add(skill.id);
      }
      return next;
    });
  }, []);

  const handleCardClick = useCallback((skill: SkillItem) => {
    setSelectedSkill(skill);
  }, []);

  const scenarioSelector = (
    <Space style={{ marginBottom: 16 }}>
      <Text>Scenario:</Text>
      <Select
        value={scenario}
        onChange={setScenario}
        options={[
          { value: 'loaded', label: 'Loaded' },
          { value: 'loading', label: 'Loading' },
          { value: 'empty', label: 'Empty' },
          { value: 'error', label: 'Error' },
        ]}
        data-testid="skill-market-scenario-select"
      />
    </Space>
  );

  if (scenario === 'loading') {
    return (
      <div data-testid="skill-market-page">
        <Title level={2}>Skill Market</Title>
        {scenarioSelector}
        <MarketSkeleton />
      </div>
    );
  }

  if (scenario === 'error') {
    return (
      <div data-testid="skill-market-page">
        <Title level={2}>Skill Market</Title>
        {scenarioSelector}
        <MarketError onRetry={() => setScenario('loaded')} />
      </div>
    );
  }

  return (
    <div data-testid="skill-market-page">
      <Title level={2}>Skill Market</Title>
      {scenarioSelector}

      {baseSkills.length === 0 ? (
        <Empty description="No skills available" />
      ) : (
        <>
          <div data-testid="skill-market-featured" style={{ marginBottom: 24 }}>
            <Title level={4}>Featured</Title>
            <Row gutter={[16, 16]}>
              {featuredSkills.map((skill) => (
                <Col span={8} key={skill.id}>
                  <SkillCard
                    skill={skill}
                    installed={installedIds.has(skill.id)}
                    featured
                    onToggleInstall={handleToggleInstall}
                    onClick={handleCardClick}
                  />
                </Col>
              ))}
            </Row>
          </div>

          <div data-testid="skill-market-recommended">
            <Title level={4}>Recommended</Title>
            <Row gutter={[16, 16]}>
              {recommendedSkills.map((skill) => (
                <Col span={8} key={skill.id}>
                  <SkillCard
                    skill={skill}
                    installed={installedIds.has(skill.id)}
                    onToggleInstall={handleToggleInstall}
                    onClick={handleCardClick}
                  />
                </Col>
              ))}
            </Row>
          </div>
        </>
      )}

      <SkillDetailModal
        skill={selectedSkill}
        open={selectedSkill !== null}
        onClose={() => setSelectedSkill(null)}
      />
    </div>
  );
}
