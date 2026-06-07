import { useState } from 'react';
import { Layout, Button, Drawer, Tag, Input, Avatar, Space } from 'antd';
import { MenuOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Outlet, useLocation } from 'react-router';
import ModuleSwitcher from '../navigation/ModuleSwitcher';
import { MODULE_LABELS } from '../config/moduleConfig';

const { Header, Content } = Layout;

export function GlobalShell() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  const currentModule = location.pathname.split('/')[1] || 'task';
  const moduleLabel = MODULE_LABELS[currentModule] ?? currentModule;

  return (
    <Layout data-testid="global-shell" style={{ minHeight: '100vh' }}>
      <Header
        data-testid="header"
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
          background: '#001529',
        }}
      >
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={() => setDrawerOpen(true)}
          data-testid="module-switcher-btn"
          style={{ color: '#fff', marginRight: 16 }}
        />

        <span style={{ color: '#fff', fontWeight: 600, fontSize: 18, marginRight: 16 }}>
          Frontend Skill Forge
        </span>

        <Tag data-testid="module-tag" color="blue">
          {moduleLabel}
        </Tag>

        <div style={{ flex: 1 }} />

        <Space size="middle">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search..."
            style={{ width: 200 }}
            disabled
          />
          <Avatar icon={<UserOutlined />} />
        </Space>
      </Header>

      <Content>
        <Outlet />
      </Content>

      <Drawer
        data-testid="module-drawer"
        title="Switch Module"
        placement="left"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        size="default"
      >
        <ModuleSwitcher />
      </Drawer>
    </Layout>
  );
}
