import { apiClient } from './client';
import { LoginRequest, LoginResponse, RefreshResponse } from '../definitions';

export const authApi = {
  login: (data: LoginRequest): Promise<LoginResponse> =>
    apiClient.post<LoginResponse>('/auth/login', data),

  refresh: (refreshToken: string): Promise<RefreshResponse> =>
    apiClient.postWithToken<RefreshResponse>('/auth/refresh', null, refreshToken),

  logout: (): Promise<void> =>
    apiClient.authPost<void>('/auth/logout', null),
};