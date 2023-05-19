import { useQuery } from "react-query";
import { CheckCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import { Spin, Alert, Layout, Form, Input, DatePicker } from "antd";
import api from "../../../helpers/axios";
import { isEmpty, pick } from "lodash";

import dayjs from "dayjs";
import { useEffect } from "react";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const EditProfile = () => {
  const { isLoading, isError, data, error } = useQuery("get-profile", () => {
    return api.get("/profile");
  });

  useEffect(() => {
    if (isError) {
      window.location.href = "/";
    }
  }, [isError]);

  return (
    <Layout className="mx-8 py-8 px-8">
      {isLoading && <Spin indicator={antIcon} />}

      {isError && <Alert type="error" message={error?.message} />}
      {!isEmpty(data?.data) && (
        <>
          <h3>
            Welcome Back, <b>{data?.data?.first_name}</b> &nbsp;{" "}
            <CheckCircleOutlined
              style={{
                color: "skyblue",
              }}
            />
          </h3>

          <h4>Edit your Profile</h4>
          <Form
            layout="vertical"
            name="profile"
            className="mix-blend-darken"
            initialValues={{
              ...pick(data?.data, [
                "first_name",
                "last_name",
                "email",
                "marital_status",
                "nationality",
                "gender",
              ]),
              birth_date: new Date(data?.data?.birth_date),
            }}
          >
            <Form.Item label="First Name" name="first_name" required>
              <Input className="py-2 px-3 rounded-none" />
            </Form.Item>
            <Form.Item label="Last Name" name="last_name" required>
              <Input className="py-2 px-3 rounded-none" />
            </Form.Item>
            <Form.Item label="Email Address" name="email" required>
              <Input size="middle" />
            </Form.Item>
            <Form.Item
              className="px-8 w-full"
              getValueProps={(v) => ({ value: dayjs(v) })}
              name="birth_date"
              label="Birth Date"
            >
              <DatePicker format="YYYY-MM-DD" className="py-2 px-3 rounded-none w-full" />
            </Form.Item>
          </Form>
        </>
      )}
    </Layout>
  );
};

export default EditProfile;
