import { Layout, Form, Input, Button, Alert, Row, Col, Select, DatePicker } from "antd";
import { useMutation } from "react-query";
import "./styles.css";
import api from "../../helpers/axios";
import { useEffect } from "react";
import { isEmpty } from "lodash";
import logo from '../../assets/images.png';
const Register = () => {
  const mutation = useMutation((data) => {
    return api.post("/auth/signup", data);
  });

  const onFinish = async (values: any) => {
    mutation.mutate({
      ...values,
    });
  };

  useEffect(() => {
    if (!isEmpty(mutation?.data)) {
      window.location.href = "/";
    }
  }, [mutation?.data]);

  const genderOptions = [
    {
      value: "MALE",
      label: "Male",
    },
    {
      value: "FEMALE",
      label: "Female",
    },
  ]

  const maritalStatusOptions = [
    {
      value: "SINGLE",
      label: "Single",
    },
    {
      value: "MARRIED",
      label: "Married",
    },
    {
        value: 'DIVORCED',
        label: 'Divorced'
    },
    {
        value: 'WIDOWED',
        label: 'Widowed'
    }
  ]

  const [form] = Form.useForm();
  return (
    <Layout className="bg-transparent">
      <div className="bg-wite py-8 px-6 shadow rounded-lg sm:px-10 login-form">
        <img
          src={logo}
          alt="AuthLogo"
          className="logo"
          // width={100}
          // height={100}
          // style={{
          //   height: 100,
          //   width: 100
          // }}
        />
        <h3 className="text-lg my-5 font-semibold">
          Create an Authentik account
        </h3>
        <Form
          form={form}
          name="login"
          layout="vertical"
          initialValues={{
            first_name: "",
            last_name: "",
            email: "",
            birth_date: "",
            gender: "",
            marital_status: "",
            password: "",
          }}
          onFinish={onFinish}
          className="mb-0 space-y-6"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="First Name"
                name="first_name"
                required
                rules={[
                  {
                    required: true,
                    message: "First Nane is required!",
                  },
                ]}
              >
                <Input className="py-2 rounded-none w-full border-gray px-3 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Last name"
                name="last_name"
                required
                rules={[
                  {
                    required: true,
                    message: "Last name is required!",
                  },
                ]}
              >
                <Input className="py-2 rounded-none w-full border-gray px-3 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500" />
              </Form.Item>
            </Col>
          </Row>
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
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item 
               rules={[
                {
                  required: true,
                  message: "Gender is required!",
                },
              ]}
              name="gender" 
              label="Gender"
              >
                <Select
                className="py-2 rounded-none"
                  labelInValue
                  defaultActiveFirstOption
                  onChange={(e) => form.setFieldValue("gender", e.value)}
                  options={genderOptions}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item 
              name="marital_status"
               label="Marital Status"
               rules={[
                {
                  required: true,
                  message: "Marital Status is required!",
                },
              ]}
               >
                <Select
                placeholder='Marital Status'
                  className="py-2 rounded-none"
                  labelInValue
                  defaultActiveFirstOption
                  onChange={(e) => form.setFieldValue("marital_status", e.value)}
                  options={maritalStatusOptions}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="Date Of Birth"
            name="birth_date"
            required
            rules={[{ required: true, message: "Date of birth is required!" }]}
          >
            <DatePicker 
            onChange={(date, dateString)=>{
                console.log('DDD', date, dateString);
                form.setFieldValue('birth_date', date);
            }}
            placeholder="Date of Birth" 
            className="py-2 rounded-none w-full border-gray px-3 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500" />
          </Form.Item>
          <Form.Item
            label="Nationality"
            name="nationality"
            required
            rules={[{ required: true, message: "Nationality is required!" }]}
          >
            <Input placeholder="Nationality" className="py-2 rounded-none w-full border-gray px-3 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500" />
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
            <Button href="/" type="link">
              Already have an acount?
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              size="large"
              block
              loading={mutation.isLoading}
              className="py-3 px-3 rounded-none submit-button"
              style={{
                backgroundColor: "rgb(21 94 117)",
                color: "white",
                borderRadius: 0,
              }}
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  );
};

export default Register;
