"use client";

import { categoryApi } from "@/app/lib/api/category";
import { Category, CreateCategoryDto, UpdateCategoryDto } from "@/app/lib/definitions";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { confirmDialog } from "primereact/confirmdialog";
import { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import CategoryEditForm from "./CategoriesEditForm";
import CategoryCreateForm from "./CategoryCreateForm";

export default function CategoriesDashboardTable({ categories }: { categories: Category[] }) {
  const [data, setData] = useState<Category[]>(categories);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [editVisible, setEditVisible] = useState(false);
  const [createVisible, setCreateVisible] = useState(false);
  const toast = useRef<Toast>(null);

  useEffect(() => { setData(categories); }, [categories]);

  const handleCreate = async (formData: CreateCategoryDto) => {
    try {
      const newCategory = await categoryApi.create(formData);
      setData((prev) => [...prev, newCategory]);
      setCreateVisible(false);
      toast.current?.show({ severity: "success", summary: "Category Created", detail: newCategory.name });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      toast.current?.show({ severity: "error", summary: "Create Failed", detail: message });
    }
  };

  const handleSave = async (formData: UpdateCategoryDto) => {
    if (!selectedCategory) return;
    try {
      const updated = await categoryApi.update(selectedCategory.id, formData);
      setData((prev) => prev.map((c) => (c.id === selectedCategory.id ? { ...c, ...updated } : c)));
      setEditVisible(false);
      toast.current?.show({ severity: "success", summary: "Category Updated", detail: updated.name });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      toast.current?.show({ severity: "error", summary: "Update Failed", detail: message });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await categoryApi.remove(id);
      setData((prev) => prev.filter((c) => c.id !== id));
      toast.current?.show({ severity: "success", summary: "Category Deleted", detail: "Category removed successfully" });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      toast.current?.show({ severity: "error", summary: "Delete Failed", detail: message });
    }
  };

  const confirmDelete = (id: number) => {
    confirmDialog({
      message: "Are you sure you want to delete this category?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => handleDelete(id),
    });
  };

  return (
    <>
      <div className="mb-3">
        <Button label="New Category" icon="pi pi-plus" className="p-button-success" onClick={() => setCreateVisible(true)} />
      </div>

      <DataTable value={data} paginator rows={5}>
        <Column field="id" header="ID" />
        <Column field="name" header="Name" />
        <Column
          header="Actions"
          body={(rowData: Category) => (
            <div className="flex gap-2">
              <button onClick={() => { setSelectedCategory(rowData); setEditVisible(true); }}>Edit</button>
              <button onClick={() => confirmDelete(rowData.id)}>Delete</button>
            </div>
          )}
        />
      </DataTable>

      <Dialog header="Edit Category" visible={editVisible} style={{ width: "40vw" }} onHide={() => setEditVisible(false)}>
        {selectedCategory && <CategoryEditForm category={selectedCategory} onSave={handleSave} />}
      </Dialog>

      <Dialog header="Create Category" visible={createVisible} style={{ width: "40vw" }} onHide={() => setCreateVisible(false)}>
        <CategoryCreateForm onSave={handleCreate} />
      </Dialog>

      <Toast ref={toast} />
    </>
  );
}