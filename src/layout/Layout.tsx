import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-grow overflow-hidden">
        <Header />
        <div className="flex-grow bg-gray-50 dark:bg-gray-800 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
