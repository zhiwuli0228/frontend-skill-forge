import { RouterProvider } from 'react-router';
import { ConfigProvider } from 'antd';
import { router } from './router';
import { Providers } from './providers';

export function App() {
  return (
    <Providers>
      <ConfigProvider>
        <RouterProvider router={router} />
      </ConfigProvider>
    </Providers>
  );
}