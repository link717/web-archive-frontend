import { v4 as uuidv4 } from 'uuid';

export const generatePrefixedId = (prefix: string) => `${prefix}-${uuidv4()}`;

export const withWindow = (callback: () => void) => {
  if (typeof window !== 'undefined') {
    callback();
  }
};
