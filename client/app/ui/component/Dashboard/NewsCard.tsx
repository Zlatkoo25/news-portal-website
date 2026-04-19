import Image from "next/image";
import { Card } from "primereact/card";
import { Tag } from "primereact/tag";
import { Article } from "@/app/lib/definitions";

export default function ArticleCards({ articles }: { articles: Article[] }) {
  return (
    <div className="flex flex-wrap gap-6">
      {articles.map((article) => {
        const imageUrl =
          article.images.length > 0
            ? article.images[0].file_path
            : "/placeholder.jpg";

        const header = (
          <div style={{ position: "relative", width: "100%", height: "200px" }}>
            <Image
              src={imageUrl}
              alt={article.title}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        );

        const footer = (
          <div className="flex flex-col gap-2 text-gray-600">
            <small>
              <i className="pi pi-user mr-1" /> 
              {article.author.first_name} {article.author.last_name}
            </small>
            <div className="flex flex-wrap gap-2">
              {article.categories.length > 0 ? (
                article.categories.map((c) => (
                  <Tag
                    key={c.id}
                    value={c.name}
                    icon="pi pi-tag"
                    severity="info"
                  />
                ))
              ) : (
                <Tag value="No categories" severity="warning" />
              )}
            </div>
          </div>
        );

        return (
          <Card
            key={article.id}
            title={article.title}
            subTitle={article.excerpt}
            header={header}
            footer={footer}
            className="w-96 shadow-md"
          />
        );
      })}
    </div>
  );
}
