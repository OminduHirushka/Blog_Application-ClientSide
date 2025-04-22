import React from "react";
import { Menu, Space, Typography } from "antd";
import { Link } from "react-router-dom";
import { LoginOutlined, UserAddOutlined } from "@ant-design/icons";

const { Title } = Typography;

const Navbar = ({ nav, selectedKey = "home" }) => {
  const navbar = [
    {
      key: "home",
      label: <Link to="/">Home</Link>,
    },
    {
      key: "login",
      icon: <LoginOutlined />,
      label: <Link to="/login">Login</Link>,
    },
    {
      key: "signup",
      icon: <UserAddOutlined />,
      label: <Link to="/signup">Sign Up</Link>,
    },
  ];

  const items = nav || navbar;

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        height: "10vh",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        background: "linear-gradient(90deg, #001529 0%, #003366 100%)",
      }}
    >
      <Space align="center">
        <Title
          level={2}
          style={{ color: "#fff", margin: 0, marginRight: "auto" }}
        >
          Blog Hub
        </Title>
      </Space>

      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[selectedKey]}
        items={items}
        style={{
          backgroundColor: "transparent",
          border: "none",
          marginLeft: "auto",
        }}
      />
    </div>
  );
};

export default Navbar;
