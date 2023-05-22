import { Card } from 'antd';
import React, { PropsWithChildren } from 'react';

export interface ICardHeader {
  title?: string;
}

const DefaultCard = ({ children, ...cardProps }: PropsWithChildren<ICardHeader>) => {
  const { title } = cardProps;
  return <Card title={title}>{children}</Card>;
};

export default React.memo(DefaultCard);
