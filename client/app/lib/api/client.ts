const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3002/api/v1';

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
  isRetry = false,
): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  // NOTE: Try to refresh and retry once
  if (res.status === 401 && !isRetry) {
    const refreshToken = typeof window !== 'undefined'
      ? localStorage.getItem('refresh_token')
      : null;

    if (refreshToken) {
      try {
        const refreshRes = await fetch(`${BASE_URL}/auth/refresh`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${refreshToken}`,
          },
        });

        if (refreshRes.ok) {
          const data = await refreshRes.json();
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('refresh_token', data.refresh_token);

          // NOTE: Retry original request with new access token
          return request<T>(endpoint, {
            ...options,
            headers: {
              ...options.headers,
              Authorization: `Bearer ${data.access_token}`,
            },
          }, true); 
        }
      } catch {
      }
    }

    // NOTE: Refresh failed or no refresh token, then clear everything and redirect
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    window.location.href = '/login';
    return undefined as T;
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message || 'Request failed');
  }

  const contentType = res.headers.get('content-type');
  if (res.status === 204 || !contentType?.includes('application/json')) {
    return undefined as T;
  }

  // TEMP: logging to check refresh token flow
  if (res.status === 401 && !isRetry) {
    console.log('401 detected, attempting refresh...');
    const refreshToken = typeof window !== 'undefined'
      ? localStorage.getItem('refresh_token')
      : null;

    console.log('Refresh token found:', !!refreshToken);

    if (refreshToken) {
      try {
        console.log('Calling /auth/refresh...');
        const refreshRes = await fetch(`${BASE_URL}/auth/refresh`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${refreshToken}`,
          },
        });

        console.log('Refresh response status:', refreshRes.status);

        if (refreshRes.ok) {
          const data = await refreshRes.json();
          console.log('Refresh successful, storing new tokens...');
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('refresh_token', data.refresh_token);
          return request<T>(endpoint, {
            ...options,
            headers: {
              ...options.headers,
              Authorization: `Bearer ${data.access_token}`,
            },
          }, true);
        }
      } catch (err) {
        console.log('Refresh failed with error:', err);
      }
    }

    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    window.location.href = '/login';
    return undefined as T;
  }
  // // //

  return res.json();
}

function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('access_token');
}

function authHeaders(token?: string): HeadersInit {
  const t = token ?? getAccessToken();
  return t ? { Authorization: `Bearer ${t}` } : {};
}

export const apiClient = {
  get: <T>(endpoint: string) =>
    request<T>(endpoint),

  post: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  patch: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
    }),

  delete: <T>(endpoint: string) =>
    request<T>(endpoint, { method: 'DELETE' }),

  authGet: <T>(endpoint: string) =>
    request<T>(endpoint, { headers: authHeaders() }),

  authPost: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: authHeaders(),
    }),

  authPatch: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: authHeaders(),
    }),

  authDelete: <T>(endpoint: string) =>
    request<T>(endpoint, {
      method: 'DELETE',
      headers: authHeaders(),
    }),

  postWithToken: <T>(endpoint: string, body: unknown, token: string) =>
    request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
      headers: authHeaders(token),
    }),
};