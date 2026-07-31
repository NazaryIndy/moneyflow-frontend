import { useSettings } from '@/entities/settings';
import { type ReactNode, useEffect } from 'react';
import i18n from 'i18next';

type I18nProviderProps = {
  children: ReactNode;
};

const I18nProvider = ({ children }: I18nProviderProps) => {
  const { data: settings } = useSettings();

  useEffect(() => {
    if (settings?.locale) {
      void i18n.changeLanguage(settings.locale);
    }
  }, [settings?.locale]);

  return children;
};

export { I18nProvider };
