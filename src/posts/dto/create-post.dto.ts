import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  header: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  content: string;
}
