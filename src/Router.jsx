import {
  createBrowserRouter,
  RouterProvider,
  redirect
} from 'react-router-dom';
import Layout from './pages/Layout';
import AboutUs from './pages/AboutUs/AboutUs';
import LandingPage from './pages/LandingPage/LandingPage';
import Instructions from "./pages/Instructions/Instructions.jsx";
import MainPage from "./pages/MainPage/MainPage.jsx";
import Login from "./pages/profile/Login";
import UserCheck from './protected/UserCheck';
import AdminCheck from './protected/AdminCheck';
import Logout from './pages/profile/Logout';
import Juego from "./pages/Tablero/Tablero.jsx";
import Signup from "./pages/profile/Signup";



function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '',
          element: <LandingPage />
        },
        {
          path: 'about-us',
          element: <AboutUs />
        },
        {
          path: 'instructions',
          element: <Instructions/>
          
          },
          
        {
          path: 'mainpage',
          element: <MainPage/>
        },

        {
          path: 'login',
          element: <Login/>
        },
        {
          path: 'usercheck',
          element: <UserCheck/>
        },
        {
          path: 'admincheck',
          element: <AdminCheck/>
        },
        {
          path: 'logout',
          element: <Logout/>
        },
        {
          path: 'tablero',
          element: <Juego/>

        },
        {
          path: 'signup',
          element: <Signup/>

        }
      ]
    },
    {
      path: '*', 
      loader: () => {
        return redirect('/')
      }
    }
  ])

  return (
    <RouterProvider router={router} />
  );
}

export default Router;