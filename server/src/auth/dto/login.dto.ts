import { IsEmail, IsOptional, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsString()
  password!: string;
}
