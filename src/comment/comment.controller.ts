import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  createComment(@Body() createCommentData: CreateCommentDto) {
    return this.commentService.createComment({
      ...createCommentData,
    });
  }

  @Get(':id')
  getCommentListByPostId(@Param('id') id: string) {
    return this.commentService.getCommentListByPostId(id);
  }
}
