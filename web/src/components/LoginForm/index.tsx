"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useUserStore } from "@/store/useUserStore";
import { getCaptcha } from "@/api/index";

interface FormProps {
  loading: boolean;
  onSubmit: (values: any) => void;
}

function LoginForm({ onSubmit, loading }: FormProps) {
  const [form] = useForm();

  const handleSubmit = (values: any) => {
    onSubmit(values);
  };
  const fetchCache = useCallback(async () => {
    const res = await getCaptcha();
    console.log(res);
  }, []);

  useEffect(() => {
    fetchCache();
  }, [fetchCache]);

  return (
    <div className="w-100 bg-white p-6 rounded-md shadow-md">
      <h2 className="text-center mb-4">next-admin后台管理系统</h2>
      <Form
        layout="horizontal"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19 }}
        form={form}
        onFinish={handleSubmit}
        disabled={loading}
      >
        <Form.Item
          name="username"
          label="用户名"
          rules={[{ required: true, message: "请输入用户名" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item name={"code"} label="验证码"></Form.Item>

        <Form.Item wrapperCol={{ offset: 5, span: 19 }}>
          <div className="flex justify-end">
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}

export default LoginForm;
