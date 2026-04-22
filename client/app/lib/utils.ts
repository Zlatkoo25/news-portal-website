// Validation utilities

import { Article } from "./definitions";

export const isValidPassword = (pwd: string) =>
  pwd.trim() !== "" && pwd.length >= 8;


// Fetch article
export async function getArticle(id: string): Promise<Article> {
  const res = await fetch(
    `http://localhost:3002/api/v1/article/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Backend error:", errorText);
    throw new Error(`Fetch failed: ${res.status}`);
  }

  return res.json();
}