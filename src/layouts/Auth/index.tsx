import { FC } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import "./style.scss";

const AuthLayout: FC = () => {
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
