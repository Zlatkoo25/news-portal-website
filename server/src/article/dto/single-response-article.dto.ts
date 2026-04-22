export class ArticleResponseDto {
  id!: number;
  title!: string;
  content!: string;
  excerpt?: string;

  author!: {
    id: number;
    first_name: string;
    last_name: string;
  };

  categories!: {
    id: number;
    name: string;
  }[];

  created_at?: Date;
  updated_at?: Date;
}
