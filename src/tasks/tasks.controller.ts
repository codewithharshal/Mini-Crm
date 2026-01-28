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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Tasks')
@ApiBearerAuth('JWT-auth')
@Controller('tasks')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a new task (Admin only)' })
  @ApiResponse({
    status: 201,
    description: 'Task created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - validation failed',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - missing or invalid token',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - admin access required',
  })
  create(@Body() dto: CreateTaskDto) {
    return this.tasksService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get tasks (Admin: all tasks, Employee: own tasks)',
  })
  @ApiResponse({
    status: 200,
    description: 'List of tasks',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - missing or invalid token',
  })
  findAll(@Req() req) {
    return this.tasksService.findAll(req.user);
  }

  @Patch(':id/status')
  @ApiOperation({
    summary: 'Update task status (Employee: own tasks, Admin: any task)',
  })
  @ApiParam({
    name: 'id',
    description: 'Task ID',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Task status updated successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - validation failed',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - missing or invalid token',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - cannot update other users tasks',
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
  })
  updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateTaskStatusDto,
    @Req() req,
  ) {
    return this.tasksService.updateStatus(+id, dto, req.user);
  }
}
