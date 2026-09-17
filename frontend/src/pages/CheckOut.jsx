import { useEffect, useState } from "react";
import {
  FiMapPin,
  FiPlus,
  FiCheck,
  FiShoppingBag,
  FiCreditCard,
  FiTruck,
  FiArrowRight,
} from "react-icons/fi";
import { getAddress } from "../services/addressApi";
import { fetchCart } from "../redux/features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewOrder } from "../redux/features/orderSlice";
import {
  createPaymentOrder,
  verifyPayment,
} from "../services/payApi";
import { loadRazorpay } from "../utils/razorpay";

function Checkout() {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loading, setLoading] = useState(true);

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState("COD");

  // Razorpay loading state
  const [paymentLoading, setPaymentLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cart } = useSelector((state) => state.cart);

  const {
    loading: orderLoading,
    error: orderError,
  } = useSelector((state) => state.order);

  // ========================================
  // FETCH DATA
  // ========================================

  useEffect(() => {
    fetchAddresses();
    dispatch(fetchCart());
  }, [dispatch]);

  // ========================================
  // COD ORDER
  // ========================================

  const handleCODOrder = async () => {
    if (!selectedAddress) {
      return;
    }

    try {
      const order = await dispatch(
        createNewOrder({
          addressId: selectedAddress,
          paymentMethod: "COD",
        }),
      ).unwrap();

      navigate(`/orders/${order._id}`);
    } catch (error) {
      console.error(
        "Failed to place COD order:",
        error,
      );
    }
  };

  // ========================================
  // RAZORPAY PAYMENT
  // ========================================

  const handleRazorpayPayment = async () => {
    if (!selectedAddress) {
      return;
    }

    try {
      setPaymentLoading(true);

      // ------------------------------------
      // 1. Load Razorpay Checkout
      // ------------------------------------

      const isLoaded = await loadRazorpay();

      if (!isLoaded) {
        alert(
          "Razorpay failed to load. Please try again.",
        );

        setPaymentLoading(false);
        return;
      }

      // ------------------------------------
      // 2. Create Razorpay Order
      // ------------------------------------

      const paymentData =
        await createPaymentOrder(totalAmount);

      const razorpayOrder = paymentData.order;

      // ------------------------------------
      // 3. Razorpay Checkout Options
      // ------------------------------------

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: razorpayOrder.amount,

        currency: razorpayOrder.currency,

        name: "Sneak.in",

        description: "Sneak.in Order",

        order_id: razorpayOrder.id,

        handler: async function (response) {
          try {
            // --------------------------------
            // 4. Verify Payment
            // --------------------------------

            const verification =
              await verifyPayment({
                razorpay_order_id:
                  response.razorpay_order_id,

                razorpay_payment_id:
                  response.razorpay_payment_id,

                razorpay_signature:
                  response.razorpay_signature,

                // Send selected address
                addressId: selectedAddress,
              });

            console.log(
              "Payment verification:",
              verification,
            );

            // --------------------------------
            // 5. Payment + Order Success
            // --------------------------------

            alert("Payment successful!");

            // Navigate to created Sneak.in order
            navigate(
              `/orders/${verification.order._id}`,
            );
          } catch (error) {
            console.error(
              "Payment verification failed:",
              error,
            );

            alert(
              error.response?.data?.message ||
                "Payment verification failed.",
            );
          } finally {
            setPaymentLoading(false);
          }
        },

        // ------------------------------------
        // Razorpay modal closed
        // ------------------------------------

        modal: {
          ondismiss: function () {
            setPaymentLoading(false);
          },
        },

        // ------------------------------------
        // Razorpay theme
        // ------------------------------------

        theme: {
          color: "#06b6d4",
        },
      };

      // ------------------------------------
      // 6. Open Razorpay Checkout
      // ------------------------------------

      const razorpay = new window.Razorpay(
        options,
      );

      razorpay.open();
    } catch (error) {
      console.error(
        "Razorpay payment error:",
        error,
      );

      alert(
        error.response?.data?.message ||
          "Unable to start payment.",
      );

      setPaymentLoading(false);
    }
  };

  // ========================================
  // PLACE ORDER
  // ========================================

  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      return;
    }

    if (cartItems.length === 0) {
      return;
    }

    if (paymentMethod === "COD") {
      handleCODOrder();
      return;
    }

    if (paymentMethod === "RAZORPAY") {
      handleRazorpayPayment();
    }
  };

  // ========================================
  // CART ITEMS
  // ========================================

  const cartItems = cart?.items || [];

  // ========================================
  // TOTAL
  // ========================================

  const totalAmount = cartItems.reduce(
    (total, item) =>
      total +
      item.product.price * item.quantity,
    0,
  );

  // ========================================
  // ADD ADDRESS
  // ========================================

  const handleAddress = () => {
    navigate("/address");
  };

  // ========================================
  // FETCH ADDRESSES
  // ========================================

  const fetchAddresses = async () => {
    try {
      const data = await getAddress();

      setAddresses(data.addresses);

      const defaultAddress =
        data.addresses.find(
          (address) => address.isDefault,
        );

      if (defaultAddress) {
        setSelectedAddress(
          defaultAddress._id,
        );
      }
    } catch (error) {
      console.error(
        "Failed to fetch addresses:",
        error,
      );
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl animate-pulse">

          <div className="mb-10">
            <div className="h-4 w-40 rounded bg-slate-200" />

            <div className="mt-3 h-10 w-56 rounded bg-slate-200" />

            <div className="mt-3 h-4 w-96 max-w-full rounded bg-slate-200" />
          </div>

          <div className="grid gap-8 lg:grid-cols-3">

            <div className="space-y-6 lg:col-span-2">
              <div className="h-80 rounded-2xl bg-white" />

              <div className="h-16 rounded-2xl bg-white" />
            </div>

            <div className="h-96 rounded-2xl bg-white" />

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* ========================================
            HEADER
        ======================================== */}

        <div className="mb-8">

          <div className="mb-3 flex items-center gap-2 text-sky-500">

            <FiShoppingBag size={18} />

            <span className="text-xs font-bold uppercase tracking-[0.18em]">
              Sneak.in
            </span>

          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Checkout
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            Complete your order by selecting your delivery
            address and reviewing your order details.
          </p>

        </div>

        {/* ========================================
            CHECKOUT LAYOUT
        ======================================== */}

        <div className="grid items-start gap-6 lg:grid-cols-3 lg:gap-8">

          {/* ========================================
              LEFT CONTENT
          ======================================== */}

          <div className="space-y-6 lg:col-span-2">

            {/* ========================================
                DELIVERY ADDRESS
            ======================================== */}

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

              <div className="border-b border-slate-100 px-5 py-5 sm:px-6">

                <div className="flex items-start justify-between gap-4">

                  <div className="flex gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50">

                      <FiMapPin
                        size={19}
                        className="text-sky-500"
                      />

                    </div>

                    <div>

                      <h2 className="font-bold text-slate-900">
                        Delivery Address
                      </h2>

                      <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                        Choose where you want your order delivered.
                      </p>

                    </div>

                  </div>

                  {addresses.length > 0 && (
                    <span className="hidden rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 sm:block">

                      {addresses.length}{" "}

                      {addresses.length === 1
                        ? "Address"
                        : "Addresses"}

                    </span>
                  )}

                </div>

              </div>

              <div className="p-5 sm:p-6">

                {addresses.length === 0 ? (

                  <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">

                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">

                      <FiMapPin
                        size={24}
                        className="text-slate-400"
                      />

                    </div>

                    <h3 className="mt-4 font-bold text-slate-900">
                      No delivery address
                    </h3>

                    <p className="mx-auto mt-1 max-w-sm text-sm leading-6 text-slate-500">
                      Add a delivery address before placing your order.
                    </p>

                    <button
                      type="button"
                      onClick={handleAddress}
                      className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 active:scale-[0.98]"
                    >
                      <FiPlus size={17} />
                      Add Address
                    </button>

                  </div>

                ) : (

                  <div className="space-y-3">

                    {addresses.map((address) => {

                      const isSelected =
                        selectedAddress ===
                        address._id;

                      return (
                        <button
                          key={address._id}
                          type="button"
                          onClick={() =>
                            setSelectedAddress(
                              address._id,
                            )
                          }
                          className={`group w-full rounded-2xl border p-4 text-left transition-all duration-200 sm:p-5 ${
                            isSelected
                              ? "border-sky-400 bg-sky-50/60 shadow-sm ring-1 ring-sky-200"
                              : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                          }`}
                        >

                          <div className="flex items-start gap-4">

                            <div
                              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition ${
                                isSelected
                                  ? "border-sky-500 bg-sky-500"
                                  : "border-slate-300 bg-white group-hover:border-slate-400"
                              }`}
                            >

                              {isSelected && (
                                <FiCheck
                                  size={12}
                                  strokeWidth={3}
                                  className="text-white"
                                />
                              )}

                            </div>

                            <div className="min-w-0 flex-1">

                              <div className="flex flex-wrap items-center gap-2">

                                <h3 className="font-bold text-slate-900">
                                  {address.name}
                                </h3>

                                {address.isDefault && (
                                  <span className="rounded-full bg-sky-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-sky-600">
                                    Default
                                  </span>
                                )}

                              </div>

                              <p className="mt-1 text-sm font-medium text-slate-500">
                                {address.phone}
                              </p>

                              <div className="mt-3 flex items-start gap-2">

                                <FiMapPin
                                  size={15}
                                  className="mt-1 shrink-0 text-slate-400"
                                />

                                <p className="text-sm leading-6 text-slate-600">

                                  {address.addressLine}

                                  <br />

                                  {address.city},{" "}
                                  {address.state} -{" "}
                                  {address.pincode}

                                </p>

                              </div>

                            </div>

                            {isSelected && (
                              <div className="hidden rounded-lg bg-sky-500 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white sm:block">
                                Selected
                              </div>
                            )}

                          </div>

                        </button>
                      );
                    })}

                  </div>
                )}

              </div>

            </section>

            {/* ========================================
                ADD ADDRESS
            ======================================== */}

            {addresses.length > 0 && (
              <button
                type="button"
                onClick={handleAddress}
                className="group flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-4 text-sm font-semibold text-slate-600 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-600"
              >

                <FiPlus
                  size={18}
                  className="transition-transform group-hover:rotate-90"
                />

                Add New Address

              </button>
            )}

            {/* ========================================
                PAYMENT METHOD
            ======================================== */}

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

              <div className="flex items-start gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100">

                  <FiCreditCard
                    size={19}
                    className="text-slate-700"
                  />

                </div>

                <div>

                  <h2 className="font-bold text-slate-900">
                    Payment Method
                  </h2>

                  <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                    Choose how you want to pay for your order.
                  </p>

                </div>

              </div>

              <div className="mt-5 space-y-3">

                {/* ========================================
                    COD
                ======================================== */}

                <button
                  type="button"
                  onClick={() =>
                    setPaymentMethod("COD")
                  }
                  className={`w-full rounded-xl border p-4 text-left transition ${
                    paymentMethod === "COD"
                      ? "border-sky-300 bg-sky-50/60 ring-1 ring-sky-200"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >

                  <div className="flex items-center gap-4">

                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">

                      <FiTruck
                        size={19}
                        className="text-sky-500"
                      />

                    </div>

                    <div className="flex-1">

                      <p className="text-sm font-bold text-slate-900">
                        Cash on Delivery
                      </p>

                      <p className="mt-0.5 text-xs text-slate-500">
                        Pay when your order arrives.
                      </p>

                    </div>

                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-full ${
                        paymentMethod === "COD"
                          ? "bg-sky-500"
                          : "border-2 border-slate-300 bg-white"
                      }`}
                    >

                      {paymentMethod === "COD" && (
                        <FiCheck
                          size={12}
                          strokeWidth={3}
                          className="text-white"
                        />
                      )}

                    </div>

                  </div>

                </button>

                {/* ========================================
                    RAZORPAY
                ======================================== */}

                <button
                  type="button"
                  onClick={() =>
                    setPaymentMethod(
                      "RAZORPAY",
                    )
                  }
                  className={`w-full rounded-xl border p-4 text-left transition ${
                    paymentMethod === "RAZORPAY"
                      ? "border-sky-300 bg-sky-50/60 ring-1 ring-sky-200"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >

                  <div className="flex items-center gap-4">

                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">

                      <FiCreditCard
                        size={19}
                        className="text-sky-500"
                      />

                    </div>

                    <div className="flex-1">

                      <p className="text-sm font-bold text-slate-900">
                        Online Payment
                      </p>

                      <p className="mt-0.5 text-xs text-slate-500">
                        Pay securely using Razorpay.
                      </p>

                    </div>

                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-full ${
                        paymentMethod ===
                        "RAZORPAY"
                          ? "bg-sky-500"
                          : "border-2 border-slate-300 bg-white"
                      }`}
                    >

                      {paymentMethod ===
                        "RAZORPAY" && (
                        <FiCheck
                          size={12}
                          strokeWidth={3}
                          className="text-white"
                        />
                      )}

                    </div>

                  </div>

                </button>

              </div>

            </section>

          </div>

          {/* ========================================
              RIGHT ORDER SUMMARY
          ======================================== */}

          <aside className="lg:sticky lg:top-6">

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

              {/* SUMMARY HEADER */}

              <div className="border-b border-slate-100 px-5 py-5 sm:px-6">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900">

                    <FiShoppingBag
                      size={18}
                      className="text-white"
                    />

                  </div>

                  <div>

                    <h2 className="font-bold text-slate-900">
                      Order Summary
                    </h2>

                    <p className="text-xs text-slate-500">
                      {cartItems.length}{" "}
                      {cartItems.length === 1
                        ? "item"
                        : "items"}
                    </p>

                  </div>

                </div>

              </div>

              {/* PRODUCTS */}

              <div className="max-h-72 overflow-y-auto px-5 py-5 sm:px-6">

                <div className="space-y-4">

                  {cartItems.map((item) => (

                    <div
                      key={item._id}
                      className="flex gap-3"
                    >

                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-100">

                        <img
                          src={
                            item.product?.image?.startsWith(
                              "http",
                            )
                              ? item.product.image
                              : `https://sneak-in-backend.onrender.com${item.product?.image}`
                          }
                          alt={
                            item.product?.name
                          }
                          className="h-full w-full object-cover"
                        />

                      </div>

                      <div className="min-w-0 flex-1">

                        <p className="truncate text-sm font-semibold text-slate-900">
                          {item.product?.name}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Size: {item.size} · Qty:{" "}
                          {item.quantity}
                        </p>

                        <p className="mt-1 text-sm font-bold text-slate-900">
                          ₹
                          {(
                            item.product?.price *
                            item.quantity
                          ).toLocaleString(
                            "en-IN",
                          )}
                        </p>

                      </div>

                    </div>

                  ))}

                </div>

              </div>

              {/* PRICE DETAILS */}

              <div className="border-t border-slate-100 px-5 py-5 sm:px-6">

                <div className="space-y-3">

                  <div className="flex items-center justify-between text-sm">

                    <span className="text-slate-500">
                      Subtotal
                    </span>

                    <span className="font-medium text-slate-900">
                      ₹
                      {totalAmount.toLocaleString(
                        "en-IN",
                      )}
                    </span>

                  </div>

                  <div className="flex items-center justify-between text-sm">

                    <span className="text-slate-500">
                      Delivery
                    </span>

                    <span className="font-semibold text-emerald-600">
                      FREE
                    </span>

                  </div>

                </div>

                <div className="my-5 border-t border-dashed border-slate-200" />

                <div className="flex items-center justify-between">

                  <div>

                    <p className="font-bold text-slate-900">
                      Total
                    </p>

                    <p className="mt-0.5 text-xs text-slate-400">
                      Inclusive of all charges
                    </p>

                  </div>

                  <span className="text-2xl font-bold tracking-tight text-slate-900">
                    ₹
                    {totalAmount.toLocaleString(
                      "en-IN",
                    )}
                  </span>

                </div>

                {/* ERROR */}

                {orderError && (
                  <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {orderError}
                  </div>
                )}

                {/* PLACE ORDER */}

                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  disabled={
                    !selectedAddress ||
                    orderLoading ||
                    paymentLoading ||
                    cartItems.length === 0
                  }
                  className="group mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-4 text-sm font-bold text-white shadow-sm transition-all hover:bg-slate-800 hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
                >

                  {orderLoading ||
                  paymentLoading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                      {paymentMethod ===
                      "RAZORPAY"
                        ? "Opening Payment..."
                        : "Placing Order..."}
                    </>
                  ) : (
                    <>
                      {paymentMethod ===
                      "RAZORPAY"
                        ? "Pay Now"
                        : "Place Order"}

                      <FiArrowRight
                        size={17}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </>
                  )}

                </button>

                {!selectedAddress &&
                  addresses.length > 0 && (
                    <p className="mt-3 text-center text-xs text-amber-600">
                      Please select a delivery address.
                    </p>
                  )}

                <p className="mt-4 text-center text-[11px] leading-5 text-slate-400">
                  By placing your order, you confirm that
                  your delivery details are correct.
                </p>

              </div>

            </div>

            {/* SECURE CHECKOUT */}

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">

              <FiCheck
                size={14}
                className="text-emerald-500"
              />

              Secure checkout

            </div>

          </aside>

        </div>

      </div>

    </div>
  );
}

export default Checkout;
