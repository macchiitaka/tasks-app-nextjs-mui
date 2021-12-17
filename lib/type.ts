import type { AxiosError } from 'axios';

export type Response<T> = Promise<
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: Error;
    }
>;

export const isAxiosError = (err: Error): err is AxiosError =>
  // @ts-expect-error
  Boolean(err.isAxiosError);
