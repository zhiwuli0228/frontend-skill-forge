import { Layout, Breadcrumb } from 'antd'
import { Outlet, useLocation, useNavigate } from 'react-router'
import { useEffect } from 'react'
import { getModuleConfig } from '../config/moduleConfig'
import TopTabNavigation from '../navigation/TopTabNavigation'
import { SidebarNavigation } from '../navigation/SidebarNavigation'

const { Sider, Content } = Layout

interface ModuleLayoutProps {
  moduleKey: string
}

export default function ModuleLayout({ moduleKey }: ModuleLayoutProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const config = getModuleConfig(moduleKey)

  useEffect(() => {
    if (!config) {
      navigate('/task/list', { replace: true })
    }
  }, [config, navigate])

  if (!config) {
    return null
  }

  // Derive current page label from matching pathname against config.tabs
  const currentTab = config.tabs.find((tab) => tab.key === location.pathname)
  const currentPageLabel = currentTab?.label ?? config.label

  return (
    <Layout data-testid="module-layout">
      <TopTabNavigation tabs={config.tabs} />
      <Layout>
        <Sider
          width={200}
          theme="light"
          data-testid="module-sider"
        >
          <SidebarNavigation
            menuItems={config.sidebarMenu}
            defaultOpenKeys={[config.key]}
          />
        </Sider>
        <Content
          style={{ padding: 24 }}
          data-testid="module-content"
        >
          <Breadcrumb
            data-testid="breadcrumb"
            items={[
              { title: config.label },
              { title: currentPageLabel },
            ]}
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
