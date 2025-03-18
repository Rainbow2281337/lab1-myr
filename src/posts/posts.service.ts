import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Posts, PostsDocument } from './schema/posts.schema';
import { Model } from 'mongoose';
import { CommentService } from 'src/comment/comment.service';
import { CreatePostDto } from './dto/create-post.dto';
import * as uuid from 'uuid';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Posts.name) private readonly postsModel: Model<PostsDocument>,
    @Inject(forwardRef(() => CommentService))
    private readonly commentService: CommentService,
  ) {}

  createPost(createPostData: CreatePostDto) {
    return this.postsModel.create({
      ...createPostData,
      id: uuid.v4(),
    });
  }

  getPostList() {
    return this.postsModel.find().exec();
  }

  async getPostById(id: string) {
    return this.postsModel.findOne({ id });
  }
}
