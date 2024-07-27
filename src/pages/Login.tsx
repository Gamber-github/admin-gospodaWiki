import { useAuthUser } from "../store/AuthUserProvider";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styled from "styled-components";
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const FormElement = styled.div`
  margin-bottom: 5.6rem;
  width: 300px;
`;

const loginSchema = z.object({
  userName: z.string(),
  password: z.string(),
});

type LoginSchemaType = z.infer<typeof loginSchema>;

export const Login = () => {
  const { login, isAuthenticateLoading, authenticateError } = useAuthUser();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    reValidateMode: "onSubmit",
  });

  return (
    <FormElement>
      <h1>Login</h1>
      <Form
        name="normal_login"
        onSubmitCapture={handleSubmit(login)}
        layout="vertical"
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
          help={errors.userName?.message as string}
          validateStatus={errors.userName ? "error" : ""}
        >
          <Controller
            name="userName"
            control={control}
            render={({ field }) => (
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
                {...field}
              />
            )}
          />
        </Form.Item>
        <Form.Item
          name="password"
          help={errors.password?.message as string}
          validateStatus={errors.password ? "error" : ""}
        >
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                {...field}
              />
            )}
          />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={isAuthenticateLoading}
          disabled={isAuthenticateLoading}
        >
          Log in
        </Button>
        {authenticateError && <p>{authenticateError.message}</p>}
      </Form>
    </FormElement>
  );
};
