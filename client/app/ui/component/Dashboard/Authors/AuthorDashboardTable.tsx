"use client";

import { authorApi } from "@/app/lib/api/author";
import { Author, CreateAuthorDto, UpdateAuthorDto } from "@/app/lib/definitions";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState, useEffect, useRef } from "react";
import AuthorCreateForm from "./AuthorCreateForm";
import AuthorEditForm from "./AuthorEditForm";
import {
  getErrorMessage,
  showSuccess,
  showError,
  confirmDeleteDialog,
  ActionsBody,
  DashboardDialog,
  TableHeader,
  AvatarCell,
} from "@/app/lib/utils/dashboard";
import { Toast } from "primereact/toast";

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
      showSuccess(toast, "Author Created", `${newAuthor.first_name} ${newAuthor.last_name}`);
    } catch (err) {
      showError(toast, getErrorMessage(err), "Create Failed");
    }
  };

  const handleSave = async (formData: UpdateAuthorDto) => {
    if (!selectedAuthor) return;
    try {
      const updated = await authorApi.update(selectedAuthor.id, formData);
      setData((prev) => prev.map((a) => (a.id === selectedAuthor.id ? { ...a, ...updated } : a)));
      setEditVisible(false);
      showSuccess(toast, "Author Updated", `${updated.first_name} ${updated.last_name}`);
    } catch (err) {
      showError(toast, getErrorMessage(err), "Update Failed");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await authorApi.remove(id);
      setData((prev) => prev.filter((a) => a.id !== id));
      showSuccess(toast, "Author Deleted", "Author removed successfully");
    } catch (err) {
      showError(toast, getErrorMessage(err), "Delete Failed");
    }
  };

  return (
    <>
      <TableHeader
        count={data.length}
        entityName="authors"
        createLabel="New Author"
        onCreate={() => setCreateVisible(true)}
      />

      <DataTable
        value={data}
        paginator
        rows={8}
        rowsPerPageOptions={[5, 8, 15]}
        stripedRows
        showGridlines
        emptyMessage="No authors found"
        className="text-sm"
      >
        <Column field="id" header="ID" style={{ width: "4rem" }} />
        <Column
          header="First Name"
          body={(rowData: Author) => <AvatarCell name={rowData.first_name} />}
        />
        <Column field="last_name" header="Last Name" />
        <Column
          header="Actions"
          body={(rowData: Author) => (
            <ActionsBody
              onEdit={() => { setSelectedAuthor(rowData); setEditVisible(true); }}
              onDelete={() => confirmDeleteDialog("author", () => handleDelete(rowData.id))}
              editTooltip="Edit author"
              deleteTooltip="Delete author"
            />
          )}
          style={{ width: "8rem" }}
          alignHeader="center"
          align="center"
        />
      </DataTable>

      <DashboardDialog
        header="Edit Author"
        visible={editVisible}
        onHide={() => setEditVisible(false)}
      >
        {selectedAuthor && <AuthorEditForm author={selectedAuthor} onSave={handleSave} />}
      </DashboardDialog>

      <DashboardDialog
        header="Create Author"
        visible={createVisible}
        onHide={() => setCreateVisible(false)}
      >
        <AuthorCreateForm onSave={handleCreate} />
      </DashboardDialog>

      <Toast ref={toast} position="bottom-right" />
    </>
  );
}