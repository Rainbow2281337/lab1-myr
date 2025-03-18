import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from './schema/comment.schema';
import { Model } from 'mongoose';
import { CommentModule } from './comment.module';
import { PostsService } from 'src/posts/posts.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentModule>,
    @Inject(forwardRef(() => PostsService))
    private readonly postService: PostsService,
  ) {}
  async checkIfPostExists(id: string) {
    const post = await this.postService.getPostById(id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return true;
  }
  async createComment(createCommentData: Comment) {
    await this.checkIfPostExists(createCommentData.postId);
    return this.commentModel.create(createCommentData);
  }

  async getCommentListByPostId(id: string): Promise<Comment[]> {
    await this.checkIfPostExists(id);
    return this.commentModel
      .find({ postId: id })
      .lean()
      .exec() as unknown as Comment[];
  }
}
