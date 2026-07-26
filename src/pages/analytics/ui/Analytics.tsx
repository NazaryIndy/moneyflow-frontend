import type { FC } from 'react';
import { PageContainer } from '@/shared/ui';
import { AnalyticsWidget } from '@/widgets/analytics/ui/AnalyticsWidget.tsx';

const Analytics: FC = () => {
  return (
    <PageContainer title="Analytics">
      <AnalyticsWidget />
    </PageContainer>
  );
};

export { Analytics };
