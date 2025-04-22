import React, { useEffect } from "react";
import { Button, Form, Input, Layout, Menu, theme, message, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../state/admin/users/userAction";
import { createPost } from "../../state/user/post/postAction";

const { Header, Content } = Layout;
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

      message.success("Post Created Successfully");
      navigate("/post");
    } catch (error) {
      message.error("Failed to Create Post");
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
            onFinish={handleCreate}
          >
            <Form.Item
              name="blog_title"
              label="Title"
              rules={[{ required: true, message: "Please Input the Title!" }]}
            >
              <Input placeholder="Enter Post Title" />
            </Form.Item>

            <Form.Item
              name="blog_content"
              label="Content"
              rules={[{ required: true, message: "Please Input the Content!" }]}
            >
              <TextArea rows={6} placeholder="Enter Post Content" />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                  Submit
                </Button>

                <Button htmlType="button" onClick={() => form.resetFields()}>
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
