import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  UserCircle,
  X,
  Store,
} from "lucide-react";
function AdminSidebar({ sidebarOpen, setSidebarOpen }) {
  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Products", path: "/admin/products", icon: Package },
    { name: "Orders", path: "/admin/orders", icon: ShoppingCart },
    { name: "Users", path: "/admin/users", icon: Users },
    { name: "Profile", path: "/admin/profile", icon: UserCircle },
  ];
  return (
    <>
      {" "}
      {/* ================= MOBILE OVERLAY ================= */}{" "}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm lg:hidden"
        />
      )}{" "}
      {/* ================= SIDEBAR ================= */}{" "}
      <aside
        className={` fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-slate-950 text-white transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} `}
      >
        {" "}
        {/* ================= LOGO ================= */}{" "}
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          {" "}
          <div className="flex items-center gap-3">
            {" "}
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600">
              {" "}
              <Store size={21} />{" "}
            </div>{" "}
            <div>
              {" "}
              <h1 className="text-lg font-bold tracking-tight">
                {" "}
                Sneak.in{" "}
              </h1>{" "}
              <p className="text-[10px] font-medium uppercase tracking-widest text-slate-400">
                {" "}
                Admin Panel{" "}
              </p>{" "}
            </div>{" "}
          </div>{" "}
          {/* Mobile Close */}{" "}
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white lg:hidden"
          >
            {" "}
            <X size={20} />{" "}
          </button>{" "}
        </div>{" "}
        {/* ================= NAVIGATION ================= */}{" "}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          {" "}
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">
            {" "}
            Management{" "}
          </p>{" "}
          <div className="space-y-1">
            {" "}
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/admin"}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    ` group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 ${isActive ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "text-slate-400 hover:bg-white/5 hover:text-white"} `
                  }
                >
                  {" "}
                  <Icon size={19} strokeWidth={1.9} className="shrink-0" />{" "}
                  <span> {item.name} </span>{" "}
                </NavLink>
              );
            })}{" "}
          </div>{" "}
        </nav>{" "}
        {/* ================= BOTTOM PROFILE ================= */}{" "}
        <div className="border-t border-white/10 p-4">
          {" "}
          <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
            {" "}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold">
              {" "}
              A{" "}
            </div>{" "}
            <div className="min-w-0">
              {" "}
              <p className="truncate text-sm font-semibold text-white">
                {" "}
                Administrator{" "}
              </p>{" "}
              <p className="truncate text-xs text-slate-500">
                {" "}
                Store Manager{" "}
              </p>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </aside>{" "}
    </>
  );
}
export default AdminSidebar;
