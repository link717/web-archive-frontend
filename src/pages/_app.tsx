import { ConfigProvider } from 'antd';
import koKR from 'antd/locale/ko_KR';
import dayjs from 'dayjs';
import type { AppProps } from 'next/app';
import React from 'react';
import { SWRConfig } from 'swr';
import { fetcher } from '@/services/base';
import '@assets/styles/global.css';
import '@assets/styles/reset.css';

dayjs.locale('ko');

export default function App({ Component, pageProps }: AppProps) {
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
      <SWRConfig value={{ fetcher, revalidateOnFocus: false }}>
        <Component {...pageProps} />
      </SWRConfig>
    </ConfigProvider>
  );
}
