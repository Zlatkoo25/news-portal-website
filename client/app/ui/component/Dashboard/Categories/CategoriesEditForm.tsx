import { Category, UpdateCategoryDto } from "@/app/lib/definitions";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

export default function CategoryEditForm({ category, onSave }: { category: Category; onSave: (data: UpdateCategoryDto) => Promise<void> }) {
  const [name, setName] = useState(category.name);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await onSave({ name });
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
      <Button label="Save Changes" icon="pi pi-save" loading={loading} onClick={handleSave} />
    </div>
  );
}

