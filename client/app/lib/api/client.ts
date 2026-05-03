const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3002/api/v1';

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message || 'Request failed');
  }

  // Handle empty responses — 204 or no content-type
  const contentType = res.headers.get('content-type');
  if (res.status === 204 || !contentType?.includes('application/json')) {
    return undefined as T;
  }

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
  // ── Unauthenticated ──────────────────────────────────────────
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

  // ── Authenticated (uses access token from localStorage) ──────
  authGet: <T>(endpoint: string) =>
    request<T>(endpoint, {
      headers: authHeaders(),
    }),

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

  // ── Token-explicit (used for /auth/refresh) ──────────────────
  postWithToken: <T>(endpoint: string, body: unknown, token: string) =>
    request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
      headers: authHeaders(token),
    }),
};