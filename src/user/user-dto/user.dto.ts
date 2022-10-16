import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserDto {
  @Field(() => String)
  username: string;
  @Field(() => String)
  email: string;
}
