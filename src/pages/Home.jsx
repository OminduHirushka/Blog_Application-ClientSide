import React, { useEffect, useState } from "react";
import { Card, Layout, List, Menu, message, theme, Empty } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

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

  const [posts, setPosts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      setIsLoaded(true);

      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/post/all-posts`
        );

        if (response.data && Array.isArray(response.data.posts)) {
          setPosts(response.data.posts);
        }
      } catch (error) {
        message.error("Failed to Load Posts");
      } finally {
        setIsLoaded(false);
      }
    };

    getPosts();
  }, []);

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
            loading={isLoaded}
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
