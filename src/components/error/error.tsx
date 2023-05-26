import { Button } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { HTTP_RESPONSE_STATUS } from '@common/types/common';
import { ERROR_PAGE_INFO } from './type';

interface IErrorProps {
  status: HTTP_RESPONSE_STATUS; // code
}

const ErrorComponent = ({ status }: IErrorProps) => {
  const router = useRouter();
  const errorHandlers: Record<HTTP_RESPONSE_STATUS, () => void> = {
    [HTTP_RESPONSE_STATUS.NOT_FOUND_PAGE]: () => {
      router.back();
    },
  };

  const handleButtonClick = () => {
    const errorHandler = errorHandlers[status];
    if (errorHandler) {
      errorHandler();
    }
  };

  return (
    <div className="absolute flex flex-col items-center justify-center top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] gap-4">
      <h1>{ERROR_PAGE_INFO[status].title}</h1>
      <p className="text-xl text-center whitespace-pre-wrap">{ERROR_PAGE_INFO[status].description}</p>
      <Button size="large" onClick={handleButtonClick}>
        {ERROR_PAGE_INFO[status].buttonText}
      </Button>
    </div>
  );
};

export default ErrorComponent;
