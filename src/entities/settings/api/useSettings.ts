import { useQuery } from '@tanstack/react-query';
import { settingsKeys } from '@/entities/settings/api/settings.keys.ts';
import { getSettings } from '@/entities/settings/api/settings.api.ts';

export function useSettings() {
  return useQuery({
    queryKey: settingsKeys.all,
    queryFn: getSettings,
  });
}
