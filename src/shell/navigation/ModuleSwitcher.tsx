import { Card, Row, Col } from 'antd';
import { useNavigate, useLocation } from 'react-router';
import { modules } from '../config/moduleConfig';

const moduleEntries = Object.values(modules);

interface ModuleSwitcherProps {
  onNavigate?: () => void;
}

export default function ModuleSwitcher({ onNavigate }: ModuleSwitcherProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // Detect current module by matching pathname prefix against defaultRoute
  const currentModuleKey = moduleEntries.find((mod) =>
    location.pathname.startsWith(`/${mod.key}`),
  )?.key;

  function handleClick(defaultRoute: string) {
    navigate(defaultRoute);
    onNavigate?.();
  }

  return (
    <Row gutter={[16, 16]}>
      {moduleEntries.map((mod) => (
        <Col span={12} key={mod.key}>
          <Card
            hoverable
            data-testid={`module-card-${mod.key}`}
            onClick={() => handleClick(mod.defaultRoute)}
            style={{
              borderColor: currentModuleKey === mod.key ? '#1677ff' : undefined,
              backgroundColor: currentModuleKey === mod.key ? '#e6f4ff' : undefined,
              cursor: 'pointer',
            }}
          >
            <Card.Meta
              avatar={mod.icon}
              title={mod.label}
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
}
