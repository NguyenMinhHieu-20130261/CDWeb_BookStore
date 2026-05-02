import Sidebar from "../layout/AdminSidebar";
import Header from "../layout/AdminHeader";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="admin-wrapper">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="page-content">
          <Outlet/>
        </div>
      </div>
    </div>
  );
}