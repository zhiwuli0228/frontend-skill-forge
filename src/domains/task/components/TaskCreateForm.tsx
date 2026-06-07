import { Form, Input, Select, Button, Steps, Space } from 'antd';
import { taskPriorities, taskCategories } from '../data/mock-data';

const { TextArea } = Input;

export interface TaskFormValues {
  title: string;
  priority: string;
  assignee: string;
  category: string;
  description: string;
}

interface TaskCreateFormProps {
  currentStep: number;
  onStepChange: (step: number) => void;
  onValuesChange: (values: TaskFormValues) => void;
  onSubmit: () => void;
  values: TaskFormValues;
  errors: Record<string, string>;
  showValidation: boolean;
}

const assignees = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'];

export function TaskCreateForm({
  currentStep,
  onStepChange,
  onValuesChange,
  onSubmit,
  values,
  errors,
  showValidation,
}: TaskCreateFormProps) {
  const handleChange = (field: keyof TaskFormValues, value: string) => {
    onValuesChange({ ...values, [field]: value });
  };

  const steps = [
    { title: 'Basic Info' },
    { title: 'Details' },
    { title: 'Review' },
  ];

  return (
    <div data-testid="task-create-form">
      <Steps
        current={currentStep}
        items={steps}
        size="small"
        style={{ marginBottom: 24 }}
        data-testid="form-steps"
      />

      {currentStep === 0 && (
        <div data-testid="step-basic-info">
          <Form layout="vertical">
            <Form.Item
              label="Title"
              required
              validateStatus={showValidation && errors.title ? 'error' : ''}
              help={showValidation && errors.title}
            >
              <Input
                value={values.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Enter task title"
                data-testid="input-title"
              />
            </Form.Item>
            <Form.Item
              label="Priority"
              required
              validateStatus={showValidation && errors.priority ? 'error' : ''}
              help={showValidation && errors.priority}
            >
              <Select
                value={values.priority || undefined}
                onChange={(v) => handleChange('priority', v)}
                placeholder="Select priority"
                options={taskPriorities.map((p) => ({ value: p, label: p }))}
                data-testid="input-priority"
              />
            </Form.Item>
            <Form.Item label="Assignee">
              <Select
                value={values.assignee || undefined}
                onChange={(v) => handleChange('assignee', v)}
                placeholder="Select assignee"
                allowClear
                options={assignees.map((a) => ({ value: a, label: a }))}
                data-testid="input-assignee"
              />
            </Form.Item>
          </Form>
        </div>
      )}

      {currentStep === 1 && (
        <div data-testid="step-details">
          <Form layout="vertical">
            <Form.Item
              label="Category"
              required
              validateStatus={showValidation && errors.category ? 'error' : ''}
              help={showValidation && errors.category}
            >
              <Select
                value={values.category || undefined}
                onChange={(v) => handleChange('category', v)}
                placeholder="Select category"
                options={taskCategories.map((c) => ({ value: c, label: c }))}
                data-testid="input-category"
              />
            </Form.Item>
            <Form.Item label="Description">
              <TextArea
                value={values.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Describe the task"
                rows={4}
                data-testid="input-description"
              />
            </Form.Item>
          </Form>
        </div>
      )}

      {currentStep === 2 && (
        <div data-testid="step-review">
          <p style={{ marginBottom: 16, color: '#666' }}>
            Review your task before creating.
          </p>
        </div>
      )}

      <Space style={{ marginTop: 16 }}>
        {currentStep > 0 && (
          <Button onClick={() => onStepChange(currentStep - 1)} data-testid="btn-prev">
            Previous
          </Button>
        )}
        {currentStep < 2 && (
          <Button type="primary" onClick={() => onStepChange(currentStep + 1)} data-testid="btn-next">
            Next
          </Button>
        )}
        {currentStep === 2 && (
          <Button type="primary" onClick={onSubmit} data-testid="btn-submit">
            Create Task
          </Button>
        )}
      </Space>
    </div>
  );
}
