import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDto } from './user-dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers() {
    return this.userService.getUsers();
  }

  @Post()
  async addUser(@Body() input: UserDto) {
    return this.userService.addUser(input);
  }
}
