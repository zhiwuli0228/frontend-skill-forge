import { Row, Col } from 'antd';

import type { TemplateItem } from '../data/template-mock-data';
import { TemplateCard } from './TemplateCard';

interface TemplateGridProps {
  templates: TemplateItem[];
  onCardClick: (template: TemplateItem) => void;
}

export function TemplateGrid({ templates, onCardClick }: TemplateGridProps) {
  return (
    <Row gutter={[16, 16]} data-testid="template-grid">
      {templates.map((template) => (
        <Col span={6} key={template.id}>
          <TemplateCard
            template={template}
            onClick={() => onCardClick(template)}
          />
        </Col>
      ))}
    </Row>
  );
}
