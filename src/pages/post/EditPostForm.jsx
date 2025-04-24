import React, { useEffect } from "react";
import { Button, Form, Input, Layout, theme, Space } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentPost, updatePost } from "../../state/user/post/postAction";
import toast from "react-hot-toast";

const { Header, Content } = Layout;
const { TextArea } = Input;

const EditPostForm = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [form] = Form.useForm();
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.posts);
  const { isAuthenticated } = useSelector((state) => state.users);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const getPost = async () => {
      const post = await dispatch(getCurrentPost(id));

      if (post) {
        form.setFieldsValue({
          blog_title: post.blog_title,
          blog_content: post.blog_content,
        });
      } else {
        toast.error("Failed to Load Post");
        navigate("/post");
      }
    };

    getPost();
  }, [dispatch, id, form, navigate]);

  const handleUpdate = async (values) => {
    try {
      await dispatch(updatePost(id, values));

      toast.success("Post Updated Successfully");
      navigate("/post");
    } catch (error) {
      toast.error("Failed to Update Post");
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ padding: 0, background: colorBgContainer }} />
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
            onFinish={handleUpdate}
            style={{
              maxWidth: "800px",
              margin: "0 auto",
              padding: "20px",
              background: "#fff",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ marginBottom: "24px" }}>Edit Post</h2>

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
                  Update
                </Button>

                <Button
                  htmlType="button"
                  onClick={() => navigate("/post")}
                  size="large"
                  style={{ borderRadius: "6px" }}
                >
                  Cancel
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default EditPostForm;
