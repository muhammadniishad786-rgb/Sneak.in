import React from "react";
import { Menu, Bell, Search, ChevronDown } from "lucide-react";
function AdminNavbar({ setSidebarOpen }) {
  return (
    <header className="sticky top-0 z-30 h-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      {" "}
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
        {" "}
        {/* ================= LEFT ================= */}{" "}
        <div className="flex items-center gap-4">
          {" "}
          {/* Mobile Menu */}{" "}
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-xl p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
          >
            {" "}
            <Menu size={22} />{" "}
          </button>{" "}
          {/* Search */}{" "}
          <div className="relative hidden sm:block">
            {" "}
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />{" "}
            <input
              type="text"
              placeholder="Search..."
              className=" h-10 w-56 rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 md:w-72 "
            />{" "}
          </div>{" "}
        </div>{" "}
        {/* ================= RIGHT ================= */}{" "}
        <div className="flex items-center gap-2 sm:gap-4">
          {" "}
          {/* Notification */}{" "}
          <button className=" relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 ">
            {" "}
            <Bell size={19} /> {/* Notification Dot */}{" "}
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />{" "}
          </button>{" "}
          {/* Divider */}{" "}
          <div className="hidden h-8 w-px bg-slate-200 sm:block" />{" "}
          {/* Admin Profile */}{" "}
          <button className="flex items-center gap-3 rounded-xl p-1.5 transition hover:bg-slate-50">
            {" "}
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
              {" "}
              A{" "}
            </div>{" "}
            <div className="hidden text-left sm:block">
              {" "}
              <p className="text-sm font-semibold text-slate-800">
                {" "}
                Admin{" "}
              </p>{" "}
              <p className="text-xs text-slate-400"> Administrator </p>{" "}
            </div>{" "}
            <ChevronDown
              size={16}
              className="hidden text-slate-400 sm:block"
            />{" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
    </header>
  );
}
export default AdminNavbar;
