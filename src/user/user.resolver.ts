import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserDto } from './user-dto/user.dto';
import { UserModel } from './user.model';
import { UserService } from './user.service';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserModel])
  async getUsers() {
    return this.userService.getUsers();
  }

  @Mutation(() => UserModel)
  async addUser(@Args('input') input: UserDto) {
    return this.userService.addUser(input);
  }
}
