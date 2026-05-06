"use client";

import { CreateUserDto } from "@/app/lib/definitions";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useState } from "react";

export default function UserCreateForm({
  onSave,
}: {
  onSave: (data: CreateUserDto) => Promise<void>;
}) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await onSave({ username, email, password });
      setUsername("");
      setEmail("");
      setPassword("");
    } finally {
      setLoading(false);
    }
  };

  const isValid = username.trim() !== "" && email.trim() !== "" && password.trim() !== "";

  return (
    <div className="flex flex-col gap-4 pt-2">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Username</label>
        <InputText
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="e.g. johndoe"
          className="w-full"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Email</label>
        <InputText
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="e.g. john@example.com"
          keyfilter="email"
          className="w-full"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Password</label>
        <Password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Min. 8 characters"
          toggleMask
          feedback={false}
          className="w-full"
          pt={{ input: { className: "w-full" } }}
        />
      </div>

      <Button
        label="Create User"
        icon="pi pi-user-plus"
        loading={loading}
        disabled={!isValid}
        onClick={handleSave}
        className="w-full mt-2"
      />
    </div>
  );
}