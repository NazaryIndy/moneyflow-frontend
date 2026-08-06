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
import { CURRENCY } from '@/shared/constants';

const CurrencyToggle: FC = () => {
  const { data: settings } = useSettings();
  const { mutate: updateSettings } = useUpdateSettings();

  if (!settings) return null;

  const handleCurrencyChange = (currency: CurrencyType) => {
    updateSettings({ currency });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="default" className="h-9 px-3">
          <span className="text-sm font-medium">{settings.currency}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleCurrencyChange(CURRENCY.USD)}>
          USD ($)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleCurrencyChange(CURRENCY.EUR)}>
          EUR (€)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleCurrencyChange(CURRENCY.RUB)}>
          RUB (₽)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { CurrencyToggle };
