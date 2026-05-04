"use client";

import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Article, UpdateArticleDto } from "@/app/lib/definitions";

type Props = {
  article: Article;
  onSave: (data: UpdateArticleDto) => Promise<void>;
};

export default function ArticleEditForm({ article, onSave }: Props) {
  const [title, setTitle] = useState(article.title);
  const [excerpt, setExcerpt] = useState(article.excerpt ?? "");
  const [content, setContent] = useState(article.content);
  const [authorId, setAuthorId] = useState<string>(
    article.author ? String(article.author.id) : ""
  );
  const [categories, setCategories] = useState<string>(
    article.categories?.map((c) => c.id).join(", ") ?? ""
  );
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await onSave({
        title,
        excerpt,
        content,
        author_id: authorId ? parseInt(authorId) : undefined,
        categories: categories
          ? categories.split(",").map((id) => parseInt(id.trim()))
          : undefined,
      });
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
          <InputText
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
          />
        </div>

        <div className="field mt-3">
          <label>Content</label>
          <InputText
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="field mt-3">
          <label>Author ID</label>
          <InputText
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
            placeholder="e.g. 1"
          />
        </div>

        <div className="field mt-3 mb-4">
          <label>Categories (comma-separated IDs)</label>
          <InputText
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
            placeholder="e.g. 1, 2, 3"
          />
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