import { IWebArchive } from '@services/webArchive';

type URLFormValueValidator = 'CountValidator' | 'DuplicateValidator' | 'URLValidator';

const validateAndCheckURLForm = (url: string, savedStorageData: IWebArchive[], maxCount: number) => {
  const urlValidatorsMap = new Map<URLFormValueValidator, () => void>();

  urlValidatorsMap.set('CountValidator', () => {
    if ((savedStorageData?.length || 0) >= maxCount) {
      throw new Error(`최대 ${maxCount}개까지만 저장할 수 있습니다.`);
    }
  });

  urlValidatorsMap.set('DuplicateValidator', () => {
    const isDuplicateData = savedStorageData.some((data) => data.url === url);
    if (isDuplicateData) {
      throw new Error('이미 등록된 URL입니다.');
    }
  });

  urlValidatorsMap.set('URLValidator', () => {
    const urlRegex = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/i;

    if (!urlRegex.test(url)) {
      throw new Error('올바른 URL 형식이 아닙니다.');
    }
  });

  urlValidatorsMap.forEach((validator) => validator());

  return true;
};

export default validateAndCheckURLForm;
