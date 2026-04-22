"use client";

import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

type Props = {
  initialUsername: string;
  initialEmail: string;
  onSave: (data: { username: string; email: string }) => void;
};

export default function ProfileEditForm({
  initialUsername,
  initialEmail,
  onSave,
}: Props) {
  const [username, setUsername] = useState(initialUsername);
  const [email, setEmail] = useState(initialEmail);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await onSave({ username, email });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-fluid mt-4">
      <div className="p-card p-4 shadow-2">
        <h3 className="mb-3">
          <i className="pi pi-pencil mr-2"></i>
          Update Profile
        </h3>

        <div className="field">
          <label>Username</label>
          <InputText value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>

        <div className="field mt-3">
          <label>Email</label>
          <InputText value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <Button
          label="Save Changes"
          icon="pi pi-save"
          className="mt-3"
          loading={loading}
          onClick={handleSave}
        />
      </div>
    </div>
  );
}