import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import { routeConfig } from '@/app/router/routeConfig.tsx';
import type { AppRoute } from '@/app/router/route.ts';
import { useSettings } from '@/entities/settings';
import i18n from 'i18next';
import { Spinner } from '@/shared/ui/shadcn/spinner.tsx';

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
        element={
          <Suspense
            fallback={
              <div className="flex justify-center mt-30">
                <Spinner className="size-8" />
              </div>
            }
          >
            {route.element}
          </Suspense>
        }
      />
    );
  });

export const AppRouter = () => {
  const { data: settings } = useSettings();

  useEffect(() => {
    if (settings?.locale) {
      console.log('settings?.locale', settings?.locale);
      i18n.changeLanguage(settings.locale);
    }
  }, [settings?.locale]);

  return (
    <BrowserRouter>
      <Routes>{renderRoutes(routeConfig)}</Routes>
    </BrowserRouter>
  );
};
