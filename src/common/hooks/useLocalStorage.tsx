import { withWindow } from '@common/utils/util';

export type TLocalStorage<T> = T[];

const useLocalStorage = <T,>(key: string) => {
  const getLocalStorage = (): TLocalStorage<T> => {
    let result: TLocalStorage<T> = [];

    withWindow(() => {
      const storedData = localStorage.getItem(key);
      result = storedData && JSON.parse(storedData);
    });

    return result;
  };

  const setLocalStorage = (data: TLocalStorage<T>): TLocalStorage<T> => {
    let result: TLocalStorage<T> = [];

    withWindow(() => {
      localStorage.setItem(key, JSON.stringify(data));
      result = getLocalStorage();
    });

    return result;
  };

  const deleteLocalStorage = () => {
    withWindow(() => {
      localStorage.removeItem(key);
    });
  };

  return {
    setLocalStorage,
    getLocalStorage,
    deleteLocalStorage,
  };
};

export default useLocalStorage;
