import {
  getAuth,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "@firebase/auth";
import { Card } from "antd";
import { Form, Input, Button } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setIsSignUp } from "../redux/slices/signUpSlice";
import { useAppDispatch } from "../redux/store";

interface SignUpFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}
export default function SignUpComponent() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = getAuth();
  const [form] = Form.useForm();
  const [signUpError, setSignUpError] = useState<string | null>(null);
  const [emailExistenceError, setEmailExistenceError] = useState<string | null>(
    null
  );

  const checkEmailExistence = async () => {
    const values = await form.validateFields(["email"]);
    const signInMethods = await fetchSignInMethodsForEmail(auth, values.email);

    if (signInMethods.length > 0) {
      setEmailExistenceError("This email is already registered.");
    } else {
      setEmailExistenceError(null);
    }
  };

  const onFinish = async (values: SignUpFormValues) => {
    try {
      // password not match validation
      if (values.password !== values.confirmPassword) {
        setSignUpError("Passwords do not match");
        return;
      }
      // password input validation
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{6,}$/;
      if (!passwordRegex.test(values.password)) {
        setSignUpError(
          "Password must be at least 6 characters long and contain at least one lowercase letter, one uppercase letter, and one number."
        );
        return;
      }

      // creating a user
      setSignUpError("");
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      navigate("/home");
    } catch (error) {
      setSignUpError("Sign up failed! Please try again.");
    }
  };
  return (
    <Card className="auth-container">
      <p className="auth-title">Sign up</p>
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
          validateStatus={signUpError || emailExistenceError ? "error" : ""}
          help={emailExistenceError}
          rules={[
            {
              type: "email",
              message: "Please enter an valid email address",
            },
            {
              required: true,
              message: "Email is required!",
            },
          ]}
        >
          <Input placeholder="Enter your email" onBlur={checkEmailExistence} />
        </Form.Item>

        <Form.Item
          required={false}
          name="password"
          label={
            <label style={{ fontWeight: 600, fontSize: "14px" }}>
              Password
            </label>
          }
          validateStatus={signUpError ? "error" : ""}
          rules={[
            {
              required: true,
              message: "Password is required",
            },
            {
              min: 6,
              message: "Password must be at least 6 characters long",
            },
          ]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item
          required={false}
          name="confirmPassword"
          label={
            <label style={{ fontWeight: 600, fontSize: "14px" }}>
              Repeat Password
            </label>
          }
          validateStatus={signUpError ? "error" : ""}
          rules={[
            {
              required: true,
              message: "Please confirm your password",
            },
          ]}
        >
          <Input.Password placeholder="Enter your password again" />
        </Form.Item>

        <div className="auth-form-error">{signUpError} </div>

        <Form.Item>
          <Button
            className="auth-form-button"
            htmlType="submit"
            disabled={
              !form.isFieldsTouched(true) ||
              form.getFieldsError().filter(({ errors }) => errors.length)
                .length > 0
            }
          >
            Create Account
          </Button>
          <div className="auth-form-text">
            Already have an account?
            <span
              className="auth-form-text--bold"
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
