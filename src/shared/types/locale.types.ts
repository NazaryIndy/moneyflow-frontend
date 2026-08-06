import { LOCALE } from '@/shared/constants';

export type LocaleType = (typeof LOCALE)[keyof typeof LOCALE];
