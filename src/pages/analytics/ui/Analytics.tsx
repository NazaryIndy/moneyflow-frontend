import type { FC } from 'react';
import { AnalyticsWidget } from '@/widgets/analytics/ui/AnalyticsWidget.tsx';
import { useSettings } from '@/entities/settings';
import { AnalyticsError } from '@/widgets/analytics/ui/AnalyticsError.tsx';
import { PageContainer } from '@/shared/ui/PageContainer/PageContainer.tsx';
import { Loader } from '@/shared/ui/Loader/Loader.tsx';

const Analytics: FC = () => {
  const { data: settings, isLoading, isError } = useSettings();

  if (isLoading) {
    return <Loader />;
  }

  if (!settings || isError) {
    return <AnalyticsError />;
  }

  return (
    <PageContainer title="Analytics">
      <AnalyticsWidget settings={settings} />
    </PageContainer>
  );
};

export { Analytics };
