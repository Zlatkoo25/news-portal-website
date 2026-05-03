'use client'

import { useState, useEffect } from "react";
import NewsCard from "@/app/ui/component/Homepage/NewsCard";
import { articleApi } from "@/app/lib/api/article";
import { Article } from "@/app/lib/definitions";

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    articleApi
      .getAll()
      .then(setArticles)
      .catch((err) => setError((err as Error).message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen px-16 flex flex-col gap-4 w-full">
      <p className="text-black font-bold text-4xl">News</p>
      <NewsCard articles={articles} />
    </div>
  );
}