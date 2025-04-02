import React, { useState } from "react";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Layout, Menu, theme, message, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const { Header, Content, Footer, Sider } = Layout;
const { TextArea } = Input;

const AddPostForm = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [form] = Form.useForm();
  const [isFormLoaded, setisFormLoaded] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async (values) => {
    setisFormLoaded(true);

    try {
      await axios.post("http://localhost:3000/api/v1/add-post", values);
      navigate("/");
      message.success("Post Added Successfully");
    } catch (error) {
      message.error("Failed to Add Post");
    } finally {
      setisFormLoaded(false);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        style={{
          width: "50px",
        }}
      >
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["2"]}
          style={{
            marginTop: "20px",
            paddingTop: "20px",
            fontSize: "18px",
          }}
        >
          <Menu.Item key={"1"} icon={<UserOutlined />}>
            <Link to={"/"}>Posts</Link>
          </Menu.Item>
          <Menu.Item key={"2"} icon={<UploadOutlined />}>
            <Link to={"/add-posts"}>Add Posts</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
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
                rules={[
                  { required: true, message: "Please Input the Content!" },
                ]}
              >
                <TextArea rows={6} placeholder="Enter Post Content" />
              </Form.Item>

              <Form.Item>
                <Space>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isFormLoaded}
                  >
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

        <Footer style={{ textAlign: "center" }}>
          Omindu Hirushka
          <br />©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AddPostForm;
