import React, { useEffect } from "react";
import {
  LogoutOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Card, Layout, List, Menu, message, Space, theme } from "antd";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import AddPostForm from "./AddPostForm";
import EditPostForm from "./EditPostForm";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../state/admin/users/userAction";
import { deletePost, getUserPosts } from "../../state/user/post/postAction";
import { logoutRequest } from "../../state/admin/users/userSlice";

const { Header, Content, Footer, Sider } = Layout;

const Posts = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.users);
  const { posts, isLoading } = useSelector((state) => state.posts);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    dispatch(getCurrentUser()).then((success) => {
      if (!success) {
        navigate("/login");
      }
    });
  }, [dispatch, isAuthenticated, navigate]);

  useEffect(() => {
    if (user && user.email) {
      dispatch(getUserPosts(user.email));
    }
  }, [dispatch, user]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deletePost(id));
      message.success("Post Deleted Successfully");
    } catch (error) {
      message.error("Failed to Delete Post");
    }
  };

  const handleLogout = () => {
    dispatch(logoutRequest());

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
                    {posts.length === 0 && !isLoading ? (
                      <p>You haven't created any posts yet.</p>
                    ) : (
                      <List
                        dataSource={posts}
                        loading={isLoading}
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
