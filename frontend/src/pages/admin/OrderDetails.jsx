import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  fetchAdminOrderById,
  editAdminOrderStatus,
  clearSelectedOrder,
} from "../../redux/features/adminOrderSlice";

import {
  ArrowLeft,
  Package,
  User,
  MapPin,
  CreditCard,
  Truck,
  Calendar,
  Mail,
  Phone,
  ShoppingBag,
  AlertCircle,
} from "lucide-react";

function AdminOrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    selectedOrder,
    orderLoading,
    statusLoading,
    error,
  } = useSelector((state) => state.adminOrders);

  // ============================================
  // FETCH ORDER
  // ============================================

  useEffect(() => {
    dispatch(fetchAdminOrderById(id));

    return () => {
      dispatch(clearSelectedOrder());
    };
  }, [dispatch, id]);

  // ============================================
  // UPDATE ORDER STATUS
  // ============================================

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;

    if (!newStatus || !selectedOrder) {
      return;
    }

    try {
      await dispatch(
        editAdminOrderStatus({
          id: selectedOrder._id,
          orderStatus: newStatus,
        })
      ).unwrap();
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

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

  const formatDateTime = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  // ============================================
  // STATUS STYLE
  // ============================================

  const getStatusStyle = (status) => {
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
  // PAYMENT STYLE
  // ============================================

  const getPaymentStyle = (status) => {
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

  if (orderLoading) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-6xl">

          {/* Header Skeleton */}
          <div className="mb-8">
            <div className="h-5 w-32 animate-pulse rounded bg-slate-200" />

            <div className="mt-5 h-8 w-64 animate-pulse rounded bg-slate-200" />

            <div className="mt-3 h-4 w-48 animate-pulse rounded bg-slate-200" />
          </div>

          <div className="grid gap-6 lg:grid-cols-3">

            <div className="space-y-6 lg:col-span-2">

              <div className="h-64 animate-pulse rounded-2xl bg-white shadow-sm" />

              <div className="h-64 animate-pulse rounded-2xl bg-white shadow-sm" />

            </div>

            <div className="space-y-6">

              <div className="h-48 animate-pulse rounded-2xl bg-white shadow-sm" />

              <div className="h-48 animate-pulse rounded-2xl bg-white shadow-sm" />

            </div>

          </div>

        </div>
      </div>
    );
  }

  // ============================================
  // ERROR / NOT FOUND
  // ============================================

  if (!selectedOrder) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-4xl">

          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">

            <AlertCircle
              size={44}
              className="mx-auto text-red-500"
            />

            <h2 className="mt-4 text-xl font-semibold text-slate-900">
              Order not found
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {error ||
                "Unable to load this order."}
            </p>

            <button
              type="button"
              onClick={() =>
                navigate("/admin/orders")
              }
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-500"
            >
              <ArrowLeft size={17} />
              Back to Orders
            </button>

          </div>

        </div>
      </div>
    );
  }

  // ============================================
  // CALCULATIONS
  // ============================================

  const totalItems =
    selectedOrder.items?.reduce(
      (total, item) =>
        total + Number(item.quantity || 0),
      0
    ) || 0;

  // ============================================
  // UI
  // ============================================

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-6xl">

        {/* ========================================
            HEADER
        ======================================== */}

        <div className="mb-8">

          <button
            type="button"
            onClick={() =>
              navigate("/admin/orders")
            }
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
          >
            <ArrowLeft size={17} />
            Back to Orders
          </button>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <div className="flex flex-wrap items-center gap-3">

                <h1 className="text-3xl font-bold text-slate-900">
                  Order Details
                </h1>

                <span
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${getStatusStyle(
                    selectedOrder.orderStatus
                  )}`}
                >
                  {selectedOrder.orderStatus}
                </span>

              </div>

              <p className="mt-2 text-slate-500">
                {selectedOrder.orderNumber}
              </p>

            </div>

            {/* Status Update */}
            <div className="w-full sm:w-64">

              <label className="mb-2 block text-sm font-medium text-slate-700">
                Update Order Status
              </label>

              <select
                value={
                  selectedOrder.orderStatus || "Placed"
                }
                onChange={handleStatusChange}
                disabled={statusLoading}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <option value="Placed">
                  Placed
                </option>

                <option value="Confirmed">
                  Confirmed
                </option>

                <option value="Shipped">
                  Shipped
                </option>

                <option value="Delivered">
                  Delivered
                </option>

                <option value="Cancelled">
                  Cancelled
                </option>
              </select>

              {statusLoading && (
                <p className="mt-2 text-xs text-slate-400">
                  Updating order status...
                </p>
              )}

            </div>

          </div>

        </div>

        {/* ========================================
            MAIN GRID
        ======================================== */}

        <div className="grid gap-6 lg:grid-cols-3">

          {/* ======================================
              LEFT SIDE
          ====================================== */}

          <div className="space-y-6 lg:col-span-2">

            {/* ====================================
                ORDER ITEMS
            ==================================== */}

            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

              <div className="border-b border-slate-100 p-6">

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <div className="rounded-xl bg-slate-100 p-3">
                      <ShoppingBag
                        size={20}
                        className="text-slate-700"
                      />
                    </div>

                    <div>

                      <h2 className="font-semibold text-slate-900">
                        Ordered Products
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        {totalItems} item(s)
                      </p>

                    </div>

                  </div>

                </div>

              </div>

              <div className="divide-y divide-slate-100">

                {selectedOrder.items?.length > 0 ? (

                  selectedOrder.items.map(
                    (item, index) => {

                      const productImage =
                        item.product?.image ||
                        "";

                      const productName =
                        item.product?.name ||
                        item.name ||
                        "Product";

                      const productPrice =
                        item.price ||
                        item.product?.price ||
                        0;

                      return (
                        <div
                          key={
                            item._id || index
                          }
                          className="flex gap-4 p-6"
                        >

                          {/* Image */}

                          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">

                            {productImage ? (
                              <img
                                src={
                                  productImage.startsWith(
                                    "http"
                                  )
                                    ? productImage
                                    : `https://sneak-in-backend.onrender.com${productImage}`
                                }
                                alt={productName}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center">
                                <Package
                                  size={24}
                                  className="text-slate-300"
                                />
                              </div>
                            )}

                          </div>

                          {/* Product Info */}

                          <div className="min-w-0 flex-1">

                            <h3 className="font-semibold text-slate-900">
                              {productName}
                            </h3>

                            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">

                              <span>
                                Size:{" "}
                                <span className="font-medium text-slate-700">
                                  {item.size || "-"}
                                </span>
                              </span>

                              <span>
                                Qty:{" "}
                                <span className="font-medium text-slate-700">
                                  {item.quantity}
                                </span>
                              </span>

                            </div>

                            <p className="mt-3 text-sm font-semibold text-slate-900">
                              ₹
                              {Number(
                                productPrice
                              ).toLocaleString(
                                "en-IN"
                              )}{" "}
                              × {item.quantity}
                            </p>

                          </div>

                          {/* Item Total */}

                          <div className="text-right">

                            <p className="font-bold text-slate-900">
                              ₹
                              {Number(
                                productPrice *
                                  item.quantity
                              ).toLocaleString(
                                "en-IN"
                              )}
                            </p>

                          </div>

                        </div>
                      );
                    }
                  )

                ) : (

                  <div className="p-8 text-center text-sm text-slate-500">
                    No products found in this order.
                  </div>

                )}

              </div>

            </div>

            {/* ====================================
                SHIPPING ADDRESS
            ==================================== */}

            <div className="rounded-2xl bg-white p-6 shadow-sm">

              <div className="mb-5 flex items-center gap-3">

                <div className="rounded-xl bg-slate-100 p-3">
                  <MapPin
                    size={20}
                    className="text-slate-700"
                  />
                </div>

                <div>

                  <h2 className="font-semibold text-slate-900">
                    Shipping Address
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Delivery information
                  </p>

                </div>

              </div>

              {selectedOrder.shippingAddress ? (

                <div className="rounded-xl bg-slate-50 p-5">

                  <p className="font-semibold text-slate-900">
                    {selectedOrder.shippingAddress.name}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {selectedOrder.shippingAddress.addressLine}
                    <br />
                    {selectedOrder.shippingAddress.city},{" "}
                    {selectedOrder.shippingAddress.state}
                    <br />
                    PIN:{" "}
                    {selectedOrder.shippingAddress.pincode}
                  </p>

                  {selectedOrder.shippingAddress.phone && (
                    <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
                      <Phone size={16} />
                      {selectedOrder.shippingAddress.phone}
                    </div>
                  )}

                </div>

              ) : (

                <p className="text-sm text-slate-500">
                  Shipping address not available.
                </p>

              )}

            </div>

          </div>

          {/* ======================================
              RIGHT SIDE
          ====================================== */}

          <div className="space-y-6">

            {/* ====================================
                CUSTOMER
            ==================================== */}

            <div className="rounded-2xl bg-white p-6 shadow-sm">

              <div className="mb-5 flex items-center gap-3">

                <div className="rounded-xl bg-slate-100 p-3">
                  <User
                    size={20}
                    className="text-slate-700"
                  />
                </div>

                <div>

                  <h2 className="font-semibold text-slate-900">
                    Customer
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Customer information
                  </p>

                </div>

              </div>

              <div>

                <p className="font-semibold text-slate-900">
                  {selectedOrder.user?.name ||
                    "Unknown"}
                </p>

                {selectedOrder.user?.email && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                    <Mail size={16} />
                    <span className="break-all">
                      {selectedOrder.user.email}
                    </span>
                  </div>
                )}

              </div>

            </div>

            {/* ====================================
                PAYMENT
            ==================================== */}

            <div className="rounded-2xl bg-white p-6 shadow-sm">

              <div className="mb-5 flex items-center gap-3">

                <div className="rounded-xl bg-slate-100 p-3">
                  <CreditCard
                    size={20}
                    className="text-slate-700"
                  />
                </div>

                <div>

                  <h2 className="font-semibold text-slate-900">
                    Payment
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Payment information
                  </p>

                </div>

              </div>

              <div className="space-y-4">

                <div className="flex items-center justify-between">

                  <span className="text-sm text-slate-500">
                    Method
                  </span>

                  <span className="text-sm font-semibold text-slate-900">
                    {selectedOrder.paymentMethod ||
                      "-"}
                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <span className="text-sm text-slate-500">
                    Status
                  </span>

                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${getPaymentStyle(
                      selectedOrder.paymentStatus
                    )}`}
                  >
                    {selectedOrder.paymentStatus ||
                      "Pending"}
                  </span>

                </div>

                {selectedOrder.razorpayOrderId && (
                  <div className="border-t border-slate-100 pt-4">

                    <p className="text-xs text-slate-400">
                      Razorpay Order ID
                    </p>

                    <p className="mt-1 break-all text-xs font-medium text-slate-700">
                      {selectedOrder.razorpayOrderId}
                    </p>

                  </div>
                )}

                {selectedOrder.razorpayPaymentId && (
                  <div>

                    <p className="text-xs text-slate-400">
                      Razorpay Payment ID
                    </p>

                    <p className="mt-1 break-all text-xs font-medium text-slate-700">
                      {selectedOrder.razorpayPaymentId}
                    </p>

                  </div>
                )}

              </div>

            </div>

            {/* ====================================
                ORDER SUMMARY
            ==================================== */}

            <div className="rounded-2xl bg-slate-950 p-6 text-white shadow-sm">

              <div className="flex items-center gap-3">

                <Truck
                  size={20}
                  className="text-cyan-400"
                />

                <h2 className="font-semibold">
                  Order Summary
                </h2>

              </div>

              <div className="mt-6 space-y-4">

                <div className="flex items-center justify-between text-sm">

                  <span className="text-slate-400">
                    Items
                  </span>

                  <span>
                    {totalItems}
                  </span>

                </div>

                <div className="flex items-center justify-between text-sm">

                  <span className="text-slate-400">
                    Payment
                  </span>

                  <span>
                    {selectedOrder.paymentMethod ||
                      "-"}
                  </span>

                </div>

                <div className="border-t border-slate-700 pt-4">

                  <div className="flex items-center justify-between">

                    <span className="font-medium text-slate-300">
                      Total Amount
                    </span>

                    <span className="text-2xl font-bold">
                      ₹
                      {Number(
                        selectedOrder.totalAmount ||
                          0
                      ).toLocaleString("en-IN")}
                    </span>

                  </div>

                </div>

              </div>

            </div>

            {/* ====================================
                ORDER DATE
            ==================================== */}

            <div className="rounded-2xl bg-white p-6 shadow-sm">

              <div className="flex items-center gap-3">

                <div className="rounded-xl bg-slate-100 p-3">
                  <Calendar
                    size={20}
                    className="text-slate-700"
                  />
                </div>

                <div>

                  <p className="text-sm text-slate-500">
                    Order placed
                  </p>

                  <p className="mt-1 font-semibold text-slate-900">
                    {formatDateTime(
                      selectedOrder.createdAt
                    )}
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default AdminOrderDetails;
