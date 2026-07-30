import type { FC } from 'react';
import { useUpdateSettings } from '@/entities/settings/api/useUpdateSettings.ts';
import { useSettings } from '@/entities/settings/api/useSettings.ts';
import type { DateFormatType } from '@/shared/types';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui';

const DateFormatToggle: FC = () => {
  const { data: settings } = useSettings();
  const { mutate: updateSettings } = useUpdateSettings();

  if (!settings) return null;

  const handleDateFormatChange = (format: DateFormatType) => {
    updateSettings({ ...settings, dateFormat: format });
  };

  const getButtonLabel = (format: DateFormatType) => {
    return format === 'MM/dd/yyyy' ? 'MM/dd' : 'dd.MM';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="default" className="h-9 px-3">
          <span className="text-xs font-medium">{getButtonLabel(settings.dateFormat)}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleDateFormatChange('MM/dd/yyyy')}>
          MM/dd/yyyy
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDateFormatChange('dd.MM.yyyy')}>
          dd.MM.yyyy
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { DateFormatToggle };
