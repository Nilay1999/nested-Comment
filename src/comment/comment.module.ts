import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CommentResolver } from './comment.resolver';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';

@Module({
  providers: [CommentService, PrismaService],
  controllers: [CommentController],
})
export class CommentModule {}
