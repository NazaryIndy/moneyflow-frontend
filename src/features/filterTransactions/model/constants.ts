import { TIME_PERIOD } from '@/shared/constants';

export const PERIODS = [
  { label: 'Last 7 days', value: TIME_PERIOD.WEEK },
  { label: 'Last month', value: TIME_PERIOD.MONTH },
  { label: 'Last 3 months', value: TIME_PERIOD.THREE_MONTHS },
  { label: 'Last year', value: TIME_PERIOD.YEAR },
  { label: 'Custom', value: TIME_PERIOD.CUSTOM },
];
