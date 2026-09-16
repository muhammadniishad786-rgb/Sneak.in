import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiCheckCircle,
  FiPackage,
  FiTruck,
  FiHome,
  FiMapPin,
  FiCreditCard,
  FiArrowLeft,
  FiShoppingBag,
  FiClock,
} from "react-icons/fi";

import { fetchOrderById } from "../redux/features/orderSlice";

function OrderStatus() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get order ID from URL
  const { id } = useParams();

  const { order, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    if (id) {
      dispatch(fetchOrderById(id));
    }
  }, [dispatch, id]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl animate-pulse">
          <div className="mx-auto h-10 w-10 rounded-full bg-slate-200" />

          <div className="mx-auto mt-5 h-8 w-64 rounded bg-slate-200" />

          <div className="mx-auto mt-3 h-4 w-80 max-w-full rounded bg-slate-200" />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <div className="h-80 rounded-2xl bg-white lg:col-span-2" />
            <div className="h-80 rounded-2xl bg-white" />
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
            <FiPackage size={25} className="text-red-500" />
          </div>

          <h1 className="mt-5 text-xl font-bold text-slate-900">
            Unable to load order
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">{error}</p>

          <button
            onClick={() => navigate("/")}
            className="mt-6 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  // Format date
  const orderDate = new Date(order.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Format time
  const orderTime = new Date(order.createdAt).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Order status
  const statusSteps = [
    {
      key: "Placed",
      label: "Order Placed",
      icon: FiCheckCircle,
    },
    {
      key: "Confirmed",
      label: "Confirmed",
      icon: FiPackage,
    },
    {
      key: "Shipped",
      label: "Shipped",
      icon: FiTruck,
    },
    {
      key: "Delivered",
      label: "Delivered",
      icon: FiHome,
    },
  ];

  const statusOrder = ["Placed", "Confirmed", "Shipped", "Delivered"];

  const currentStatusIndex = statusOrder.indexOf(order.orderStatus);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* ==========================================
            SUCCESS HEADER
        ========================================== */}
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
            <FiCheckCircle size={34} className="text-emerald-500" />
          </div>

          <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-sky-500">
            Sneak.in
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Order Placed Successfully!
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            Thank you for shopping with Sneak.in. Your order has been received
            and is being processed.
          </p>
        </div>

        {/* ==========================================
            ORDER NUMBER
        ========================================== */}
        <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Order Number
          </p>

          <p className="mt-2 text-lg font-bold tracking-wide text-slate-900">
            {order.orderNumber}
          </p>

          <p className="mt-2 text-xs text-slate-400">
            Placed on {orderDate} at {orderTime}
          </p>
        </div>

        {/* ==========================================
            MAIN CONTENT
        ========================================== */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* ========================================
              LEFT
          ======================================== */}
          <div className="space-y-6 lg:col-span-2">
            {/* Order Tracking */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50">
                  <FiTruck size={19} className="text-sky-500" />
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">Order Status</h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Track your order progress
                  </p>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="mt-8">
                <div className="relative">
                  {/* Connecting Line */}
                  <div className="absolute left-[19px] top-5 h-[calc(100%-40px)] w-0.5 bg-slate-200 sm:left-1/2 sm:top-5 sm:h-0.5 sm:w-[calc(100%-80px)] sm:-translate-x-1/2" />

                  <div className="relative flex flex-col justify-between gap-7 sm:flex-row sm:gap-0">
                    {statusSteps.map((step, index) => {
                      const Icon = step.icon;

                      const isCompleted = currentStatusIndex >= index;

                      const isCurrent = order.orderStatus === step.key;

                      return (
                        <div
                          key={step.key}
                          className="relative flex items-center gap-4 sm:flex-col sm:gap-3 sm:text-center"
                        >
                          <div
                            className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 ${
                              isCompleted
                                ? "border-sky-500 bg-sky-500 text-white"
                                : "border-slate-200 bg-white text-slate-400"
                            }`}
                          >
                            <Icon size={17} />
                          </div>

                          <div>
                            <p
                              className={`text-sm font-semibold ${
                                isCompleted
                                  ? "text-slate-900"
                                  : "text-slate-400"
                              }`}
                            >
                              {step.label}
                            </p>

                            {isCurrent && (
                              <span className="mt-1 inline-block rounded-full bg-sky-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-sky-600">
                                Current
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            {/* Ordered Products */}
            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                    <FiShoppingBag size={19} className="text-slate-700" />
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-900">Order Items</h2>

                    <p className="mt-1 text-xs text-slate-500">
                      {order.items.length}{" "}
                      {order.items.length === 1 ? "product" : "products"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-slate-100">
                {order.items.map((item) => (
                  <div key={item._id} className="flex gap-4 px-5 py-5 sm:px-6">
                    {/* Product Image */}
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-24 sm:w-24">
                      {item.product?.image ? (
                        <img
                          src={
                            item.product?.image?.startsWith("http")
                              ? item.product.image
                              : `https://sneak-in-backend.onrender.com${item.product?.image}`
                          }
                          alt={item.product?.name}
                          className="h-20 w-20 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <FiShoppingBag size={22} className="text-slate-300" />
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-slate-900">
                        {item.name}
                      </h3>

                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                        <span>Size: {item.size}</span>
                        <span>Qty: {item.quantity}</span>
                      </div>

                      <p className="mt-2 text-sm font-bold text-slate-900">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </p>
                    </div>

                    {/* Unit Price */}
                    <div className="hidden text-right sm:block">
                      <p className="text-xs text-slate-400">
                        ₹{item.price.toLocaleString("en-IN")} each
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Shipping Address */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                  <FiMapPin size={19} className="text-slate-700" />
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">Delivery Address</h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Your order will be delivered here
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-xl bg-slate-50 p-4">
                <h3 className="font-semibold text-slate-900">
                  {order.shippingAddress.name}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {order.shippingAddress.phone}
                </p>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {order.shippingAddress.addressLine}
                  <br />
                  {order.shippingAddress.city}, {order.shippingAddress.state} -{" "}
                  {order.shippingAddress.pincode}
                </p>
              </div>
            </section>
          </div>

          {/* ========================================
              RIGHT
          ======================================== */}
          <div className="space-y-6 lg:sticky lg:top-6 lg:self-start">
            {/* Payment & Summary */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="font-bold text-slate-900">Order Summary</h2>

              {/* Payment */}
              <div className="mt-5 rounded-xl bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white">
                    <FiCreditCard size={17} className="text-slate-600" />
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">Payment Method</p>

                    <p className="mt-0.5 text-sm font-semibold text-slate-900">
                      {order.paymentMethod === "COD"
                        ? "Cash on Delivery"
                        : order.paymentMethod}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4">
                  <span className="text-xs text-slate-500">Payment Status</span>

                  <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-600">
                    {order.paymentStatus}
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="mt-5 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Subtotal</span>

                  <span className="font-medium text-slate-900">
                    ₹{order.totalAmount.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Delivery</span>

                  <span className="font-semibold text-emerald-600">FREE</span>
                </div>
              </div>

              <div className="my-5 border-t border-dashed border-slate-200" />

              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">Total</span>

                <span className="text-2xl font-bold text-slate-900">
                  ₹{order.totalAmount.toLocaleString("en-IN")}
                </span>
              </div>

              {/* Current Status */}
              <div className="mt-5 flex items-center gap-3 rounded-xl border border-sky-100 bg-sky-50 p-4">
                <FiClock size={18} className="shrink-0 text-sky-500" />

                <div>
                  <p className="text-xs text-sky-600">Current Status</p>

                  <p className="mt-0.5 text-sm font-bold text-slate-900">
                    {order.orderStatus}
                  </p>
                </div>
              </div>
            </section>

            {/* Continue Shopping */}
            <button
              type="button"
              onClick={() => navigate("/")}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-4 text-sm font-bold text-white transition hover:bg-slate-800 active:scale-[0.98]"
            >
              Continue Shopping
              <FiArrowLeft
                size={16}
                className="order-first transition-transform group-hover:-translate-x-1"
              />
            </button>

            {/* Back to Orders */}
            <button
              type="button"
              onClick={() => navigate("/orders")}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              View My Orders
            </button>

            <p className="text-center text-[11px] leading-5 text-slate-400">
              Thank you for choosing Sneak.in.
              <br />
              Your sneakers are on their way!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderStatus;
