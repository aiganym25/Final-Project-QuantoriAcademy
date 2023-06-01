import { getAuth, fetchSignInMethodsForEmail } from "@firebase/auth";
import { Card, message } from "antd";
import { Form, Input, Button } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setIsSignUp } from "../state-management/slices/signUpSlice";
import { useAppDispatch } from "../state-management/store";
import { useAuth } from "../state-management/context/AuthContext";
import { ROUTES } from "src/routes/routesConfig";

interface SignUpFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}
export default function SignUpComponent(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = getAuth();
  const [form] = Form.useForm();
  const [signUpError, setSignUpError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordMatchError, setPasswordMatchError] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const { createUser } = useAuth();

  const validateEmail = async (): Promise<void> => {
    const values = await form.validateFields(["email"]);
    // Valid email format
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(values.email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    // email existence
    try {
      const signInMethods = await fetchSignInMethodsForEmail(
        auth,
        values.email
      );

      if (signInMethods.length > 0) {
        setEmailError("This email is already registered.");
        return;
      } else {
        setEmailError(null);
      }
    } catch (er) {
      message.error("Woops! Something went wrong, please try later!");
    }
  };

  const validatePasswordMatch = async (): Promise<void> => {
    const password = await form.validateFields(["password"]);
    const confirmPassword = await form.validateFields(["confirmPassword"]);

    if (password.password !== confirmPassword.confirmPassword) {
      setPasswordMatchError("Passwords do not match");
      return;
    } else {
      setPasswordMatchError(null);
    }
  };
  const validatePassword = async (): Promise<void> => {
    const password = await form.validateFields(["password"]);
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{6,}$/;
    if (!passwordRegex.test(password.password)) {
      setPasswordError(
        "Password must be at least 6 characters long, have one lowercase, uppercase letter, and one number."
      );
      return;
    } else {
      setPasswordError(null);
    }
  };

  const onFinish = async (values: SignUpFormValues): Promise<void> => {
    if (!passwordError && !emailError && !passwordMatchError) {
      try {
        setLoading(true);
        setSignUpError("");
        await createUser(values.email, values.password);
        navigate(ROUTES.HOME);
      } catch (error) {
        setSignUpError("Sign up failed! Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <Card className="auth-container">
      <p className="auth__title">Sign up</p>
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
          validateStatus={signUpError || emailError ? "error" : ""}
          help={emailError}
          rules={[
            {
              required: true,
              message: "Email is required!",
            },
          ]}
        >
          <Input placeholder="Enter your email" onBlur={validateEmail} />
        </Form.Item>

        <Form.Item
          required={false}
          name="password"
          label={<label className="auth-form__title">Password</label>}
          validateStatus={signUpError || passwordError ? "error" : ""}
          help={passwordError}
          rules={[
            {
              required: true,
              message: "Password is required",
            },
          ]}
        >
          <Input.Password
            placeholder="Enter your password"
            onBlur={validatePassword}
          />
        </Form.Item>

        <Form.Item
          required={false}
          name="confirmPassword"
          label={<label className="auth-form__title">Repeat Password</label>}
          validateStatus={signUpError || passwordMatchError ? "error" : ""}
          help={passwordMatchError}
          rules={[
            {
              required: true,
              message: "Please confirm your password",
            },
          ]}
        >
          <Input.Password
            placeholder="Enter your password again"
            onChange={validatePasswordMatch}
          />
        </Form.Item>

        <div className="auth-form__error">{signUpError} </div>

        <Form.Item>
          <Button
            className="auth-form__button"
            htmlType="submit"
            loading={loading}
          >
            Create Account
          </Button>
          <div className="auth-form__text">
            Already have an account?
            <span
              className="auth-form__text--bold"
              onClick={() => dispatch(setIsSignUp(true))}
            >
              Log in
            </span>
          </div>
        </Form.Item>
      </Form>
    </Card>
  );
}
