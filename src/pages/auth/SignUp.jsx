import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Card,
  Typography,
  message,
  theme,
  Space,
  Flex,
} from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Text, Link } = Typography;
const { useToken } = theme;

const SignUp = () => {
  const { token } = useToken();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (values) => {
    setIsLoading(true);

    try {
      const result = await axios.post(
        "http://localhost:3000/api/v1/auth/signup",
        {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
        }
      );

      message.success("Registration successful!");
      navigate("/login");
    } catch (err) {
      console.log(err);
      if (err.response && err.response.status === 400) {
        message.error("Email already exists");
      } else {
        message.error("Registration failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex
      align="center"
      justify="center"
      style={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${token.colorPrimary} 0%, #52c41a 100%)`,
        padding: 24,
      }}
    >
      <Card
        style={{
          width: 450,
          borderRadius: 12,
          boxShadow: "0 6px 16px 0 rgba(0, 0, 0, 0.12)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(8px)",
        }}
        body={{ padding: 40 }}
        hoverable
      >
        <Space
          direction="vertical"
          align="center"
          style={{ width: "100%", marginBottom: 30 }}
        >
          <div
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              width: 80,
              height: 80,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 16,
            }}
          >
            <UserOutlined
              style={{
                fontSize: 36,
                color: token.colorPrimary,
              }}
            />
          </div>
          <Text style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "20px" }}>
            Create an account
          </Text>
        </Space>

        <Form form={form} name="signup" onFinish={handleSignUp} layout="vertical">
          <Form.Item
            name="firstName"
            rules={[{ required: true, message: "Please input your first name!" }]}
          >
            <Input
              prefix={
                <UserOutlined style={{ color: "rgba(255, 255, 255, 0.7)" }} />
              }
              placeholder="First Name"
              size="large"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                borderColor: "rgba(255, 255, 255, 0.3)",
                color: "#fff",
              }}
            />
          </Form.Item>

          <Form.Item
            name="lastName"
            rules={[{ required: true, message: "Please input your last name!" }]}
          >
            <Input
              prefix={
                <UserOutlined style={{ color: "rgba(255, 255, 255, 0.7)" }} />
              }
              placeholder="Last Name"
              size="large"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                borderColor: "rgba(255, 255, 255, 0.3)",
                color: "#fff",
              }}
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              prefix={
                <MailOutlined style={{ color: "rgba(255, 255, 255, 0.7)" }} />
              }
              placeholder="Email"
              size="large"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                borderColor: "rgba(255, 255, 255, 0.3)",
                color: "#fff",
              }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={
                <LockOutlined style={{ color: "rgba(255, 255, 255, 0.7)" }} />
              }
              placeholder="Password"
              size="large"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                borderColor: "rgba(255, 255, 255, 0.3)",
                color: "#fff",
              }}
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={
                <LockOutlined style={{ color: "rgba(255, 255, 255, 0.7)" }} />
              }
              placeholder="Confirm Password"
              size="large"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                borderColor: "rgba(255, 255, 255, 0.3)",
                color: "#fff",
              }}
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isLoading}
              block
              style={{
                height: 45,
                fontWeight: 600,
                borderRadius: 8,
                background: token.colorPrimary,
                border: "none",
              }}
            >
              {isLoading ? "Registering..." : "Sign Up"}
            </Button>
          </Form.Item>

          <div style={{ textAlign: "center", marginTop: 24 }}>
            <Text style={{ color: "rgba(255, 255, 255, 0.8)" }}>
              Already have an account?{" "}
              <Link href="/login" strong style={{ color: "#fff" }}>
                Login
              </Link>
            </Text>
          </div>
        </Form>
      </Card>
    </Flex>
  );
};

export default SignUp;