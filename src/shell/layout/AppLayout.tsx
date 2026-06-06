import { Layout } from 'antd';
import { Outlet } from 'react-router';
import { SidebarNavigation } from '../navigation/SidebarNavigation';

const { Sider, Content } = Layout;

export function AppLayout() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} theme="light">
        <SidebarNavigation />
      </Sider>
      <Layout>
        <Content style={{ padding: 24 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}