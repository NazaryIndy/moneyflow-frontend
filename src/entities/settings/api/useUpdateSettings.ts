import { useMutation, useQueryClient } from '@tanstack/react-query';
import { settingsKeys } from '@/entities/settings/api/settings.keys.ts';
import { changeSettings } from '@/entities/settings/api/settings.api.ts';

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: changeSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: settingsKeys.all,
      });
    },
  });
}
