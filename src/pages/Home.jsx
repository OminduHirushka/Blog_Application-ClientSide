import React, { useEffect } from "react";
import {
  Card,
  Layout,
  List,
  Menu,
  message,
  theme,
  Typography,
  Space,
  Avatar,
  Divider,
} from "antd";
import {
  LoginOutlined,
  UserAddOutlined,
  UserOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../state/user/post/postAction";

const { Header, Content, Footer } = Layout;
const { Title, Text: Typography_Text, Paragraph } = Typography;

const navbar = [
  {
    key: "home",
    label: "Home",
  },
  {
    key: "login",
    icon: <LoginOutlined />,
    label: <Link to={"/login"}>Login</Link>,
  },
  {
    key: "signup",
    icon: <UserAddOutlined />,
    label: <Link to={"/signup"}>Sign Up</Link>,
  },
];

const Home = () => {
  const {
    token: { borderRadiusLG, colorPrimary },
  } = theme.useToken();

  const dispatch = useDispatch();
  const { posts, isLoading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
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
          defaultSelectedKeys={["home"]}
          items={navbar}
          style={{
            backgroundColor: "transparent",
            border: "none",
            marginLeft: "auto",
          }}
        />
      </Header>

      <Content style={{ padding: "24px 48px", background: "#f5f5f5" }}>
        <div
          style={{
            background: "linear-gradient(135deg, #1890ff 0%, #69c0ff 100%)",
            padding: "24px",
            borderRadius: borderRadiusLG,
            marginBottom: 24,
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        >
          <Title level={2} style={{ marginBottom: 0, color: "#fff" }}>
            All Posts
          </Title>
        </div>

        <List
          dataSource={posts}
          loading={isLoading}
          grid={{
            gutter: 24,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 3,
            xl: 3,
          }}
          renderItem={(post, index) => (
            <List.Item>
              <Card
                hoverable
                style={{
                  height: "100%",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
                  borderRadius: "12px",
                  overflow: "hidden",
                  borderTop: `4px solid ${theme.defaultConfig.token.colorPrimary}`,
                }}
                bodyStyle={{
                  padding: 20,
                  height: "100%",
                }}
                cover={
                  <div
                    style={{
                      height: 8,
                      background: `${colorPrimary}`,
                    }}
                  />
                }
              >
                <Space direction="vertical" size={16} style={{ width: "100%" }}>
                  <Title level={3} style={{ margin: 0 }}>
                    {post?.blog_title || "Untitled Post"}
                  </Title>

                  <Divider style={{ margin: "12px 0" }} />

                  <div style={{ minHeight: "100px", color: "#595959" }}>
                    <Paragraph
                      ellipsis={{ rows: 3 }}
                      style={{ color: "inherit", fontSize:"18px" }}
                    >
                      {post?.blog_content || "No content available"}
                    </Paragraph>
                  </div>

                  <Card
                    size="small"
                    style={{
                      backgroundColor: "#f9f9f9",
                      borderRadius: "8px",
                      border: "1px solid #f0f0f0",
                    }}
                  >
                    <Space style={{ color: "#8c8c8c", fontSize: 13 }}>
                      <Space size={4}>
                        <Avatar
                          size="small"
                          icon={<UserOutlined />}
                          style={{ backgroundColor: colorPrimary }}
                        />
                        <Typography_Text type="secondary">
                          {post.user_email}
                        </Typography_Text>
                      </Space>

                      <Divider type="vertical" />

                      <Space size={4}>
                        <CalendarOutlined style={{ color: "#52c41a", marginLeft:"8vw" }} />
                        
                        <Typography_Text type="secondary">
                          {new Date(post.created_at).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </Typography_Text>
                      </Space>
                    </Space>
                  </Card>
                </Space>
              </Card>
            </List.Item>
          )}
        />
      </Content>

      <Footer
        style={{
          textAlign: "center",
          background: "#001529",
          padding: 24,
          color: "#fff",
        }}
      >
        <Space direction="vertical" size={0}>
          <Typography_Text strong style={{ color: "#1890ff" }}>
            Blog Hub
          </Typography_Text>
          <Typography_Text style={{ color: "#8c8c8c" }}>
            Created by Omindu Hirushka | © {new Date().getFullYear()}
          </Typography_Text>
        </Space>
      </Footer>
    </Layout>
  );
};

export default Home;
