import { Layout, Form, Button, Alert, InputNumber } from "antd";
import { useMutation } from 'react-query';

import './styles.css';
import api from "../../helpers/axios";

const VerifyOTPCode = () => {


    const mutation = useMutation(data=> api.post('/auth/verify-otp', data))
    const onFinish = (values: any) =>{
     mutation.mutateAsync(values).then((res)=>{
        console.log('RESSS', res);
      const authToken = res?.data?.access_token;
      const user = res?.data;
      localStorage.setItem("token", authToken);
      localStorage.setItem("user", JSON.stringify(user));
      console.log("WHATS UP", { user, authToken });
      window.location.href='/profile'
     });
    }

    
  return (
    <Layout className="h-screen bg-white">
      <div className="bg-wite py-8 px-6 shadow rounded-lg sm:px-10 login-form">
        <h2 className="mb-10">Kindly provide a code sent to your email for successful login</h2>
        <Form
          initialValues={{
            code: "",
          }}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item name="code" label="OTP Code" required
          rules={[
            {
                required: true,
                message: 'OTP is required!'
            }
          ]}
          >
            <InputNumber
            maxLength={6}
              placeholder="OTP Code"
              className="py-3 px-3 rounded-none w-full"
            />
          </Form.Item>
          {mutation.isError && (
            <Alert type="error" message={mutation?.error?.message} closable className="my-5 rounded-none" />
          )}
          {mutation?.data?.message && (
            <Alert type="success" className="my-5 rounded-none" closable message={mutation?.data?.message} />
          )}
          <Form.Item>
            <Button
              htmlType="submit"
              type="default"
              size="large"
              block
              className="mt-5 px-3 rounded-none"
              style={{
                backgroundColor: 'rgb(21 94 117)',
                color: 'white',
                borderRadius: 0,
              }}
              loading={mutation.isLoading}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  );
};

export default VerifyOTPCode;
