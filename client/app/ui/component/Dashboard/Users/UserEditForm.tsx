import { User, UpdateUserDto } from "@/app/lib/definitions";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

export default function UserEditForm({ user, onSave }: { user: User; onSave: (data: UpdateUserDto) => Promise<void> }) {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
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
    <div className="p-fluid mt-4 flex flex-col gap-3">
      <div className="field">
        <label>Username</label>
        <InputText value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className="field">
        <label>Email</label>
        <InputText value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <Button
        label="Save Changes"
        icon="pi pi-save"
        loading={loading}
        onClick={handleSave}
      />
    </div>
  );
}