import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import { MainLayout } from "../layout/MainLayout";
import SideLayout from "../layout/SideLayout";
import Login from "../pages/Auth/Login";
import Landing from "../pages/Landing";
import Map from "../pages/Map";
import Notification from "../pages/Notification";
import OrderDetails from "../pages/OrderDetails";
import Orders from "../pages/Orders";
import Profile from "../pages/Profile";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing/>
    },
    {
      path:'/',
      element: <AuthLayout/>,
      children:[
        {
          path: 'login',
          element: <Login/>
        },
      ]
    },
    {
      path:'/',
      element: <MainLayout/>,
      children:[
        {
          path: 'map',
          element: <Map/>
        },
      ]
    },
    {
      path:'/',
      element: <SideLayout/>,
      children:[
 
        {
          path: "/orders",
          element: <Orders/>
        },
        {
          path: "/orders/:ref",
          element: <OrderDetails/>
        },
        {
          path: "/profile",
          element: <Profile/>
        },
      ]
    },
    {
      path: "/notifications",
      element: <Notification/>
    },
])

export default router;