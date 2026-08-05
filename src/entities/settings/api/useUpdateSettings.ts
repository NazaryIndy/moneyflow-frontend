import { useMutation, useQueryClient } from '@tanstack/react-query';
import { settingsKeys } from '@/entities/settings/api/settings.keys.ts';
import { changeSettings } from '@/entities/settings/api/settings.api.ts';
import type { UpdateSettingsPayload } from '@/entities/settings/model/settings.types.ts';
import { useSettings } from '@/entities/settings/api/useSettings.ts';

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  const { data: settings } = useSettings();

  return useMutation({
    mutationFn: (data: UpdateSettingsPayload) => {
      if (!settings) {
        throw new Error('Settings are not loaded');
      }

      return changeSettings(settings.id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: settingsKeys.all,
      });
    },
  });
}
