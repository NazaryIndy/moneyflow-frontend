import type { FC } from 'react';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui';
import { useUpdateSettings } from '@/entities/settings/api/useUpdateSettings.ts';
import { useSettings } from '@/entities/settings/api/useSettings.ts';
import type { CurrencyType } from '@/shared/types';

const CurrencyToggle: FC = () => {
  const { data: settings } = useSettings();
  const { mutate: updateSettings } = useUpdateSettings();

  if (!settings) return null;

  const handleCurrencyChange = (currency: CurrencyType) => {
    updateSettings({ ...settings, currency });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="default" className="h-9 px-3">
          <span className="text-sm font-medium">{settings.currency}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleCurrencyChange('USD')}>USD ($)</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleCurrencyChange('EUR')}>EUR (€)</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleCurrencyChange('RUB')}>RUB (₽)</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { CurrencyToggle };
