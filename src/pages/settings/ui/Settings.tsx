import type { FC } from 'react';
import { ModeToggle, PageContainer } from '@/shared/ui';
import {
  CurrencyToggle,
  DateFormatToggle,
  LocaleToggle,
  SettingsSection,
} from '@/entities/settings';

const Settings: FC = () => {
  return (
    <PageContainer title="Settings" className="flex items-center gap-4 flex-wrap">
      <div className="space-y-6">
        <SettingsSection
          title="Appearance"
          description="Switch between light, dark, or system theme."
        >
          <ModeToggle />
        </SettingsSection>

        <SettingsSection
          title="Localization"
          description="Choose your preferred currency, language, and date format."
        >
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground w-20">Currency</span>
              <CurrencyToggle />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground w-20">Language</span>
              <LocaleToggle />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground w-20">Date Format</span>
              <DateFormatToggle />
            </div>
          </div>
        </SettingsSection>
      </div>
    </PageContainer>
  );
};

export { Settings };
