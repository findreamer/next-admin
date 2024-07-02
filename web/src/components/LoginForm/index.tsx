import React from "react";
import { Form, Input, Button } from "antd";
import { useForm } from "antd/lib/form/Form";

interface FormProps {
  onSubmit: (values: any) => void;
}

function LoginForm({ onSubmit }: FormProps) {
  const [form] = useForm();

  const handleSubmit = (values: any) => {
    onSubmit(values);
  };

  return (
    <div className="w-100 bg-white ">
    <Form form={form} onFinish={handleSubmit}>
      <Form.Item name="username" label="用户名">
        <Input />
      </Form.Item>
      <Form.Item name="password" label="密码">
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>

    </div>
  );
}

export default LoginForm;
