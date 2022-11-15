import { FC } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header";

const DashboardLayout: FC = () => {
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
