import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(3)
  password: string;
}
