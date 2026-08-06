import { useTranslation } from 'react-i18next';
import { useSettings } from '@/entities/settings/api/useSettings.ts';
import { useUpdateSettings } from '@/entities/settings/api/useUpdateSettings.ts';
import type { Theme } from '@/shared/types';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui';
import { Moon, Sun } from 'lucide-react';
import { THEME } from '@/shared/constants';

export function ThemeToggle() {
  const { t } = useTranslation(['common']);

  const { data: settings } = useSettings();
  const { mutate: updateSettings } = useUpdateSettings();

  if (!settings) {
    return null;
  }

  const handleThemeChange = (theme: Theme) => {
    updateSettings({
      ...settings,
      theme,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">{t('ChangeTheme')}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleThemeChange(THEME.LIGHT)}>
          {t('Light')}
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => handleThemeChange(THEME.DARK)}>
          {t('Dark')}
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => handleThemeChange(THEME.SYSTEM)}>
          {t('System')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
