"use client";

import { useEffect, useState } from "react";
import ProfileEditForm from "@/app/ui/component/User/ProfileEditForm";
import { userApi } from "@/app/lib/api/userProfile";
import { User } from "@/app/lib/definitions";
import UserInfoCard from "@/app/ui/component/User/UserInforCard";
import { ProgressSpinner } from "primereact/progressspinner";
import { Message } from "primereact/message";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

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

  if (!user && !error) return (
    <div className="flex items-center justify-center h-full">
      <ProgressSpinner />
    </div>
  );

  if (error) return (
    <div className="p-4">
      <Message severity="error" text={error} className="w-full" />
    </div>
  );

  if (!user) return null;

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-2xl font-bold text-gray-800">My Profile</p>
          <p className="text-sm text-gray-500 mt-1">View and manage your account details</p>
        </div>
        <Button
          label="Reset Password"
          icon="pi pi-lock"
          severity="secondary"
          outlined
          onClick={() => router.push("/reset")}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <UserInfoCard user={user} />
        <ProfileEditForm
          initialUsername={user.username}
          initialEmail={user.email}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}