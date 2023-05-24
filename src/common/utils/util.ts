import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { CLIENT_DATE_FORMAT } from '@components/page/constant';

export const generatePrefixedId = (prefix: string) => `${prefix}-${uuidv4()}`;

export const withWindow = (callback: () => void) => {
  if (typeof window !== 'undefined') {
    callback();
  }
};

export const getTenYearsAgoJanuaryFirst = (): dayjs.Dayjs => {
  const today = new Date();
  const tenYearsAgo = new Date(today.getFullYear() - 10, 0, 1);

  const date = tenYearsAgo.getDate();
  const month = tenYearsAgo.getMonth() + 1; // Month Index + 1 = Month
  const year = tenYearsAgo.getFullYear();
  const hours = '00';
  const minutes = '00';
  const seconds = '00';
  const formattedDate = `${year}${month < 10 ? `0${month}` : month}${date < 10 ? `0${date}` : date}${hours}${minutes}${seconds}`;
  return dayjs(formattedDate);
};

export const getToday = (): dayjs.Dayjs => dayjs();

export const getDefaultFromDate = (): dayjs.Dayjs => dayjs(getTenYearsAgoJanuaryFirst(), CLIENT_DATE_FORMAT);

export const getDefaultToDate = (): dayjs.Dayjs => dayjs(getToday(), CLIENT_DATE_FORMAT);
