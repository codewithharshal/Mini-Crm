import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateUserDto } from './dto/createUser.dto.js';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async registerUser(dto: CreateUserDto) {
    // Check if user with the given email already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    // If user exists, throw an error
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Create the new user
    const newUser = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
        role: dto.role,
      },
      select: {
        user_id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    // Return the newly created user (excluding the password)
    return newUser;
  }

  async loginUser(email: string, password: string) {
    // Check email is provided or not
    if (!email) {
      throw new UnauthorizedException('Email is required');
    }

    if (!password) {
      throw new UnauthorizedException('Password is required');
    }

    // Find the user by email
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    // If user not found, throw an error
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If password is invalid, throw an error
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Return user details (excluding the password)
    const payload = {
      user_id: user.user_id,
      role: user.role,
    };

    // Return the user details
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}
