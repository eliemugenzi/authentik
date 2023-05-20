import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Login from './pages/login';
import SignUp from './pages/signup';
import ResetPassword from './pages/reset-password';
import Profile from './pages/profile';
import EditProfile from './pages/profile/edit';
import ForgotPassword from './pages/forgot-password';
import Register from './pages/register';
import UserList from './pages/users';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    Component: Login
  },
  {
    path: '/signup',
    Component: SignUp
  },
  {
    path: '/reset-password',
    Component: ResetPassword
  },
  {
    path: '/profile',
    Component: Profile,
  },
  {
    path: '/profile/edit',
    Component: EditProfile,
  },
  {
    path: '/forgot-password',
    Component: ForgotPassword,
  },
  {
    path: '/register',
    Component: Register,
  },
  {
    path: '/users',
    Component: UserList,
  }
])

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>

    </>
  )
}

export default App
