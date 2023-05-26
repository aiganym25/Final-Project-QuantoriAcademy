import { Form, Input, Button, Card } from "antd";
import { useState } from "react";
import { useAppDispatch } from "../redux/store";
import { setIsSignUp } from "../redux/slices/signUpSlice";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface LoginFormValues {
  email: string;
  password: string;
}
export default function LoginComponent(): JSX.Element {
  const dispatch = useAppDispatch();

  const [form] = Form.useForm();
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const onFinish = async (values: LoginFormValues): Promise<void> => {
    try {
      await login(values.email, values.password);
      // await signInWithEmailAndPassword(auth, values.email, values.password);
      setLoginError("");
      navigate("/search");
    } catch (error) {
      setLoginError(
        "Login failed! Please check your password and email and try again."
      );
    }
  };
  return (
    <Card className="auth-container">
      <p className="auth-title">Login</p>
      <Form
        form={form}
        className="auth-form"
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          required={false}
          name="email"
          label={
            <label style={{ fontWeight: 600, fontSize: "14px" }}>Email</label>
          }
          validateStatus={loginError ? "error" : ""}
          rules={[
            {
              required: true,
              message: "Email is required!",
            },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          required={false}
          name="password"
          label={
            <label style={{ fontWeight: 600, fontSize: "14px" }}>
              Password
            </label>
          }
          validateStatus={loginError ? "error" : ""}
          rules={[
            {
              required: true,
              message: "Password is required",
            },
          ]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <div className="auth-form-error">{loginError} </div>

        <Form.Item>
          <Button
            className="auth-form-button"
            htmlType="submit"
            // disabled={
            //   !form.isFieldsTouched(true) ||
            //   form.getFieldsError().filter(({ errors }) => errors.length)
            //     .length > 0
            // }
          >
            Login
          </Button>
          <div className="auth-form-text">
            Don't have an account?
            <span
              className="auth-form-text--bold"
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
