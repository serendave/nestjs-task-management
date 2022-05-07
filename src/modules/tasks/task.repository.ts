import { EntityRepository, Repository } from 'typeorm';
import { User } from '../auth/user.entity';
import { CreateTaskDto, GetTasksFilterDto } from './dto';
import { TaskStatus } from './enums/task-status';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { search, status } = filterDto;
    const query = this.createQueryBuilder('task').where({ user });

    if (status) {
      query.andWhere('task.status = :status', { status: TaskStatus.OPEN });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.status) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();
    return tasks;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });

    await this.save(task);
    return task;
  }
}
