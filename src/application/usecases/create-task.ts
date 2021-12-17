import type { TaskModel } from '../../domain/models/task-model';
import type { TaskRepositoryInterface } from '../repository-interface/task-repository-interface';

export class CreateTask {
  private readonly taskRepository: TaskRepositoryInterface;

  public constructor(taskRepository: TaskRepositoryInterface) {
    this.taskRepository = taskRepository;
  }

  public readonly execute = (title: TaskModel['title']) =>
    this.taskRepository.save({ title });
}
