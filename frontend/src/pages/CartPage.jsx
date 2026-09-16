import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import CartCard from "../component/CartCard";
import { fetchCart } from "../redux/features/cartSlice";


function CartPage() {
  const dispatch = useDispatch();

  const { cart, loading, error } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);
  
  const cartItems = cart?.items || [];

  const totalAmount = cartItems.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  /* Loading State */
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 py-12">
        <div className="mx-auto max-w-7xl">

          <div className="mb-10">
            <div className="h-9 w-48 animate-pulse rounded-lg bg-slate-200" />
            <div className="mt-3 h-5 w-72 animate-pulse rounded bg-slate-200" />
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

            <div className="space-y-4 lg:col-span-2">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-44 animate-pulse rounded-2xl bg-white shadow-sm"
                />
              ))}
            </div>

            <div className="h-80 animate-pulse rounded-2xl bg-white shadow-sm" />

          </div>
        </div>
      </div>
    );
  }

  /* Error State */
  if (error && error !== "Cart not found") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="w-full max-w-md rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-2xl">
            !
          </div>

          <h2 className="mt-5 text-xl font-semibold text-slate-900">
            Something went wrong
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            {error}
          </p>

          <button
            onClick={() => dispatch(fetchCart())}
            className="mt-6 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Try Again
          </button>

        </div>
      </div>
    );
  }

  /* Empty Cart */
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 py-16">
        <div className="mx-auto flex max-w-2xl flex-col items-center justify-center text-center">

          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-4xl shadow-sm">
            🛒
          </div>

          <h1 className="mt-7 text-3xl font-bold tracking-tight text-slate-900">
            Your cart is empty
          </h1>

          <p className="mt-3 max-w-md text-slate-500">
            Looks like you haven't added anything to your cart yet.
            Explore our latest footwear and find your next pair.
          </p>

          <Link
            to="/products"
            className="mt-8 rounded-xl bg-slate-900 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Continue Shopping
          </Link>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10">

          <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Shopping Bag
          </p>

          <div className="mt-2 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">

            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Your Cart
              </h1>

              <p className="mt-2 text-slate-500">
                {cartItems.length}{" "}
                {cartItems.length === 1 ? "item" : "items"} in your cart
              </p>
            </div>

            <Link
              to="/products"
              className="text-sm font-semibold text-slate-700 transition hover:text-slate-950"
            >
              ← Continue Shopping
            </Link>

          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">

          {/* Cart Items */}
          <section className="lg:col-span-2">

            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">
                Cart Items
              </h2>

              <span className="text-sm text-slate-500">
                {cartItems.length}{" "}
                {cartItems.length === 1 ? "product" : "products"}
              </span>
            </div>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <CartCard
                  key={item._id}
                  item={item}
                />
              ))}
            </div>

          </section>

          {/* Order Summary */}
          <aside className="lg:sticky lg:top-24">

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <h2 className="text-xl font-semibold text-slate-900">
                Order Summary
              </h2>

              <div className="mt-6 space-y-4">

                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>
                    Subtotal
                  </span>

                  <span className="font-medium text-slate-900">
                    ₹{totalAmount.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>
                    Delivery
                  </span>

                  <span className="font-medium text-emerald-600">
                    Free
                  </span>
                </div>

                <div className="border-t border-slate-200 pt-5">

                  <div className="flex items-center justify-between">

                    <span className="text-base font-semibold text-slate-900">
                      Total
                    </span>

                    <span className="text-2xl font-bold text-slate-900">
                      ₹{totalAmount.toLocaleString()}
                    </span>

                  </div>

                  <p className="mt-2 text-xs text-slate-400">
                    Taxes and delivery charges will be calculated at checkout.
                  </p>

                </div>

              </div>
              <Link to="/checkout">
              <button
                className="mt-7 w-full rounded-xl bg-slate-900 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.99]"
              >
                Proceed to Checkout
              </button>
              </Link>
              <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-400">
                <span>🔒</span>
                <span>Secure checkout</span>
              </div>

            </div>

          </aside>

        </div>
      </div>
    </div>
  );
}

export default CartPage;
