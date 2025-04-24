import React from "react";
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
import { signupUser } from "../../state/auth/authAction";
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

const SignUp = () => {
  const { token } = useToken();
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleSignUp = async (values) => {
    try {
      await dispatch(
        signupUser({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
        })
      );

      toast.success("Registered Successfully");
      navigate("/login");
    } catch (err) {
      toast.error("Registration Failed. Please Try Again.");
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
              Sign-Up
            </Text>
          </Space>

          <Form
            form={form}
            name="signup"
            onFinish={handleSignUp}
            layout="vertical"
          >
            <Form.Item
              name="firstName"
              rules={[
                { required: true, message: "Please input your first name!" },
              ]}
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
              rules={[
                { required: true, message: "Please input your last name!" },
              ]}
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
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
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
                <Link to="/login" strong style={{ color: "#fff" }}>
                  Login
                </Link>
              </Text>
            </div>
          </Form>
        </Card>
      </Flex>
    </Layout>
  );
};

export default SignUp;
