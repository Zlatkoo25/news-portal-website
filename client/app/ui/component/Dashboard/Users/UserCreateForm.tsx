import { CreateUserDto } from "@/app/lib/definitions";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

export default function UserCreateForm({ onSave }: { onSave: (data: CreateUserDto) => Promise<void> }) {
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
      <div className="field">
        <label>Password</label>
        <InputText value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <Button
        label="Create User"
        icon="pi pi-save"
        loading={loading}
        onClick={handleSave}
      />
    </div>
  );
}