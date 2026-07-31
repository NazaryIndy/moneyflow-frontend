import 'i18next';
import commonEn from '../../../shared/locales/en/common.json';
import dashboardEn from '../../../shared/locales/en/dashboard.json';
import transactionsEn from '../../../shared/locales/en/transactions.json';
import settingsEn from '../../../shared/locales/en/settings.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof commonEn;
      dashboard: typeof dashboardEn;
      transactions: typeof transactionsEn;
      settings: typeof settingsEn;
    };
  }
}
