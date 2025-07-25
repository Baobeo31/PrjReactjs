import { Children } from "react";
import Layout from "../components/Layout/layout";
import Home from "../pages/Home/HomePage";
import Login from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import Verify from "../pages/ForgotPassword/verify";
import ForgotPassword from "../pages/ForgotPassword/forgotPasssword";

export const routes = [
  {
    path: "/",
    element: <Layout />,
    isShowHeader: true,
    children: [
      {
        path: "home",
        element: <Home />,
        isShowHeader: false
      },
      {
        path: "login",
        element: <Login />,
        isShowHeader: false
      },
      {
        path: "sign-up",
        element: <SignUp />,
        isShowHeader: false
      },
      {
        path: "forgot-pass",
        element: <ForgotPassword />,
        isShowHeader: false
      },
      {
        path: "verify-otp",
        element: <Verify />,
        isShowHeader: false
      }
    ]
  },

]