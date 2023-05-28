import React, { useEffect, useState } from 'react';
import useLocalStorage from '@common/hooks/useLocalStorage';
import { getDefaultLayout } from '@components/layout/default-layout';
import { WEB_ARCHIVE_STORAGE_KEY } from '@components/page/constant';
import { IWebArchive } from '@services/webArchive';

const WebArchiveForm = React.lazy(() => import('@components/page/webArchive/web-archive-form'));
const WebArchiveList = React.lazy(() => import('@components/page/webArchive/web-archive-list'));

const HomePage = () => {
  const { getLocalStorage } = useLocalStorage<IWebArchive>(WEB_ARCHIVE_STORAGE_KEY);
  const [webArchive, setWebArchive] = useState<IWebArchive[]>([]);

  useEffect(() => {
    const initialData = getLocalStorage();
    setWebArchive(initialData);
  }, []);

  return (
    <>
      <WebArchiveForm setWebArchive={setWebArchive} />
      <WebArchiveList webArchive={webArchive} setWebArchive={setWebArchive} />
    </>
  );
};

HomePage.getLayout = getDefaultLayout;

export default HomePage;
