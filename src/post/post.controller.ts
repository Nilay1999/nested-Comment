import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostDto } from './post-dto/post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getAllPosts() {
    return this.postService.getPosts();
  }

  @Get(':id')
  async getPostById(@Param('id') postId: string) {
    return this.postService.getPostById(parseInt(postId));
  }

  @Post()
  async addPost(@Body() input: PostDto) {
    return this.postService.addPost(input);
  }
}
