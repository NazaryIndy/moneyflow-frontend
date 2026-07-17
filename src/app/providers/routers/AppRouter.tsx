import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { routeConfig } from '@/app/router/routeConfig.tsx';
import type { AppRoute } from '@/app/router/route.ts';
import { ThemeProvider } from '@/app/providers/theme/ThemeProvider.tsx';

const renderRoutes = (routes: AppRoute[]) =>
  routes.map((route, index) => {
    if (route.children) {
      return (
        <Route element={route.element} key={index}>
          {renderRoutes(route.children)}
        </Route>
      );
    }

    return (
      <Route
        key={route.path ?? index}
        path={route.path}
        element={<Suspense fallback={<div>Loading...</div>}>{route.element}</Suspense>}
      />
    );
  });

export const AppRouter = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>{renderRoutes(routeConfig)}</Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};
