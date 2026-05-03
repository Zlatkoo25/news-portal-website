"use client";

import { articleApi } from "@/app/lib/api/article";
import { Article, CreateArticleDto, UpdateArticleDto } from "@/app/lib/definitions";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { confirmDialog } from "primereact/confirmdialog";
import { useState, useEffect, useRef } from "react";
import ArticleEditForm from "./ArticleEditForm";
import ArticleCreateForm from "./ArticleCreateForm";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

export default function DashboardTable({ articles }: { articles: Article[] }) {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState<Article[]>(articles);
  const [createVisible, setCreateVisible] = useState(false);
  const toast = useRef<Toast>(null);

  useEffect(() => {
    setData(articles);
  }, [articles]);

  const handleCreate = async (formData: CreateArticleDto) => {
    try {
      const newArticle = await articleApi.create(formData);
      setData((prev) => [...prev, newArticle]);
      setCreateVisible(false);
      toast.current?.show({
        severity: "success",
        summary: "Article Created",
        detail: `Title: ${newArticle.title}`,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      toast.current?.show({
        severity: "error",
        summary: "Create Failed",
        detail: message,
      });
    }
  };

  const handleEdit = (article: Article) => {
    setSelectedArticle(article);
    setVisible(true);
  };

  const handleSave = async (formData: UpdateArticleDto) => {
    if (!selectedArticle) return;
    try {
      const updated = await articleApi.update(selectedArticle.id, formData);
      setData((prev) =>
        prev.map((a) => (a.id === selectedArticle.id ? { ...a, ...updated } : a))
      );
      setVisible(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      toast.current?.show({
        severity: "error",
        summary: "Update Failed",
        detail: message,
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await articleApi.delete(id);
      setData((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      toast.current?.show({
        severity: "error",
        summary: "Delete Failed",
        detail: message,
      });
    }
  };

  const confirmDelete = (id: number) => {
    confirmDialog({
      message: "Are you sure you want to delete this article?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => handleDelete(id),
    });
  };

  return (
    <>
      <div className="mb-3">
        <Button
          label="New Article"
          icon="pi pi-plus"
          className="p-button-success"
          onClick={() => setCreateVisible(true)}
        />
      </div>

      <DataTable value={data} paginator rows={5}>
        <Column field="title" header="Title" />
        <Column field="excerpt" header="Excerpt" />
        <Column
          header="Author"
          body={(rowData: Article) =>
            `${rowData.author.first_name} ${rowData.author.last_name}`
          }
        />
        <Column
          header="Categories"
          body={(rowData: Article) =>
            rowData.categories?.map((c) => c.name).join(", ") ?? "—"
          }
        />
        <Column field="created_at" header="Created At" />
        <Column
          header="Actions"
          body={(rowData: Article) => (
            <div className="flex gap-2">
              <button onClick={() => handleEdit(rowData)}>Edit</button>
              <button onClick={() => confirmDelete(rowData.id)}>Delete</button>
            </div>
          )}
        />
      </DataTable>

      <Dialog
        header="Edit Article"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        {selectedArticle && (
          <ArticleEditForm article={selectedArticle} onSave={handleSave} />
        )}
      </Dialog>

      <Dialog
        header="Create Article"
        visible={createVisible}
        style={{ width: "50vw" }}
        onHide={() => setCreateVisible(false)}
      >
        <ArticleCreateForm onSave={handleCreate} />
      </Dialog>

      <Toast ref={toast} />
    </>
  );
}