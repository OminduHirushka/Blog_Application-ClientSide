import React from "react";
import { Space, Typography } from "antd";

const { Text } = Typography;

const Footer = () => {
  return (
    <div
      style={{
        textAlign: "center",
        background: "#001529",
        padding: 24,
        color: "#fff",
      }}
    >
      <Space direction="vertical" size={0}>
        <Text strong style={{ color: "#1890ff" }}>
          Blog Hub
        </Text>
        <Text style={{ color: "#8c8c8c" }}>
          Created by Omindu Hirushka | © {new Date().getFullYear()}
        </Text>
      </Space>
    </div>
  );
};

export default Footer;
