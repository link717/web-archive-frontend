import { NextPage } from 'next';
import React from 'react';

const ErrorComponent = React.lazy(() => import('@components/error/error'));

const NotFoundPage: NextPage = () => {
  return <ErrorComponent status={404} />;
};

export default NotFoundPage;
