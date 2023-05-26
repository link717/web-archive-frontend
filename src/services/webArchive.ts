import dayjs from 'dayjs';
import qs from 'qs';
import useSWR from 'swr';
import { ISO8601DateTime, IServerDateTime } from '@common/types/common';
import { generatePrefixedId } from '@common/utils/util';

export interface IWebArchive {
  id: string;
  createdDate: ISO8601DateTime;
  url: string;
}

export interface IWebArchiveDetail {
  id: string;
  urlkey: string;
  timestamp: IServerDateTime;
  original: string;
  mimetype: string;
  statuscode: string;
  digest: string;
  length: string;
}

export interface IWebArchiveFormValue extends Omit<IWebArchive, 'createdDate'> {}

export interface IWebArchiveDetailListFilterFormValue {
  filterDateRange?: [dayjs.Dayjs, dayjs.Dayjs];
  from?: IServerDateTime;
  to?: IServerDateTime;
}
export interface IWebArchiveDetailFormValue {
  from?: IServerDateTime;
  to?: IServerDateTime;
}

export interface IWebArchiveDetailParams extends IWebArchiveDetailListFilterFormValue {
  url?: string;
  page?: number;
  output?: 'json' | 'xml';
}

const getReformattedData = (data?: string[][]) => {
  if (!data) return [];
  const [column, ...rows] = data;
  const formattedData = rows.map((row) => {
    const obj: unknown = { id: generatePrefixedId('web-archive-detail') };
    column.forEach((key, index) => {
      (obj as Record<string, string>)[key] = row[index];
    });
    return obj as IWebArchiveDetail;
  });
  return formattedData;
};

export const useWebArchiveDetailList = (params: IWebArchiveDetailParams, shouldFetch?: boolean) => {
  const { url, from, to, output = 'json' } = params;
  const { data, ...rest } = useSWR(shouldFetch ? `cdx/search/cdx?${qs.stringify({ url, output, from, to })}` : null);
  return { data: getReformattedData(data), ...rest };
};
