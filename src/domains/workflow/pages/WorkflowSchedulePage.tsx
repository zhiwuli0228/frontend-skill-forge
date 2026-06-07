import { useState, useMemo, useCallback } from 'react';
import {
  Typography,
  Space,
  Select,
  Button,
  Table,
  Switch,
  Modal,
  Form,
  Input,
  Alert,
  Skeleton,
  Empty,
  Popconfirm,
  message,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import {
  schedules,
  emptySchedules,
  type ScheduleItem,
} from '../data/workflow-mock-data';
import type { ColumnsType } from 'antd/es/table';

const { Title, Text } = Typography;

type Scenario = 'loaded' | 'loading' | 'empty' | 'error';

function ScheduleLoading() {
  return (
    <div data-testid="workflow-schedule-loading">
      <Skeleton active paragraph={{ rows: 1 }} />
      <Skeleton.Input active block style={{ height: 40, marginTop: 16 }} />
      <Skeleton active paragraph={{ rows: 6 }} style={{ marginTop: 16 }} />
    </div>
  );
}

function ScheduleError({ onRetry }: { onRetry: () => void }) {
  return (
    <div data-testid="workflow-schedule-error">
      <Alert
        type="error"
        message="Schedules failed to load"
        description="An unexpected error occurred while loading schedules. Please try again."
        showIcon
        action={
          <a onClick={onRetry} data-testid="workflow-schedule-error-retry-link">
            Retry
          </a>
        }
      />
    </div>
  );
}

export function WorkflowSchedulePage() {
  const [scenario, setScenario] = useState<Scenario>('loaded');
  const [scheduleList, setScheduleList] = useState<ScheduleItem[]>(schedules);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<ScheduleItem | null>(null);
  const [form] = Form.useForm();

  const displaySchedules = useMemo(() => {
    if (scenario === 'empty') return emptySchedules;
    return scheduleList;
  }, [scenario, scheduleList]);

  const handleToggle = useCallback(
    (id: string, checked: boolean) => {
      setScheduleList((prev) =>
        prev.map((s) => (s.id === id ? { ...s, enabled: checked } : s)),
      );
    },
    [],
  );

  const handleDelete = useCallback(
    (id: string) => {
      setScheduleList((prev) => prev.filter((s) => s.id !== id));
      message.success('Schedule deleted');
    },
    [],
  );

  const handleAdd = useCallback(() => {
    setEditingSchedule(null);
    form.resetFields();
    setModalOpen(true);
  }, [form]);

  const handleEdit = useCallback(
    (record: ScheduleItem) => {
      setEditingSchedule(record);
      form.setFieldsValue({
        workflowName: record.workflowName,
        cron: record.cron,
      });
      setModalOpen(true);
    },
    [form],
  );

  const handleModalOk = useCallback(() => {
    form.validateFields().then((values) => {
      if (editingSchedule) {
        setScheduleList((prev) =>
          prev.map((s) =>
            s.id === editingSchedule.id
              ? { ...s, workflowName: values.workflowName, cron: values.cron }
              : s,
          ),
        );
        message.success('Schedule updated');
      } else {
        const newItem: ScheduleItem = {
          id: `s-${Date.now()}`,
          workflowId: `wf-${Date.now()}`,
          workflowName: values.workflowName,
          cron: values.cron,
          nextRun: 'TBD',
          enabled: true,
        };
        setScheduleList((prev) => [...prev, newItem]);
        message.success('Schedule created');
      }
      setModalOpen(false);
      form.resetFields();
    });
  }, [editingSchedule, form]);

  const columns: ColumnsType<ScheduleItem> = [
    {
      title: 'Workflow Name',
      dataIndex: 'workflowName',
      key: 'workflowName',
    },
    {
      title: 'Cron Expression',
      dataIndex: 'cron',
      key: 'cron',
      render: (cron: string) => <code>{cron}</code>,
    },
    {
      title: 'Next Run',
      dataIndex: 'nextRun',
      key: 'nextRun',
    },
    {
      title: 'Enabled',
      dataIndex: 'enabled',
      key: 'enabled',
      width: 100,
      render: (enabled: boolean, record) => (
        <Switch
          checked={enabled}
          onChange={(checked) => handleToggle(record.id, checked)}
          data-testid={`workflow-schedule-toggle-${record.id}`}
        />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_: unknown, record: ScheduleItem) => (
        <Space>
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            data-testid={`workflow-schedule-edit-${record.id}`}
          />
          <Popconfirm
            title="Delete this schedule?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button
              type="link"
              size="small"
              danger
              icon={<DeleteOutlined />}
              data-testid={`workflow-schedule-delete-${record.id}`}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

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
        data-testid="workflow-schedule-scenario-select"
      />
    </Space>
  );

  if (scenario === 'loading') {
    return (
      <div data-testid="workflow-schedule-page">
        <Title level={2}>Workflow Schedules</Title>
        {scenarioSelector}
        <ScheduleLoading />
      </div>
    );
  }

  if (scenario === 'error') {
    return (
      <div data-testid="workflow-schedule-page">
        <Title level={2}>Workflow Schedules</Title>
        {scenarioSelector}
        <ScheduleError onRetry={() => setScenario('loaded')} />
      </div>
    );
  }

  return (
    <div data-testid="workflow-schedule-page">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <Title level={2} style={{ margin: 0 }}>
          Workflow Schedules
        </Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
          data-testid="workflow-add-schedule"
        >
          Add Schedule
        </Button>
      </div>

      {scenarioSelector}

      {displaySchedules.length === 0 ? (
        <Empty description="No schedules configured" />
      ) : (
        <Table
          dataSource={displaySchedules}
          columns={columns}
          rowKey="id"
          data-testid="workflow-schedule-table"
          pagination={false}
        />
      )}

      <Modal
        title={editingSchedule ? 'Edit Schedule' : 'Add Schedule'}
        open={modalOpen}
        onOk={handleModalOk}
        onCancel={() => {
          setModalOpen(false);
          form.resetFields();
        }}
        data-testid="workflow-schedule-modal"
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item
            name="workflowName"
            label="Workflow"
            rules={[{ required: true, message: 'Please enter a workflow name' }]}
          >
            <Select
              placeholder="Select a workflow"
              options={[
                { value: 'Daily Report', label: 'Daily Report' },
                { value: 'Data Sync', label: 'Data Sync' },
                { value: 'Backup Cleanup', label: 'Backup Cleanup' },
                { value: 'Notification Digest', label: 'Notification Digest' },
              ]}
              data-testid="workflow-schedule-form-workflow"
            />
          </Form.Item>
          <Form.Item
            name="cron"
            label="Cron Expression"
            rules={[{ required: true, message: 'Please enter a cron expression' }]}
          >
            <Input
              placeholder="e.g. 0 9 * * *"
              data-testid="workflow-schedule-form-cron"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
