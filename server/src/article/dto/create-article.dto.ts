import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsArray,
} from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  title!: string;

  @IsString()
  @IsNotEmpty({ message: 'Content is required' })
  content!: string;

  @IsString()
  @IsOptional()
  excerpt?: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Author ID is required' })
  author_id!: number;

  @IsArray()
  @IsOptional()
  categories?: number[];

  @IsArray()
  @IsOptional()
  images?: { id: number; file_path: string }[];
}
