import type { Response as R } from '../../../lib/type';
import type { TaskModel } from '../../domain/models/task-model';

export interface TaskRepositoryInterface {
  findAll(): R<TaskModel[]>;
  find(id: TaskModel['id']): R<TaskModel>;
  save(data: Pick<TaskModel, 'title'>): R<TaskModel>;
  replace(
    id: TaskModel['id'],
    data: Pick<TaskModel, 'title' | 'done'>,
  ): R<TaskModel>;
  delete(id: TaskModel['id']): R<null>;
}
