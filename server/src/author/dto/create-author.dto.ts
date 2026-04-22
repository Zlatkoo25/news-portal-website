/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  first_name!: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  last_name!: string;
}
/* eslint-enable @typescript-eslint/no-unsafe-call */
