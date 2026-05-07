'use client';

import LoginForm from "@/app/ui/component/Authentication/LoginForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      router.replace("/");
    }
  }, [router]);

  return (
    <div className="items-center">
      <LoginForm/>
    </div>
  );
}