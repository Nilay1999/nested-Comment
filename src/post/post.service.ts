import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PostDto } from './post-dto/post.dto';

@Injectable()
export class PostService {
  constructor(private prismaService: PrismaService) {}

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

      return posts;
    } catch (error) {
      return error;
    }
  }
  async getPostById(id: number) {
    try {
      const post = await this.prismaService.post.findFirst({
        where: { id: id },
        include: {
          posted_by: {
            select: {
              id: true,
              email: true,
              username: true,
            },
          },
          comments: {
            select: {
              id: true,
              children: true,
              message: true,
              commented_by: {
                select: {
                  id: true,
                  username: true,
                  email: true,
                },
              },
            },
          },
        },
      });

      return post;
    } catch (error) {
      throw error;
    }
  }
  async addPost(input: PostDto) {
    try {
      const { body, postedBy } = input;
      const isUserExists = await this.prismaService.user.findFirst({
        where: {
          id: postedBy,
        },
      });
      if (isUserExists) {
        const post = await this.prismaService.post.create({
          data: {
            body: body,
            posted_by: {
              connect: {
                id: postedBy,
              },
            },
          },
          select: {
            id: true,
            body: true,
          },
        });
        return post;
      }
    } catch (error) {
      return error;
    }
  }
}
