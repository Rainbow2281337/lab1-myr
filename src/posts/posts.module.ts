import { forwardRef, Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Posts, PostsSchena } from './schema/posts.schema';
import { CommentModule } from 'src/comment/comment.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Posts.name, schema: PostsSchena }]),
    forwardRef(() => CommentModule),
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
