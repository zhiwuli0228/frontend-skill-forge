import { useState, useCallback, useMemo } from 'react';
import { Typography, Space, Select, Alert, Skeleton, Empty, Segmented, Input } from 'antd';

import { SkillConfigForm } from '../components/SkillConfigForm';
import { skills, emptySkills, mockConfig, type SkillItem, type SkillConfig } from '../data/skill-mock-data';

const { Title, Text } = Typography;

type Scenario = 'loaded' | 'loading' | 'empty' | 'error';
type ViewMode = 'form' | 'json';

function ConfigSkeleton() {
  return (
    <div data-testid="skill-config-loading">
      <Skeleton.Input active block style={{ height: 40, marginBottom: 16 }} />
      <Skeleton.Input active block style={{ height: 300 }} />
    </div>
  );
}

function ConfigError({ onRetry }: { onRetry: () => void }) {
  return (
    <div data-testid="skill-config-error">
      <Alert
        type="error"
        message="Skill configuration failed to load"
        description="An unexpected error occurred while loading skill configuration. Please try again."
        showIcon
        action={
          <a onClick={onRetry} data-testid="skill-config-error-retry-link">
            Retry
          </a>
        }
      />
    </div>
  );
}

export function SkillConfigPage() {
  const [scenario, setScenario] = useState<Scenario>('loaded');
  const [selectedSkillId, setSelectedSkillId] = useState<string>(mockConfig.skillId);
  const [viewMode, setViewMode] = useState<ViewMode>('form');
  const [config, setConfig] = useState<SkillConfig>({ ...mockConfig });
  const [jsonText, setJsonText] = useState<string>(JSON.stringify(mockConfig, null, 2));

  const baseSkills: SkillItem[] = scenario === 'empty' ? emptySkills : skills;

  const skillOptions = useMemo(
    () => baseSkills.map((s) => ({ value: s.id, label: `${s.name} (v${s.version})` })),
    [baseSkills],
  );

  const handleSkillChange = useCallback(
    (skillId: string) => {
      setSelectedSkillId(skillId);
      const newConfig: SkillConfig = { ...mockConfig, skillId };
      setConfig(newConfig);
      setJsonText(JSON.stringify(newConfig, null, 2));
    },
    [],
  );

  const handleConfigChange = useCallback((newConfig: SkillConfig) => {
    setConfig(newConfig);
    setJsonText(JSON.stringify(newConfig, null, 2));
  }, []);

  const handleJsonChange = useCallback(
    (text: string) => {
      setJsonText(text);
      try {
        const parsed = JSON.parse(text) as SkillConfig;
        setConfig(parsed);
      } catch {
        // Invalid JSON, don't update config state
      }
    },
    [],
  );

  const handleSave = useCallback(() => {
    // Mock save action
  }, []);

  const handleReset = useCallback(() => {
    const resetConfig: SkillConfig = { ...mockConfig, skillId: selectedSkillId };
    setConfig(resetConfig);
    setJsonText(JSON.stringify(resetConfig, null, 2));
  }, [selectedSkillId]);

  const handleViewModeChange = useCallback((value: string | number) => {
    setViewMode(value as ViewMode);
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
        data-testid="skill-config-scenario-select"
      />
    </Space>
  );

  if (scenario === 'loading') {
    return (
      <div data-testid="skill-config-page">
        <Title level={2}>Skill Configuration</Title>
        {scenarioSelector}
        <ConfigSkeleton />
      </div>
    );
  }

  if (scenario === 'error') {
    return (
      <div data-testid="skill-config-page">
        <Title level={2}>Skill Configuration</Title>
        {scenarioSelector}
        <ConfigError onRetry={() => setScenario('loaded')} />
      </div>
    );
  }

  if (scenario === 'empty' || baseSkills.length === 0) {
    return (
      <div data-testid="skill-config-page">
        <Title level={2}>Skill Configuration</Title>
        {scenarioSelector}
        <Empty description="No skills available to configure" />
      </div>
    );
  }

  return (
    <div data-testid="skill-config-page">
      <Title level={2}>Skill Configuration</Title>
      {scenarioSelector}

      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <div>
          <Text strong style={{ marginRight: 8 }}>Select Skill:</Text>
          <Select
            value={selectedSkillId}
            onChange={handleSkillChange}
            options={skillOptions}
            style={{ width: 300 }}
            data-testid="skill-config-skill-select"
          />
        </div>

        <div>
          <Segmented
            value={viewMode}
            onChange={handleViewModeChange}
            options={[
              { value: 'form', label: 'Form View' },
              { value: 'json', label: 'JSON View' },
            ]}
            data-testid="skill-config-view-toggle"
          />
        </div>

        {viewMode === 'form' ? (
          <SkillConfigForm
            config={config}
            onChange={handleConfigChange}
            onSave={handleSave}
            onReset={handleReset}
          />
        ) : (
          <div data-testid="skill-json-editor">
            <Input.TextArea
              value={jsonText}
              onChange={(e) => handleJsonChange(e.target.value)}
              rows={20}
              style={{ fontFamily: 'monospace', fontSize: 13 }}
              data-testid="skill-json-textarea"
            />
          </div>
        )}
      </Space>
    </div>
  );
}
