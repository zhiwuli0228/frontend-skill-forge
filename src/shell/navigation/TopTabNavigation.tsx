import { Tabs } from 'antd'
import { useNavigate, useLocation } from 'react-router'
import type { TabItem } from '../config/moduleConfig'

interface TopTabNavigationProps {
  tabs: TabItem[]
}

function sanitizeKey(key: string): string {
  return key.replace(/\//g, '-')
}

export default function TopTabNavigation({ tabs }: TopTabNavigationProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const items = tabs.map((tab) => ({
    key: tab.key,
    label: (
      <span data-testid={`tab-${sanitizeKey(tab.key)}`}>{tab.label}</span>
    ),
  }))

  return (
    <Tabs
      data-testid="module-tabs"
      activeKey={location.pathname}
      items={items}
      onChange={(key) => navigate(key)}
      style={{ padding: '0 24px', background: '#fff' }}
    />
  )
}
