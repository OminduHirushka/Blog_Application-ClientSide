import React, { useEffect } from "react";
import {
  Button,
  Form,
  Input,
  Card,
  Typography,
  theme,
  Space,
  Flex,
  Layout,
} from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../state/auth/authAction";
import Navbar from "../../components/Navbar";
import toast from "react-hot-toast";

const { Text } = Typography;
const { useToken } = theme;

const nav = [
  {
    key: "home",
    label: <Link to={"/"}>Home</Link>,
  },
];

const Login = () => {
  const { token } = useToken();
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleLogin = async (values) => {
    try {
      const result = await dispatch(
        loginUser({
          email: values.email,
          password: values.password,
        })
      );

      toast.success("Logged-In Successfully");

      if (result.user.type === "customer") {
        navigate("/post");
      } else if (result.user.type === "admin") {
        navigate("#");
      }
    } catch (err) {
      toast.error("Username or Password is Incorrect", {
        position: "top-center",
      });
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Navbar nav={nav} selectedKey="home" />

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

            <Text
              style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "20px" }}
            >
              Log-In
            </Text>
          </Space>

          <Form
            form={form}
            name="login"
            onFinish={handleLogin}
            layout="vertical"
          >
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
              ]}
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
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </Form.Item>

            <div style={{ textAlign: "center", marginTop: 24 }}>
              <Text style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                Don't have an account?{" "}
                <Link to="/signup" strong style={{ color: "#fff" }}>
                  Sign up
                </Link>
              </Text>
            </div>
          </Form>
        </Card>
      </Flex>
    </Layout>
  );
};

export default Login;
