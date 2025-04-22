import React, { useEffect } from "react";
import {
  Card,
  Layout,
  List,
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
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const { Content } = Layout;
const { Title, Text: Typography_Text, Paragraph } = Typography;

const nav = [
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
      <Navbar nav={nav} selectedKey="home" />

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
                      style={{ color: "inherit", fontSize: "18px" }}
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
                        <CalendarOutlined
                          style={{ color: "#52c41a", marginLeft: "8vw" }}
                        />

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

      <Footer />
    </Layout>
  );
};

export default Home;
