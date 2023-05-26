import { HTTP_RESPONSE_STATUS } from '@common/types/common';

type ErrorInfo = {
  title: string;
  description: string;
  buttonText: string;
};

export const ERROR_PAGE_INFO: Record<HTTP_RESPONSE_STATUS, ErrorInfo> = {
  [HTTP_RESPONSE_STATUS.NOT_FOUND_PAGE]: {
    title: '서비스 오류',
    description: `존재하지 않는 페이지입니다.\n서비스 이용에 불편을 드려 죄송합니다.`,
    buttonText: '돌아가기',
  },
};
