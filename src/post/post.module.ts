import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';
import { PostController } from './post.controller';

@Module({
  providers: [PostService, PrismaService],
  controllers: [PostController],
})
export class PostModule {}
