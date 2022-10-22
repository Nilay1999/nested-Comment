import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserDto } from './user-dto/user.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getUsers() {
    try {
      const users = await this.prismaService.user.findMany({
        include: {
          posts: {
            select: {
              id: true,
              body: true,
            },
          },
        },
      });

      return users;
    } catch (error) {
      return error;
    }
  }

  async addUser(input: UserDto) {
    try {
      const { email, username, password } = input;
      const user = await this.prismaService.user.create({
        data: { email: email, username: username, password: password },
      });
      return user;
    } catch (error) {
      return error;
    }
  }
}
