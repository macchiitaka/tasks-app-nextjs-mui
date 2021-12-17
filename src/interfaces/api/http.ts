import type { AxiosRequestConfig } from 'axios';
import { default as axios } from 'axios';
import type { Primitive } from 'utility-types';

const DOMAIN = process.env.DOMAIN ?? 'https://tasks-api-express.herokuapp.com';

const paramsSerializer = (params: {
  [key: string]: Primitive | Primitive[];
}) => {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    // array format: repeat
    if (Array.isArray(value)) {
      for (const value_ of value) {
        searchParams.append(key, String(value_));
      }
      continue;
    }

    searchParams.append(key, String(value));
  }

  return searchParams.toString();
};

export const defaultAxiosRequestConfig: Readonly<AxiosRequestConfig> = {
  baseURL: `${DOMAIN}/api/v1`,
  withCredentials: false,
  timeout: 30_000,
  paramsSerializer,
};

export const http = axios.create(defaultAxiosRequestConfig);
