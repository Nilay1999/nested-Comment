import { Field, ObjectType } from '@nestjs/graphql';
import { CommentModel } from 'src/comment/comment.model';
import { UserModel } from 'src/user/user.model';

@ObjectType()
export class PostModel {
  @Field((type) => Number)
  id: number;

  @Field((type) => String)
  body: string;

  @Field((type) => UserModel)
  posted_by: UserModel;

  @Field((type) => [CommentModel], { nullable: true })
  comments: CommentModel[];
}
