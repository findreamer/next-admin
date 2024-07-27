"use client";
import LoginForm from "@/components/LoginForm";
import "./index.css";
import { useUserStore } from "@/store/useUserStore";
import { useState } from "react";
import { Tabs } from "antd";

const LoginPage = () => {
  const { login, register } = useUserStore();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (params: any) => {
    console.log("handleSubmit", params);
    setLoading(true);
    try {
      const res = await login(params);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (params: any) => {
    console.log("handleSubmit", params);
    setLoading(true);
    try {
      const res = await register(params);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page w-screen h-screen flex items-center justify-center">
      <div className="w-100 bg-white p-6 rounded-md shadow-md">
        <h2 className="text-center mb-2">next-admin后台管理系统</h2>
        <Tabs
          defaultActiveKey="login"
          items={[
            {
              label: "登录",
              key: "login",
              children: <LoginForm onSubmit={handleSubmit} loading={loading} />,
            },
            {
              label: "注册",
              key: "register",
              children: (
                <LoginForm onSubmit={handleRegister} loading={loading} />
              ),
            },
          ]}
        />
      </div>
    </main>
  );
};

export default LoginPage;
