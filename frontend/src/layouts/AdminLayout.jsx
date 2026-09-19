import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../component/admin/AdminSideBar";
import AdminNavbar from "../component/admin/AdminNavbar";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen bg-slate-50">
      {" "}
      {/* Sidebar */}{" "}
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />{" "}
      {/* Main Area */}{" "}
      <div className="lg:pl-64">
        {" "}
        {/* Navbar */} <AdminNavbar setSidebarOpen={setSidebarOpen} />{" "}
        {/* Page Content */}{" "}
        <main>
          {" "}
          <Outlet />{" "}
        </main>{" "}
      </div>{" "}
    </div>
  );
}
export default AdminLayout;
