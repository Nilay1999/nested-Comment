import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ReplyDto {
  @Field((type) => String)
  message: string;

  @Field((type) => Number)
  parentId: number;

  @Field((type) => Number)
  commented_by: number;
}
