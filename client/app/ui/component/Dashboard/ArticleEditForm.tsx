"use client";

import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Article } from "@/app/lib/definitions";

type Props = {
  article: Article;
  onSave: (data: Partial<Article>) => Promise<void>;
};

export default function ArticleEditForm({ article, onSave }: Props) {
  const [title, setTitle] = useState(article.title);
  const [excerpt, setExcerpt] = useState(article.excerpt);
  const [content, setContent] = useState(article.content);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await onSave({ title, excerpt, content });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-fluid mt-2">
      <div className="p-card p-4 shadow-2">
        <h3 className="mb-3">
          <i className="pi pi-pencil mr-2"></i>
          Edit Article
        </h3>

        <div className="field">
          <label>Title</label>
          <InputText value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className="field mt-3">
          <label>Excerpt</label>
          <InputText value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
        </div>

        <div className="field mt-3 mb-4">
          <label>Content</label>
          <InputText value={content} onChange={(e) => setContent(e.target.value)} />
        </div>

        <Button
          label="Save Changes"
          icon="pi pi-save"
          className="mt-3"
          loading={loading}
          onClick={handleSave}
        />
      </div>
    </div>
  );
}
