import { DATE_FORMAT, TIME_PERIOD } from '@/shared/constants';

export type DateFormatType = (typeof DATE_FORMAT)[keyof typeof DATE_FORMAT];

export type TimePeriod = (typeof TIME_PERIOD)[keyof typeof TIME_PERIOD];
