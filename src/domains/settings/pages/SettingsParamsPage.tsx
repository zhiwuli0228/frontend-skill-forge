import { useMemo, useState } from 'react';
import {
  Typography,
  Space,
  Select,
  Alert,
  Card,
  Input,
  InputNumber,
  Switch,
  Button,
  Skeleton,
  Empty,
  Form,
} from 'antd';
import { systemParams, type SystemParam } from '../data/settings-mock-data';

const { Title, Text } = Typography;

type Scenario = 'loaded' | 'loading' | 'empty' | 'error';

function ParamsSkeleton() {
  return (
    <div data-testid="settings-params-loading">
      <Skeleton.Input active block style={{ height: 40, marginBottom: 16 }} />
      <Skeleton active paragraph={{ rows: 8 }} />
    </div>
  );
}

function ParamsError({ onRetry }: { onRetry: () => void }) {
  return (
    <div data-testid="settings-params-error">
      <Alert
        type="error"
        message="System parameters failed to load"
        description="An unexpected error occurred while loading the system parameters. Please try again."
        showIcon
        action={
          <a onClick={onRetry} data-testid="settings-params-retry-link">
            Retry
          </a>
        }
      />
    </div>
  );
}

type ParamValue = string | number | boolean;

function buildInitialValues(params: SystemParam[]): Record<string, ParamValue> {
  const values: Record<string, ParamValue> = {};
  for (const param of params) {
    values[param.key] = param.value;
  }
  return values;
}

export function SettingsParamsPage() {
  const [scenario, setScenario] = useState<Scenario>('loaded');
  const [formValues, setFormValues] = useState<Record<string, ParamValue>>(() =>
    buildInitialValues(systemParams),
  );

  const currentParams = useMemo(
    () => (scenario === 'empty' ? [] : systemParams),
    [scenario],
  );

  const groupedParams = useMemo(() => {
    const groups: Record<string, SystemParam[]> = {};
    for (const param of currentParams) {
      if (!groups[param.group]) {
        groups[param.group] = [];
      }
      groups[param.group].push(param);
    }
    return groups;
  }, [currentParams]);

  const handleChange = (key: string, value: ParamValue) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setFormValues(buildInitialValues(systemParams));
  };

  const handleSave = () => {
    // Placeholder for save logic
  };

  const renderParamField = (param: SystemParam) => {
    switch (param.type) {
      case 'input':
        return (
          <Form.Item key={param.key} label={param.label} extra={param.description}>
            <Input
              value={String(formValues[param.key])}
              onChange={(e) => handleChange(param.key, e.target.value)}
            />
          </Form.Item>
        );
      case 'select':
        return (
          <Form.Item key={param.key} label={param.label} extra={param.description}>
            <Select
              value={formValues[param.key]}
              onChange={(value) => handleChange(param.key, value)}
              options={param.options.map((opt) => ({ value: opt, label: opt }))}
            />
          </Form.Item>
        );
      case 'toggle':
        return (
          <Form.Item key={param.key} label={param.label} extra={param.description}>
            <Switch
              checked={formValues[param.key] as boolean}
              onChange={(checked) => handleChange(param.key, checked)}
            />
          </Form.Item>
        );
      case 'number':
        return (
          <Form.Item key={param.key} label={param.label} extra={param.description}>
            <InputNumber
              value={formValues[param.key] as number}
              onChange={(value) => handleChange(param.key, value ?? 0)}
            />
          </Form.Item>
        );
      default:
        return null;
    }
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
        data-testid="settings-params-scenario-select"
      />
    </Space>
  );

  if (scenario === 'loading') {
    return (
      <div>
        <Title level={2}>System Parameters</Title>
        {scenarioSelector}
        <ParamsSkeleton />
      </div>
    );
  }

  if (scenario === 'error') {
    return (
      <div>
        <Title level={2}>System Parameters</Title>
        {scenarioSelector}
        <ParamsError onRetry={() => setScenario('loaded')} />
      </div>
    );
  }

  return (
    <div data-testid="settings-params-page">
      <Title level={2}>System Parameters</Title>
      {scenarioSelector}

      {scenario === 'empty' && currentParams.length === 0 ? (
        <Empty description="No system parameters available" />
      ) : (
        <div data-testid="settings-params-form">
          {Object.entries(groupedParams).map(([group, params]) => (
            <Card
              key={group}
              title={group}
              style={{ marginBottom: 16 }}
              data-testid={`settings-params-group-${group}`}
            >
              <Form layout="vertical">
                {params.map(renderParamField)}
              </Form>
            </Card>
          ))}

          <Space style={{ marginTop: 16 }}>
            <Button type="primary" onClick={handleSave} data-testid="settings-params-save-button">
              Save
            </Button>
            <Button onClick={handleReset} data-testid="settings-params-reset-button">
              Reset
            </Button>
          </Space>
        </div>
      )}
    </div>
  );
}
