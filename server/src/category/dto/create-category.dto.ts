/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  name!: string;
}
/* eslint-enable @typescript-eslint/no-unsafe-call */
