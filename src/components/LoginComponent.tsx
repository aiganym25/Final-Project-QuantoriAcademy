import { Form, Input, Button, Card } from "antd";
import { useState } from "react";
import { useAppDispatch } from "../state-management/store";
import { setIsSignUp } from "../state-management/slices/signUpSlice";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../state-management/context/AuthContext";
import { ROUTES } from "src/routes/routesConfig";

interface LoginFormValues {
  email: string;
  password: string;
}
export default function LoginComponent(): JSX.Element {
  const dispatch = useAppDispatch();

  const [form] = Form.useForm();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const onFinish = async (values: LoginFormValues): Promise<void> => {
    try {
      setLoading(true);
      await login(values.email, values.password);
      setLoginError("");
      navigate(ROUTES.HOME);
    } catch (error) {
      setLoginError(
        "Login failed! Please check your password and email and try again."
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card className="auth-container">
      <p className="auth__title">Login</p>
      <Form
        form={form}
        className="auth-form"
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          required={false}
          name="email"
          label={<label className="auth-form__title">Email</label>}
          validateStatus={loginError ? "error" : ""}
          rules={[
            {
              required: true,
              message: "Email is required!",
            },
          ]}
        >
          <Input
            placeholder="Enter your email"
            onChange={() => setLoginError("")}
          />
        </Form.Item>

        <Form.Item
          required={false}
          name="password"
          label={<label className="auth-form__title">Password</label>}
          validateStatus={loginError ? "error" : ""}
          rules={[
            {
              required: true,
              message: "Password is required",
            },
          ]}
        >
          <Input.Password
            placeholder="Enter your password"
            onChange={() => setLoginError("")}
          />
        </Form.Item>

        <div className="auth-form__error">{loginError} </div>

        <Form.Item>
          <Button
            className="auth-form__button"
            htmlType="submit"
            loading={loading}
          >
            Login
          </Button>
          <div className="auth-form__text">
            Don't have an account?
            <span
              className="auth-form__text--bold"
              onClick={() => dispatch(setIsSignUp(false))}
            >
              Sign up
            </span>
          </div>
        </Form.Item>
      </Form>
    </Card>
  );
}
