'use client'

import { ConfirmDialog } from "primereact/confirmdialog";
import { useState, useEffect } from "react";
import { userApi } from "@/app/lib/api/user";
import { User } from "@/app/lib/definitions";
import UsersDashboardTable from "@/app/ui/component/Dashboard/Users/UserDashboardTable";
import { useRouter } from "next/navigation";

export default function UsersDashboardPage() {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      router.replace("/");
    }
  }, [router]);

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    userApi
      .getAll()
      .then(setUsers)
      .catch((err) => setError((err as Error).message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div>
      <ConfirmDialog />
      <UsersDashboardTable users={users} />
    </div>
  );
}