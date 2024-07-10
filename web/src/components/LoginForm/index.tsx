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
        <div className="w-100 bg-white p-6 rounded-md shadow-md">
            <h2 className="text-center mb-4">next-admin后台管理系统</h2>
            <Form form={form} onFinish={handleSubmit}>
                <Form.Item name="username" label="用户名" rules={[{required: true, message: "请输入用户名"}]}>
                    <Input />
                </Form.Item>
                <Form.Item name="password" label="密码" rules={[{required: true, message: "请输入密码"}]}>
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
