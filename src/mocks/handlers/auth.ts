import { http, HttpResponse } from 'msw';
import type { User } from '@/entities/user';
import type { LoginDto } from '@/features/auth/model/auth.types.ts';

export const authHandlers = [
  http.post('api/login', async ({ request }) => {
    const user = (await request.json()) as LoginDto;

    return HttpResponse.json(
      {
        token: 'secret_token',
        user: {
          id: 1,
          name: 'Galya',
          email: user.email,
        },
      },
      { status: 201 },
    );
  }),

  http.post('api/logout', () => {
    return HttpResponse.json(
      {
        success: true,
      },
      {
        status: 200,
      },
    );
  }),

  http.post('api/register', async ({ request }) => {
    const user = (await request.json()) as User;

    return HttpResponse.json(
      {
        token: 'secret_token_2',
        user: {
          id: 1,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 },
    );
  }),
];
