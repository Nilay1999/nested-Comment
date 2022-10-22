import { Injectable } from '@nestjs/common';
import { AuthDto } from './auth-dto/auth.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}
  async login(authDto: AuthDto) {
    const user = await this.prismaService.user.findFirst({
      where: { email: authDto.email },
    });
    if (!user) {
      return user;
    }
    if (!(authDto.password == user.password)) {
      return 'Password incorrect';
    } else {
      return user;
    }
  }

  async getUserData(id: number) {
    try {
      return await this.prismaService.user.findFirst({ where: { id: id } });
    } catch (error) {
      return error;
    }
  }
}
