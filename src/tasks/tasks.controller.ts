import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service.js';
import { CreateTaskDto } from './dto/createTask.dto.js';
import { UpdateTaskStatusDto } from './dto/updateTaskStatus.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt.guard.js';
import { Roles } from '../users/decorators/roles.decorator.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { UserRole } from '../auth/enum/userRole.enum.js';

@Controller('tasks')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // ADMIN only
  @Post()
  @Roles(UserRole.ADMIN)
  create(@Body() dto: CreateTaskDto) {
    return this.tasksService.create(dto);
  }

  // ADMIN: all | EMPLOYEE: own
  @Get()
  findAll(@Req() req) {
    return this.tasksService.findAll(req.user);
  }

  // EMPLOYEE: own | ADMIN: any
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateTaskStatusDto,
    @Req() req,
  ) {
    return this.tasksService.updateStatus(+id, dto, req.user);
  }
}
