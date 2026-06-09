import { useState } from 'react';
import { Form, Input, Button, Typography, Select, Alert, Skeleton, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/useAuth';
import { VALID_CREDENTIALS } from '../data/auth-mock-data';

const { Title, Text } = Typography;

type Scenario = 'loaded' | 'loading' | 'error';

export function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [scenario, setScenario] = useState<Scenario>('loaded');

  // Already authenticated — redirect to app
  if (isAuthenticated) {
    navigate('/', { replace: true });
    return null;
  }

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setSubmitting(true);
      setLoginError(null);
      const result = await login(values.username, values.password);
      if (result.success) {
        navigate('/', { replace: true });
      } else {
        setLoginError(result.error ?? 'Login failed');
      }
    } catch {
      // Form validation failed — antd shows field-level errors
    } finally {
      setSubmitting(false);
    }
  };

  if (scenario === 'loading') {
    return (
      <div data-testid="login-loading" style={{ padding: 24, maxWidth: 400, margin: '100px auto' }}>
        <Skeleton.Input active block style={{ marginBottom: 16 }} />
        <Skeleton.Input active block style={{ marginBottom: 16 }} />
        <Skeleton.Input active block style={{ marginBottom: 16 }} />
        <Skeleton.Button active block />
      </div>
    );
  }

  if (scenario === 'error') {
    return (
      <div data-testid="login-error" style={{ padding: 24, maxWidth: 400, margin: '100px auto' }}>
        <Alert
          type="error"
          message="Service Unavailable"
          description="The authentication service is temporarily unavailable. Please try again later."
          showIcon
          action={
            <a
              data-testid="login-error-retry-link"
              onClick={() => {
                setScenario('loaded');
                setLoginError(null);
              }}
            >
              Retry
            </a>
          }
        />
      </div>
    );
  }

  return (
    <div data-testid="login-page" style={{ padding: 24, maxWidth: 400, margin: '80px auto' }}>
      <Card>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={2} style={{ marginBottom: 4 }}>
            Frontend Skill Forge
          </Title>
          <Text type="secondary">Sign in to your account</Text>
        </div>

        <div style={{ marginBottom: 16 }}>
          <Text type="secondary" style={{ fontSize: 12 }}>
            Scenario:
          </Text>
          <Select
            data-testid="login-scenario-select"
            value={scenario}
            onChange={(v) => {
              setScenario(v);
              setLoginError(null);
              form.resetFields();
            }}
            style={{ width: '100%' }}
            options={[
              { value: 'loaded', label: 'Loaded' },
              { value: 'loading', label: 'Loading' },
              { value: 'error', label: 'Error' },
            ]}
          />
        </div>

        {loginError && (
          <Alert
            data-testid="login-validation-error"
            type="warning"
            message={loginError}
            showIcon
            closable
            onClose={() => setLoginError(null)}
            style={{ marginBottom: 16 }}
          />
        )}

        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please enter your username' }]}
          >
            <Input
              data-testid="login-username"
              prefix={<UserOutlined />}
              placeholder="Username"
              autoComplete="username"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please enter your password' },
              { min: 6, message: 'Password must be at least 6 characters' },
            ]}
          >
            <Input.Password
              data-testid="login-password"
              prefix={<LockOutlined />}
              placeholder="Password"
              autoComplete="current-password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              data-testid="login-submit"
              type="primary"
              htmlType="submit"
              loading={submitting}
              block
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>

        <div
          data-testid="login-credentials-hint"
          style={{
            marginTop: 8,
            padding: 12,
            background: '#f5f5f5',
            borderRadius: 6,
          }}
        >
          <Text type="secondary" style={{ fontSize: 12 }}>
            Demo credentials:
          </Text>
          <br />
          <Text code style={{ fontSize: 12 }}>
            {VALID_CREDENTIALS.username}
          </Text>
          {' / '}
          <Text code style={{ fontSize: 12 }}>
            {VALID_CREDENTIALS.password}
          </Text>
        </div>
      </Card>
    </div>
  );
}
