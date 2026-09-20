import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  fetchAdminOrders,
} from "../../redux/features/adminOrderSlice"

import {
  Search,
  Eye,
  Package,
  ShoppingBag,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

function AdminOrders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    orders,
    loading,
    error,
  } = useSelector((state) => state.adminOrders);

  const [search, setSearch] = useState("");

  // ============================================
  // FETCH ORDERS
  // ============================================

  useEffect(() => {
    dispatch(fetchAdminOrders());
  }, [dispatch]);

  // ============================================
  // SEARCH ORDERS
  // ============================================

  const filteredOrders = useMemo(() => {
    if (!search.trim()) {
      return orders;
    }

    const searchValue = search.toLowerCase();

    return orders.filter((order) => {
      return (
        order.orderNumber
          ?.toLowerCase()
          .includes(searchValue) ||

        order.user?.name
          ?.toLowerCase()
          .includes(searchValue) ||

        order.user?.email
          ?.toLowerCase()
          .includes(searchValue) ||

        order.orderStatus
          ?.toLowerCase()
          .includes(searchValue) ||

        order.paymentStatus
          ?.toLowerCase()
          .includes(searchValue)
      );
    });
  }, [orders, search]);

  // ============================================
  // FORMAT DATE
  // ============================================

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // ============================================
  // ORDER STATUS STYLE
  // ============================================

  const getOrderStatusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-50 text-green-700 border-green-200";

      case "Shipped":
        return "bg-blue-50 text-blue-700 border-blue-200";

      case "Confirmed":
        return "bg-cyan-50 text-cyan-700 border-cyan-200";

      case "Cancelled":
        return "bg-red-50 text-red-700 border-red-200";

      case "Placed":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";

      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  // ============================================
  // PAYMENT STATUS STYLE
  // ============================================

  const getPaymentStatusStyle = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-50 text-green-700 border-green-200";

      case "Pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";

      case "Failed":
        return "bg-red-50 text-red-700 border-red-200";

      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  // ============================================
  // LOADING
  // ============================================

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-7xl">

          {/* Header Skeleton */}
          <div className="mb-8">
            <div className="h-8 w-48 animate-pulse rounded bg-slate-200" />

            <div className="mt-3 h-4 w-72 animate-pulse rounded bg-slate-200" />
          </div>

          {/* Summary Skeleton */}
          <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-28 animate-pulse rounded-2xl bg-white shadow-sm"
              />
            ))}
          </div>

          {/* Table Skeleton */}
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
            <div className="space-y-4 p-6">
              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="h-14 animate-pulse rounded-xl bg-slate-100"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============================================
  // ERROR
  // ============================================

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-7xl">

          <div className="rounded-2xl bg-white p-8 text-center shadow-sm">

            <AlertCircle
              className="mx-auto text-red-500"
              size={42}
            />

            <h2 className="mt-4 text-xl font-semibold text-slate-900">
              Failed to load orders
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {error}
            </p>

            <button
              onClick={() =>
                dispatch(fetchAdminOrders())
              }
              className="mt-6 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-500"
            >
              Try Again
            </button>

          </div>

        </div>
      </div>
    );
  }

  // ============================================
  // SUMMARY
  // ============================================

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) =>
      order.orderStatus === "Placed" ||
      order.orderStatus === "Confirmed" ||
      order.orderStatus === "Shipped"
  ).length;

  const deliveredOrders = orders.filter(
    (order) =>
      order.orderStatus === "Delivered"
  ).length;

  const cancelledOrders = orders.filter(
    (order) =>
      order.orderStatus === "Cancelled"
  ).length;

  // ============================================
  // UI
  // ============================================

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl">

        {/* ========================================
            HEADER
        ======================================== */}

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Orders
            </h1>

            <p className="mt-2 text-slate-500">
              Manage and track customer orders
            </p>
          </div>

        </div>

        {/* ========================================
            SUMMARY CARDS
        ======================================== */}

        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* Total Orders */}
          <div className="rounded-2xl bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  Total Orders
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {totalOrders}
                </p>
              </div>

              <div className="rounded-xl bg-slate-100 p-3">
                <ShoppingBag
                  size={22}
                  className="text-slate-700"
                />
              </div>

            </div>

          </div>

          {/* Pending */}
          <div className="rounded-2xl bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  Active Orders
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {pendingOrders}
                </p>
              </div>

              <div className="rounded-xl bg-yellow-50 p-3">
                <Clock
                  size={22}
                  className="text-yellow-600"
                />
              </div>

            </div>

          </div>

          {/* Delivered */}
          <div className="rounded-2xl bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  Delivered
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {deliveredOrders}
                </p>
              </div>

              <div className="rounded-xl bg-green-50 p-3">
                <CheckCircle
                  size={22}
                  className="text-green-600"
                />
              </div>

            </div>

          </div>

          {/* Cancelled */}
          <div className="rounded-2xl bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  Cancelled
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {cancelledOrders}
                </p>
              </div>

              <div className="rounded-xl bg-red-50 p-3">
                <XCircle
                  size={22}
                  className="text-red-600"
                />
              </div>

            </div>

          </div>

        </div>

        {/* ========================================
            SEARCH
        ======================================== */}

        <div className="mb-6 rounded-2xl bg-white p-4 shadow-sm">

          <div className="relative">

            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search by order number, customer, email or status..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-cyan-400 focus:bg-white focus:ring-2 focus:ring-cyan-100"
            />

          </div>

        </div>

        {/* ========================================
            DESKTOP TABLE
        ======================================== */}

        <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm lg:block">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="border-b border-slate-200 bg-slate-50">

                <tr>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Order
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Customer
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Date
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Total
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Payment
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-slate-100">

                {filteredOrders.length > 0 ? (

                  filteredOrders.map((order) => (

                    <tr
                      key={order._id}
                      className="transition hover:bg-slate-50"
                    >

                      {/* Order */}
                      <td className="px-6 py-5">

                        <div className="flex items-center gap-3">

                          <div className="rounded-xl bg-slate-100 p-2.5">
                            <Package
                              size={18}
                              className="text-slate-700"
                            />
                          </div>

                          <div>
                            <p className="font-semibold text-slate-900">
                              {order.orderNumber || "N/A"}
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                              {order.items?.length || 0} item(s)
                            </p>
                          </div>

                        </div>

                      </td>

                      {/* Customer */}
                      <td className="px-6 py-5">

                        <p className="font-medium text-slate-900">
                          {order.user?.name || "Unknown"}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {order.user?.email || "-"}
                        </p>

                      </td>

                      {/* Date */}
                      <td className="px-6 py-5 text-sm text-slate-600">
                        {formatDate(order.createdAt)}
                      </td>

                      {/* Total */}
                      <td className="px-6 py-5">

                        <p className="font-semibold text-slate-900">
                          ₹
                          {Number(
                            order.totalAmount || 0
                          ).toLocaleString("en-IN")}
                        </p>

                      </td>

                      {/* Payment */}
                      <td className="px-6 py-5">

                        <span
                          className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getPaymentStatusStyle(
                            order.paymentStatus
                          )}`}
                        >
                          {order.paymentStatus || "Pending"}
                        </span>

                      </td>

                      {/* Order Status */}
                      <td className="px-6 py-5">

                        <span
                          className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getOrderStatusStyle(
                            order.orderStatus
                          )}`}
                        >
                          {order.orderStatus || "Placed"}
                        </span>

                      </td>

                      {/* Action */}
                      <td className="px-6 py-5 text-right">

                        <button
                          type="button"
                          onClick={() =>
                            navigate(
                              `/admin/orders/${order._id}`
                            )
                          }
                          className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-950 hover:text-white"
                        >
                          <Eye size={16} />
                          View
                        </button>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="7"
                      className="px-6 py-16 text-center"
                    >

                      <ShoppingBag
                        size={42}
                        className="mx-auto text-slate-300"
                      />

                      <h3 className="mt-4 text-lg font-semibold text-slate-900">
                        No orders found
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {search
                          ? "Try a different search term."
                          : "There are no orders yet."}
                      </p>

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

        {/* ========================================
            MOBILE CARDS
        ======================================== */}

        <div className="space-y-4 lg:hidden">

          {filteredOrders.length > 0 ? (

            filteredOrders.map((order) => (

              <div
                key={order._id}
                className="rounded-2xl bg-white p-5 shadow-sm"
              >

                {/* Top */}
                <div className="flex items-start justify-between gap-4">

                  <div className="flex items-center gap-3">

                    <div className="rounded-xl bg-slate-100 p-2.5">
                      <Package
                        size={18}
                        className="text-slate-700"
                      />
                    </div>

                    <div>
                      <p className="font-semibold text-slate-900">
                        {order.orderNumber || "N/A"}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>

                  </div>

                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${getOrderStatusStyle(
                      order.orderStatus
                    )}`}
                  >
                    {order.orderStatus || "Placed"}
                  </span>

                </div>

                {/* Customer */}
                <div className="mt-5 border-t border-slate-100 pt-4">

                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Customer
                  </p>

                  <p className="mt-1 font-medium text-slate-900">
                    {order.user?.name || "Unknown"}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {order.user?.email || "-"}
                  </p>

                </div>

                {/* Details */}
                <div className="mt-5 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">

                  <div>

                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Total
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      ₹
                      {Number(
                        order.totalAmount || 0
                      ).toLocaleString("en-IN")}
                    </p>

                  </div>

                  <div>

                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Payment
                    </p>

                    <span
                      className={`mt-1 inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getPaymentStatusStyle(
                        order.paymentStatus
                      )}`}
                    >
                      {order.paymentStatus || "Pending"}
                    </span>

                  </div>

                </div>

                {/* Items */}
                <div className="mt-5 border-t border-slate-100 pt-4">

                  <p className="text-sm text-slate-500">
                    {order.items?.length || 0} item(s)
                  </p>

                </div>

                {/* View */}
                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      `/admin/orders/${order._id}`
                    )
                  }
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-cyan-500"
                >
                  <Eye size={17} />
                  View Order
                </button>

              </div>

            ))

          ) : (

            <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">

              <ShoppingBag
                size={42}
                className="mx-auto text-slate-300"
              />

              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                No orders found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {search
                  ? "Try a different search term."
                  : "There are no orders yet."}
              </p>

            </div>

          )}

        </div>

      </div>
    </div>
  );
}

export default AdminOrders;
