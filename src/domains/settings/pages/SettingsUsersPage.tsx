import { useState } from 'react';
import {
  Typography,
  Space,
  Select,
  Alert,
  Table,
  Tag,
  Button,
  Skeleton,
  Empty,
  Modal,
  Form,
  Input,
  Switch,
} from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import { users, emptyUsers, type UserItem } from '../data/settings-mock-data';
import type { ColumnsType } from 'antd/es/table';

const { Title, Text } = Typography;

type Scenario = 'loaded' | 'loading' | 'empty' | 'error';

const roleColorMap: Record<UserItem['role'], string> = {
  admin: 'red',
  user: 'blue',
  viewer: 'green',
};

const statusColorMap: Record<UserItem['status'], string> = {
  active: 'green',
  disabled: 'red',
};

function UsersSkeleton() {
  return (
    <div data-testid="settings-users-loading">
      <Skeleton.Input active block style={{ height: 40, marginBottom: 16 }} />
      <Skeleton active paragraph={{ rows: 8 }} />
    </div>
  );
}

function UsersError({ onRetry }: { onRetry: () => void }) {
  return (
    <div data-testid="settings-users-error">
      <Alert
        type="error"
        message="Users failed to load"
        description="An unexpected error occurred while loading the users. Please try again."
        showIcon
        action={
          <a onClick={onRetry} data-testid="settings-users-retry-link">
            Retry
          </a>
        }
      />
    </div>
  );
}

export function SettingsUsersPage() {
  const [scenario, setScenario] = useState<Scenario>('loaded');
  const [modalOpen, setModalOpen] = useState(false);
  const [addForm] = Form.useForm();

  const currentUsers = scenario === 'empty' ? emptyUsers : users;

  const handleAddOk = () => {
    addForm.validateFields().then(() => {
      setModalOpen(false);
      addForm.resetFields();
    });
  };

  const handleAddCancel = () => {
    setModalOpen(false);
    addForm.resetFields();
  };

  const columns: ColumnsType<UserItem> = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: UserItem['role']) => (
        <Tag color={roleColorMap[role]}>{role}</Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: UserItem['status']) => (
        <Tag color={statusColorMap[status]}>{status}</Tag>
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Last Login',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, record: UserItem) => (
        <Space>
          <Button type="link" icon={<EditOutlined />} size="small">
            Edit
          </Button>
          <Switch
            checked={record.status === 'active'}
            checkedChildren="Active"
            unCheckedChildren="Disabled"
            size="small"
          />
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
        data-testid="settings-users-scenario-select"
      />
    </Space>
  );

  if (scenario === 'loading') {
    return (
      <div>
        <Title level={2}>User Management</Title>
        {scenarioSelector}
        <UsersSkeleton />
      </div>
    );
  }

  if (scenario === 'error') {
    return (
      <div>
        <Title level={2}>User Management</Title>
        {scenarioSelector}
        <UsersError onRetry={() => setScenario('loaded')} />
      </div>
    );
  }

  return (
    <div data-testid="settings-users-page">
      <Title level={2}>User Management</Title>
      {scenarioSelector}

      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setModalOpen(true)}
          data-testid="settings-users-add-button"
        >
          Add User
        </Button>
      </div>

      {scenario === 'empty' && currentUsers.length === 0 ? (
        <Empty description="No users available" />
      ) : (
        <Table
          columns={columns}
          dataSource={currentUsers}
          rowKey="id"
          data-testid="settings-users-table"
        />
      )}

      <Modal
        title="Add User"
        open={modalOpen}
        onOk={handleAddOk}
        onCancel={handleAddCancel}
        data-testid="settings-users-add-modal"
      >
        <Form form={addForm} layout="vertical">
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please enter a username' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter an email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: 'Please select a role' }]}
          >
            <Select
              options={[
                { value: 'admin', label: 'Admin' },
                { value: 'user', label: 'User' },
                { value: 'viewer', label: 'Viewer' },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
