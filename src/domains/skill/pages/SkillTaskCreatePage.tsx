import { useState, useMemo, useCallback } from 'react';
import { Typography, Space, Select, Alert, Row, Col, Card, Skeleton, Modal } from 'antd';
import { TaskCreateForm, type TaskFormValues } from '../../task/components/TaskCreateForm';
import { TaskPreview } from '../../task/components/TaskPreview';

const { Title, Text } = Typography;

type Scenario = 'loaded' | 'loading' | 'empty' | 'validation' | 'error';

const emptyValues: TaskFormValues = {
  title: '',
  priority: '',
  assignee: '',
  category: '',
  description: '',
  dueDate: '',
  estimatedHours: 0,
  isPublic: false,
  tags: [],
};

const sampleValues: TaskFormValues = {
  title: 'Upgrade database connection pooling',
  priority: 'critical',
  assignee: 'Alice',
  category: 'infrastructure',
  description: 'Migrate from HikariCP 5.x to 6.x to resolve connection leak under high concurrency.',
  dueDate: '2026-06-15T00:00:00Z',
  estimatedHours: 8,
  isPublic: true,
  tags: ['backend', 'devops'],
};

function validateForm(values: TaskFormValues): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!values.title.trim()) errors.title = 'Title is required';
  if (!values.priority) errors.priority = 'Priority is required';
  if (!values.category) errors.category = 'Category is required';
  if (values.estimatedHours < 0) errors.estimatedHours = 'Hours must be positive';
  return errors;
}

function TaskCreatorSkeleton() {
  return (
    <div data-testid="skill-task-create-loading">
      <Skeleton active paragraph={{ rows: 1 }} />
      <Row gutter={24} style={{ marginTop: 16 }}>
        <Col span={14}>
          <Card>
            <Skeleton active paragraph={{ rows: 6 }} />
          </Card>
        </Col>
        <Col span={10}>
          <Card>
            <Skeleton active paragraph={{ rows: 4 }} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

function TaskCreatorError({ onRetry }: { onRetry: () => void }) {
  return (
    <div data-testid="skill-task-create-error">
      <Alert
        type="error"
        message="Task Creator failed to load"
        description="An unexpected error occurred while loading the Task Creator. Please try again."
        showIcon
        action={
          <a onClick={onRetry} data-testid="skill-task-create-error-retry-link">
            Retry
          </a>
        }
      />
    </div>
  );
}

export function SkillTaskCreatePage() {
  const [scenario, setScenario] = useState<Scenario>('loaded');
  const [currentStep, setCurrentStep] = useState(0);
  const [values, setValues] = useState<TaskFormValues>(sampleValues);
  const [showValidation, setShowValidation] = useState(false);

  const errors = useMemo(() => validateForm(values), [values]);

  const handleValuesChange = useCallback((newValues: TaskFormValues) => {
    setValues(newValues);
    setShowValidation(false);
  }, []);

  const handleSubmit = useCallback(() => {
    const formErrors = validateForm(values);
    if (Object.keys(formErrors).length > 0) {
      setShowValidation(true);
      setCurrentStep(0);
      return;
    }
    Modal.success({
      title: 'Task Created',
      content: `Task "${values.title}" has been created successfully via Task Creator skill.`,
    });
  }, [values]);

  const handleStepChange = useCallback((step: number) => {
    setCurrentStep(step);
  }, []);

  const scenarioSelector = (
    <Space style={{ marginBottom: 16 }}>
      <Text>Scenario:</Text>
      <Select
        value={scenario}
        onChange={(s) => {
          setScenario(s);
          if (s === 'empty') {
            setValues(emptyValues);
            setShowValidation(false);
            setCurrentStep(0);
          } else if (s === 'validation') {
            setValues(emptyValues);
            setShowValidation(true);
            setCurrentStep(0);
          } else {
            setValues(sampleValues);
            setShowValidation(false);
          }
        }}
        options={[
          { value: 'loaded', label: 'Loaded' },
          { value: 'loading', label: 'Loading' },
          { value: 'empty', label: 'Empty' },
          { value: 'validation', label: 'Validation' },
          { value: 'error', label: 'Error' },
        ]}
        data-testid="skill-task-create-scenario-select"
      />
    </Space>
  );

  if (scenario === 'loading') {
    return (
      <div data-testid="skill-task-create-page">
        <Title level={2}>Task Creator</Title>
        <Text type="secondary">
          Create and manage operational tasks with a guided 4-step wizard: Basic Info, Details, Settings, and Review before submission.
        </Text>
        {scenarioSelector}
        <TaskCreatorSkeleton />
      </div>
    );
  }

  if (scenario === 'error') {
    return (
      <div data-testid="skill-task-create-page">
        <Title level={2}>Task Creator</Title>
        {scenarioSelector}
        <TaskCreatorError onRetry={() => setScenario('loaded')} />
      </div>
    );
  }

  return (
    <div data-testid="skill-task-create-page">
      <Title level={2}>Task Creator</Title>
      <Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>
        Create and manage operational tasks with a guided 4-step wizard: Basic Info, Details, Settings, and Review before submission.
      </Text>
      {scenarioSelector}

      <Row gutter={24}>
        <Col span={14}>
          <Card>
            <TaskCreateForm
              currentStep={currentStep}
              onStepChange={handleStepChange}
              onValuesChange={handleValuesChange}
              onSubmit={handleSubmit}
              values={values}
              errors={errors}
              showValidation={showValidation}
            />
          </Card>
        </Col>
        <Col span={10}>
          <TaskPreview values={values} />
        </Col>
      </Row>
    </div>
  );
}
