import type { FC } from 'react';
import { PageContainer } from '@/shared/ui';

import { DashboardWidget } from '@/widgets/dashboard/ui/DashboardWidget.tsx';

const Dashboard: FC = () => {
  return (
    <PageContainer title={'Dashboard'} className="flex justify-between gap-10 flex-wrap">
      <DashboardWidget />
    </PageContainer>
  );
};

export { Dashboard };
