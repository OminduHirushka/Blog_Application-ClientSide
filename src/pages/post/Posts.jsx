import React, { useEffect } from "react";
import {
  LogoutOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Layout,
  List,
  Menu,
  Space,
  theme,
  Typography,
} from "antd";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import AddPostForm from "./AddPostForm";
import EditPostForm from "./EditPostForm";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../state/admin/users/userAction";
import { deletePost, getUserPosts } from "../../state/user/post/postAction";
import { logoutRequest } from "../../state/admin/users/userSlice";
import toast from "react-hot-toast";

const { Content, Sider } = Layout;
const { Title } = Typography;

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
      toast.success("Post Deleted Successfully");
    } catch (error) {
      toast.error("Failed to Delete Post");
    }
  };

  const handleLogout = () => {
    dispatch(logoutRequest());

    navigate("/login");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        style={{
          height: "100vh",
          position: "fixed",
          zIndex: 10,
        }}
      >
        <div
          className="logo"
          style={{
            height: "64px",
            margin: "16px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          Blog Hub
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{
            fontSize: "16px",
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
          </Menu.Item>{" "}
        </Menu>
      </Sider>

      <Layout>
        <Content style={{ marginLeft: 200 }}>
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
                    <Title level={2}>My Posts</Title>
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
                              hoverable
                              style={{
                                height: "100%",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                                borderRadius: "8px",
                                border: "1px solid #e8e8e8",
                                background: "#ffffff",
                              }}
                              bodyStyle={{
                                background: "#f7f7f7",
                                borderBottom: "1px solid #e8e8e8",
                              }}
                              extra={
                                <Space>
                                  <Link to={`edit-post/${post.blog_id}`}>
                                    <Button type="primary" size="small">
                                      Edit
                                    </Button>
                                  </Link>

                                  <Button
                                    danger
                                    size="small"
                                    onClick={() => handleDelete(post.blog_id)}
                                  >
                                    Delete
                                  </Button>
                                </Space>
                              }
                            >
                              <div
                                style={{
                                  height: "120px",
                                  overflow: "hidden",
                                  padding: "4px",
                                }}
                              >
                                {post.blog_content}
                              </div>
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
      </Layout>
    </Layout>
  );
};

export default Posts;
