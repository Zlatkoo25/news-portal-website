import { articleApi } from "@/app/lib/api/article";
import ArticleDetails from "@/app/ui/component/Article/ArticleDetails";

export default async function Page(
  { params }: { params: Promise<{ id: number }> }
) {
  const { id } = await params;

  const article = await articleApi.getOne(id);

  return <ArticleDetails article={article} />;
}