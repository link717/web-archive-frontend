import { ConfigProvider } from 'antd';
import koKR from 'antd/locale/ko_KR';
import dayjs from 'dayjs';
import { NextComponentType } from 'next';
import type { AppProps } from 'next/app';
import React from 'react';
import { SWRConfig } from 'swr';
import { TDefaultLayoutPage } from '@/components/layout/default-layout';
import { fetcher } from '@/services/base';

import '@assets/styles/global.css';
import '@assets/styles/reset.css';

dayjs.locale('ko');

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = (Component as TDefaultLayoutPage).getLayout || ((Page: NextComponentType, props: Record<string, unknown>) => <Page {...props} />);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#63489a',
          colorLink: '#63489a',
          colorLinkHover: '#7f68a6',
        },
      }}
      locale={koKR}
    >
      <SWRConfig value={{ fetcher, revalidateOnFocus: false }}>{getLayout(Component, pageProps)}</SWRConfig>
    </ConfigProvider>
  );
}
