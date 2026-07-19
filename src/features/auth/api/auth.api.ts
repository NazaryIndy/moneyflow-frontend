import { api } from '@/shared/api';
import type { LoginDto, RegisterDto } from '@/shared/types';

export async function login(data: LoginDto) {
  const response = await api.post('/login', data);
  return response.data;
}

export async function register(data: RegisterDto) {
  const response = await api.post('/register', data);
  return response.data;
}

export async function logout() {
  const response = await api.post('/logout');
  return response.data;
}
