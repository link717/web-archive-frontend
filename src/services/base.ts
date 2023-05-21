import ky from 'ky-universal';
import { FetcherResponse } from 'swr/_internal';

export const fetcher = <T>(input: URL | RequestInfo, init?: RequestInit | undefined) => {
  return ky(`/${input}`, init).then((res) => res.json()) as FetcherResponse<T>;
};
