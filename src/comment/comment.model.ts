import { Field, ObjectType } from '@nestjs/graphql';
import { PostModel } from 'src/post/post.model';
import { UserModel } from 'src/user/user.model';

@ObjectType()
export class CommentModel {
  @Field((type) => Number)
  id: number;

  @Field((type) => String)
  message: string;

  @Field((type) => UserModel)
  commented_by: UserModel;

  @Field((type) => PostModel)
  post: PostModel;

  @Field((type) => CommentModel)
  parent?: CommentModel;

  @Field((type) => [CommentModel])
  children?: CommentModel[];

  @Field((type) => String)
  createdAt: string;

  @Field((type) => String, { nullable: true })
  updatedAt: string;
}
