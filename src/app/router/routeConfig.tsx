import { RoutePath } from '../../shared/routePaths.tsx';
import { ProtectedRoute } from './protectedRoute';

import { AuthLayout } from '@/app/layouts/AuthLayout';
import { MainLayout } from '@/app/layouts/MainLayout';
import type { AppRoute } from '@/app/router/route.ts';
import { lazyImport } from '@/shared/lib/lazy/lazy.ts';

const Home = lazyImport(() => import('@/pages/home'), 'Home');
const Login = lazyImport(() => import('@/pages/login'), 'Login');
const Register = lazyImport(() => import('@/pages/register'), 'Register');
const Dashboard = lazyImport(() => import('@/pages/dashboard'), 'Dashboard');
const Transactions = lazyImport(() => import('@/pages/transactions'), 'Transactions');
const Categories = lazyImport(() => import('@/pages/categories'), 'Categories');
const Analytics = lazyImport(() => import('@/pages/analytics'), 'Analytics');
const Settings = lazyImport(() => import('@/pages/settings'), 'Settings');

const NotFound = lazyImport(() => import('@/pages/notFound'), 'NotFound');

export const routeConfig: AppRoute[] = [
  {
    element: <AuthLayout />,
    children: [
      {
        path: RoutePath.home,
        element: <Home />,
      },
      {
        path: RoutePath.login,
        element: <Login />,
      },
      {
        path: RoutePath.registration,
        element: <Register />,
      },
    ],
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: RoutePath.dashboard,
            element: <Dashboard />,
          },
          {
            path: RoutePath.transactions,
            element: <Transactions />,
          },
          {
            path: RoutePath.categories,
            element: <Categories />,
          },
          {
            path: RoutePath.analytics,
            element: <Analytics />,
          },
          {
            path: RoutePath.settings,
            element: <Settings />,
          },
        ],
      },
    ],
  },

  {
    path: RoutePath.notFound,
    element: <NotFound />,
  },
];
