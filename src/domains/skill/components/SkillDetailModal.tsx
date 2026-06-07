import { Modal, Descriptions, Tag, Space } from 'antd';
import { DownloadOutlined, UserOutlined } from '@ant-design/icons';

import type { SkillItem } from '../data/skill-mock-data';

const categoryColors: Record<string, string> = {
  text: 'blue',
  image: 'purple',
  data: 'green',
  tool: 'orange',
};

const statusColors: Record<string, string> = {
  active: 'green',
  inactive: 'default',
  draft: 'gold',
};

interface SkillDetailModalProps {
  skill: SkillItem | null;
  open: boolean;
  onClose: () => void;
}

export function SkillDetailModal({ skill, open, onClose }: SkillDetailModalProps) {
  if (!skill) return null;

  return (
    <Modal
      title={skill.name}
      open={open}
      onCancel={onClose}
      footer={null}
      data-testid="skill-detail-modal"
    >
      <Descriptions column={1} bordered size="small">
        <Descriptions.Item label="Description">
          {skill.description}
        </Descriptions.Item>
        <Descriptions.Item label="Category">
          <Tag color={categoryColors[skill.category] ?? 'default'}>
            {skill.category}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Version">
          {skill.version}
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          <Tag color={statusColors[skill.status] ?? 'default'}>
            {skill.status}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Author">
          <Space>
            <UserOutlined />
            {skill.author}
          </Space>
        </Descriptions.Item>
        <Descriptions.Item label="Downloads">
          <Space>
            <DownloadOutlined />
            {skill.downloads.toLocaleString()}
          </Space>
        </Descriptions.Item>
        <Descriptions.Item label="Tags">
          <Space wrap>
            {skill.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </Space>
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
}
