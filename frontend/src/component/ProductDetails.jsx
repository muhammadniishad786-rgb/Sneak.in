import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Truck,
  ShieldCheck,
} from "lucide-react";

import { getProductById } from "../services/productApi";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getProductById(id);

        setProduct(response.data.product || response.data);
      } catch (error) {
        console.log(error);

        setError(
          error.response?.data?.message ||
            "Unable to load this product."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Increase quantity
  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  // Decrease quantity
  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  // Add to cart
  const handleAddToCart = () => {
    if (product.sizes?.length > 0 && !selectedSize) {
      alert("Please select a size.");
      return;
    }

    console.log({
      productId: product._id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      quantity,
    });

    // Cart functionality will be connected here later
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-cyan-500" />

          <p className="mt-4 text-sm text-gray-500">
            Loading product...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Product Not Found
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            {error || "This product may no longer be available."}
          </p>

          <Link
            to="/products"
            className="mt-6 inline-block rounded-lg bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-cyan-500"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const imageUrl = product.image?.startsWith("http")
    ? product.image
    : `https://sneak-in-backend.onrender.com${product.image}`;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Back to Products */}
        <Link
          to="/products"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-cyan-500"
        >
          ← Back to Products
        </Link>

        {/* Product Card */}
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* ================= IMAGE ================= */}
            <div className="relative flex min-h-[450px] items-center justify-center bg-gray-100 p-8 sm:p-12 lg:min-h-[650px]">

              <img
                src={imageUrl}
                alt={product.name}
                className="max-h-[600px] w-full object-contain"
              />

              {/* Wishlist */}
              <button
                type="button"
                className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-white text-gray-500 shadow-md transition hover:text-red-500"
                aria-label="Add to wishlist"
              >
                <Heart size={20} />
              </button>
            </div>

            {/* ================= PRODUCT INFO ================= */}
            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">

              {/* Brand */}
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-500">
                Sneak.in
              </p>

              {/* Category */}
              {product.category && (
                <span className="mt-4 w-fit rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold capitalize text-gray-600">
                  {product.category}
                </span>
              )}

              {/* Product Name */}
              <h1 className="mt-5 text-3xl font-extrabold capitalize tracking-tight text-gray-950 sm:text-4xl">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="mt-4 flex items-center gap-3">
                <div className="text-lg tracking-wide text-amber-400">
                  ★★★★★
                </div>

                <span className="text-sm text-gray-500">
                  {product.reviews?.length || 0} reviews
                </span>
              </div>

              {/* Price */}
              <div className="mt-7">
                <p className="text-sm text-gray-400">
                  Price
                </p>

                <p className="mt-1 text-3xl font-extrabold text-gray-950">
                  ₹{Number(product.price).toLocaleString("en-IN")}
                </p>
              </div>

              {/* Divider */}
              <div className="my-8 border-t border-gray-200" />

              {/* Description */}
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">
                  Product Description
                </h2>

                <p className="mt-3 leading-7 text-gray-600">
                  {product.description ||
                    "No description available for this product."}
                </p>
              </div>

              {/* ================= SIZE ================= */}
              {product.sizes?.length > 0 && (
                <div className="mt-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">
                      Select Size
                    </h2>

                    <button
                      type="button"
                      className="text-xs font-medium text-gray-400 hover:text-cyan-500"
                    >
                      Size Guide
                    </button>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-14 rounded-lg border px-4 py-2.5 text-sm font-semibold transition ${
                          selectedSize === size
                            ? "border-cyan-500 bg-cyan-500 text-white"
                            : "border-gray-300 bg-white text-gray-700 hover:border-cyan-500 hover:text-cyan-500"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ================= QUANTITY ================= */}
              <div className="mt-8">
                <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">
                  Quantity
                </h2>

                <div className="mt-3 flex w-fit items-center rounded-lg border border-gray-300">

                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    className="flex h-10 w-10 items-center justify-center text-gray-600 transition hover:bg-gray-100"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>

                  <span className="flex h-10 w-10 items-center justify-center border-x border-gray-300 text-sm font-semibold text-gray-900">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={increaseQuantity}
                    className="flex h-10 w-10 items-center justify-center text-gray-600 transition hover:bg-gray-100"
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>

                </div>
              </div>

              {/* ================= BUTTONS ================= */}
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gray-950 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-cyan-500"
                >
                  <ShoppingBag size={18} />

                  Add to Cart
                </button>

                <button
                  type="button"
                  className="flex items-center justify-center rounded-xl border border-gray-300 px-6 py-3.5 text-gray-700 transition hover:border-red-400 hover:text-red-500"
                  aria-label="Add to wishlist"
                >
                  <Heart size={19} />
                </button>

              </div>

              {/* ================= FEATURES ================= */}
              <div className="mt-10 grid grid-cols-1 gap-4 border-t border-gray-200 pt-7 sm:grid-cols-3">

                {/* Delivery */}
                <div className="flex items-start gap-3">
                  <Truck
                    size={20}
                    className="mt-0.5 shrink-0 text-cyan-500"
                  />

                  <div>
                    <p className="text-xs font-bold text-gray-900">
                      Fast Delivery
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Quick and reliable shipping
                    </p>
                  </div>
                </div>

                {/* Quality */}
                <div className="flex items-start gap-3">
                  <ShieldCheck
                    size={20}
                    className="mt-0.5 shrink-0 text-cyan-500"
                  />

                  <div>
                    <p className="text-xs font-bold text-gray-900">
                      Quality Assured
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Premium footwear products
                    </p>
                  </div>
                </div>

                {/* Support */}
                <div className="flex items-start gap-3">
                  <ShoppingBag
                    size={20}
                    className="mt-0.5 shrink-0 text-cyan-500"
                  />

                  <div>
                    <p className="text-xs font-bold text-gray-900">
                      Customer Support
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      We're here to help
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
