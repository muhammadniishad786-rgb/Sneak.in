import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCart } from "../redux/features/cartSlice";
import { updateCartItem, removeCartItem } from "../services/cartApi";

function CartCard({ item }) {
  const dispatch = useDispatch();

  const [updating, setUpdating] = useState(false);
  const [removing, setRemoving] = useState(false);

  // Backend URL without /api
  const backendUrl = import.meta.env.VITE_API_URL.replace("/api", "");

  // Safely get product information
  const product = item?.product;

  // Safely create image URL
  const imageUrl = product?.image
    ? product.image.startsWith("http")
      ? product.image
      : `${backendUrl}${product.image}`
    : "/placeholder-shoe.png";

  // Safely get price
  const price = Number(product?.price || 0);

  // Increase quantity
  const handleIncrease = async () => {
    if (updating) return;

    try {
      setUpdating(true);

      await updateCartItem(item._id, {
        quantity: item.quantity + 1,
      });

      dispatch(fetchCart());
    } catch (error) {
      console.error("Failed to increase quantity:", error);
    } finally {
      setUpdating(false);
    }
  };

  // Decrease quantity
  const handleDecrease = async () => {
    if (item.quantity <= 1 || updating) {
      return;
    }

    try {
      setUpdating(true);

      await updateCartItem(item._id, {
        quantity: item.quantity - 1,
      });

      dispatch(fetchCart());
    } catch (error) {
      console.error("Failed to decrease quantity:", error);
    } finally {
      setUpdating(false);
    }
  };

  // Remove item
  const handleRemove = async () => {
    if (removing) return;

    try {
      setRemoving(true);

      await removeCartItem(item._id);

      dispatch(fetchCart());
    } catch (error) {
      console.error("Failed to remove item:", error);
      setRemoving(false);
    }
  };

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md sm:flex-row">

      {/* Product Image */}
      <div className="h-32 w-full shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-32 sm:w-32">
        <img
          src={imageUrl}
          alt={product?.name || "Product"}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "/placeholder-shoe.png";
          }}
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col justify-between">

        {/* Product Information */}
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            {product?.name || "Product unavailable"}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Size: {item?.size || "N/A"}
          </p>

          <p className="mt-2 font-semibold text-slate-900">
            ₹{price.toLocaleString("en-IN")}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-4 flex items-center justify-between">

          {/* Quantity Controls */}
          <div className="flex items-center overflow-hidden rounded-lg border border-slate-200">

            {/* Decrease */}
            <button
              type="button"
              onClick={handleDecrease}
              disabled={item.quantity <= 1 || updating}
              className="px-3 py-1.5 text-lg text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              −
            </button>

            {/* Quantity */}
            <span className="min-w-10 px-4 py-1.5 text-center font-medium text-slate-900">
              {item?.quantity || 1}
            </span>

            {/* Increase */}
            <button
              type="button"
              onClick={handleIncrease}
              disabled={updating}
              className="px-3 py-1.5 text-lg text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              +
            </button>

          </div>

          {/* Remove */}
          <button
            type="button"
            onClick={handleRemove}
            disabled={removing}
            className="text-sm font-medium text-red-500 transition hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {removing ? "Removing..." : "Remove"}
          </button>

        </div>
      </div>
    </div>
  );
}

export default CartCard;
