import { useState, useMemo, useCallback } from 'react';
import { useParams } from 'react-router';
import { Typography, Space, Select, Alert, Skeleton, Empty, Card, Row, Col, Tag } from 'antd';

import { SkillFilterBar } from '../components/SkillFilterBar';
import { SkillGrid } from '../components/SkillGrid';
import { SkillList } from '../components/SkillList';
import { SkillDetailModal } from '../components/SkillDetailModal';
import { skills, emptySkills, type SkillItem } from '../data/skill-mock-data';

const { Title, Text } = Typography;

type Scenario = 'loaded' | 'loading' | 'empty' | 'error';

function SkillsSkeleton() {
  return (
    <div data-testid="skill-loading">
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

function SkillsError({ onRetry }: { onRetry: () => void }) {
  return (
    <div data-testid="skill-error">
      <Alert
        type="error"
        message="Skill library failed to load"
        description="An unexpected error occurred while loading skills. Please try again."
        showIcon
        action={
          <a onClick={onRetry} data-testid="skill-error-retry-link">
            Retry
          </a>
        }
      />
    </div>
  );
}

export function SkillListPage() {
  const { filter } = useParams<{ filter?: string }>();
  const [scenario, setScenario] = useState<Scenario>('loaded');
  const [search, setSearch] = useState('');
  const [userCategory, setUserCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('name');

  const sidebarCategory = filter && filter !== 'all' ? filter : null;
  const effectiveCategory = userCategory ?? sidebarCategory ?? 'all';

  const baseSkills = scenario === 'empty' ? emptySkills : skills;

  const filteredSkills = useMemo(() => {
    let result = baseSkills;

    if (effectiveCategory !== 'all') {
      result = result.filter((s) => s.category === effectiveCategory);
    }

    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(query) ||
          s.description.toLowerCase().includes(query),
      );
    }

    if (tags.length > 0) {
      result = result.filter((s) =>
        tags.some((tag) => s.description.toLowerCase().includes(tag))
      );
    }

    // Sort
    result = [...result].sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'category') return a.category.localeCompare(b.category);
      return 0;
    });

    return result;
  }, [baseSkills, effectiveCategory, search, tags, sortBy]);

  const filterLabel = sidebarCategory;

  const handleCardClick = useCallback((skill: SkillItem) => {
    setSelectedSkill(skill);
  }, []);

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
        data-testid="skill-scenario-select"
      />
    </Space>
  );

  if (scenario === 'loading') {
    return (
      <div data-testid="skill-list-page">
        <Title level={2}>Skills</Title>
        {scenarioSelector}
        <SkillsSkeleton />
      </div>
    );
  }

  if (scenario === 'error') {
    return (
      <div data-testid="skill-list-page">
        <Title level={2}>Skills</Title>
        {scenarioSelector}
        <SkillsError onRetry={() => setScenario('loaded')} />
      </div>
    );
  }

  return (
    <div data-testid="skill-list-page">
      <Title level={2}>Skills</Title>
      {scenarioSelector}

      <SkillFilterBar
        search={search}
        category={effectiveCategory}
        viewMode={viewMode}
        tags={tags}
        sortBy={sortBy}
        onSearchChange={setSearch}
        onCategoryChange={(c) => setUserCategory(c === 'all' ? null : c)}
        onViewModeChange={setViewMode}
        onTagsChange={setTags}
        onSortByChange={setSortBy}
      />

      {filterLabel && (
        <div style={{ marginTop: 16, marginBottom: 8 }} data-testid="sidebar-filter-indicator">
          <Text>Sidebar filter: </Text>
          <Tag color="blue">{filterLabel}</Tag>
        </div>
      )}

      <div style={{ marginTop: 16 }}>
        {filteredSkills.length === 0 ? (
          <Empty description="No skills found" />
        ) : viewMode === 'grid' ? (
          <SkillGrid
            skills={filteredSkills}
            onCardClick={handleCardClick}
          />
        ) : (
          <SkillList
            skills={filteredSkills}
            onCardClick={handleCardClick}
          />
        )}
      </div>

      <SkillDetailModal
        skill={selectedSkill}
        open={selectedSkill !== null}
        onClose={() => setSelectedSkill(null)}
      />
    </div>
  );
}
