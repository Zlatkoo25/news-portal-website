import { NextResponse } from "next/server";
import { LoginRequest, LoginResponse } from "@/app/lib/definitions";

export async function POST(request: Request): Promise<NextResponse<LoginResponse>> {
  const { email, password } = (await request.json()) as LoginRequest;

  const mockUser = {
    email: "user@email.com",
    password: "12345678",
    token: "mock-jwt-token",
  };

  if (email === mockUser.email && password === mockUser.password) {
    return NextResponse.json({
      success: true,
      user: {
        email: mockUser.email,
        token: mockUser.token,
      },
    });
  }

  return NextResponse.json(
    { success: false, message: "Invalid credentials" },
    { status: 401 }
  );
}