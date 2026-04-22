'use client';

import Image from "next/image";
import { Tag } from "primereact/tag";
import { Divider } from "primereact/divider";
import { Article } from "@/app/lib/definitions";

export default function ArticleDetails({ article }: { article: Article }) {
  const imageUrl =
    article.images?.[0]?.file_path ??
    "http://localhost:3002/uploads/placeholder.jpg";

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">

      {/* Title Section */}
      <h1 className="text-4xl font-bold leading-tight text-gray-900">
        {article.title}
      </h1>

      {/* Meta Info */}
      <div className="flex items-center gap-4 text-sm text-gray-500 mt-3">
        <span className="flex items-center gap-1">
          <i className="pi pi-user" />
          {article.author.first_name} {article.author.last_name}
        </span>

        <span className="flex items-center gap-1">
          <i className="pi pi-calendar" />
          {article.created_at
            ? new Date(article.created_at).toDateString()
            : "Unknown date"}
        </span>
      </div>

      {/* Categories */}
      <div className="flex gap-2 mt-4 flex-wrap">
        {article.categories?.map((c) => (
          <Tag
            key={c.id}
            value={c.name}
            icon="pi pi-tag"
            severity="info"
          />
        ))}
      </div>

      <Divider />

      {/* Hero Image */}
      <div className="relative w-full h-105 rounded-lg overflow-hidden mb-6">
        <Image
          src={imageUrl}
          alt={article.title}
          fill
          style={{ objectFit: "cover" }}
          unoptimized
        />
      </div>

      {/* Excerpt */}
      <p className="text-lg text-gray-600 italic leading-relaxed mb-6">
        {article.excerpt}
      </p>

      {/* Content */}
      <div className="text-[17px] leading-8 text-gray-800 space-y-5">
        {article.content.split("\n").map((para, idx) => (
          <p key={idx}>{para}</p>
        ))}
      </div>

    </div>
  );
}