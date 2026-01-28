// src/users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRole } from '../auth/enum/userRole.enum.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        user_id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
  }

  async findById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { user_id: id },
      select: {
        updatedAt: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateRole(id: number, role: UserRole) {
    const user = await this.prisma.user.findUnique({
      where: { user_id: id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.user.update({
      where: { user_id: id },
      data: { role },
      select: {
        user_id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
  }
}
