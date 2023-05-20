import { Menu, Layout } from 'antd';
import { useNavigate } from 'react-router-dom';

const NavBar = ()=> {
    const navigate = useNavigate();

    const menuItems = [
        {
            key: 1,
            label: <a href='/profile'>Home</a>,
            onclick: ()=>{
                window.location.href='/profile'
            }
        },
        {
            label: <a href='/profile/edit'>Edit Profile</a>,
            key: 2,
        },
        {
            label: 'Log Out',
            key: 3,
            onClick: ()=>{
                console.log('HAPPENING?')
                localStorage.clear();
                navigate('/')
            }
        }
    ]
    return (
        <Layout.Header className='bg-transparent my-5 px-0' style={{background: 'transparent'}}>
            <Menu theme='light' mode='horizontal' items={menuItems}></Menu>
        </Layout.Header>
    )
}

export default NavBar