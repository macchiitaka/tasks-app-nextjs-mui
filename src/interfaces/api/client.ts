import { http } from './http';

type TaskRecord = {
  id: number;
  created_at: string; // RFC3339
  updated_at: string; // RFC3339
  title: string;
  done: boolean;
};

export const getTaskAll = async () =>
  http.get<{ items: TaskRecord[] }>('/tasks');

export const getTask = async (params: { id: number }) =>
  http.get<TaskRecord>(`/tasks/${params.id}`);

export const createTask = async (_: {}, data: { title: string }) =>
  http.post<TaskRecord>('/tasks', data);

export const updateTask = async (
  params: { id: number },
  data: { title: string; done: boolean },
) => http.put<TaskRecord>(`/tasks/${params.id}`, data);

export const deleteTask = async (params: { id: number }) =>
  http.delete<void>(`/tasks/${params.id}`);
