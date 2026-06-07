import { useState } from 'react';
import {
  Typography,
  Space,
  Select,
  Alert,
  Tree,
  Card,
  Table,
  Checkbox,
  Button,
  Skeleton,
  Empty,
} from 'antd';
import { SaveOutlined, ReloadOutlined } from '@ant-design/icons';
import { permissionTree } from '../data/settings-mock-data';
import type { ColumnsType } from 'antd/es/table';
import type { DataNode } from 'antd/es/tree';

const { Title, Text } = Typography;

type Scenario = 'loaded' | 'loading' | 'empty' | 'error';

// ---- helpers ----

function toTreeData(nodes: typeof permissionTree): DataNode[] {
  return nodes.map((n) => ({
    key: n.key,
    title: n.title,
    children: n.children.length > 0 ? toTreeData(n.children) : [],
  }));
}

function collectLeafKeys(nodes: typeof permissionTree): string[] {
  const keys: string[] = [];
  for (const n of nodes) {
    if (n.children.length === 0) {
      keys.push(n.key);
    } else {
      keys.push(...collectLeafKeys(n.children));
    }
  }
  return keys;
}


const allLeafKeys = collectLeafKeys(permissionTree);
const viewKeys = allLeafKeys.filter((k) => k.endsWith('.view'));
const viewCreateKeys = allLeafKeys.filter(
  (k) => k.endsWith('.view') || k.endsWith('.create'),
);

const rolePermissionMap: Record<string, string[]> = {
  Admin: allLeafKeys,
  User: viewCreateKeys,
  Viewer: viewKeys,
};

// ---- permission matrix row ----

interface PermissionRow {
  key: string;
  permission: string;
  description: string;
}

function buildPermissionRows(nodes: typeof permissionTree): PermissionRow[] {
  const rows: PermissionRow[] = [];
  for (const n of nodes) {
    if (n.children.length === 0) {
      rows.push({ key: n.key, permission: n.title, description: n.description });
    } else {
      rows.push(...buildPermissionRows(n.children));
    }
  }
  return rows;
}

const permissionRows = buildPermissionRows(permissionTree);

// ---- sub-components ----

function PermissionsSkeleton() {
  return (
    <div data-testid="settings-permissions-loading">
      <Skeleton.Input active block style={{ height: 40, marginBottom: 16 }} />
      <Skeleton active paragraph={{ rows: 8 }} />
    </div>
  );
}

function PermissionsError({ onRetry }: { onRetry: () => void }) {
  return (
    <div data-testid="settings-permissions-error">
      <Alert
        type="error"
        message="Permissions failed to load"
        description="An unexpected error occurred while loading permissions. Please try again."
        showIcon
        action={
          <a onClick={onRetry} data-testid="settings-permissions-retry-link">
            Retry
          </a>
        }
      />
    </div>
  );
}

// ---- main page ----

export function SettingsPermissionsPage() {
  const [scenario, setScenario] = useState<Scenario>('loaded');
  const [checkedKeys, setCheckedKeys] = useState<string[]>(rolePermissionMap['Admin']);

  const matrixColumns: ColumnsType<PermissionRow> = [
    {
      title: 'Permission',
      dataIndex: 'permission',
      key: 'permission',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    ...(['Admin', 'User', 'Viewer'] as const).map((role) => ({
      title: role,
      key: role,
      render: (_: unknown, row: PermissionRow) => (
        <Checkbox checked={rolePermissionMap[role].includes(row.key)} disabled />
      ),
    })),
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
        data-testid="settings-permissions-scenario-select"
      />
    </Space>
  );

  if (scenario === 'loading') {
    return (
      <div>
        <Title level={2}>Permission Management</Title>
        {scenarioSelector}
        <PermissionsSkeleton />
      </div>
    );
  }

  if (scenario === 'error') {
    return (
      <div>
        <Title level={2}>Permission Management</Title>
        {scenarioSelector}
        <PermissionsError onRetry={() => setScenario('loaded')} />
      </div>
    );
  }

  if (scenario === 'empty') {
    return (
      <div data-testid="settings-permissions-page">
        <Title level={2}>Permission Management</Title>
        {scenarioSelector}
        <Empty description="No permissions available" />
      </div>
    );
  }

  const treeData = toTreeData(permissionTree);

  return (
    <div data-testid="settings-permissions-page">
      <Title level={2}>Permission Management</Title>
      {scenarioSelector}

      <Tree
        checkable
        defaultExpandAll
        treeData={treeData}
        checkedKeys={checkedKeys}
        onCheck={(keys) => setCheckedKeys(keys as string[])}
        data-testid="settings-permissions-tree"
      />

      <Card title="Role Permissions" style={{ marginTop: 24 }} data-testid="settings-permissions-matrix">
        <Table
          columns={matrixColumns}
          dataSource={permissionRows}
          rowKey="key"
          pagination={false}
        />
      </Card>

      <Space style={{ marginTop: 24 }}>
        <Button type="primary" icon={<SaveOutlined />} data-testid="settings-permissions-save-button">
          Save
        </Button>
        <Button icon={<ReloadOutlined />} data-testid="settings-permissions-reset-button">
          Reset
        </Button>
      </Space>
    </div>
  );
}
