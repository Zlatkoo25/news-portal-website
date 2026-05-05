import { apiClient } from './client';
import { User, UpdateProfileDto } from '../definitions';

export const userApi = {
  fetchProfile: () => apiClient.authGet<User>('/users/profile'),
  updateProfile: (data: UpdateProfileDto) => apiClient.authPatch<User>('/users/profile', data),
};