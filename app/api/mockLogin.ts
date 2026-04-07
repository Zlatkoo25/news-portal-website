import type { NextApiRequest, NextApiResponse } from 'next';
import { LoginRequest, LoginResponse } from '@/app/lib/definitions';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponse>)
  {
  if (req.method === 'POST') {
    const { email, password } = req.body as LoginRequest;

    const mockUser = {
      email: 'test@example.com',
      password: '123456',
      token: 'mock-jwt-token',
    };

    if (email === mockUser.email && password === mockUser.password){
      res.status(200).json({
        success: true,
        user: {
          email: mockUser.email,
          token: mockUser.token,
        },
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }
  } 
  else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}