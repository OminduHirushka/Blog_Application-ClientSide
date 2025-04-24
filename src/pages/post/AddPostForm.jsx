import React, { useEffect } from "react";
import { Button, Form, Input, Layout, theme, message, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../state/admin/users/userAction";
import { createPost } from "../../state/user/post/postAction";
import toast from "react-hot-toast";

const { Content } = Layout;
const { TextArea } = Input;

const AddPostForm = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [form] = Form.useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.posts);
  const { isAuthenticated } = useSelector((state) => state.users);

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

  const handleCreate = async (values) => {
    try {
      await dispatch(createPost(values));

      toast.success("Post Created Successfully");
      navigate("/post");
    } catch (error) {
      toast.error("Failed to Create Post");
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ margin: "24px 16px 0" }}>
        <div
          style={{
            padding: 24,
            minHeight: 360,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Form
            form={form}
            layout="vertical"
            autoComplete="off"
            onFinish={handleCreate}
            style={{
              maxWidth: "800px",
              margin: "0 auto",
              padding: "20px",
              background: "#fff",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ marginBottom: "24px" }}>Create New Post</h2>

            <Form.Item
              name="blog_title"
              label="Title"
              rules={[{ required: true, message: "Please Input the Title!" }]}
            >
              <Input
                placeholder="Enter Post Title"
                size="large"
                style={{ borderRadius: "6px" }}
              />
            </Form.Item>

            <Form.Item
              name="blog_content"
              label="Content"
              rules={[{ required: true, message: "Please Input the Content!" }]}
            >
              <TextArea
                rows={10}
                placeholder="Enter Post Content"
                style={{ borderRadius: "6px" }}
              />
            </Form.Item>

            <Form.Item>
              <Space size="middle">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isLoading}
                  size="large"
                  style={{ borderRadius: "6px" }}
                >
                  Submit
                </Button>

                <Button
                  htmlType="button"
                  onClick={() => form.resetFields()}
                  size="large"
                  style={{ borderRadius: "6px" }}
                >
                  Reset
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default AddPostForm;
