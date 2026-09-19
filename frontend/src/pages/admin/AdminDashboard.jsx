import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Users,
  Package,
  ShoppingCart,
  IndianRupee,
  Clock3,
  AlertTriangle,
  ArrowUpRight,
  RefreshCw,
} from "lucide-react";
import { fetchAdminDashboard } from "../../redux/features/adminDashboardSlice";
import StatsCard from "../../component/admin/StatsCard";
function AdminDashboard() {
  const dispatch = useDispatch();
  const { stats, lowStockProducts, recentOrders, loading, error } = useSelector(
    (state) => state.admin,
  );
  useEffect(() => {
    dispatch(fetchAdminDashboard());
  }, [dispatch]);
  /* ================= LOADING ================= */ if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
        {" "}
        <div className="mx-auto max-w-7xl">
          {" "}
          {/* Header Skeleton */}{" "}
          <div className="mb-8">
            {" "}
            <div className="h-8 w-52 animate-pulse rounded-lg bg-slate-200" />{" "}
            <div className="mt-3 h-4 w-72 animate-pulse rounded bg-slate-200" />{" "}
          </div>{" "}
          {/* Stats Skeleton */}{" "}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">
            {" "}
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="h-36 animate-pulse rounded-2xl bg-white shadow-sm"
              />
            ))}{" "}
          </div>{" "}
          {/* Content Skeleton */}{" "}
          <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
            {" "}
            <div className="h-96 animate-pulse rounded-2xl bg-white xl:col-span-2" />{" "}
            <div className="h-96 animate-pulse rounded-2xl bg-white" />{" "}
          </div>{" "}
        </div>{" "}
      </div>
    );
  }
  /* ================= ERROR ================= */ if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-slate-50 px-4">
        {" "}
        <div className="w-full max-w-md rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
          {" "}
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
            {" "}
            <AlertTriangle size={26} />{" "}
          </div>{" "}
          <h2 className="mt-5 text-xl font-bold text-slate-900">
            {" "}
            Something went wrong{" "}
          </h2>{" "}
          <p className="mt-2 text-sm text-slate-500"> {error} </p>{" "}
          <button
            onClick={() => dispatch(fetchAdminDashboard())}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            {" "}
            <RefreshCw size={16} /> Try Again{" "}
          </button>{" "}
        </div>{" "}
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-slate-50">
      {" "}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {" "}
        {/* ================= HEADER ================= */}{" "}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {" "}
          <div>
            {" "}
            <p className="text-sm font-medium text-indigo-600">
              {" "}
              Sneak.in Admin{" "}
            </p>{" "}
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {" "}
              Dashboard{" "}
            </h1>{" "}
            <p className="mt-1 text-sm text-slate-500">
              {" "}
              Monitor your store performance and activity.{" "}
            </p>{" "}
          </div>{" "}
          <button
            onClick={() => dispatch(fetchAdminDashboard())}
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
          >
            {" "}
            <RefreshCw size={16} /> Refresh{" "}
          </button>{" "}
        </div>{" "}
        {/* ================= STATS ================= */}{" "}
        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">
          {" "}
          <StatsCard
            title="Total Users"
            value={stats?.totalUsers ?? 0}
            icon={Users}
            description="Registered customers"
            iconBg="bg-blue-50"
            iconColor="text-blue-600"
          />{" "}
          <StatsCard
            title="Products"
            value={stats?.totalProducts ?? 0}
            icon={Package}
            description="Products in store"
            iconBg="bg-violet-50"
            iconColor="text-violet-600"
          />{" "}
          <StatsCard
            title="Total Orders"
            value={stats?.totalOrders ?? 0}
            icon={ShoppingCart}
            description="Orders placed"
            iconBg="bg-emerald-50"
            iconColor="text-emerald-600"
          />{" "}
          <StatsCard
            title="Revenue"
            value={`₹${(stats?.totalRevenue ?? 0).toLocaleString("en-IN")}`}
            icon={IndianRupee}
            description="From paid orders"
            iconBg="bg-amber-50"
            iconColor="text-amber-600"
          />{" "}
          <StatsCard
            title="Pending Orders"
            value={stats?.pendingOrders ?? 0}
            icon={Clock3}
            description="Orders to process"
            iconBg="bg-orange-50"
            iconColor="text-orange-600"
          />{" "}
        </section>{" "}
        {/* ================= CONTENT ================= */}{" "}
        <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
          {" "}
          {/* ================= RECENT ORDERS ================= */}{" "}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-2">
            {" "}
            {/* Section Header */}{" "}
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5 sm:px-6">
              {" "}
              <div>
                {" "}
                <h2 className="font-bold text-slate-900">
                  {" "}
                  Recent Orders{" "}
                </h2>{" "}
                <p className="mt-1 text-xs text-slate-500">
                  {" "}
                  Latest customer orders{" "}
                </p>{" "}
              </div>{" "}
              <button className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 transition hover:text-indigo-700">
                {" "}
                View all <ArrowUpRight size={15} />{" "}
              </button>{" "}
            </div>{" "}
            {/* Desktop Table */}{" "}
            <div className="hidden overflow-x-auto md:block">
              {" "}
              <table className="w-full text-left">
                {" "}
                <thead className="bg-slate-50">
                  {" "}
                  <tr className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {" "}
                    <th className="px-6 py-4"> Order </th>{" "}
                    <th className="px-6 py-4"> Customer </th>{" "}
                    <th className="px-6 py-4"> Amount </th>{" "}
                    <th className="px-6 py-4"> Payment </th>{" "}
                    <th className="px-6 py-4"> Status </th>{" "}
                  </tr>{" "}
                </thead>{" "}
                <tbody className="divide-y divide-slate-100">
                  {" "}
                  {recentOrders?.length > 0 ? (
                    recentOrders.map((order) => (
                      <tr
                        key={order._id}
                        className="transition hover:bg-slate-50"
                      >
                        {" "}
                        {/* Order */}{" "}
                        <td className="px-6 py-4">
                          {" "}
                          <span className="font-semibold text-slate-900">
                            {" "}
                            #{order.orderNumber}{" "}
                          </span>{" "}
                        </td>{" "}
                        {/* Customer */}{" "}
                        <td className="px-6 py-4">
                          {" "}
                          <div>
                            {" "}
                            <p className="text-sm font-medium text-slate-800">
                              {" "}
                              {order.user?.name || "Unknown"}{" "}
                            </p>{" "}
                            <p className="text-xs text-slate-400">
                              {" "}
                              {order.user?.email || "-"}{" "}
                            </p>{" "}
                          </div>{" "}
                        </td>{" "}
                        {/* Amount */}{" "}
                        <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                          {" "}
                          ₹{order.totalAmount?.toLocaleString("en-IN")}{" "}
                        </td>{" "}
                        {/* Payment */}{" "}
                        <td className="px-6 py-4">
                          {" "}
                          <span className="text-xs font-medium text-slate-600">
                            {" "}
                            {order.paymentStatus}{" "}
                          </span>{" "}
                        </td>{" "}
                        {/* Status */}{" "}
                        <td className="px-6 py-4">
                          {" "}
                          <StatusBadge status={order.orderStatus} />{" "}
                        </td>{" "}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      {" "}
                      <td
                        colSpan="5"
                        className="px-6 py-12 text-center text-sm text-slate-400"
                      >
                        {" "}
                        No orders found.{" "}
                      </td>{" "}
                    </tr>
                  )}{" "}
                </tbody>{" "}
              </table>{" "}
            </div>{" "}
            {/* Mobile Orders */}{" "}
            <div className="divide-y divide-slate-100 md:hidden">
              {" "}
              {recentOrders?.length > 0 ? (
                recentOrders.map((order) => (
                  <div key={order._id} className="p-5">
                    {" "}
                    <div className="flex items-start justify-between gap-3">
                      {" "}
                      <div>
                        {" "}
                        <p className="text-sm font-bold text-slate-900">
                          {" "}
                          #{order.orderNumber}{" "}
                        </p>{" "}
                        <p className="mt-1 text-xs text-slate-500">
                          {" "}
                          {order.user?.name || "Unknown"}{" "}
                        </p>{" "}
                      </div>{" "}
                      <StatusBadge status={order.orderStatus} />{" "}
                    </div>{" "}
                    <div className="mt-4 flex items-center justify-between">
                      {" "}
                      <span className="text-sm font-bold text-slate-900">
                        {" "}
                        ₹{order.totalAmount?.toLocaleString("en-IN")}{" "}
                      </span>{" "}
                      <span className="text-xs text-slate-500">
                        {" "}
                        {order.paymentStatus}{" "}
                      </span>{" "}
                    </div>{" "}
                  </div>
                ))
              ) : (
                <div className="px-5 py-12 text-center text-sm text-slate-400">
                  {" "}
                  No orders found.{" "}
                </div>
              )}{" "}
            </div>{" "}
          </div>{" "}
          {/* ================= LOW STOCK ================= */}{" "}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {" "}
            {/* Header */}{" "}
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5">
              {" "}
              <div>
                {" "}
                <h2 className="font-bold text-slate-900"> Low Stock </h2>{" "}
                <p className="mt-1 text-xs text-slate-500">
                  {" "}
                  Products that need attention{" "}
                </p>{" "}
              </div>{" "}
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-500">
                {" "}
                <AlertTriangle size={18} />{" "}
              </div>{" "}
            </div>{" "}
            {/* Products */}{" "}
            <div className="divide-y divide-slate-100">
              {" "}
              {lowStockProducts?.length > 0 ? (
                lowStockProducts.map((product) => (
                  <div
                    key={product._id}
                    className="flex items-center gap-3 px-5 py-4"
                  >
                    {" "}
                    {/* Image */}{" "}
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                      {" "}
                      {product.image ? (
                        <img
                          src={
                            product.image.startsWith("http")
                              ? product.image
                              : `https://sneak-in-backend.onrender.com${product.image}`
                          }
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-xs text-slate-400">
                          {" "}
                          No image{" "}
                        </div>
                      )}{" "}
                    </div>{" "}
                    {/* Product */}{" "}
                    <div className="min-w-0 flex-1">
                      {" "}
                      <p className="truncate text-sm font-semibold text-slate-800">
                        {" "}
                        {product.name}{" "}
                      </p>{" "}
                      <p className="mt-1 text-xs text-slate-400">
                        {" "}
                        Inventory alert{" "}
                      </p>{" "}
                    </div>{" "}
                    {/* Stock */}{" "}
                    <div className="text-right">
                      {" "}
                      <p
                        className={`text-sm font-bold ${product.stock === 0 ? "text-red-600" : "text-orange-600"}`}
                      >
                        {" "}
                        {product.stock}{" "}
                      </p>{" "}
                      <p className="text-[11px] text-slate-400"> left </p>{" "}
                    </div>{" "}
                  </div>
                ))
              ) : (
                <div className="px-5 py-12 text-center">
                  {" "}
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
                    {" "}
                    <Package size={20} />{" "}
                  </div>{" "}
                  <p className="mt-3 text-sm font-semibold text-slate-700">
                    {" "}
                    Stock looks good{" "}
                  </p>{" "}
                  <p className="mt-1 text-xs text-slate-400">
                    {" "}
                    No products need attention.{" "}
                  </p>{" "}
                </div>
              )}{" "}
            </div>{" "}
          </div>{" "}
        </section>{" "}
      </main>{" "}
    </div>
  );
}
/* ================= STATUS BADGE ================= */ function StatusBadge({
  status,
}) {
  const styles = {
    Placed: "bg-blue-50 text-blue-700",
    Confirmed: "bg-indigo-50 text-indigo-700",
    Shipped: "bg-purple-50 text-purple-700",
    Delivered: "bg-emerald-50 text-emerald-700",
    Cancelled: "bg-red-50 text-red-700",
  };
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${styles[status] || "bg-slate-100 text-slate-600"}`}
    >
      {" "}
      {status}{" "}
    </span>
  );
}
export default AdminDashboard;
