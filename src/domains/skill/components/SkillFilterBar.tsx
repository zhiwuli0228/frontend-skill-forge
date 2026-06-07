import { Input, Select, Space, Button } from 'antd';
import { SearchOutlined, AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons';

import { skillCategories } from '../data/skill-mock-data';

interface SkillFilterBarProps {
  search: string;
  category: string;
  viewMode: 'grid' | 'list';
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

export function SkillFilterBar({
  search,
  category,
  viewMode,
  onSearchChange,
  onCategoryChange,
  onViewModeChange,
}: SkillFilterBarProps) {
  return (
    <Space wrap data-testid="skill-filter-bar">
      <Input
        placeholder="Search skills..."
        prefix={<SearchOutlined />}
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{ width: 280 }}
        data-testid="skill-search"
      />
      <Select
        value={category}
        onChange={onCategoryChange}
        style={{ width: 160 }}
        options={skillCategories.map((c) => ({
          value: c,
          label: c.charAt(0).toUpperCase() + c.slice(1),
        }))}
        data-testid="skill-category-filter"
      />
      <Button.Group data-testid="skill-view-toggle">
        <Button
          type={viewMode === 'grid' ? 'primary' : 'default'}
          icon={<AppstoreOutlined />}
          onClick={() => onViewModeChange('grid')}
          data-testid="skill-view-grid"
        />
        <Button
          type={viewMode === 'list' ? 'primary' : 'default'}
          icon={<UnorderedListOutlined />}
          onClick={() => onViewModeChange('list')}
          data-testid="skill-view-list"
        />
      </Button.Group>
    </Space>
  );
}
