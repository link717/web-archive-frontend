import { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <title>Web Archive</title>
        <meta name="description" content="Web Archive를 사용한 토이 프로젝트" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
