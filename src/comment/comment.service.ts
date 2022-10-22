import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CommentDto } from './comment-dto/comment.dto';
import { ReplyDto } from './comment-dto/reply.dto';

@Injectable()
export class CommentService {
  constructor(private prismaService: PrismaService) {}

  async getComments() {
    try {
      let comment = await this.prismaService.comment.findMany({
        where: {
          parent: null,
        },
        include: {
          children: {
            include: {
              children: {
                include: {
                  children: true,
                },
              },
            },
          },
        },
      });
      return comment;
    } catch (error) {
      return error;
    }
  }

  async addComment(input: CommentDto) {
    try {
      const { post, commented_by, message, parent } = input;

      const comment = await this.prismaService.comment.create({
        data: {
          message: message,
          post: {
            connect: {
              id: post,
            },
          },
          commented_by: {
            connect: {
              id: commented_by,
            },
          },
        },
        include: {
          children: {
            select: {
              id: true,
            },
          },
          commented_by: {
            select: {
              id: true,
              email: true,
              username: true,
              posts: true,
              comments: true,
            },
          },
          post: {
            select: {
              body: true,
              id: true,
            },
          },
        },
      });

      return comment;
    } catch (error) {
      return error;
    }
  }

  async addReplyToComment(input: ReplyDto) {
    try {
      const { commented_by, message, parentId } = input;
      const parentPostId = await this.prismaService.comment.findFirst({
        where: { id: parentId },
        select: {
          postId: true,
        },
      });
      const reply = await this.prismaService.comment.create({
        data: {
          commented_by: {
            connect: {
              id: commented_by,
            },
          },
          message: message,
          parent: {
            connect: {
              id: parentId,
            },
          },
          post: {
            connect: {
              id: parentPostId.postId,
            },
          },
        },
        include: {
          children: {
            include: {
              children: true,
            },
          },
          parent: {
            select: {
              id: true,
              message: true,
            },
          },
        },
      });
      return reply;
    } catch (error) {
      return error;
    }
  }
}
