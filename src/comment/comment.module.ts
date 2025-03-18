import { forwardRef, Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from './schema/comment.schema';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Comment', schema: CommentSchema }]),
    forwardRef(() => PostsModule),
  ],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
