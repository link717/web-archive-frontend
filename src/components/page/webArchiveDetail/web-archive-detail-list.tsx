import { Alert } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React from 'react';
import { ISO8601DateTime } from '@common/types/common';
import DefaultCard from '@components/layout/default-card';
import DefaultTable, { DEFAULT_PAGE_SIZE } from '@components/layout/default-table';
import { IWebArchiveDetail, IWebArchiveDetailParams, useWebArchiveDetailList } from '@services/webArchive';
import { SERVER_DATE_FORMAT } from '../constant';

interface WebArchiveDetailListProps {
  url: string;
}

const WebArchiveDetailList = ({ url }: WebArchiveDetailListProps) => {
  const router = useRouter();
  const { from, to, page = 1 } = router.query as IWebArchiveDetailParams;

  const { data, isLoading, error } = useWebArchiveDetailList({
    url,
    from: dayjs(from).format(SERVER_DATE_FORMAT),
    to: dayjs(to).format(SERVER_DATE_FORMAT),
    page: Number(page) || 0,
  });

  const columns: ColumnsType<IWebArchiveDetail> = [
    {
      title: 'No',
      width: 20,
      align: 'center',
      render: (_, __, index) => index + 1 + DEFAULT_PAGE_SIZE * (page - 1),
    },
    {
      title: '생성일시',
      dataIndex: 'timestamp',
      align: 'center',
      width: 120,
      render: (value: ISO8601DateTime) => {
        return <span className="block">{dayjs(value).format('YYYY/MM/DD HH:mm')}</span>;
      },
    },
    {
      title: 'URL',
      dataIndex: 'original',
      align: 'center',
      width: 100,
      render: (_, record) => {
        const linkUrl = `${process.env.NEXT_PUBLIC_API_URL}/web/${record.timestamp}/${record.original}`;
        return <a href={linkUrl}>{record.original}</a>;
      },
    },
    {
      title: 'MIME 타입',
      dataIndex: 'mimetype',
      width: 100,
      align: 'center',
      render: (value: string) => {
        return <span>{value}</span>;
      },
    },
    {
      title: '상태 코드',
      dataIndex: 'statuscode',
      width: 100,
      align: 'center',
      render: (value: string) => {
        return <span>{value}</span>;
      },
    },
  ];

  const handleChangePage = (pageNumber: number) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: pageNumber },
    });
  };

  if (error) {
    return <Alert message="데이터를 불러오는 중 오류가 발생했습니다." type="error" />;
  }

  return (
    <DefaultCard title="아카이빙 목록">
      <DefaultTable<IWebArchiveDetail>
        loading={isLoading}
        columns={columns}
        dataSource={data}
        pagination={{
          current: Number(router.query.page || 1),
          pageSizeOptions: [],
          showSizeChanger: false,
          defaultPageSize: DEFAULT_PAGE_SIZE,
          onChange: handleChangePage,
        }}
      />
    </DefaultCard>
  );
};

export default WebArchiveDetailList;
