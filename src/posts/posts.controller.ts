import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  createPost(@Body() createPostData: CreatePostDto) {
    return this.postsService.createPost(createPostData);
  }

  @Get()
  getPostList() {
    return this.postsService.getPostList();
  }

  @Get(':id')
  getPostById(@Param('id') id: string) {
    return this.postsService.getPostById(id);
  }
}
