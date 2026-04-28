import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { RootLayout } from '#/components/layout/RootLayout';

import '../styles.css';
import { AuthContextProvider } from '#/context/AuthContext';
import { Toaster } from '#/components/ui/sonner';
import { NotFound } from './-components/NotFound';

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => <NotFound />,
});

function RootComponent() {
  return (
    <AuthContextProvider>
      <RootLayout>
        <Outlet />
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'TanStack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Toaster />
      </RootLayout>
    </AuthContextProvider>
  );
}
