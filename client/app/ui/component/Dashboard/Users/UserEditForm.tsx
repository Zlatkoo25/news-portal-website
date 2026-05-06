"use client";

import { User, UpdateUserDto } from "@/app/lib/definitions";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Divider } from "primereact/divider";
import { useState } from "react";

export default function UserEditForm({
  user,
  onSave,
}: {
  user: User;
  onSave: (data: UpdateUserDto) => Promise<void>;
}) {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [loading, setLoading] = useState(false);

  const isDirty = username !== user.username || email !== user.email;

  const handleSave = async () => {
    setLoading(true);
    try {
      await onSave({ username, email });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 pt-2">
      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
          {user.username.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-semibold text-gray-800">{user.username}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      <Divider />

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Username</label>
        <InputText
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Email</label>
        <InputText
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          keyfilter="email"
          className="w-full"
        />
      </div>

      <Button
        label="Save Changes"
        icon="pi pi-check"
        loading={loading}
        disabled={!isDirty}
        onClick={handleSave}
        className="w-full mt-2"
      />
    </div>
  );
}