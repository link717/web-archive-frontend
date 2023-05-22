import { Form, FormProps } from 'antd';
import React, { PropsWithChildren } from 'react';

interface IDefaultFormProps extends FormProps {}

const DefaultForm = <T,>({ children, ...formProps }: PropsWithChildren<IDefaultFormProps>) => {
  return (
    <Form<T> layout="vertical" requiredMark={false} {...formProps}>
      {children}
    </Form>
  );
};

export default React.memo(DefaultForm);
