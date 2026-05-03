"use client";

import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const leftContents = (
    <div className="flex items-center gap-3">
      <h1 className="text-xl font-semibold">Daily News</h1>
    </div>
  );

  const rightContents = (
    <div className="flex items-center gap-2">
      {/* <Button icon="pi pi-bell" className="p-button-rounded p-button-text" /> */}

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
