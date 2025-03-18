import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  postId: string;

  @IsNotEmpty()
  content: string;
}
