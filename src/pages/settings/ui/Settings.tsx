import type { FC } from 'react';
import { ModeToggle, PageContainer } from '@/shared/ui';
import { CurrencyToggle, LocaleToggle } from '@/entities/settings';

const Settings: FC = () => {
  return (
    <PageContainer title="Settings" className="flex items-center gap-4 flex-wrap">
      <ModeToggle />
      <CurrencyToggle />
      <LocaleToggle />
    </PageContainer>
  );
};

export { Settings };
