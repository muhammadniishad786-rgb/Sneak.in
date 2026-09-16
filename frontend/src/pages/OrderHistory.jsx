import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FiPackage,
  FiArrowRight,
  FiShoppingBag,
  FiCalendar,
  FiCreditCard,
  FiCheckCircle,
  FiClock,
  FiTruck,
} from "react-icons/fi";

import { fetchAllOrders } from "../redux/features/orderSlice";

function OrderHistory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orders, loading, error } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  // ========================================
  // Loading
  // ========================================
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl animate-pulse">

          <div className="h-9 w-48 rounded bg-slate-200" />
          <div className="mt-3 h-4 w-80 max-w-full rounded bg-slate-200" />

          <div className="mt-8 space-y-5">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-48 rounded-2xl bg-white"
              />
            ))}
          </div>

        </div>
      </div>
    );
  }

  // ========================================
  // Error
  // ========================================
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
            <FiPackage
              size={25}
              className="text-red-500"
            />
          </div>

          <h1 className="mt-5 text-xl font-bold text-slate-900">
            Unable to load orders
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {error}
          </p>

          <button
            onClick={() => dispatch(fetchAllOrders())}
            className="mt-6 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Try Again
          </button>

        </div>
      </div>
    );
  }

  // ========================================
  // Empty Orders
  // ========================================
  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">

          {/* Header */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-500">
              Sneak.in
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              My Orders
            </h1>

            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              View and track all your Sneak.in orders.
            </p>
          </div>

          {/* Empty State */}
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
              <FiShoppingBag
                size={28}
                className="text-slate-400"
              />
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-900">
              No orders yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              You haven't placed any orders yet. Explore our
              collection and find your next favorite pair.
            </p>

            <button
              onClick={() => navigate("/")}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-slate-800"
            >
              Start Shopping
              <FiArrowRight size={17} />
            </button>

          </div>
        </div>
      </div>
    );
  }

  // ========================================
  // Order Status Badge
  // ========================================
  const getStatusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return {
          wrapper: "bg-emerald-50 text-emerald-600",
          icon: FiCheckCircle,
        };

      case "Shipped":
        return {
          wrapper: "bg-blue-50 text-blue-600",
          icon: FiTruck,
        };

      case "Confirmed":
        return {
          wrapper: "bg-sky-50 text-sky-600",
          icon: FiCheckCircle,
        };

      case "Cancelled":
        return {
          wrapper: "bg-red-50 text-red-600",
          icon: FiClock,
        };

      default:
        return {
          wrapper: "bg-amber-50 text-amber-600",
          icon: FiClock,
        };
    }
  };

  // ========================================
  // Main Page
  // ========================================
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">

      <div className="mx-auto max-w-6xl">

        {/* ==================================
            PAGE HEADER
        ================================== */}
        <div className="mb-8">

          <div className="flex items-center gap-2 text-sky-500">
            <FiShoppingBag size={18} />

            <span className="text-xs font-bold uppercase tracking-[0.18em]">
              Sneak.in
            </span>
          </div>

          <div className="mt-3 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">

            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                My Orders
              </h1>

              <p className="mt-2 text-sm text-slate-500 sm:text-base">
                View and track your previous Sneak.in orders.
              </p>
            </div>

            {/* Order Count */}
            <div className="w-fit rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm ring-1 ring-slate-200">
              {orders.length}{" "}
              {orders.length === 1 ? "Order" : "Orders"}
            </div>

          </div>
        </div>

        {/* ==================================
            ORDERS LIST
        ================================== */}
        <div className="space-y-5">

          {orders.map((order) => {

            const statusStyle = getStatusStyle(
              order.orderStatus
            );

            const StatusIcon = statusStyle.icon;

            const orderDate = new Date(
              order.createdAt
            ).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            });

            return (
              <div
                key={order._id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
              >

                {/* ==================================
                    ORDER HEADER
                ================================== */}
                <div className="border-b border-slate-100 px-5 py-4 sm:px-6">

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">

                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Order Number
                        </p>

                        <p className="mt-1 text-sm font-bold text-slate-900">
                          {order.orderNumber}
                        </p>
                      </div>

                      <div className="hidden h-8 w-px bg-slate-200 sm:block" />

                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <FiCalendar size={15} />

                        {orderDate}
                      </div>

                    </div>

                    {/* Status */}
                    <div
                      className={`flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${statusStyle.wrapper}`}
                    >
                      <StatusIcon size={14} />

                      {order.orderStatus}
                    </div>

                  </div>
                </div>

                {/* ==================================
                    ORDER CONTENT
                ================================== */}
                <div className="px-5 py-5 sm:px-6">

                  <div className="space-y-4">

                    {order.items.slice(0, 3).map((item) => (
                      <div
                        key={item._id}
                        className="flex items-center gap-4"
                      >

                        {/* Product Image */}
                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                          {item.product?.image ? (
                            <img
                              src={item.product.image}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center">
                              <FiPackage
                                size={20}
                                className="text-slate-300"
                              />
                            </div>
                          )}
                        </div>

                        {/* Product Details */}
                        <div className="min-w-0 flex-1">

                          <h3 className="truncate text-sm font-semibold text-slate-900">
                            {item.name}
                          </h3>

                          <div className="mt-1 flex flex-wrap gap-3 text-xs text-slate-500">
                            <span>
                              Size: {item.size}
                            </span>

                            <span>
                              Qty: {item.quantity}
                            </span>
                          </div>

                        </div>

                        {/* Price */}
                        <p className="text-sm font-bold text-slate-900">
                          ₹
                          {(
                            item.price * item.quantity
                          ).toLocaleString("en-IN")}
                        </p>

                      </div>
                    ))}

                    {/* More items */}
                    {order.items.length > 3 && (
                      <p className="pl-20 text-xs font-medium text-slate-400">
                        + {order.items.length - 3} more{" "}
                        {order.items.length - 3 === 1
                          ? "item"
                          : "items"}
                      </p>
                    )}

                  </div>

                </div>

                {/* ==================================
                    ORDER FOOTER
                ================================== */}
                <div className="border-t border-slate-100 bg-slate-50/60 px-5 py-4 sm:px-6">

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    {/* Payment + Total */}
                    <div className="flex flex-wrap items-center gap-5">

                      <div className="flex items-center gap-2">
                        <FiCreditCard
                          size={15}
                          className="text-slate-400"
                        />

                        <div>
                          <p className="text-[10px] uppercase tracking-wide text-slate-400">
                            Payment
                          </p>

                          <p className="text-xs font-semibold text-slate-700">
                            {order.paymentMethod === "COD"
                              ? "Cash on Delivery"
                              : order.paymentMethod}
                          </p>
                        </div>
                      </div>

                      <div className="hidden h-8 w-px bg-slate-200 sm:block" />

                      <div>
                        <p className="text-[10px] uppercase tracking-wide text-slate-400">
                          Total Amount
                        </p>

                        <p className="text-base font-bold text-slate-900">
                          ₹
                          {order.totalAmount.toLocaleString(
                            "en-IN"
                          )}
                        </p>
                      </div>

                    </div>

                    {/* View Details */}
                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/orders/${order._id}`)
                      }
                      className="group inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-xs font-bold text-white transition hover:bg-slate-800"
                    >
                      View Details

                      <FiArrowRight
                        size={15}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </button>

                  </div>

                </div>

              </div>
            );
          })}

        </div>

      </div>
    </div>
  );
}

export default OrderHistory;
