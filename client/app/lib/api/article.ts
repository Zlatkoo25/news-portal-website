import { Article } from "../definitions";

const API_URL = "http://localhost:3002/api/v1/article";

export async function getArticle(id: string): Promise<Article> {
  const res = await fetch(`${API_URL}/${id}`, { cache: "no-store" });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message || "Failed to create article");
  }
  return res.json();
}

export async function createArticle(data: {
  title: string;
  content: string;
  excerpt?: string;
  author_id: number;
  categories?: number[];
}) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message || "Failed to create article");
  }
  return res.json();
}

export async function updateArticle(id: string, data: Partial<Article>): Promise<Article> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message || "Failed to create article");
  }
  return res.json();
}

export async function deleteArticle(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message || "Failed to create article");
  }
}
