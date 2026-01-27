import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateUserDto } from './dto/createUser.dto.js';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

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
}
