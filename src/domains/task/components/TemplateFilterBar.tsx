import { Input, Select, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { templateCategories } from '../data/template-mock-data';

interface TemplateFilterBarProps {
  search: string;
  category: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

export function TemplateFilterBar({
  search,
  category,
  onSearchChange,
  onCategoryChange,
}: TemplateFilterBarProps) {
  return (
    <Space wrap data-testid="template-filter-bar">
      <Input
        placeholder="Search templates..."
        prefix={<SearchOutlined />}
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{ width: 280 }}
        data-testid="template-search"
      />
      <Select
        value={category}
        onChange={onCategoryChange}
        style={{ width: 160 }}
        options={templateCategories.map((c) => ({
          value: c,
          label: c.charAt(0).toUpperCase() + c.slice(1),
        }))}
        data-testid="template-category-filter"
      />
    </Space>
  );
}
