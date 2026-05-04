import { apiClient } from './client';
import { User, CreateUserDto, UpdateUserDto } from '../definitions';

export const userApi = {
  getAll: () => apiClient.get<User[]>('/users'),
  getOne: (id: number) => apiClient.get<User>(`/users/${id}`),
  create: (data: CreateUserDto) => apiClient.post<User>('/users', data),
  update: (id: number, data: UpdateUserDto) => apiClient.authPatch<User>(`/users/${id}`, data),
  remove: (id: number) => apiClient.authDelete<void>(`/users/${id}`),
};