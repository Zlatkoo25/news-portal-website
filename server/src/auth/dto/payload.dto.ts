import { Request } from 'express';

export interface JwtPayload {
  sub: number;
  username: string;
  email?: string;
}

export interface AuthenticatedRequest extends Request {
  user: {
    userId: number;
    username: string;
  };
}
