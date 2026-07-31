import type { DateFormatType, LocaleType, CurrencyType, Theme } from '@/shared/types';

export interface UserSettings {
  currency: CurrencyType;
  locale: LocaleType;
  dateFormat: DateFormatType;
  theme: Theme;
  id: string;
}

export type UpdateSettingsPayload = Partial<Omit<UserSettings, 'id'>>;
