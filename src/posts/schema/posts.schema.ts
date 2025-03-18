import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Comment } from 'src/comment/schema/comment.schema';

@Schema()
export class Posts {
  @Prop()
  id: string;

  @Prop()
  header: string;

  @Prop()
  content: string;

  @Prop()
  comments?: Comment[];
}

export const PostsSchena = SchemaFactory.createForClass(Posts);
export type PostsDocument = HydratedDocument<Posts>;
