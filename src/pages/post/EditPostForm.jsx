import React, { useEffect, useState } from "react";
import { Button, Form, Input, Layout, theme, message, Space } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentPost, updatePost } from "../../state/user/post/postAction";

const { Header, Content, Footer } = Layout;
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
        message.error("Failed to Load Post");
        navigate("/post");
      }
    };

    getPost();
  }, [dispatch, id, form, navigate]);

  const handleUpdate = async (values) => {
    try {
      await dispatch(updatePost(id, values));

      message.success("Post Updated Successfully");
      navigate("/post");
    } catch (error) {
      message.error("Failed to Update Post");
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
                  Update
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
