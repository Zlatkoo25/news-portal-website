import { getArticle } from "@/app/lib/utils";
import ArticleDetails from "@/app/ui/component/Article/ArticleDetails";

export default async function Page(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const article = await getArticle(id);

  return <ArticleDetails article={article} />;
}