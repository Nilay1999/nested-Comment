import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommentDto } from './comment-dto/comment.dto';
import { ReplyDto } from './comment-dto/reply.dto';
import { CommentModel } from './comment.model';
import { CommentService } from './comment.service';

@Resolver(() => CommentModel)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Query(() => [CommentModel])
  async getComments() {
    return this.commentService.getComments();
  }

  @Mutation(() => CommentModel)
  async addComment(@Args('input') input: CommentDto) {
    return this.commentService.addComment(input);
  }

  @Mutation(() => CommentModel)
  async addReply(@Args('input') input: ReplyDto) {
    return this.commentService.addReplyToComment(input);
  }
}
