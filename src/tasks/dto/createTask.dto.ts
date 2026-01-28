import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { TaskStatus } from '../enums/taskStatus.enum.js';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Task title',
    example: 'Follow up with client',
  })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiPropertyOptional({
    description: 'Task description',
    example: 'Call client to discuss project requirements',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'User ID to assign task to',
    example: 1,
  })
  @IsInt()
  assignedTo!: number; // userId

  @ApiProperty({
    description: 'Customer ID related to this task',
    example: 1,
  })
  @IsInt()
  customerId!: number;

  @ApiPropertyOptional({
    description: 'Task status',
    enum: TaskStatus,
    example: TaskStatus.PENDING,
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
