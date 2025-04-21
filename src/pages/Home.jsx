import React, { useEffect } from "react";
import { Card, Layout, List, Menu, message, theme } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../state/user/post/postAction";

const { Header, Content, Footer } = Layout;

const navbar = [
  {
    key: "1",
    label: <Link to={"/login"}>Login</Link>,
  },
  {
    key: "2",
    label: <Link to={"/signup"}>Sign Up</Link>,
  },
];

const Home = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const dispatch = useDispatch();
  const { posts, isLoading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getAllPosts())
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
        }}
      >
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[0]}
          items={navbar}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>

      <Content style={{ padding: "0 48px" }}>
        <div
          style={{
            marginTop: 30,
            padding: 24,
            minHeight: 600,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <List
            dataSource={posts}
            loading={isLoading}
            grid={{ gutter: 16, column: 3 }}
            renderItem={(post) => (
              <List.Item>
                <Card title={post?.blog_title || "Untitled Post"}>
                  {post?.blog_content || "No content available"}

                  <p className="m-4">
                    <small>
                      {post.user_email}
                      <br />
                      {new Date(post.created_at).toLocaleDateString()}
                    </small>
                  </p>
                </Card>
              </List.Item>
            )}
          />
        </div>
      </Content>

      <Footer style={{ textAlign: "center" }}>
        Omindu Hirushka
        <br />©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
};

export default Home;
