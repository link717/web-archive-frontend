import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getDefaultLayout } from '@components/layout/default-layout';

const WebArchiveDetailFilter = React.lazy(() => import('@components/page/webArchiveDetail/web-archive-detail-filter'));
const WebArchiveDetailList = React.lazy(() => import('@components/page/webArchiveDetail/web-archive-detail-list'));

const WebArchiveDetailPage = () => {
  const router = useRouter();
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    if (router.isReady) {
      setUrl(router.query.url as string);
    }
  }, [router.isReady]);

  return (
    <>
      <WebArchiveDetailFilter />
      <WebArchiveDetailList url={url} />
    </>
  );
};

WebArchiveDetailPage.getLayout = getDefaultLayout;

export default WebArchiveDetailPage;
