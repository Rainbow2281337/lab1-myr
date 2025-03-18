import { IsString, IsEmail, MinLength, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  username: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @MinLength(3)
  @IsOptional()
  password: string;
}
