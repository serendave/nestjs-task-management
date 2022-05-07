import { IsEnum } from 'class-validator';
import { TaskStatus } from '../enums/task-status';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
