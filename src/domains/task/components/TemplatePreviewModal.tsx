import { Button, Modal, Space, Tag, Typography } from 'antd';

import type { TemplateItem } from '../data/template-mock-data';

const { Title, Text, Paragraph } = Typography;

const categoryColors: Record<string, string> = {
  development: 'blue',
  design: 'purple',
  testing: 'green',
  operations: 'orange',
};

interface TemplatePreviewModalProps {
  template: TemplateItem | null;
  open: boolean;
  onClose: () => void;
  onOpenWorkflow?: (template: TemplateItem) => void;
}

export function TemplatePreviewModal({
  template,
  open,
  onClose,
  onOpenWorkflow,
}: TemplatePreviewModalProps) {
  if (!template) return null;

  return (
    <Modal
      title={template.title}
      open={open}
      onCancel={onClose}
      footer={
        <Space>
          <Button onClick={onClose}>
            Close
          </Button>
          <Button
            type="primary"
            data-testid="template-open-workflow"
            onClick={() => onOpenWorkflow?.(template)}
          >
            Open in Workflow Editor
          </Button>
        </Space>
      }
      data-testid="template-preview-modal"
    >
      <div style={{ marginBottom: 16 }}>
        <Text strong>Category: </Text>
        <Tag color={categoryColors[template.category] ?? 'default'}>
          {template.category}
        </Tag>
      </div>
      <Title level={5}>Description</Title>
      <Paragraph>{template.description}</Paragraph>
      <Title level={5}>Tags</Title>
      <div>
        {template.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </Modal>
  );
}
