"use client";

import { authorApi } from "@/app/lib/api/author";
import { Author, CreateAuthorDto, UpdateAuthorDto } from "@/app/lib/definitions";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { confirmDialog } from "primereact/confirmdialog";
import { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import AuthorCreateForm from "./AuthorCreateForm";
import AuthorEditForm from "./AuthorEditForm";

export default function AuthorsDashboardTable({ authors }: { authors: Author[] }) {
  const [data, setData] = useState<Author[]>(authors);
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
  const [editVisible, setEditVisible] = useState(false);
  const [createVisible, setCreateVisible] = useState(false);
  const toast = useRef<Toast>(null);

  useEffect(() => { setData(authors); }, [authors]);

  const handleCreate = async (formData: CreateAuthorDto) => {
    try {
      const newAuthor = await authorApi.create(formData);
      setData((prev) => [...prev, newAuthor]);
      setCreateVisible(false);
      toast.current?.show({ severity: "success", summary: "Author Created", detail: `${newAuthor.first_name} ${newAuthor.last_name}` });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      toast.current?.show({ severity: "error", summary: "Create Failed", detail: message });
    }
  };

  const handleSave = async (formData: UpdateAuthorDto) => {
    if (!selectedAuthor) return;
    try {
      const updated = await authorApi.update(selectedAuthor.id, formData);
      setData((prev) => prev.map((a) => (a.id === selectedAuthor.id ? { ...a, ...updated } : a)));
      setEditVisible(false);
      toast.current?.show({ severity: "success", summary: "Author Updated", detail: `${updated.first_name} ${updated.last_name}` });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      toast.current?.show({ severity: "error", summary: "Update Failed", detail: message });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await authorApi.remove(id);
      setData((prev) => prev.filter((a) => a.id !== id));
      toast.current?.show({ severity: "success", summary: "Author Deleted", detail: "Author removed successfully" });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      toast.current?.show({ severity: "error", summary: "Delete Failed", detail: message });
    }
  };

  const confirmDelete = (id: number) => {
    confirmDialog({
      message: "Are you sure you want to delete this author?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => handleDelete(id),
    });
  };

  return (
    <>
      <div className="mb-3">
        <Button label="New Author" icon="pi pi-plus" className="p-button-success" onClick={() => setCreateVisible(true)} />
      </div>

      <DataTable value={data} paginator rows={5}>
        <Column field="id" header="ID" />
        <Column field="first_name" header="First Name" />
        <Column field="last_name" header="Last Name" />
        <Column
          header="Actions"
          body={(rowData: Author) => (
            <div className="flex gap-2">
              <button onClick={() => { setSelectedAuthor(rowData); setEditVisible(true); }}>Edit</button>
              <button onClick={() => confirmDelete(rowData.id)}>Delete</button>
            </div>
          )}
        />
      </DataTable>

      <Dialog header="Edit Author" visible={editVisible} style={{ width: "40vw" }} onHide={() => setEditVisible(false)}>
        {selectedAuthor && <AuthorEditForm author={selectedAuthor} onSave={handleSave} />}
      </Dialog>

      <Dialog header="Create Author" visible={createVisible} style={{ width: "40vw" }} onHide={() => setCreateVisible(false)}>
        <AuthorCreateForm onSave={handleCreate} />
      </Dialog>

      <Toast ref={toast} />
    </>
  );
}