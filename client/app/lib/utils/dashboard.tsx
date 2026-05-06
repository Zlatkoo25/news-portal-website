import { confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Tag } from "primereact/tag";
import React from "react";

// ── Error extraction ─────────────────────────────────────────────
export function getErrorMessage(err: unknown): string {
  return err instanceof Error ? err.message : "Unknown error";
}

// ── Toast helpers ────────────────────────────────────────────────
export function showSuccess(toast: React.RefObject<Toast | null>, summary: string, detail: string) {
  toast.current?.show({ severity: "success", summary, detail, life: 3000 });
}

export function showError(toast: React.RefObject<Toast | null>, detail: string, summary = "Error") {
  toast.current?.show({ severity: "error", summary, detail, life: 4000 });
}

// ── Confirm delete dialog ────────────────────────────────────────
export function confirmDeleteDialog(entityName: string, onAccept: () => void) {
  confirmDialog({
    message: `This action cannot be undone. Are you sure you want to delete this ${entityName}?`,
    header: `Delete ${entityName}`,
    icon: "pi pi-exclamation-triangle",
    acceptClassName: "p-button-danger",
    accept: onAccept,
  });
}

// ── Actions column body ──────────────────────────────────────────
interface ActionBodyProps {
  onEdit: () => void;
  onDelete: () => void;
  editTooltip?: string;
  deleteTooltip?: string;
}

export function ActionsBody({
  onEdit,
  onDelete,
  editTooltip = "Edit",
  deleteTooltip = "Delete",
}: ActionBodyProps) {
  return (
    <div className="flex gap-2 justify-center">
      <Button
        icon="pi pi-pencil"
        rounded
        text
        severity="info"
        tooltip={editTooltip}
        tooltipOptions={{ position: "top" }}
        onClick={onEdit}
      />
      <Button
        icon="pi pi-trash"
        rounded
        text
        severity="danger"
        tooltip={deleteTooltip}
        tooltipOptions={{ position: "top" }}
        onClick={onDelete}
      />
    </div>
  );
}

// ── Dashboard dialog ─────────────────────────────────────────────
interface DashboardDialogProps {
  header: string;
  visible: boolean;
  onHide: () => void;
  width?: string;
  children: React.ReactNode;
}

export function DashboardDialog({
  header,
  visible,
  onHide,
  width = "40vw",
  children,
}: DashboardDialogProps) {
  return (
    <Dialog
      header={header}
      visible={visible}
      style={{ width }}
      onHide={onHide}
      draggable={false}
      resizable={false}
    >
      {children}
    </Dialog>
  );
}

// ── Table header (count tag + create button) ─────────────────────
interface TableHeaderProps {
  count: number;
  entityName: string;
  createLabel: string;
  createIcon?: string;
  onCreate: () => void;
}

export function TableHeader({
  count,
  entityName,
  createLabel,
  createIcon = "pi pi-plus",
  onCreate,
}: TableHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <Tag value={`${count} ${entityName}`} severity="secondary" />
      <Button label={createLabel} icon={createIcon} onClick={onCreate} />
    </div>
  );
}

// ── Avatar initial cell ──────────────────────────────────────────
export function AvatarCell({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-semibold text-sm">
        {name.charAt(0).toUpperCase()}
      </div>
      <span className="font-medium">{name}</span>
    </div>
  );
}