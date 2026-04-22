"use client";

import { Card } from "primereact/card";
import { Tag } from "primereact/tag";
import { User } from "@/app/lib/definitions";

export default function UserInfoCard({ user }: { user: User }) {
  const header = (
    <div className="flex align-items-center gap-2">
      <i className="pi pi-user text-xl"></i>
      <span className="font-bold">Profile Overview</span>
    </div>
  );

  return (
    <Card header={header} className="shadow-2">
      <div className="flex flex-column gap-3 text-sm">
        <div className="flex align-items-center gap-2">
          <i className="pi pi-id-card text-blue-500"></i>
          <strong>ID:</strong> <span>{user.id}</span>
        </div>

        <div className="flex align-items-center gap-2">
          <i className="pi pi-user text-green-500"></i>
          <strong>Username:</strong> <span>{user.username}</span>
        </div>

        <div className="flex align-items-center gap-2">
          <i className="pi pi-envelope text-orange-500"></i>
          <strong>Email:</strong> <span>{user.email}</span>
        </div>

        <Tag value="Active User" severity="success" icon="pi pi-check" />
      </div>
    </Card>
  );
}