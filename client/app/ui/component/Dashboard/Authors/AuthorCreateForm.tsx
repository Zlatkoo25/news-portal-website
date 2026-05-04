import { CreateAuthorDto } from "@/app/lib/definitions";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

export default function AuthorCreateForm({ onSave }: { onSave: (data: CreateAuthorDto) => Promise<void> }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await onSave({ first_name: firstName, last_name: lastName });
      setFirstName("");
      setLastName("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-fluid mt-4 flex flex-col gap-3">
      <div className="field">
        <label>First Name</label>
        <InputText value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </div>
      <div className="field">
        <label>Last Name</label>
        <InputText value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </div>
      <Button label="Create Author" icon="pi pi-save" loading={loading} onClick={handleSave} />
    </div>
  );
}
