import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getDefaultLayout } from '@components/layout/default-layout';
import WebArchiveDetailFilter from '@components/page/webArchiveDetail/web-archive-detail-filter';
import WebArchiveDetailList from '@components/page/webArchiveDetail/web-archive-detail-list';

const WebArchiveDetailPage = () => {
  const router = useRouter();
  const [url, setUrl] = useState<string | null>();

  useEffect(() => {
    if (router.isReady) {
      setUrl(router.query.url as string);
    }
  }, [router.isReady]);

  // TODO: error 화면으로 대체 처리
  if (!url) return <></>;
  return (
    <>
      <WebArchiveDetailFilter />
      <WebArchiveDetailList url={url} />
    </>
  );
};

WebArchiveDetailPage.getLayout = getDefaultLayout;

export default WebArchiveDetailPage;
