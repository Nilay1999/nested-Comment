import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CommentDto {
  @Field((type) => String)
  message: string;

  @Field((type) => Number)
  commented_by: number;

  @Field((type) => Number)
  post: number;

  @Field((type) => Number, { nullable: true })
  parent: number;
}
