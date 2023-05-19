import { Layout, Form, Input, Button, Alert } from "antd";
import { useMutation } from "react-query";
import { useSearchParams } from "react-router-dom";

import "./styles.css";
import api from "../../helpers/axios";

const formPinMatchValidator = (password: string) => [
  ({ getFieldValue }: { [key: string]: any }) => ({
    validator(_rule: any, value: any) {
      if ([null, undefined, ""].includes(value)) {
        return Promise.resolve();
      }

      if (getFieldValue(password) !== value)
        return Promise.reject("Password mismatch");

      return Promise.resolve();
    },
  }),
];

const ResetPassword = () => {
  const [searchParams] = useSearchParams();

  console.log("SSS", searchParams.get("token"));

  const mutation = useMutation((data) =>
    api.post(`/auth/reset-password?token=${searchParams.get("token")}`, data)
  );
  const onFinish = (values: any) => {
    const val = {
      new_password: values.new_password,
    };

    console.log("VVV", values);
    mutation.mutate(values);
  };

  console.log("MUTTT", mutation);

  return (
    <Layout className="h-screen bg-white">
      <div className="bg-wite py-8 px-6 shadow rounded-lg sm:px-10 login-form">
        <h2 className="mb-10">Kindly provide an email for password reset</h2>
        <Form
          initialValues={{
            new_password: "",
            confirm_password: "",
          }}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            name="new_password"
            label="New Password"
            required
            rules={[
              {
                required: true,
                message: "New Password is required!",
              },
            ]}
          >
            <Input.Password
              placeholder="New Password"
              className="py-3 px-3 rounded-none"
            />
          </Form.Item>
          <Form.Item
            name="confirm_password"
            label="Confirm Password"
            required
            rules={formPinMatchValidator("new_password")}
          >
            <Input.Password
              placeholder="Confirm Password"
              className="py-3 px-3 rounded-none"
            />
          </Form.Item>
          {mutation.isError && (
            <Alert
              type="error"
              message={mutation?.error?.message}
              closable
              className="my-5 rounded-none"
            />
          )}
          {mutation?.data?.message && (
            <>
              <Alert
                type="success"
                className="my-5 rounded-none"
                closable
                message={
                  <>
                    <p>{mutation?.data?.message}</p>
                    <Button type="link" className="my-5" href="/">
                      You can login now
                    </Button>
                  </>
                }
              />
            </>
          )}
          <Form.Item>
            <Button
              htmlType="submit"
              type="default"
              size="large"
              block
              className="mt-5 px-3 rounded-none"
              style={{
                backgroundColor: "rgb(21 94 117)",
                color: "white",
                borderRadius: 0,
              }}
              loading={mutation.isLoading}
            >
              Reset Your Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  );
};

export default ResetPassword;
