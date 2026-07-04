import { RoutePath } from "./routePaths";
import { ProtectedRoute } from "./protectedRoute";

// твои layout'ы (НЕ переименовываю)
import { AuthLayout } from "@/app/layouts/AuthLayout";
import { MainLayout } from "@/app/layouts/MainLayout";
import type { AppRoute } from '@/app/router/route.ts';
import { lazyImport } from '@/shared/lib/lazy/lazy.ts';

// lazy pages (НО С DEFAULT IMPORT — это НОРМАЛЬНО для lazy)
const Home = lazyImport(() => import("@/pages/home"), "Home");
const Login = lazyImport(() => import("@/pages/login"), "Login");
const Register = lazyImport(() => import("@/pages/register"), "Register");
const Dashboard = lazyImport(() => import("@/pages/dashboard"), "Dashboard");
const NotFound = lazyImport(() => import("@/pages/notFound"), "NotFound");

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
        path: RoutePath.register,
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
        ],
      },
    ],
  },

  {
    path: RoutePath.notFound,
    element: <NotFound />,
  },
];