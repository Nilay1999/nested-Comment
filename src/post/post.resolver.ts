import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostDto } from './post-dto/post.dto';
import { PostModel } from './post.model';
import { PostService } from './post.service';

@Resolver(() => PostModel)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [PostModel])
  async getAllPosts() {
    return this.postService.getPosts();
  }

  @Query(() => PostModel, { nullable: true })
  async getPostById(@Args('postId') postId: number) {
    return this.postService.getPostById(postId);
  }

  @Mutation(() => PostModel)
  async addPost(@Args('input') input: PostDto) {
    return this.postService.addPost(input);
  }
}
