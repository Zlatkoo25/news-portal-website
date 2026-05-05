import { apiClient } from './client';
import { Author, CreateAuthorDto, UpdateAuthorDto } from '../definitions';

export const authorApi = {
  getAll: () => apiClient.get<Author[]>('/author'),
  getOne: (id: number) => apiClient.get<Author>(`/author/${id}`),
  create: (data: CreateAuthorDto) => apiClient.post<Author>('/author', data),
  update: (id: number, data: UpdateAuthorDto) => apiClient.authPatch<Author>(`/author/${id}`, data),
  remove: (id: number) => apiClient.authDelete<void>(`/author/${id}`),
};