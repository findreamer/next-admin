"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Form, Input, Button, Space } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useUserStore } from "@/store/useUserStore";
import { getCaptcha } from "@/api/index";
import { LoadingOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";

interface FormProps {
  loading: boolean;
  onSubmit: (values: any) => void;
}

function LoginForm({ onSubmit, loading }: FormProps) {
  const [form] = useForm();
  const [captcha, setCaptcha] = useState<any>({});

  const handleSubmit = (values: any) => {
    onSubmit({
      ...values,
      uuid: captcha.uuid,
    });
  };
  const fetchCache = useCallback(async () => {
    const res = await getCaptcha();
    setCaptcha(res.data);
  }, []);

  useEffect(() => {
    fetchCache();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="">
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
        <Form.Item name={"code"} label="验证码" rules={[{ required: true }]}>
          <div className="flex items-center">
            <Input />
            {captcha.img ? (
              <div
                className={styles["captcha-img"]}
                onClick={fetchCache}
                dangerouslySetInnerHTML={{ __html: captcha.img }}
              ></div>
            ) : (
              <LoadingOutlined />
            )}
          </div>
        </Form.Item>

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
