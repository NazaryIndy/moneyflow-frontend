import { api } from '@/shared/api';
import type { UserSettings } from '@/entities/settings/model/settings.types.ts';

export async function getSettings(): Promise<UserSettings> {
  const response = await api.get('/settings');

  return response.data;
}

export async function changeSettings(data: UserSettings) {
  const response = await api.patch(`/settings/${data.id}`, data);

  return response.data;
}
