import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

@Schema()
export class Comment {
  @Prop({ type: mongoose.Schema.Types.String, ref: 'User' })
  userId: string;

  @Prop({ type: mongoose.Schema.Types.String, ref: 'Posts' })
  postId: string;

  @Prop()
  content: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
export type CommentDocument = HydratedDocument<Comment>;
