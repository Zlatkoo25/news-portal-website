'use client';

import Image from "next/image";
import { Card } from "primereact/card";
import { Tag } from "primereact/tag";
import { useRouter } from "next/navigation";
import { Article } from "@/app/lib/definitions";

export default function ArticleCards({ articles }: { articles: Article[] }) {
  const router = useRouter();

  return (
    <div className="flex flex-wrap gap-6">
      {articles.map((article) => {
        const imageUrl =
          article.images.length > 0
            ? article.images[0].file_path
            : "http://localhost:3002/uploads/placeholder.jpg";

        const header = (
          <div className="relative w-full h-50">
            <Image
              src={imageUrl}
              alt={article.title}
              fill
              style={{ objectFit: "cover" }}
              unoptimized
              loading="eager"
            />
          </div>
        );

        const footer = (
          <div className="flex justify-between items-center">
            <div className="flex flex-wrap gap-2">
              {article.categories.map((c) => (
                <Tag key={c.id} value={c.name} icon="pi pi-tag" />
              ))}
            </div>

            <i className="pi pi-arrow-right text-gray-500"></i>
          </div>
        );

        return (
          <Card
            key={article.id}
            title={article.title}
            subTitle={article.excerpt}
            header={header}
            footer={footer}
            className="w-108 shadow-md cursor-pointer hover:shadow-lg hover:scale-[1.01] transition-all"
            onClick={() => router.push(`/${article.id}`)}
          />
        );
      })}
    </div>
  );
}