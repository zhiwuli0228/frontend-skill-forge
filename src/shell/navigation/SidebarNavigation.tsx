import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useLocation, useNavigate } from 'react-router';
import type { SidebarMenuItem } from '../config/moduleConfig';

interface SidebarNavigationProps {
  menuItems: SidebarMenuItem[];
  defaultOpenKeys?: string[];
}

export function SidebarNavigation({
  menuItems,
  defaultOpenKeys = [],
}: SidebarNavigationProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleClick = ({ key }: { key: string }) => {
    const item = menuItems.find((i) => i.key === key);
    navigate(item?.path ?? key);
  };

  const antdItems: MenuProps['items'] = menuItems.map(({ key, label }) => ({
    key,
    label,
  }));

  const selectedKey =
    menuItems.find((item) => item.path && pathname.startsWith(item.path))?.key ?? '';

  return (
    <Menu
      mode="inline"
      selectedKeys={selectedKey ? [selectedKey] : []}
      defaultOpenKeys={defaultOpenKeys}
      items={antdItems}
      onClick={handleClick}
      style={{ height: '100%', borderRight: 0 }}
      data-testid="sidebar-menu"
    />
  );
}
