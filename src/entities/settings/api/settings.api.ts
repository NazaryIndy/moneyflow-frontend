import { api } from '@/shared/api';
import type {
  UpdateSettingsPayload,
  UserSettings,
} from '@/entities/settings/model/settings.types.ts';

export async function getSettings(): Promise<UserSettings> {
  const response = await api.get('/settings');

  return response.data;
}

export async function changeSettings(id: UserSettings['id'], data: UpdateSettingsPayload) {
  const response = await api.patch(`/settings/${id}`, data);

  return response.data;
}
