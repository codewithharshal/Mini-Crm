import { IsEnum } from 'class-validator';
import { TaskStatus } from '../enums/taskStatus.enum.js';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status!: TaskStatus;
}
