import { apiClient } from './client';
import { Category, CreateCategoryDto, UpdateCategoryDto } from '../definitions';

export const categoryApi = {
  getAll: () => apiClient.get<Category[]>('/category'),
  getOne: (id: number) => apiClient.get<Category>(`/category/${id}`),
  create: (data: CreateCategoryDto) => apiClient.post<Category>('/category', data),
  update: (id: number, data: UpdateCategoryDto) => apiClient.authPatch<Category>(`/category/${id}`, data),
  remove: (id: number) => apiClient.authDelete<void>(`/category/${id}`),
};