import { NextPage } from 'next';
import React from 'react';
import ErrorComponent from '@components/error/error';

const NotFoundPage: NextPage = () => {
  return <ErrorComponent status={404} />;
};

export default NotFoundPage;
