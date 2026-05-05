'use client'

import { ConfirmDialog } from "primereact/confirmdialog";
import { useState, useEffect } from "react";
import { articleApi } from "@/app/lib/api/article";
import { authorApi } from "@/app/lib/api/author";
import { categoryApi } from "@/app/lib/api/category";
import { Article, Author, Category } from "@/app/lib/definitions";
import ArticlesDashboardTable from "@/app/ui/component/Dashboard/Articles/ArticleDashboardTable";
import AuthorsDashboardTable from "@/app/ui/component/Dashboard/Authors/AuthorDashboardTable";
import CategoriesDashboardTable from "@/app/ui/component/Dashboard/Categories/CategoriesDashboardTable";

export default function ArticlesDashboardPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      articleApi.getAll(),
      authorApi.getAll(),
      categoryApi.getAll(),
    ])
      .then(([articles, authors, categories]) => {
        setArticles(articles);
        setAuthors(authors);
        setCategories(categories);
      })
      .catch((err) => setError((err as Error).message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="flex flex-col gap-8 p-4">
      <ConfirmDialog />

      <section>
        <p className="text-2xl font-bold mb-4">Articles</p>
        <ArticlesDashboardTable articles={articles} />
      </section>

      <section>
        <p className="text-2xl font-bold mb-4">Authors</p>
        <AuthorsDashboardTable authors={authors} />
      </section>

      <section>
        <p className="text-2xl font-bold mb-4">Categories</p>
        <CategoriesDashboardTable categories={categories} />
      </section>
    </div>
  );
}