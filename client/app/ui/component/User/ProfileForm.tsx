"use client";

import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { ProfileFormProps } from "@/app/lib/definitions";

export default function ProfileForm({ initialName, onSave }: ProfileFormProps) {
  const [name, setName] = useState(initialName);

  return (
    <div className="p-fluid">
      <div className="field">
        <label htmlFor="name">Name</label>
        <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <Button
        icon="pi pi-save"
        label="Save"
        className="p-button-success mt-2"
        onClick={() => onSave(name)}
      />
    </div>
  );
}
