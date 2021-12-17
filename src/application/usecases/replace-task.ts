import type { TaskModel } from '../../domain/models/task-model';
import type { TaskRepositoryInterface } from '../repository-interface/task-repository-interface';

export class ReplaceTask {
  private readonly taskRepository: TaskRepositoryInterface;

  public constructor(taskRepository: TaskRepositoryInterface) {
    this.taskRepository = taskRepository;
  }

  public readonly execute = ({
    id,
    ...data
  }: Omit<TaskModel, 'createdAt' | 'updatedAt'>) =>
    this.taskRepository.replace(id, data);
}
