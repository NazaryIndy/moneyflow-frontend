import type { TranslationFunction } from '@/shared/types/translation.type.ts';
import type { TFunction } from 'i18next';

export const createAnalyticsTranslation = (t: TFunction<'analytics'>): TranslationFunction => {
  return (key, options) => {
    return String(
      (t as unknown as (key: string, options?: Record<string, unknown>) => string)(key, options),
    );
  };
};
