import { Field, ObjectType } from '@nestjs/graphql';
import { CommentModel } from 'src/comment/comment.model';
import { PostModel } from 'src/post/post.model';

@ObjectType()
export class UserModel {
  @Field((type) => Number)
  id: number;

  @Field((type) => String)
  username: string;

  @Field((type) => String)
  email: string;

  @Field((type) => [CommentModel])
  comments: CommentModel[];

  @Field((type) => [PostModel])
  posts: PostModel[];
}
