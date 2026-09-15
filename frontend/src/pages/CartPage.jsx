import { useDispatch, useSelector } from "react-redux";
import CartCard from "../component/CartCard";
import { useEffect } from "react";
import { fetchCart } from "../redux/features/cartSlice";


function CartPage() {
  const cartItems = [
    {
      _id: "1",
      product: {
        name: "Nike Air Max",
        price: 4999,
        image: "/shoe.jpg",
      },
      quantity: 2,
      size: "9",
    },
    {
      _id: "2",
      product: {
        name: "Adidas Ultraboost",
        price: 5999,
        image: "/shoe.jpg",
      },
      quantity: 1,
      size: "10",
    },
  ];

  const {cart} = useSelector(
    (state) => state.cart
  )

 
  

  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(fetchCart())
  }, [dispatch])
   console.log(cart);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">

        {/* Page Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Your Cart
          </h1>

          <p className="mt-2 text-slate-500">
            Review your selected footwear before checkout.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

          {/* Cart Items */}
          <div className="space-y-4 lg:col-span-2">
            {cartItems.map((item) => (
              <CartCard
                key={item._id}
                item={item}
              />
            ))}
          </div>

          {/* Order Summary */}
          <div className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <h2 className="text-xl font-semibold text-slate-900">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4">

              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>₹{totalAmount.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Delivery</span>
                <span>Free</span>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <div className="flex justify-between text-lg font-bold text-slate-900">
                  <span>Total</span>
                  <span>₹{totalAmount.toLocaleString()}</span>
                </div>
              </div>

            </div>

            <button
              className="mt-6 w-full rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
            >
              Proceed to Checkout
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
