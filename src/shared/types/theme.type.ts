import { THEME } from '@/shared/constants';

export type Theme = (typeof THEME)[keyof typeof THEME];
