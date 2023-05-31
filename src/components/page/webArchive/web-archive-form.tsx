import { Button, Form, Input, message } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { Search } from 'lucide-react';
import React from 'react';
import useLocalStorage from '@common/hooks/useLocalStorage';
import { generatePrefixedId } from '@common/utils/util';
import DefaultCard from '@components/layout/default-card';
import DefaultForm from '@components/layout/default-form';
import { SAVE_MAX_COUNT, WEB_ARCHIVE_STORAGE_KEY } from '@components/page/constant';
import { IWebArchive, IWebArchiveFormValue } from '@services/webArchive';
import validateAndCheckURLForm from './validator';

interface IWebArchiveFormProps {
  setWebArchive: React.Dispatch<React.SetStateAction<IWebArchive[]>>;
}

const WebArchiveForm = ({ setWebArchive }: IWebArchiveFormProps) => {
  const [form] = useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const { getLocalStorage, setLocalStorage } = useLocalStorage<IWebArchive>(WEB_ARCHIVE_STORAGE_KEY);

  const handleFinish = (formValue: IWebArchiveFormValue) => {
    try {
      const savedStorageData = getLocalStorage();

      const newStorageData: IWebArchive = {
        id: generatePrefixedId(WEB_ARCHIVE_STORAGE_KEY),
        createdDate: new Date().toISOString(),
        url: formValue.url,
      };

      const isValidURLForm = validateAndCheckURLForm(formValue.url, savedStorageData, SAVE_MAX_COUNT);

      if (isValidURLForm) {
        const res = setLocalStorage([...savedStorageData, newStorageData]);
        setWebArchive(res);
        form.resetFields();
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        messageApi.error(e.message);
      }
    }
  };

  return (
    <>
      {contextHolder}
      <DefaultCard title="관심 사이트 등록">
        <DefaultForm form={form} onFinish={handleFinish}>
          <Form.Item name="url" rules={[{ required: true, message: '필수값입니다' }]}>
            <Input placeholder="URL을 입력하세요." />
          </Form.Item>
          <Button htmlType="submit" type="primary" className="btn-with-icon" icon={<Search />}>
            추가
          </Button>
        </DefaultForm>
      </DefaultCard>
    </>
  );
};

export default WebArchiveForm;
