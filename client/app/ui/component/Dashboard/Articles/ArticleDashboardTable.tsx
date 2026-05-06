"use client";

import { articleApi } from "@/app/lib/api/article";
import { Article, CreateArticleDto, UpdateArticleDto } from "@/app/lib/definitions";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState, useEffect, useRef } from "react";
import { Toast } from "primereact/toast";
import ArticleEditForm from "./ArticleEditForm";
import ArticleCreateForm from "./ArticleCreateForm";
import {
  getErrorMessage,
  showSuccess,
  showError,
  confirmDeleteDialog,
  ActionsBody,
  DashboardDialog,
  TableHeader,
} from "@/app/lib/utils/dashboard";

export default function ArticlesDashboardTable({ articles }: { articles: Article[] }) {
  const [data, setData] = useState<Article[]>(articles);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [editVisible, setEditVisible] = useState(false);
  const [createVisible, setCreateVisible] = useState(false);
  const toast = useRef<Toast>(null);

  useEffect(() => { setData(articles); }, [articles]);

  const handleCreate = async (formData: CreateArticleDto) => {
    try {
      const newArticle = await articleApi.create(formData);
      setData((prev) => [...prev, newArticle]);
      setCreateVisible(false);
      showSuccess(toast, "Article Created", newArticle.title);
    } catch (err) {
      showError(toast, getErrorMessage(err), "Create Failed");
    }
  };

  const handleSave = async (formData: UpdateArticleDto) => {
    if (!selectedArticle) return;
    try {
      const updated = await articleApi.update(selectedArticle.id, formData);
      setData((prev) =>
        prev.map((a) => (a.id === selectedArticle.id ? { ...a, ...updated } : a))
      );
      setEditVisible(false);
      showSuccess(toast, "Article Updated", updated.title);
    } catch (err) {
      showError(toast, getErrorMessage(err), "Update Failed");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await articleApi.delete(id);
      setData((prev) => prev.filter((a) => a.id !== id));
      showSuccess(toast, "Article Deleted", "Article removed successfully");
    } catch (err) {
      showError(toast, getErrorMessage(err), "Delete Failed");
    }
  };

  const authorBody = (rowData: Article) => (
    <span>{rowData.author ? `${rowData.author.first_name} ${rowData.author.last_name}` : "—"}</span>
  );

  const categoriesBody = (rowData: Article) => (
    <span>{rowData.categories?.map((c) => c.name).join(", ") ?? "—"}</span>
  );

  const dateBody = (rowData: Article) => (
    <span className="text-gray-500 text-sm">
      {new Date(rowData.created_at).toLocaleDateString()}
    </span>
  );

  return (
    <>
      <TableHeader
        count={data.length}
        entityName="articles"
        createLabel="New Article"
        onCreate={() => setCreateVisible(true)}
      />

      <DataTable
        value={data}
        paginator
        rows={8}
        rowsPerPageOptions={[5, 8, 15]}
        stripedRows
        showGridlines
        emptyMessage="No articles found"
        className="text-sm"
      >
        <Column field="id" header="ID" style={{ width: "4rem" }} />
        <Column field="title" header="Title" />
        <Column field="excerpt" header="Excerpt" />
        <Column header="Author" body={authorBody} />
        <Column header="Categories" body={categoriesBody} />
        <Column header="Created At" body={dateBody} />
        <Column
          header="Actions"
          body={(rowData: Article) => (
            <ActionsBody
              onEdit={() => { setSelectedArticle(rowData); setEditVisible(true); }}
              onDelete={() => confirmDeleteDialog("article", () => handleDelete(rowData.id))}
              editTooltip="Edit article"
              deleteTooltip="Delete article"
            />
          )}
          style={{ width: "8rem" }}
          alignHeader="center"
          align="center"
        />
      </DataTable>

      <DashboardDialog
        header="Edit Article"
        visible={editVisible}
        onHide={() => setEditVisible(false)}
        width="50vw"
      >
        {selectedArticle && (
          <ArticleEditForm article={selectedArticle} onSave={handleSave} />
        )}
      </DashboardDialog>

      <DashboardDialog
        header="Create Article"
        visible={createVisible}
        onHide={() => setCreateVisible(false)}
        width="50vw"
      >
        <ArticleCreateForm onSave={handleCreate} />
      </DashboardDialog>

      <Toast ref={toast} position="bottom-right" />
    </>
  );
}