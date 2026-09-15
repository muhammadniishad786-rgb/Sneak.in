import { useDispatch } from "react-redux";

import { fetchCart } from "../redux/features/cartSlice";
import { updateCartItem, removeCartItem } from "../services/cartApi";

function CartCard({ item }) {
  const dispatch = useDispatch();

  // Backend URL without /api
  const backendUrl = import.meta.env.VITE_API_URL.replace("/api", "");

  const imageUrl = `${backendUrl}${item.product.image}`;

  const handleIncrease = async () => {
    try {
      await updateCartItem(item._id, {
        quantity: item.quantity + 1,
      });

      dispatch(fetchCart());
    } catch (error) {
      console.error("Failed to increase quantity:", error);
    }
  };

  const handleDecrease = async () => {
    if (item.quantity <= 1) {
      return;
    }

    try {
      await updateCartItem(item._id, {
        quantity: item.quantity - 1,
      });

      dispatch(fetchCart());
    } catch (error) {
      console.error("Failed to decrease quantity:", error);
    }
  };

  const handleRemove = async () => {
    try {
      await removeCartItem(item._id);

      dispatch(fetchCart());
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md sm:flex-row">

      {/* Product Image */}
      <div className="h-32 w-full shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-32 sm:w-32">
        <img
          src={imageUrl}
          alt={item.product.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col justify-between">

        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            {item.product.name}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Size: {item.size}
          </p>

          <p className="mt-2 font-semibold text-slate-900">
            ₹{item.product.price.toLocaleString()}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-4 flex items-center justify-between">

          {/* Quantity */}
          <div className="flex items-center overflow-hidden rounded-lg border border-slate-200">

            <button
              onClick={handleDecrease}
              disabled={item.quantity <= 1}
              className="px-3 py-1.5 text-lg text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              −
            </button>

            <span className="min-w-10 px-4 py-1.5 text-center font-medium text-slate-900">
              {item.quantity}
            </span>

            <button
              onClick={handleIncrease}
              className="px-3 py-1.5 text-lg text-slate-600 transition hover:bg-slate-100"
            >
              +
            </button>

          </div>

          {/* Remove */}
          <button
            onClick={handleRemove}
            className="text-sm font-medium text-red-500 transition hover:text-red-600"
          >
            Remove
          </button>

        </div>
      </div>
    </div>
  );
}

export default CartCard;
