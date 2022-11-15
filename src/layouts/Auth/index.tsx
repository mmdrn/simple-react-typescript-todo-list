import React from "react";
import { FC } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { UserService } from "../../services/user.service";
import "./style.scss";

const AuthLayout: FC = () => {
  let location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isSignin()) navigate("/home");
  }, [location, navigate]);

  const isSignin = () => {
    const userService = new UserService();

    const isSignin = userService.IsSignin();

    return isSignin;
  };
  return (
    <div className="auth-layout">
      <div className="container">
        <div className="wrapper">
          <Header layout="auth" />
          <Outlet />
        </div>
        <div className="main-artboard"></div>
      </div>
    </div>
  );
};

export default AuthLayout;
