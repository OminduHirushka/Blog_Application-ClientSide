import React from "react";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Link } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

const Home = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        style={{
          width: "50px",
        }}
      >
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{
            marginTop: "20px",
            paddingTop: "20px",
            fontSize: "18px",
          }}
        >
          <Menu.Item key={"1"} icon={<UserOutlined />}>
            <Link to={"/"}>Posts</Link>
          </Menu.Item>
          <Menu.Item key={"2"} icon={<UploadOutlined />}>
            <Link to={"/"}>Add Posts</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 600,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          ></div>
        </Content>

        <Footer style={{ textAlign: "center" }}>
          Omindu Hirushka
          <br />©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Home;
