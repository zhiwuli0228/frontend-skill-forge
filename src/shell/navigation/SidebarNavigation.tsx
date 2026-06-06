import { Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router';
import {
  DashboardOutlined,
  UnorderedListOutlined,
  PlusOutlined,
} from '@ant-design/icons';

const menuItems = [
  {
    key: '/dashboard',
    icon: <DashboardOutlined />,
    label: 'Dashboard',
  },
  {
    key: '/task',
    icon: <UnorderedListOutlined />,
    label: 'Tasks',
    children: [
      {
        key: '/task/list',
        icon: <UnorderedListOutlined />,
        label: 'Task List',
      },
      {
        key: '/task/create',
        icon: <PlusOutlined />,
        label: 'Create Task',
      },
    ],
  },
];

export function SidebarNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  return (
    <Menu
      mode="inline"
      selectedKeys={[location.pathname]}
      defaultOpenKeys={['/task']}
      items={menuItems}
      onClick={handleClick}
      style={{ height: '100%', borderRight: 0 }}
    />
  );
}