import { CreateCategoryDto } from "@/app/lib/definitions";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

export default function CategoryCreateForm({ onSave }: { onSave: (data: CreateCategoryDto) => Promise<void> }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await onSave({ name });
      setName("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-fluid mt-4 flex flex-col gap-3">
      <div className="field">
        <label>Name</label>
        <InputText value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <Button label="Create Category" icon="pi pi-save" loading={loading} onClick={handleSave} />
    </div>
  );
}
