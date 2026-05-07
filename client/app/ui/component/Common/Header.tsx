"use client";

import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authApi } from "@/app/lib/api/auth";
import { useEffect, useState } from "react";

export default function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("access_token"));
  }, []);

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch {
      // NOTE: even if the backend call fails, clear tokens and redirect
    } finally {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      router.push("/login");
    }
  };

  const leftContents = (
    <div className="flex align-items-center gap-2">
      <h1 className="text-4xl font-bold ">Daily News</h1>
    </div>
  );

  const rightContents = (
    <div className="flex align-items-center gap-2">
      {isLoggedIn ? (
        <>
          <Link href="/profile" passHref>
            <Button icon="pi pi-user" label="Profile" className="p-button-text" />
          </Link>
          <Button
            icon="pi pi-sign-out"
            label="Logout"
            severity="danger"
            onClick={handleLogout}
          />
        </>
      ) : (
        <Link href="/login" passHref>
          <Button icon="pi pi-sign-in" label="Login" severity="info"
          color="blue" />
        </Link>
      )}
    </div>
  );

  return (
    <Toolbar start={leftContents} end={rightContents} className="shadow-md h-16" />
  );
}