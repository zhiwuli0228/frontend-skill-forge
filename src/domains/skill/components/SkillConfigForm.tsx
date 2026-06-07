import { useState, useCallback } from 'react';
import { Form, Input, InputNumber, Collapse, Checkbox, Button, Space } from 'antd';

import type { SkillConfig } from '../data/skill-mock-data';

interface SkillConfigFormProps {
  config: SkillConfig;
  onChange: (config: SkillConfig) => void;
  onSave: () => void;
  onReset: () => void;
}

const availablePermissions = [
  'read:documents',
  'write:documents',
  'read:summaries',
  'write:summaries',
  'access:models',
  'access:config',
  'read:logs',
  'write:logs',
];

export function SkillConfigForm({ config, onChange, onSave, onReset }: SkillConfigFormProps) {
  const [parameters, setParameters] = useState<Array<{ key: string; value: string }>>(
    Object.entries(config.parameters).map(([key, value]) => ({ key, value: String(value) })),
  );

  const handleConnectionChange = useCallback(
    (field: string, value: string | number) => {
      onChange({
        ...config,
        connection: { ...config.connection, [field]: value },
      });
    },
    [config, onChange],
  );

  const handleParameterChange = useCallback(
    (index: number, field: 'key' | 'value', value: string) => {
      const updated = parameters.map((p, i) =>
        i === index ? { ...p, [field]: value } : p,
      );
      setParameters(updated);
      const paramsObj: Record<string, unknown> = {};
      updated.forEach((p) => {
        if (p.key.trim()) paramsObj[p.key] = p.value;
      });
      onChange({ ...config, parameters: paramsObj });
    },
    [config, onChange, parameters],
  );

  const addParameter = useCallback(() => {
    setParameters([...parameters, { key: '', value: '' }]);
  }, [parameters]);

  const removeParameter = useCallback(
    (index: number) => {
      const updated = parameters.filter((_, i) => i !== index);
      setParameters(updated);
      const paramsObj: Record<string, unknown> = {};
      updated.forEach((p) => {
        if (p.key.trim()) paramsObj[p.key] = p.value;
      });
      onChange({ ...config, parameters: paramsObj });
    },
    [config, onChange, parameters],
  );

  const handlePermissionsChange = useCallback(
    (checkedValues: string[]) => {
      onChange({ ...config, permissions: checkedValues });
    },
    [config, onChange],
  );

  const collapseItems = [
    {
      key: 'connection',
      label: 'Connection',
      children: (
        <Form layout="vertical">
          <Form.Item label="Endpoint">
            <Input
              value={config.connection.endpoint}
              onChange={(e) => handleConnectionChange('endpoint', e.target.value)}
              placeholder="https://api.example.com/v1"
              data-testid="skill-config-endpoint"
            />
          </Form.Item>
          <Form.Item label="API Key">
            <Input.Password
              value={config.connection.apiKey}
              onChange={(e) => handleConnectionChange('apiKey', e.target.value)}
              placeholder="sk-xxxxxxxxxxxx"
              data-testid="skill-config-api-key"
            />
          </Form.Item>
          <Form.Item label="Timeout (ms)">
            <InputNumber
              value={config.connection.timeout}
              onChange={(val) => handleConnectionChange('timeout', val ?? 30000)}
              min={1000}
              max={120000}
              style={{ width: '100%' }}
              data-testid="skill-config-timeout"
            />
          </Form.Item>
        </Form>
      ),
    },
    {
      key: 'parameters',
      label: 'Parameters',
      children: (
        <div>
          {parameters.map((param, index) => (
            <Space key={index} style={{ display: 'flex', marginBottom: 8 }} align="start">
              <Input
                placeholder="Key"
                value={param.key}
                onChange={(e) => handleParameterChange(index, 'key', e.target.value)}
                data-testid={`skill-config-param-key-${index}`}
              />
              <Input
                placeholder="Value"
                value={param.value}
                onChange={(e) => handleParameterChange(index, 'value', e.target.value)}
                data-testid={`skill-config-param-value-${index}`}
              />
              <Button
                danger
                size="small"
                onClick={() => removeParameter(index)}
                data-testid={`skill-config-param-remove-${index}`}
              >
                Remove
              </Button>
            </Space>
          ))}
          <Button
            type="dashed"
            onClick={addParameter}
            style={{ width: '100%' }}
            data-testid="skill-config-param-add"
          >
            Add Parameter
          </Button>
        </div>
      ),
    },
    {
      key: 'permissions',
      label: 'Permissions',
      children: (
        <Checkbox.Group
          value={config.permissions}
          onChange={handlePermissionsChange}
          data-testid="skill-config-permissions"
        >
          <Space direction="vertical">
            {availablePermissions.map((perm) => (
              <Checkbox key={perm} value={perm}>
                {perm}
              </Checkbox>
            ))}
          </Space>
        </Checkbox.Group>
      ),
    },
  ];

  return (
    <div data-testid="skill-config-form">
      <Collapse defaultActiveKey={['connection']} items={collapseItems} />
      <Space style={{ marginTop: 16 }}>
        <Button type="primary" onClick={onSave} data-testid="skill-config-save">
          Save
        </Button>
        <Button onClick={onReset} data-testid="skill-config-reset">
          Reset
        </Button>
      </Space>
    </div>
  );
}
