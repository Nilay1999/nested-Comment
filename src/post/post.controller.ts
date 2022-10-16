import { Controller, Get } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Controller('post')
export class PostController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  async getPosts() {
    try {
      const posts = await this.prismaService.post.findMany({
        include: {
          comments: {
            select: {
              id: true,
              message: true,
            },
          },
          posted_by: {
            select: {
              id: true,
              email: true,
              username: true,
            },
          },
        },
      });
      console.log(posts);
      return posts;
    } catch (error) {
      return error;
    }
  }
}
