/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateArticleImageDto {
  @IsString()
  @IsNotEmpty({ message: 'File path is required' })
  file_path!: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Article ID is required' })
  article_id!: number;
}
/* eslint-enable @typescript-eslint/no-unsafe-call */
