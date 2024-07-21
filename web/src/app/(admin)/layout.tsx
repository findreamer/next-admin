"use client";
import React from "react";
import { Layout } from "antd";

const { Header, Sider, Content } = Layout;

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout className="w-screen h-screen">
      <Header></Header>
      <Layout>
        <Sider></Sider>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
