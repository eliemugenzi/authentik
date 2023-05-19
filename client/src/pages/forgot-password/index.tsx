import { Layout, Form, Input, Button, Alert } from "antd";
import { useMutation } from 'react-query';

import './styles.css';
import api from "../../helpers/axios";

const ForgotPassword = () => {


    const mutation = useMutation(data=> api.post('/auth/forgot-password', data))
    const onFinish = (values: any) =>{
     mutation.mutate(values);
    }

    console.log('MUTTT', mutation);
    
  return (
    <Layout className="h-screen bg-white">
      <div className="bg-wite py-8 px-6 shadow rounded-lg sm:px-10 login-form">
        <h2 className="mb-10">Kindly provide an email for password reset</h2>
        <Form
          initialValues={{
            email: "",
          }}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item name="email" label="Email Address" required
          rules={[
            {
                type:'email',
                message: 'Email should be valid'
            },
            {
                required: true,
                message: 'Email is required!'
            }
          ]}
          >
            <Input
              placeholder="Email Address"
              className="py-3 px-3 rounded-none"
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

export default ForgotPassword;
