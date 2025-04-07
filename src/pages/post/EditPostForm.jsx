import React, { useEffect, useState } from "react";
import { Button, Form, Input, Layout, theme, message, Space } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const { Header, Content, Footer } = Layout;
const { TextArea } = Input;

const EditPostForm = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [form] = Form.useForm();
  const { id } = useParams();
  const [isPostLoaded, setIsPostLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getPost = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/v1/post/all-posts/${id}`
        );

        form.setFieldsValue({
          blog_title: data.post.blog_title,
          blog_content: data.post.blog_content,
        });
      } catch (error) {
        message.error("Failed to Load Post");
      }
    };

    getPost();
  }, [id, form, navigate]);

  const handleUpdate = async (values) => {
    setIsPostLoaded(true);

    const token = localStorage.getItem("token");


    try {
      await axios.put(
        `http://localhost:3000/api/v1/post/update-posts/${id}`,
        values,
        {
          headers: {
            Authorization: "Brearer " + token,
          },
        }
      );
      navigate("/post");
      message.success("Post Updated Successfully");
    } catch (error) {
      message.error("Failed to Update Post");
    } finally {
      setIsPostLoaded(false);
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
                <Button type="primary" htmlType="submit" loading={isPostLoaded}>
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
