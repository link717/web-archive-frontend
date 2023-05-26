import { Button, Popconfirm } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import Link from 'next/link';
import React from 'react';
import useLocalStorage from '@common/hooks/useLocalStorage';
import { ISO8601DateTime } from '@common/types/common';
import DefaultCard from '@components/layout/default-card';
import DefaultTable from '@components/layout/default-table';
import { IWebArchive } from '@services/webArchive';
import { WEB_ARCHIVE_STORAGE_KEY } from '../constant';

interface IWebArchiveListProps {
  webArchive: IWebArchive[];
  setWebArchive: React.Dispatch<React.SetStateAction<IWebArchive[]>>;
}

const WebArchiveList = ({ webArchive, setWebArchive }: IWebArchiveListProps) => {
  const { setLocalStorage } = useLocalStorage(WEB_ARCHIVE_STORAGE_KEY);

  const handleDeleteURL = (id: string) => {
    const filteredWebArchive = webArchive.filter((data) => data.id !== id);
    const res = setLocalStorage(filteredWebArchive) as IWebArchive[];
    setWebArchive(res);
  };
  const columns: ColumnsType<IWebArchive> = [
    {
      title: 'No',
      width: 20,
      align: 'center',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'URL',
      dataIndex: 'url',
      align: 'center',
      width: 100,
      render: (value: string) => {
        return <Link href={`/web-archive-detail?url=${value}`}>{value}</Link>;
      },
    },
    {
      title: '생성일시',
      dataIndex: 'createdDate',
      align: 'center',
      width: 120,
      render: (value: ISO8601DateTime) => {
        return <span className="block">{dayjs(value).format('YYYY/MM/DD HH:mm')}</span>;
      },
    },
    {
      title: '비고',
      key: 'action',
      width: 100,
      align: 'center',
      render: (_value: unknown, record: IWebArchive) => {
        return (
          <Popconfirm title="URL을 삭제하시겠습니까?" onConfirm={() => handleDeleteURL(record.id)} okText="예" cancelText="아니오">
            <Button type="primary" danger>
              삭제
            </Button>
          </Popconfirm>
        );
      },
    },
  ];

  return (
    <DefaultCard title="관심 사이트 목록">
      <DefaultTable<IWebArchive> columns={columns} dataSource={webArchive} pagination={false} />
    </DefaultCard>
  );
};

export default WebArchiveList;
