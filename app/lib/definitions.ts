// NOTE: For defining and exporting types and interfaces

export type Default = {
    field: string;
};

// Login API interfaces

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  user?: {
    email: string;
    token: string;
  };
  message?: string;
}