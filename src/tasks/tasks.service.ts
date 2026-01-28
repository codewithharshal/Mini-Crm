import {
  ForbiddenException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateTaskDto } from './dto/createTask.dto.js';
import { UpdateTaskStatusDto } from './dto/updateTaskStatus.dto.js';
import { UserRole } from '../auth/enum/userRole.enum.js';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTaskDto) {
    // Validate assigned employee
    const user = await this.prisma.user.findUnique({
      where: { user_id: dto.assignedTo },
    });

    if (!user || user.role !== UserRole.EMPLOYEE) {
      throw new NotFoundException('Assigned employee not found');
    }

    // Validate customer
    const customer = await this.prisma.customer.findUnique({
      where: { customer_id: dto.customerId },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return this.prisma.task.create({
      data: {
        title: dto.title,
        description: dto.description,
        status: dto.status,
        assignedToId: dto.assignedTo,
        customerId: dto.customerId,
      },
    });
  }

  async findAll(currentUser: any) {
    const where =
      currentUser.role === UserRole.ADMIN
        ? {}
        : { assignedToId: currentUser.userId };

    return this.prisma.task.findMany({
      where,
      include: {
        assignedTo: {
          select: { user_id: true, name: true, email: true },
        },
        customer: {
          select: {
            customer_id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });
  }

  async updateStatus(
    taskId: number,
    dto: UpdateTaskStatusDto,
    currentUser: any,
  ) {
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (
      currentUser.role === UserRole.EMPLOYEE &&
      task.assignedToId !== currentUser.userId
    ) {
      throw new ForbiddenException('You cannot update someone else’s task');
    }

    return this.prisma.task.update({
      where: { id: taskId },
      data: { status: dto.status },
    });
  }
}
