import type { FC } from 'react';

import { DashboardWidget } from '@/widgets/dashboard/ui/DashboardWidget.tsx';
import { useSettings } from '@/entities/settings';
import { DashboardError } from '@/widgets/dashboard/ui/DashboardError.tsx';
import { PageContainer } from '@/shared/ui/PageContainer/PageContainer.tsx';
import { Loader } from '@/shared/ui/Loader/Loader.tsx';

const Dashboard: FC = () => {
  const { data: settings, isLoading, isError } = useSettings();

  if (isLoading) {
    return <Loader />;
  }

  if (!settings || isError) {
    return <DashboardError />;
  }

  return (
    <PageContainer title={'Dashboard'} className="flex justify-between gap-10 flex-wrap">
      <DashboardWidget settings={settings} />
    </PageContainer>
  );
};

export { Dashboard };
