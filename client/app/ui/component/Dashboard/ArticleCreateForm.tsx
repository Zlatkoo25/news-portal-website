"use client";

import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { FileUpload } from "primereact/fileupload";
import { CreateArticleDto } from "@/app/lib/definitions";

type Props = {
  onSave: (data: CreateArticleDto) => Promise<void>;
};

export default function ArticleCreateForm({ onSave }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [authorId, setAuthorId] = useState<number | null>(null);
  const [categories, setCategories] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await onSave({
        title,
        content,
        excerpt,
        author_id: authorId ?? 0,
        categories: categories
          ? categories.split(",").map((id) => parseInt(id.trim()))
          : undefined,
      });
      setTitle("");
      setContent("");
      setExcerpt("");
      setAuthorId(null);
      setCategories("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-fluid mt-4">
      <div className="p-card p-4 shadow-2">
        <h3 className="mb-3">
          <i className="pi pi-plus mr-2"></i>
          Create New Article
        </h3>

        <div className="field">
          <label>Title</label>
          <InputText value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className="field mt-3">
          <label>Content</label>
          <InputText
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="field mt-3">
          <label>Excerpt</label>
          <InputText
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
          />
        </div>

        <div className="field mt-3">
          <label>Author ID</label>
          <InputNumber
            value={authorId}
            onValueChange={(e) => setAuthorId(e.value ?? null)}
            mode="decimal"
            useGrouping={false}
          />
        </div>

        <div className="field mt-3">
          <label>Categories (comma-separated IDs)</label>
          <InputText
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
            placeholder="e.g. 1, 2, 3"
          />
        </div>

        <div className="field mt-3">
          <label>Image</label>
          <FileUpload
            name="file"
            url="http://localhost:3002/api/v1/article_images"
            accept="image/*"
            maxFileSize={2000000}
            auto
            onUpload={(e) => {
              console.log("Image uploaded:", e.xhr.response);
            }}
          />
        </div>

        <Button
          label="Create Article"
          icon="pi pi-save"
          className="mt-3"
          loading={loading}
          onClick={handleSave}
        />
      </div>
    </div>
  );
}