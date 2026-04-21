"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "primereact/card";
import { fetchProfile, updateProfile } from "../lib/api/userProfile";
import ProfileForm from "../ui/component/User/ProfileForm";
import { User } from "../lib/definitions";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User|null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    fetchProfile(token)
      .then((data) => setUser(data))
      .catch(() => router.push("/login"))
      .finally(() => setLoading(false));
  }, [router]);

  const handleSave = async (name: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const updated = await updateProfile(token, { name });
    setUser(updated);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Card title="My Profile" className="p-shadow-3 p-m-3">
      <p>Email: {user?.email}</p>
      <ProfileForm initialName={user?.username || ""} onSave={handleSave} />
    </Card>
  );
}
