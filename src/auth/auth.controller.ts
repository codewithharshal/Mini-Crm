import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto.js';
import { AuthService } from './auth.service.js';

@Controller('auths')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Register a new user
  @Post('register')
  async registerUser(@Body() dto: CreateUserDto) {
    return this.authService.registerUser(dto);
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.loginUser(email, password);
  }
}
