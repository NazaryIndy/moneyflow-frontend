import type { FC } from 'react';
import { useUpdateSettings } from '@/entities/settings/api/useUpdateSettings.ts';
import { useSettings } from '@/entities/settings/api/useSettings.ts';
import type { LocaleType } from '@/shared/types';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui';

const LocaleToggle: FC = () => {
  const { data: settings } = useSettings();
  const { mutate: updateSettings } = useUpdateSettings();

  if (!settings) return null;

  const handleLocaleChange = (locale: LocaleType) => {
    updateSettings({ ...settings, locale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {settings.locale === 'en' ? 'EN' : 'RU'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleLocaleChange('en')}>English</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLocaleChange('ru')}>Русский</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { LocaleToggle };
