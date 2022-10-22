import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { AuthDto } from './auth-dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('login')
  async login(@Body() authDto: AuthDto, @Response() res) {
    try {
      if (!authDto.email) {
        return await res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Enter your email !',
        });
      } else if (!authDto.password) {
        return await res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Enter your Password !',
        });
      } else {
        const user = await this.authService.login(authDto);
        if (user != null) {
          const payload = { user: user };
          const jwt = await this.jwtService.signAsync(payload);
          return res.status(HttpStatus.OK).json({
            token: jwt,
            user,
          });
        } else {
          return res.status(HttpStatus.NOT_FOUND).json({
            message: 'User not found ',
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile/:id')
  async getProfile(id: number) {
    try {
      const user = await this.authService.getUserData(id);
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}
