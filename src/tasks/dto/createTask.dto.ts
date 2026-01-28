import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { TaskStatus } from '../enums/taskStatus.enum.js';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  assignedTo!: number; // userId

  @IsInt()
  customerId!: number;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
