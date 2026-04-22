import { NextResponse } from "next/server";
import { LoginResponse } from "@/app/lib/definitions";
import { mockUser } from "@/app/lib/mockData";

export async function PUT(request: Request): Promise<NextResponse<LoginResponse>> {
  const { email, currentPassword, newPassword, retypePassword } = (await request.json())

  const User = mockUser

  if (email !== User.email) {
    return NextResponse.json({
        success: false,
        message: "User not found"},
        {status: 404},
    );
  }

  if (currentPassword !== User.password) {
    return NextResponse.json(
        {success: false,
        message: "Current password is incorrect"},
        {status: 401},
    );
  }

  if (newPassword !== retypePassword){
    return NextResponse.json(
        {success: false,
        message: "Re-typed password does not match"},
        {status: 401},
    );
  }

  User.password = newPassword;

  return NextResponse.json({ 
    success: true,
    user: {email: User.email, token: "updated-jwt-token"},
    message: "Passowrd updated successfully",
    },
    { status: 200 },
  );
}