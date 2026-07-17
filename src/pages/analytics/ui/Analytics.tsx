import type { FC } from 'react';
import { PageTitle, PageContainer } from '@/shared/ui';

type AnalyticsProps = {};

const Analytics: FC<AnalyticsProps> = (props) => {
  const {} = props;

  return (
    <PageContainer>
      <PageTitle title="Analytics" />
    </PageContainer>
  );
};

export { Analytics, type AnalyticsProps };
