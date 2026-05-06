"use client";

import { userApi } from "@/app/lib/api/user";
import { User, CreateUserDto, UpdateUserDto } from "@/app/lib/definitions";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState, useEffect, useRef } from "react";
import { Toast } from "primereact/toast";
import UserCreateForm from "./UserCreateForm";
import UserEditForm from "./UserEditForm";
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

export default function UserDashboardTable({ users }: { users: User[] }) {
  const [data, setData] = useState<User[]>(users);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editVisible, setEditVisible] = useState(false);
  const [createVisible, setCreateVisible] = useState(false);
  const toast = useRef<Toast>(null);

  useEffect(() => { setData(users); }, [users]);

  const handleCreate = async (formData: CreateUserDto) => {
    try {
      const newUser = await userApi.create(formData);
      setData((prev) => [...prev, newUser]);
      setCreateVisible(false);
      showSuccess(toast, "User Created", `${newUser.username} has been added`);
    } catch (err) {
      showError(toast, getErrorMessage(err), "Create Failed");
    }
  };

  const handleSave = async (formData: UpdateUserDto) => {
    if (!selectedUser) return;
    try {
      const updated = await userApi.update(selectedUser.id, formData);
      setData((prev) =>
        prev.map((u) => (u.id === selectedUser.id ? { ...u, ...updated } : u))
      );
      setEditVisible(false);
      showSuccess(toast, "User Updated", `${updated.username} has been updated`);
    } catch (err) {
      showError(toast, getErrorMessage(err), "Update Failed");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await userApi.remove(id);
      setData((prev) => prev.filter((u) => u.id !== id));
      showSuccess(toast, "User Deleted", "User has been removed");
    } catch (err) {
      showError(toast, getErrorMessage(err), "Delete Failed");
    }
  };

  const emailBody = (rowData: User) => (
    <div className="flex items-center gap-2 text-gray-600">
      <i className="pi pi-envelope text-xs" />
      <span>{rowData.email}</span>
    </div>
  );

  return (
    <>
      <TableHeader
        count={data.length}
        entityName="users"
        createLabel="New User"
        createIcon="pi pi-user-plus"
        onCreate={() => setCreateVisible(true)}
      />

      <DataTable
        value={data}
        paginator
        rows={8}
        rowsPerPageOptions={[5, 8, 15]}
        stripedRows
        showGridlines
        emptyMessage="No users found"
        className="text-sm"
      >
        <Column field="id" header="ID" style={{ width: "4rem" }} />
        <Column
          header="Username"
          body={(rowData: User) => <AvatarCell name={rowData.username} />}
        />
        <Column header="Email" body={emailBody} />
        <Column
          header="Actions"
          body={(rowData: User) => (
            <ActionsBody
              onEdit={() => { setSelectedUser(rowData); setEditVisible(true); }}
              onDelete={() => confirmDeleteDialog("user", () => handleDelete(rowData.id))}
              editTooltip="Edit user"
              deleteTooltip="Delete user"
            />
          )}
          style={{ width: "8rem" }}
          alignHeader="center"
          align="center"
        />
      </DataTable>

      <DashboardDialog
        header="Edit User"
        visible={editVisible}
        onHide={() => setEditVisible(false)}
        width="36vw"
      >
        {selectedUser && (
          <UserEditForm user={selectedUser} onSave={handleSave} />
        )}
      </DashboardDialog>

      <DashboardDialog
        header="Create New User"
        visible={createVisible}
        onHide={() => setCreateVisible(false)}
        width="36vw"
      >
        <UserCreateForm onSave={handleCreate} />
      </DashboardDialog>

      <Toast ref={toast} position="bottom-right" />
    </>
  );
}