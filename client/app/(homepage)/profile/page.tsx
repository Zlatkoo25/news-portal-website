"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProfileEditForm from "@/app/ui/component/User/ProfileEditForm";
import { fetchProfile, updateProfile } from "@/app/lib/api/userProfile";
import { User } from "@/app/lib/definitions";
import UserInfoCard from "@/app/ui/component/User/UserInforCard";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    fetchProfile(token)
      .then(setUser)
      .catch(() => router.push("/login"));
  }, [router]);

  const handleSave = async (data: { username: string; email: string }) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const updated = await updateProfile(token, data);
    setUser(updated);
  };

  if (!user) return <p className="p-4">Loading...</p>;

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