import { http, HttpResponse } from 'msw';

import { settings } from '@/shared/mock/settings.ts';

export const settingsHandlers = [
  http.get('api/settings', () => {
    return HttpResponse.json(settings);
  }),

  http.patch('api/settings/:id', async ({ request, params }) => {
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    if (!id || typeof id !== 'string') {
      return HttpResponse.json({ error: 'Invalid settings id' }, { status: 400 });
    }
    if (settings.id !== id) {
      return HttpResponse.json({ error: 'Settings not found' }, { status: 404 });
    }

    const data = (await request.json()) as Partial<typeof settings>;
    const allowedKeys: (keyof typeof settings)[] = ['currency', 'locale', 'dateFormat', 'theme'];

    for (const key of allowedKeys) {
      if (key in data && data[key] !== undefined) {
        settings[key] = data[key] as (typeof settings)[typeof key];
      }
    }

    return HttpResponse.json(settings, { status: 200 });
  }),
];
