import { Get, Post, Controller } from '@nestjs/common';
import { CommentDto } from './comment-dto/comment.dto';
import { ReplyDto } from './comment-dto/reply.dto';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async getComments() {
    return this.commentService.getComments();
  }

  @Post('reply/:parentId')
  async addReply(input: ReplyDto) {
    return this.commentService.addReplyToComment(input);
  }

  @Post('/:postId')
  async addComment(input: CommentDto) {
    return this.commentService.addComment(input);
  }
}
