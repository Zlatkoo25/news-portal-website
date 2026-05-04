"use client";

import { userApi } from "@/app/lib/api/user";
import { User, CreateUserDto, UpdateUserDto } from "@/app/lib/definitions";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { confirmDialog } from "primereact/confirmdialog";
import { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import UserCreateForm from "./UserCreateForm";
import UserEditForm from "./UserEditForm";

export default function UserDashboardTable({ users }: { users: User[] }) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editVisible, setEditVisible] = useState(false);
  const [createVisible, setCreateVisible] = useState(false);
  const [data, setData] = useState<User[]>(users);
  const toast = useRef<Toast>(null);

  useEffect(() => {
    setData(users);
  }, [users]);

  const handleCreate = async (formData: CreateUserDto) => {
    try {
      const newUser = await userApi.create(formData);
      setData((prev) => [...prev, newUser]);
      setCreateVisible(false);
      toast.current?.show({
        severity: "success",
        summary: "User Created",
        detail: `${newUser.username} created successfully`,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      toast.current?.show({ severity: "error", summary: "Create Failed", detail: message });
    }
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setEditVisible(true);
  };

  const handleSave = async (formData: UpdateUserDto) => {
    if (!selectedUser) return;
    try {
      const updated = await userApi.update(selectedUser.id, formData);
      setData((prev) =>
        prev.map((u) => (u.id === selectedUser.id ? { ...u, ...updated } : u))
      );
      setEditVisible(false);
      toast.current?.show({
        severity: "success",
        summary: "User Updated",
        detail: `${updated.username} updated successfully`,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      toast.current?.show({ severity: "error", summary: "Update Failed", detail: message });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await userApi.remove(id);
      setData((prev) => prev.filter((u) => u.id !== id));
      toast.current?.show({
        severity: "success",
        summary: "User Deleted",
        detail: "User removed successfully",
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      toast.current?.show({ severity: "error", summary: "Delete Failed", detail: message });
    }
  };

  const confirmDelete = (id: number) => {
    confirmDialog({
      message: "Are you sure you want to delete this user?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => handleDelete(id),
    });
  };

  return (
    <>
      <div className="mb-3">
        <Button
          label="New User"
          icon="pi pi-plus"
          className="p-button-success"
          onClick={() => setCreateVisible(true)}
        />
      </div>

      <DataTable value={data} paginator rows={5}>
        <Column field="id" header="ID" />
        <Column field="username" header="Username" />
        <Column field="email" header="Email" />
        <Column
          header="Actions"
          body={(rowData: User) => (
            <div className="flex gap-2">
              <button onClick={() => handleEdit(rowData)}>Edit</button>
              <button onClick={() => confirmDelete(rowData.id)}>Delete</button>
            </div>
          )}
        />
      </DataTable>

      <Dialog
        header="Edit User"
        visible={editVisible}
        style={{ width: "40vw" }}
        onHide={() => setEditVisible(false)}
      >
        {selectedUser && (
          <UserEditForm user={selectedUser} onSave={handleSave} />
        )}
      </Dialog>

      <Dialog
        header="Create User"
        visible={createVisible}
        style={{ width: "40vw" }}
        onHide={() => setCreateVisible(false)}
      >
        <UserCreateForm onSave={handleCreate} />
      </Dialog>

      <Toast ref={toast} />
    </>
  );
}