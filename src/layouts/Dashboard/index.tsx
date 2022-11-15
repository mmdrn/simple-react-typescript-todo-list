import React from "react";
import { FC } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { UserService } from "../../services/user.service";

const DashboardLayout: FC = () => {
  let location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isSignin()) navigate("/login");
  }, [location, navigate]);

  const isSignin = () => {
    const userService = new UserService();

    const isSignin = userService.IsSignin();

    return isSignin;
  };

  return (
    <div className="dashboard-wrapper">
      <Header layout="dashboard" />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
