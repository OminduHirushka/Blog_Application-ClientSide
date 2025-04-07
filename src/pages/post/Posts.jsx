import React, { useEffect, useState } from "react";
import {
  LogoutOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Card, Layout, List, Menu, message, Space, theme } from "antd";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import AddPostForm from "./AddPostForm";
import EditPostForm from "./EditPostForm";

const { Header, Content, Footer, Sider } = Layout;

const Posts = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [posts, setPosts] = useState([]);
  const [isPostLoaded, setIsPostLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    getUserByEmail(token);
  }, [navigate]);

  useEffect(() => {
    if (user && user.email) {
      getUserPosts(user.email);
    }
  }, [user]);

  const getUserByEmail = async (token) => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/user/me", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setUser(response.data.user);
    } catch (error) {
      message.error("Failed to load user data");
    }
  };

  const getUserPosts = async (email) => {
    setIsPostLoaded(true);

    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/post/user-posts/${email}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.data && Array.isArray(response.data.post)) {
        setPosts(response.data.post);
      } else {
        setPosts([]);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setPosts([]);
      } else {
        message.error("Failed to load posts");
      }
    } finally {
      setIsPostLoaded(false);
    }
  };

  const handleDelete = async (id) => {
    setIsPostLoaded(true);
    const token = localStorage.getItem("token");

    try {
      await axios.delete(
        `http://localhost:3000/api/v1/post/delete-posts/${id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (user && user.email) {
        getUserPosts(user.email);
      }
      message.success("Post Deleted Successfully");
    } catch (error) {
      message.error("Failed to Delete Post");
    } finally {
      setIsPostLoaded(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
    message.success("Logged out successfully");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
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
            <Link to={"/post"}>My Posts</Link>
          </Menu.Item>
          <Menu.Item key={"2"} icon={<UploadOutlined />}>
            <Link to={"/post/add-posts"}>Add Posts</Link>
          </Menu.Item>

          <Menu.Item
            key={"3"}
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            style={{
              position: "absolute",
              bottom: "50px",
              width: "100%",
            }}
          >
            Logout
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
          >
            <Routes>
              <Route
                index
                element={
                  <>
                    <h2>My Posts</h2>
                    {posts.length === 0 && !isPostLoaded ? (
                      <p>You haven't created any posts yet.</p>
                    ) : (
                      <List
                        dataSource={posts}
                        loading={isPostLoaded}
                        grid={{ gutter: 16, column: 3 }}
                        renderItem={(post) => (
                          <List.Item>
                            <Card
                              title={post.blog_title}
                              extra={
                                <Space>
                                  <Link to={`edit-post/${post.blog_id}`}>
                                    <Button type="primary">Edit</Button>
                                  </Link>

                                  <Button
                                    danger
                                    onClick={() => handleDelete(post.blog_id)}
                                  >
                                    Delete
                                  </Button>
                                </Space>
                              }
                            >
                              {post.blog_content}
                            </Card>
                          </List.Item>
                        )}
                      />
                    )}
                  </>
                }
              />

              <Route path="add-posts" element={<AddPostForm />} />
              <Route path="edit-post/:id" element={<EditPostForm />} />
            </Routes>
          </div>
        </Content>

        <Footer style={{ textAlign: "center" }}>
          Omindu Hirushka
          <br />©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Posts;
