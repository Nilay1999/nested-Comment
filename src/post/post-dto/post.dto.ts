import { Field, InputType } from '@nestjs/graphql';
import { PostModel } from '../post.model';

@InputType()
export class PostDto {
  @Field(() => String)
  body: string;

  @Field(() => Number)
  postedBy: number;
}
