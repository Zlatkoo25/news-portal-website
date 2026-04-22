import { NextResponse } from "next/server";
import { LoginRequest, LoginResponse } from "@/app/lib/definitions";
import { mockUser } from "@/app/lib/mockData";

export async function POST(request: Request): Promise<NextResponse<LoginResponse>> {
  const { email, password } = (await request.json()) as LoginRequest;

  const User = mockUser

  if (email === User.email && password === User.password) {
    return NextResponse.json({
      success: true,
      user: {
        email: User.email,
        token: User.token,
      },
    });
  }

  return NextResponse.json(
    { success: false, message: "Invalid credentials" },
    { status: 401 }
  );
}