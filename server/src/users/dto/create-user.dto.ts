/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsString,
  IsNotEmpty,
  Length,
  IsEmail,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Length(7, 50)
  email!: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  username!: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  password!: string;
}
/* eslint-enable @typescript-eslint/no-unsafe-call */
