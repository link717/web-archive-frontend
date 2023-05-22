import { Table, TableProps } from 'antd';
import React, { PropsWithChildren } from 'react';

interface IDefaultTableProps<T> extends TableProps<T> {
  countLabel?: number;
}

export const DEFAULT_PAGE_SIZE = 20;

const DefaultTable = <T extends object>({ children, ...tableProps }: PropsWithChildren<IDefaultTableProps<T>>) => {
  return (
    <Table<T> size="small" rowKey="id" tableLayout="fixed" scroll={{ x: 800 }} bordered {...tableProps}>
      {children}
    </Table>
  );
};

export default React.memo(DefaultTable) as typeof DefaultTable;
