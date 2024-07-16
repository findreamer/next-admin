"use client";
import LoginForm from "@/components/LoginForm";
import "./index.css";
import { useUserStore } from "@/store/useUserStore";
import { useState } from "react";

const LoginPage = () => {
  const { login } = useUserStore();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (params: any) => {
    console.log("handleSubmit", params);
    try {
      const res = await login(params);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="login-page w-screen h-screen flex items-center justify-center">
      <LoginForm onSubmit={handleSubmit} loading={loading} />
    </main>
  );
};

export default LoginPage;
