import type { FC } from 'react';
import {
  CurrencyToggle,
  DateFormatToggle,
  LocaleToggle,
  SettingsSection,
  ThemeToggle,
} from '@/entities/settings';
import { useTranslation } from 'react-i18next';
import { PageContainer } from '@/shared/ui/PageContainer/PageContainer.tsx';

const Settings: FC = () => {
  const { t } = useTranslation(['settings', 'common']);

  return (
    <PageContainer title={t('common:Settings')} className="flex items-center gap-4 flex-wrap">
      <div className="space-y-6">
        <SettingsSection title={t('Appearance')} description={t('Switch')}>
          <ThemeToggle />
        </SettingsSection>

        <SettingsSection title={t('Localization')} description={t('Preference')}>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{t('Currency')}:</span>
              <CurrencyToggle />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{t('Language')}:</span>
              <LocaleToggle />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{t('DateFormat')}:</span>
              <DateFormatToggle />
            </div>
          </div>
        </SettingsSection>
      </div>
    </PageContainer>
  );
};

export { Settings };
