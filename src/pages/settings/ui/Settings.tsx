import type { FC } from 'react';
import { PageTitle, PageContainer } from '@/shared/ui';

type SettingsProps = {};

const Settings: FC<SettingsProps> = (props) => {
  const {} = props;

  return (
    <PageContainer>
      <PageTitle title="Settings" />
    </PageContainer>
  );
};

export { Settings };
