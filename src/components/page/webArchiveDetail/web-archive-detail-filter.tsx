import { Button, DatePicker, Form } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import dayjs from 'dayjs';
import { Search } from 'lucide-react';
import { useRouter } from 'next/router';
import React from 'react';
import { getToday } from '@common/utils/util';
import DefaultCard from '@components/layout/default-card';
import DefaultForm from '@components/layout/default-form';
import { IWebArchiveDetailListFilterFormValue } from '@services/webArchive';
import { CLIENT_DATE_FORMAT } from '../constant';

import 'dayjs/locale/ko';

const { RangePicker } = DatePicker;

const WebArchiveDetailFilter = () => {
  const router = useRouter();
  const { url, from, to } = router.query;
  const [form] = useForm();

  const handleFinish = (formValue: IWebArchiveDetailListFilterFormValue) => {
    const query: Record<string, string> = { url: url as string };

    if (formValue.filterDateRange) {
      query.from = formValue.filterDateRange[0].format(CLIENT_DATE_FORMAT);
      query.to = formValue.filterDateRange[1].format(CLIENT_DATE_FORMAT);
    }

    router.push({
      pathname: router.pathname,
      query,
    });
  };

  const handleDisabledDate = (current: dayjs.Dayjs) => {
    if (!current) return false;
    return current > getToday();
  };

  const toDayjs = (date?: string | string[]) => {
    if (typeof date === 'string') {
      return date ? dayjs(date) : null;
    }
    return null;
  };

  return (
    <DefaultCard title="검색 필터">
      <DefaultForm form={form} onFinish={handleFinish} layout="horizontal">
        <Form.Item label="조회 기간" name="filterDateRange" initialValue={[toDayjs(from), toDayjs(to)]}>
          <RangePicker format={CLIENT_DATE_FORMAT} disabledDate={handleDisabledDate} />
        </Form.Item>

        <Button htmlType="submit" type="primary" className="btn-with-icon" icon={<Search />}>
          검색
        </Button>
      </DefaultForm>
    </DefaultCard>
  );
};

export default WebArchiveDetailFilter;
