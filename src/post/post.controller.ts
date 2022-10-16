import { Controller, Get, Post } from '@nestjs/common';
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
  async getPostById(postId: number) {
    return this.postService.getPostById(postId);
  }

  @Post()
  async addPost(input: PostDto) {
    return this.postService.addPost(input);
  }
}
