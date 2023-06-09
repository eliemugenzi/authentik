import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
import {
  CheckCircleOutlined,
  LoadingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Spin,
  Alert,
  Layout,
  Card,
  Avatar,
  List,
  Row,
  Col,
  Button,
  Result,
} from "antd";
import api from "../../helpers/axios";
import { isEmpty } from "lodash";

import "./styles.css";
import { useEffect } from "react";
import NavBar from "../../components/Header";
import { useNavigate } from "react-router-dom";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Profile = () => {
  const navigate = useNavigate();
  const { isLoading, isError, data, error } = useQuery("get-profile", () => {
    return api.get("/profile");
  });

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  const profileData = [
    {
      title: "First Name",
      description: data?.data?.first_name,
    },
    {
      title: "Last Name",
      description: data?.data?.last_name,
    },
    {
      title: "Email Address",
      description: data?.data?.email,
    },
    {
      title: "Marital Status",
      description: data?.data?.marital_status || "N/A",
    },
    {
      title: "Nationality",
      description: data?.data?.nationality || "N/A",
    },
    {
      title: "Gender",
      description: data?.data?.gender || "N/A",
    },
  ];

  if (error?.message) {
    navigate("/");
  }

  return (
    <Layout className="px-36 bg-white h-screen">
      <NavBar />
      <Helmet>
        <title>
          {`${data?.data?.first_name || ""} ${
            data?.data?.last_name || ""
          } - Your Profile` || "User Profile"}
        </title>
      </Helmet>
      {isLoading && <Spin indicator={antIcon} />}

      {isError && <Alert type="error" message={error?.message} />}
      {!isEmpty(data?.data) && (
        <>
          <Result
            icon={<UserOutlined />}
            status="info"
            title={
              <h3>
                Welcome Back, <b>{data?.data?.first_name}</b> &nbsp;{" "}
                {data?.data?.status === "VERIFIED" && (
                  <CheckCircleOutlined
                    style={{
                      color: "skyblue",
                    }}
                  />
                )}
              </h3>
            }
          />
          {data?.data?.role === "ADMIN" && (
            <div>
              <Button
                onClick={() => {
                  navigate("/users");
                }}
              >
                View all Users
              </Button>
            </div>
          )}

          <h2 className="font-semibold my-5">Profile Information</h2>
          <Card title={`${data?.data?.first_name} ${data?.data?.last_name}`}>
            <Row>
              <Col flex={2}>
                {!data?.data?.avatar ? (
                  <Avatar size="large" icon={<UserOutlined />} />
                ) : (
                  <img src={data?.data?.avatar} alt="" width={64} height={64} />
                )}
              </Col>
              <Col flex={8}>
                <a
                  href="/profile/edit"
                  className="py-3 px-3 bg-zinc-700 border-sky-500 border rounded-none"
                >
                  Edit Profile
                </a>
              </Col>
            </Row>

            <List
              dataSource={profileData}
              itemLayout="horizontal"
              renderItem={(item, index) => (
                <List.Item key={index}>
                  <List.Item.Meta
                    title={item.title}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          </Card>
        </>
      )}
    </Layout>
  );
};

export default Profile;
