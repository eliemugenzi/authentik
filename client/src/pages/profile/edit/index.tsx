import {
  Layout,
  Form,
  Input,
  Button,
  Alert,
  Row,
  Col,
  Select,
  DatePicker,
  Skeleton,
  Upload,
} from "antd";
import { useMutation, useQuery } from "react-query";
import "./styles.css";
import api from "../../../helpers/axios";
import { useEffect, useState } from "react";
import { isEmpty, omit } from "lodash";
import dayjs from "dayjs";
import { LeftCircleOutlined, LeftOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import CropImage from "../../../components/CropImage";
import { RcFile } from "antd/es/upload";
const Register = () => {
  const [avatarFile, setAvatarFile] = useState("");
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [avatarKey, setAvatarKey] = useState(0);

  const handleSubmitAvatar = (file: RcFile): boolean => {
    const form: any = {
      avatar: file,
    };
    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });
    const isLessThan2MB = file.size / 1024 / 1024 < 2;
    if (!isLessThan2MB) {
      return false;
    }
    return true;
  };

  const uploadBtn = (
    <div>
      {avatarLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <span style={{ marginTop: 8 }}></span>
    </div>
  );
  const mutation = useMutation((data) => {
    return api.put("/profile", data);
  });

  const { isLoading, data } = useQuery("get-profile", () => {
    return api.get("/profile");
  });

  const onFinish = async (values: any) => {
    mutation.mutate({
      ...values,
    });
  };

  const genderOptions = [
    {
      value: "MALE",
      label: "Male",
    },
    {
      value: "FEMALE",
      label: "Female",
    },
  ];

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
      value: "DIVORCED",
      label: "Divorced",
    },
    {
      value: "WIDOWED",
      label: "Widowed",
    },
  ];

  const [form] = Form.useForm();

  const formInitialValues = {
    ...omit(data?.data, ["created_at"]),
    birth_date: dayjs(data?.data?.birth_date),
  };
  return (
    <Layout className="bg-transparent">
      {isLoading && <Skeleton active />}
      {!isEmpty(data?.data) && (
        <div className="bg-wite py-8 px-6 shadow rounded-lg sm:px-10 login-form">
                    <a href="/profile">
                        <LeftOutlined size={50} /> &nbsp; <span className="mt-9">Back</span>
                    </a>

          <h3 className="text-lg my-5 font-semibold text-center">
            Update Profile
          </h3>
          <Form
            form={form}
            name="login"
            layout="vertical"
            initialValues={formInitialValues}
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
                    placeholder="Marital Status"
                    className="py-2 rounded-none"
                    labelInValue
                    defaultActiveFirstOption
                    onChange={(e) =>
                      form.setFieldValue("marital_status", e.value)
                    }
                    options={maritalStatusOptions}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              label="Date Of Birth"
              name="birth_date"
              required
              rules={[
                { required: true, message: "Date of birth is required!" },
              ]}
            >
              <DatePicker
                onChange={(date, dateString) => {
                  console.log("DDD", date, dateString);
                  form.setFieldValue("birth_date", date);
                }}
                placeholder="Date of Birth"
                className="py-2 rounded-none w-full border-gray px-3 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500"
              />
            </Form.Item>
            <Form.Item
              label="Nationality"
              name="nationality"
              required
              rules={[{ required: true, message: "Nationality is required!" }]}
            >
              <Input
                placeholder="Nationality"
                className="py-2 rounded-none w-full border-gray px-3 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500"
              />
            </Form.Item>
            {mutation.isError && (
              <Alert
                type="error"
                message={mutation?.error?.message}
                className="alert"
                closable
              />
            )}
            {mutation?.data?.message && (
              <Alert
                message="The profile has been updated successfully"
                className="alert"
                type="success"
                closable
              />
            )}
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
                Update Profile
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </Layout>
  );
};

export default Register;
