import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { Typography, Space, Select, Alert, Skeleton, Empty, Card, Row, Col } from 'antd';

import { TemplateFilterBar } from '../components/TemplateFilterBar';
import { TemplateGrid } from '../components/TemplateGrid';
import { TemplatePreviewModal } from '../components/TemplatePreviewModal';
import { templates, emptyTemplates, type TemplateItem } from '../data/template-mock-data';

const { Title, Text } = Typography;

type Scenario = 'loaded' | 'loading' | 'empty' | 'error';

function TemplatesSkeleton() {
  return (
    <div data-testid="task-templates-loading">
      <Skeleton.Input active block style={{ height: 40 }} />
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <Col span={6} key={i}>
            <Card>
              <Skeleton active paragraph={{ rows: 3 }} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

function TemplatesError({ onRetry }: { onRetry: () => void }) {
  return (
    <div data-testid="task-templates-error">
      <Alert
        type="error"
        title="Template library failed to load"
        description="An unexpected error occurred while loading templates. Please try again."
        showIcon
        action={
          <a onClick={onRetry} data-testid="task-templates-error-retry-link">
            Retry
          </a>
        }
      />
    </div>
  );
}

export function TaskTemplatesPage() {
  const navigate = useNavigate();
  const [scenario, setScenario] = useState<Scenario>('loaded');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateItem | null>(null);

  const baseTemplates = scenario === 'empty' ? emptyTemplates : templates;

  const filteredTemplates = useMemo(() => {
    let result = baseTemplates;

    if (category !== 'all') {
      result = result.filter((t) => t.category === category);
    }

    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query),
      );
    }

    return result;
  }, [baseTemplates, category, search]);

  const handleCardClick = useCallback((template: TemplateItem) => {
    setSelectedTemplate(template);
  }, []);

  const handleOpenWorkflow = useCallback((template: TemplateItem) => {
    const params = new URLSearchParams({
      sourceTemplate: template.id,
      templateTitle: template.title,
      templateCategory: template.category,
    });
    setSelectedTemplate(null);
    navigate(`/workflow/editor?${params.toString()}`);
  }, [navigate]);

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
        data-testid="task-templates-scenario-select"
      />
    </Space>
  );

  const pageHeader = (
    <div style={{ marginBottom: 12 }}>
      <Title level={2} style={{ marginBottom: 4 }}>
        Templates
      </Title>
      <Text type="secondary">
        Browse reusable task templates, filter by category, and preview structure before reuse.
      </Text>
    </div>
  );

  if (scenario === 'loading') {
    return (
      <div data-testid="task-templates-page">
        {pageHeader}
        {scenarioSelector}
        <TemplatesSkeleton />
      </div>
    );
  }

  if (scenario === 'error') {
    return (
      <div data-testid="task-templates-page">
        {pageHeader}
        {scenarioSelector}
        <TemplatesError onRetry={() => setScenario('loaded')} />
      </div>
    );
  }

  return (
    <div data-testid="task-templates-page">
      {pageHeader}
      {scenarioSelector}

      <TemplateFilterBar
        search={search}
        category={category}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
      />

      <div style={{ marginTop: 16 }}>
        {filteredTemplates.length === 0 ? (
          <Empty description="No templates match the current search criteria" />
        ) : (
          <TemplateGrid
            templates={filteredTemplates}
            onCardClick={handleCardClick}
          />
        )}
      </div>

      <TemplatePreviewModal
        template={selectedTemplate}
        open={selectedTemplate !== null}
        onClose={() => setSelectedTemplate(null)}
        onOpenWorkflow={handleOpenWorkflow}
      />
    </div>
  );
}
