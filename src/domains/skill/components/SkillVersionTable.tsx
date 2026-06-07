import { Table, Tag, Button } from 'antd';
import type { SkillVersion } from '../data/skill-mock-data';

interface SkillVersionTableProps {
  versions: SkillVersion[];
  onRollback: (version: string) => void;
}

const statusColor: Record<string, string> = {
  current: 'green',
  previous: 'blue',
  deprecated: 'red',
};

export function SkillVersionTable({ versions, onRollback }: SkillVersionTableProps) {
  return (
    <Table<SkillVersion>
      dataSource={versions}
      rowKey="version"
      size="middle"
      data-testid="skill-version-table"
      rowClassName={(record) =>
        record.status === 'current' ? 'ant-table-row-selected' : ''
      }
      pagination={false}
      columns={[
        {
          title: 'Version',
          dataIndex: 'version',
          width: 120,
        },
        {
          title: 'Date',
          dataIndex: 'date',
          width: 140,
        },
        {
          title: 'Changes',
          dataIndex: 'changes',
          ellipsis: true,
        },
        {
          title: 'Status',
          dataIndex: 'status',
          width: 130,
          render: (status: string) => (
            <Tag color={statusColor[status]}>{status}</Tag>
          ),
        },
        {
          title: 'Actions',
          key: 'actions',
          width: 120,
          render: (_: unknown, record: SkillVersion) =>
            record.status !== 'current' ? (
              <Button
                type="link"
                size="small"
                onClick={() => onRollback(record.version)}
                data-testid={`skill-rollback-btn-${record.version}`}
              >
                Rollback
              </Button>
            ) : null,
        },
      ]}
    />
  );
}
