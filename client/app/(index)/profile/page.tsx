"use client";

import { useEffect, useState } from "react";
import ProfileEditForm from "@/app/ui/component/User/ProfileEditForm";
import { userApi } from "@/app/lib/api/userProfile";
import { User } from "@/app/lib/definitions";
import UserInfoCard from "@/app/ui/component/User/UserInforCard";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    userApi
      .fetchProfile()
      .then(setUser)
      .catch((err) => setError((err as Error).message));
  }, []);

  const handleSave = async (data: { username: string; email: string }) => {
    try {
      const updated = await userApi.updateProfile(data);
      setUser(updated);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  if (!user && !error) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!user) return null;

  return (
    <div className="flex flex-column gap-4 p-4">
      <UserInfoCard user={user} />
      <ProfileEditForm
        initialUsername={user.username}
        initialEmail={user.email}
        onSave={handleSave}
      />
    </div>
  );
}