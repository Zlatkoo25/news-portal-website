"use client";

import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authApi } from "@/app/lib/api/auth";

export default function Header() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch {
      // NOTE: even if the backend call fails, clear tokens and redirect
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      router.push('/login');
    }
  };

  const leftContents = (
    <div className="flex items-center gap-3">
      <h1 className="text-xl font-semibold">Daily News</h1>
    </div>
  );

  const rightContents = (
    <div className="flex items-center gap-2">
      <Link href="/profile" passHref>
        <Button icon="pi pi-user" label="Profile" className="p-button-text" />
      </Link>
      <Button
        icon="pi pi-sign-out"
        label="Logout"
        className="p-button-danger"
        onClick={handleLogout}
      />
    </div>
  );

  return (
    <Toolbar start={leftContents} end={rightContents} className="shadow-md h-16" />
  );
}