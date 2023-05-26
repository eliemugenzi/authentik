import { Layout, Form, Input, Button, Alert } from "antd";
import { useMutation } from "react-query";
import "./styles.css";
import api from "../../helpers/axios";
import { useEffect } from "react";
import { redirect } from 'react-router-dom';
import { isEmpty } from "lodash";
const Login = () => {
  const mutation = useMutation((data) => {
    return api.post("/auth/login", data);
  });

  const onFinish = async (values: any) => {
    mutation.mutateAsync({
      ...values,
    }).then((res)=>{
       console.log('RESSS', res)

       window.location.href='/verify-otp'
    }).catch((err)=>{
      console.log('ERR', err);
    });

  };

  return (
    <Layout className="h-screen bg-transparent">
      <div className="bg-wite py-8 px-6 shadow rounded-lg sm:px-10 login-form">
        <img src="https://png2.cleanpng.com/sh/d26f34069bf8a52be0a11e5fc18a0ebf/L0KzQYm3VMI3N6d9fZH0aYP2gLBuTfNwdaF6jNd7LXnmf7B6Tfxwb5pzRd9qbnHqdb7sjwQufaRqip8AYXW0RYbtU8Zkbmc9TpCCN0O5SIm7V8E2OmU8Sak5NEO3RIe6TwBvbz==/kisspng-computer-icons-login-management-user-5ae155f36cf686.7736884715247170434463.png" alt="AuthLogo"  className="logo"/>
        <h3 className="text-lg my-5 font-semibold">Login to Authentik</h3>
        <Form
          name="login"
          layout="vertical"
          initialValues={{
            email: "",
            password: "",
          }}
          onFinish={onFinish}
          className="mb-0 space-y-6"
        >
          <Form.Item
            label="Email Address"
            name="email"
            required
            rules={[
              {
                required: true,
                message: "Email address is required!",
              },
            ]}
          >
            <Input className="py-2 rounded-none w-full border-gray px-3 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            required
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password className="py-2 rounded-none w-full border-gray px-3 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500" />
          </Form.Item>
          {mutation.isError && (
            <Alert
              type="error"
              message={mutation?.error?.message}
              className="alert"
              closable
            />
          )}
          <Form.Item>
            <Button href="/forgot-password" type="link">Forgot Password?</Button>
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              size="large"
              block
              loading={mutation.isLoading}
              className="py-3 px-3 rounded-none submit-button"
              style={{
                backgroundColor: 'rgb(21 94 117)',
                color: 'white',
                borderRadius: 0,
              }}
            >
              Login
            </Button>
          </Form.Item>
          <Form.Item>
            <p>Don't have an account? <a href="/register">Register</a></p>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  );
};

export default Login;
