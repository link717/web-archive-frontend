import { Button, Form, Input, message } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { Search } from 'lucide-react';
import React from 'react';
import useLocalStorage from '@common/hooks/useLocalStorage';
import { generatePrefixedId } from '@common/utils/util';
import DefaultCard from '@components/layout/default-card';
import DefaultForm from '@components/layout/default-form';
import { ALREADY_EXIST_URL_ERROR_MESSAGE, SAVE_MAX_COUNT, WEB_ARCHIVE_STORAGE_KEY } from '@components/page/constant';
import { IWebArchive, IWebArchiveFormValue } from '@services/webArchive';

interface IWebArchiveFormProps {
  setWebArchive: React.Dispatch<React.SetStateAction<IWebArchive[]>>;
}

const WebArchiveForm = ({ setWebArchive }: IWebArchiveFormProps) => {
  const [form] = useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const { getLocalStorage, setLocalStorage } = useLocalStorage<IWebArchive>(WEB_ARCHIVE_STORAGE_KEY);

  const isPossibleToSave = (savedStorageData: IWebArchive[], maxCount: number): boolean => {
    return (savedStorageData?.length || 0) < maxCount;
  };

  const getSaveMaxCountErrorMessage = (maxCount: number): string => {
    return `최대 ${maxCount}개까지만 저장할 수 있습니다.`;
  };

  const handleFinish = (formValue: IWebArchiveFormValue) => {
    try {
      const savedStorageData = getLocalStorage();
      const isDuplicateData = savedStorageData.some((data) => data.url === formValue.url);

      const newStorageData: IWebArchive = {
        id: generatePrefixedId(WEB_ARCHIVE_STORAGE_KEY),
        createdDate: new Date().toISOString(),
        url: formValue.url,
      };

      if (isDuplicateData) {
        throw new Error(ALREADY_EXIST_URL_ERROR_MESSAGE);
      }

      if (isPossibleToSave(savedStorageData, SAVE_MAX_COUNT)) {
        const res = setLocalStorage([...savedStorageData, newStorageData]);
        setWebArchive(res);
        form.resetFields();
      } else {
        throw new Error(getSaveMaxCountErrorMessage(SAVE_MAX_COUNT));
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
