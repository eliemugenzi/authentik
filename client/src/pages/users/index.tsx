import { Avatar, Button, Layout, List } from "antd"
import { useEffect } from 'react';
import { useQuery, useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import NavBar from "../../components/Header"
import api from "../../helpers/axios";
import { isEmpty } from "lodash";
import { CheckCircleOutlined } from "@ant-design/icons";


const UserList = ()=>{
    const navigate = useNavigate()

    const { data, isError, refetch } = useQuery('get-users', () => api.get('/profile/list'))

    const verifyMutation = useMutation((data: Record<string, unknown>)=>{
        const { userId } = data;

        return api.put(`/profile/list/${userId}/verify`)
    })

    const verifyUser = async (data: Record<string, unknown>)=>{
       await verifyMutation.mutateAsync(data);
     refetch()
    }

    useEffect(() => {
        if (isError) {
          navigate('/')
        }
      }, [isError, navigate]);



    console.log('DDD PROFIULESD', data, isError);
    return (
        <Layout className="h-screen px-32">
            <NavBar />
            <h3>User List</h3>
            {!isEmpty(data?.data) ? (
              <List
              dataSource={data?.data}
              renderItem={(item: any)=>(
               <List.Item key={item?.id}>
                 <List.Item.Meta
                title={`${item?.first_name} ${item?.last_name}`}
                avatar={<Avatar src={item?.avatar || 'https://randomuser.me/api/portraits/med/men/71.jpg'} />}
                />
                {item?.status === 'VERIFIED' ? (
                    <CheckCircleOutlined size={100} color="green" />
                ) : (
                    <Button
                    loading={verifyMutation.isLoading}
                     onClick={()=>{
                      verifyUser({
                        userId: item?.id
                      })
                    }}>Verify</Button>
                )}
               </List.Item>
            
              )}
               />
            ) : (
                <p>No users yet</p>
            )}
        </Layout>
    )
}

export default UserList;
