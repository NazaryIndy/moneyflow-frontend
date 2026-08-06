import { CURRENCY } from '@/shared/constants';

export type CurrencyType = (typeof CURRENCY)[keyof typeof CURRENCY];
