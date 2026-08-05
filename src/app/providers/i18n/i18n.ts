import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import commonEn from '@/shared/locales/en/common.json';
import dashboardEn from '@/shared/locales/en/dashboard.json';
import transactionsEn from '@/shared/locales/en/transactions.json';
import settingsEn from '@/shared/locales/en/settings.json';
import analyticsEn from '@/shared/locales/en/analytics.json';

import commonRu from '@/shared/locales/ru/common.json';
import dashboardRu from '@/shared/locales/ru/dashboard.json';
import transactionsRu from '@/shared/locales/ru/transactions.json';
import settingsRu from '@/shared/locales/ru/settings.json';
import analyticsRu from '@/shared/locales/ru/analytics.json';

const resources = {
  en: {
    common: commonEn,
    dashboard: dashboardEn,
    transactions: transactionsEn,
    settings: settingsEn,
    analytics: analyticsEn,
  },
  ru: {
    common: commonRu,
    dashboard: dashboardRu,
    transactions: transactionsRu,
    settings: settingsRu,
    analytics: analyticsRu,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    fallbackLng: 'en',
    ns: ['common', 'dashboard', 'transactions', 'settings', 'analytics'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
