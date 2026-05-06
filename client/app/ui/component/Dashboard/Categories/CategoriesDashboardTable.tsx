"use client";

import { categoryApi } from "@/app/lib/api/category";
import { Category, CreateCategoryDto, UpdateCategoryDto } from "@/app/lib/definitions";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState, useEffect, useRef } from "react";
import { Toast } from "primereact/toast";
import CategoryCreateForm from "./CategoryCreateForm";
import CategoryEditForm from "./CategoriesEditForm";
import {
  getErrorMessage,
  showSuccess,
  showError,
  confirmDeleteDialog,
  ActionsBody,
  DashboardDialog,
  TableHeader,
} from "@/app/lib/utils/dashboard";

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
      showSuccess(toast, "Category Created", newCategory.name);
    } catch (err) {
      showError(toast, getErrorMessage(err), "Create Failed");
    }
  };

  const handleSave = async (formData: UpdateCategoryDto) => {
    if (!selectedCategory) return;
    try {
      const updated = await categoryApi.update(selectedCategory.id, formData);
      setData((prev) => prev.map((c) => (c.id === selectedCategory.id ? { ...c, ...updated } : c)));
      setEditVisible(false);
      showSuccess(toast, "Category Updated", updated.name);
    } catch (err) {
      showError(toast, getErrorMessage(err), "Update Failed");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await categoryApi.remove(id);
      setData((prev) => prev.filter((c) => c.id !== id));
      showSuccess(toast, "Category Deleted", "Category removed successfully");
    } catch (err) {
      showError(toast, getErrorMessage(err), "Delete Failed");
    }
  };

  return (
    <>
      <TableHeader
        count={data.length}
        entityName="categories"
        createLabel="New Category"
        onCreate={() => setCreateVisible(true)}
      />

      <DataTable
        value={data}
        paginator
        rows={8}
        rowsPerPageOptions={[5, 8, 15]}
        stripedRows
        showGridlines
        emptyMessage="No categories found"
        className="text-sm"
      >
        <Column field="id" header="ID" style={{ width: "4rem" }} />
        <Column field="name" header="Name" />
        <Column
          header="Actions"
          body={(rowData: Category) => (
            <ActionsBody
              onEdit={() => { setSelectedCategory(rowData); setEditVisible(true); }}
              onDelete={() => confirmDeleteDialog("category", () => handleDelete(rowData.id))}
              editTooltip="Edit category"
              deleteTooltip="Delete category"
            />
          )}
          style={{ width: "8rem" }}
          alignHeader="center"
          align="center"
        />
      </DataTable>

      <DashboardDialog
        header="Edit Category"
        visible={editVisible}
        onHide={() => setEditVisible(false)}
      >
        {selectedCategory && <CategoryEditForm category={selectedCategory} onSave={handleSave} />}
      </DashboardDialog>

      <DashboardDialog
        header="Create Category"
        visible={createVisible}
        onHide={() => setCreateVisible(false)}
      >
        <CategoryCreateForm onSave={handleCreate} />
      </DashboardDialog>

      <Toast ref={toast} position="bottom-right" />
    </>
  );
}