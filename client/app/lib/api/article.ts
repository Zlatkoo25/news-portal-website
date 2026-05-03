import { Article, CreateArticleDto, UpdateArticleDto } from '../definitions';
import { apiClient } from './client';

export const articleApi = {
  getAll: () => apiClient.get<Article[]>('/article'),
  getOne: (id: number) => apiClient.get<Article>(`/article/${id}`),
  create: (data: CreateArticleDto) => apiClient.authPost<Article>('/article', data),
  update: (id: number, data: UpdateArticleDto) => apiClient.authPatch<Article>(`/article/${id}`, data),
  delete: (id: number) => apiClient.authDelete<void>(`/article/${id}`),
};