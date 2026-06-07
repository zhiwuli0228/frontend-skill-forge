import { useState } from 'react';
import { Typography, Space, Select, Alert, Skeleton, Card, Empty, notification } from 'antd';
import { SkillVersionTable } from '../components/SkillVersionTable';
import { skills, mockVersions } from '../data/skill-mock-data';

const { Title, Text } = Typography;

type Scenario = 'loaded' | 'loading' | 'empty' | 'error';

function SkillVersionsSkeleton() {
  return (
    <div data-testid="skill-versions-loading">
      <Skeleton active paragraph={{ rows: 2 }} />
      <Skeleton.Input active block style={{ height: 40, marginTop: 16 }} />
      <Skeleton active paragraph={{ rows: 6 }} style={{ marginTop: 16 }} />
    </div>
  );
}

function SkillVersionsError({ onRetry }: { onRetry: () => void }) {
  return (
    <div data-testid="skill-versions-error">
      <Alert
        type="error"
        message="Skill versions failed to load"
        description="An unexpected error occurred while loading skill versions. Please try again."
        showIcon
        action={
          <a onClick={onRetry} data-testid="skill-versions-error-retry-link">
            Retry
          </a>
        }
      />
    </div>
  );
}

export function SkillVersionsPage() {
  const [scenario, setScenario] = useState<Scenario>('loaded');

  const skill = skills[0];
  const currentVersion = mockVersions.find((v) => v.status === 'current');

  const handleRollback = (version: string) => {
    notification.success({
      message: 'Rollback Initiated',
      description: `Rolling back skill "${skill.name}" to version ${version}.`,
    });
    console.log(`Rollback skill ${skill.name} to version ${version}`);
  };

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
        data-testid="skill-scenario-select"
      />
    </Space>
  );

  if (scenario === 'loading') {
    return (
      <div>
        <Title level={2}>Skill Versions</Title>
        {scenarioSelector}
        <SkillVersionsSkeleton />
      </div>
    );
  }

  if (scenario === 'error') {
    return (
      <div>
        <Title level={2}>Skill Versions</Title>
        {scenarioSelector}
        <SkillVersionsError onRetry={() => setScenario('loaded')} />
      </div>
    );
  }

  const versions = scenario === 'empty' ? [] : mockVersions;

  return (
    <div data-testid="skill-versions-page">
      <Title level={2}>Skill Versions</Title>
      {scenarioSelector}

      <Card style={{ marginBottom: 16 }}>
        <Space direction="vertical" size={4}>
          <Text strong>Name: {skill.name}</Text>
          <Text>Current Version: {currentVersion?.version ?? 'N/A'}</Text>
          <Text>Author: {skill.author}</Text>
        </Space>
      </Card>

      {versions.length === 0 ? (
        <div data-testid="skill-versions-empty">
          <Empty description="No versions available for this skill" />
        </div>
      ) : (
        <SkillVersionTable versions={versions} onRollback={handleRollback} />
      )}
    </div>
  );
}
