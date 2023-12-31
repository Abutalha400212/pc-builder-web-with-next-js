"use client";
import { Layout } from "antd";
import Navbar from "../Shared/Navbar";
const { Content, Footer } = Layout;
const RootLayout = ({ children }) => {
  return (
    <Layout
      className="layout"
      style={{
        minHeight: "100vh",
      }}>
      <Navbar />
      <Content
        style={{
          background: "white",
          margin: 5,
        }}>
        {children}
      </Content>
      <Footer
        style={{
          textAlign: "center",
          color: "white",
          fontWeight: 500,
          backgroundColor: "black",
        }}>
        PC Builder ©2023 Created by Abu Talha
      </Footer>
    </Layout>
  );
};
export default RootLayout;
