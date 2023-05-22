import { NextComponentType, NextPage } from 'next';
import React from 'react';

export type TDefaultLayoutPage<P = Record<string, unknown>> = NextPage<P> & {
  getLayout(page: NextComponentType, props: unknown): React.ReactNode;
};

interface IDefaultLayoutProps {
  Page: TDefaultLayoutPage;
}

const DefaultLayout = ({ Page, ...props }: IDefaultLayoutProps) => {
  return (
    <main className="flex flex-col gap-8 m-14">
      <Page {...props} />
    </main>
  );
};

export const getDefaultLayout = (Page: TDefaultLayoutPage, props: Record<string, unknown>) => {
  return <DefaultLayout {...props} Page={Page} />;
};
