import React, { useState } from "react";
import { Button, Form, Input, Layout, Menu, theme, message, Space } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const { Header, Content } = Layout;
const { TextArea } = Input;

const AddPostForm = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const token = localStorage.getItem("token");
  if (token == null) {
    navigate("/login");
  }

  const [form] = Form.useForm();
  const [isFormLoaded, setisFormLoaded] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async (values) => {
    setisFormLoaded(true);

    try {
      await axios.post("http://localhost:3000/api/v1/post/add-post", values, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      navigate("/post");
      message.success("Post Added Successfully");
    } catch (error) {
      message.error("Failed to Add Post");
    } finally {
      setisFormLoaded(false);
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
                <Button type="primary" htmlType="submit" loading={isFormLoaded}>
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
