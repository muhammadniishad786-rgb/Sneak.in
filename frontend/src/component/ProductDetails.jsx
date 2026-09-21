import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import {
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Truck,
  ShieldCheck,
  Check,
  ArrowLeft,
  Star,
  PackageCheck,
  RotateCcw,
} from "lucide-react";

import { getProductById } from "../services/productApi";
import { addCartItem } from "../redux/features/cartSlice";
import {
  addToFavorites,
  removeFromFavorites,
} from "../redux/features/favoriteSlice";
import ReviewSection from "./ReviewSection";

function ProductDetails() {
  const { id } = useParams();

  const dispatch = useDispatch();

  // ==========================================
  // REDUX
  // ==========================================

  const { adding } = useSelector((state) => state.cart);

  const favorites = useSelector(
    (state) => state.favorite?.favorites || []
  );

  // ==========================================
  // STATE
  // ==========================================

  const [product, setProduct] = useState(null);

  const [selectedSize, setSelectedSize] = useState("");

  const [quantity, setQuantity] = useState(1);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [addedToCart, setAddedToCart] = useState(false);

  const [actionMessage, setActionMessage] = useState("");

  // ==========================================
  // FETCH PRODUCT
  // ==========================================

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getProductById(id);

        setProduct(response.data.product || response.data);
      } catch (error) {
        console.error(error);

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

  // ==========================================
  // FAVORITE CHECK
  // ==========================================

  const isFavorite = favorites.some(
    (favorite) =>
      favorite.product?._id === product?._id
  );

  // ==========================================
  // QUANTITY
  // ==========================================

  const increaseQuantity = () => {
    if (!product?.stock) return;

    if (quantity >= product.stock) {
      return;
    }

    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  // ==========================================
  // ADD TO CART
  // ==========================================

  const handleAddToCart = async () => {
    if (product.sizes?.length > 0 && !selectedSize) {
      setActionMessage("Please select a size first.");
      return;
    }

    try {
      await dispatch(
        addCartItem({
          productId: product._id,
          quantity,
          size: selectedSize,
        })
      ).unwrap();

      setAddedToCart(true);
      setActionMessage("Product added to your cart.");

      setTimeout(() => {
        setAddedToCart(false);
        setActionMessage("");
      }, 2500);
    } catch (error) {
      console.error(
        "Failed to add product to cart:",
        error
      );

      setActionMessage(
        error || "Unable to add product to cart."
      );
    }
  };

  // ==========================================
  // FAVORITE
  // ==========================================

  const handleFavorite = async () => {
    try {
      if (isFavorite) {
        await dispatch(
          removeFromFavorites(product._id)
        ).unwrap();

        setActionMessage(
          "Removed from your favorites."
        );
      } else {
        await dispatch(
          addToFavorites(product._id)
        ).unwrap();

        setActionMessage(
          "Added to your favorites."
        );
      }

      setTimeout(() => {
        setActionMessage("");
      }, 2000);
    } catch (error) {
      console.error("Favorite error:", error);

      setActionMessage(
        error || "Unable to update favorites."
      );
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          {/* Breadcrumb Skeleton */}
          <div className="mb-8 h-4 w-48 animate-pulse rounded bg-slate-200" />

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-2">

              {/* Image */}
              <div className="flex min-h-[420px] animate-pulse items-center justify-center bg-slate-100 sm:min-h-[550px] lg:min-h-[700px]">
                <div className="h-72 w-72 rounded-3xl bg-slate-200 sm:h-96 sm:w-96" />
              </div>

              {/* Details */}
              <div className="space-y-6 p-7 sm:p-10 lg:p-14">

                <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />

                <div className="h-10 w-4/5 animate-pulse rounded bg-slate-200" />

                <div className="h-5 w-32 animate-pulse rounded bg-slate-200" />

                <div className="h-10 w-40 animate-pulse rounded bg-slate-200" />

                <div className="space-y-2">
                  <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
                  <div className="h-4 w-5/6 animate-pulse rounded bg-slate-200" />
                  <div className="h-4 w-4/6 animate-pulse rounded bg-slate-200" />
                </div>

                <div className="h-24 w-full animate-pulse rounded bg-slate-200" />

                <div className="h-14 w-full animate-pulse rounded-xl bg-slate-200" />

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error || !product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">

        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-xl font-bold text-red-500">
            !
          </div>

          <h2 className="mt-6 text-2xl font-extrabold text-slate-950">
            Product Not Found
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            {error ||
              "This product may no longer be available."}
          </p>

          <Link
            to="/products"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-cyan-500"
          >
            <ArrowLeft size={16} />
            Back to Products
          </Link>

        </div>
      </div>
    );
  }

  // ==========================================
  // IMAGE URL
  // ==========================================

  const imageUrl = product.image?.startsWith("http")
    ? product.image
    : `https://sneak-in-backend.onrender.com${product.image}`;

  // ==========================================
  // STOCK
  // ==========================================

  const isOutOfStock = product.stock <= 0;

  const isLowStock =
    product.stock > 0 && product.stock <= 5;

  // ==========================================
  // RATING
  // ==========================================

  const reviewCount = product.reviews?.length || 0;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* ==========================================
            BREADCRUMB
        ========================================== */}

        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm">

          <Link
            to="/products"
            className="font-medium text-slate-500 transition hover:text-cyan-500"
          >
            Shop
          </Link>

          <span className="text-slate-300">
            /
          </span>

          <span className="capitalize text-slate-400">
            {product.category || "Product"}
          </span>

          <span className="text-slate-300">
            /
          </span>

          <span className="max-w-[180px] truncate font-medium text-slate-600">
            {product.name}
          </span>

        </div>

        {/* ==========================================
            MAIN PRODUCT CARD
        ========================================== */}

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* ==========================================
                IMAGE SECTION
            ========================================== */}

            <div className="relative bg-slate-100">

              <div className="relative flex min-h-[400px] items-center justify-center overflow-hidden p-6 sm:min-h-[550px] sm:p-10 lg:min-h-[700px]">

                {/* Decorative background */}
                <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 blur-3xl sm:h-96 sm:w-96" />

                <img
                  src={imageUrl}
                  alt={product.name}
                  onError={(e) => {
                    e.currentTarget.src =
                      "/placeholder-product.png";
                  }}
                  className="relative z-10 max-h-[380px] w-full object-contain drop-shadow-xl transition duration-500 hover:scale-105 sm:max-h-[500px] lg:max-h-[600px]"
                />

                {/* Category Badge */}
                {product.category && (
                  <div className="absolute left-5 top-5 z-20 rounded-full bg-white/90 px-4 py-2 text-xs font-bold capitalize text-slate-700 shadow-sm backdrop-blur sm:left-7 sm:top-7">
                    {product.category}
                  </div>
                )}

                {/* Favorite */}
                <button
                  type="button"
                  onClick={handleFavorite}
                  className={`absolute right-5 top-5 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-105 sm:right-7 sm:top-7 ${
                    isFavorite
                      ? "text-red-500"
                      : "text-slate-500 hover:text-red-500"
                  }`}
                  aria-label={
                    isFavorite
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
                >
                  <Heart
                    size={21}
                    className={
                      isFavorite
                        ? "fill-current"
                        : ""
                    }
                  />
                </button>

                {/* Stock badge */}
                {isOutOfStock && (
                  <div className="absolute bottom-5 left-5 z-20 rounded-full bg-red-500 px-4 py-2 text-xs font-bold text-white sm:bottom-7 sm:left-7">
                    Out of Stock
                  </div>
                )}

                {!isOutOfStock && isLowStock && (
                  <div className="absolute bottom-5 left-5 z-20 rounded-full bg-amber-100 px-4 py-2 text-xs font-bold text-amber-700 sm:bottom-7 sm:left-7">
                    Only {product.stock} left
                  </div>
                )}

              </div>
            </div>

            {/* ==========================================
                PRODUCT DETAILS
            ========================================== */}

            <div className="flex flex-col p-6 sm:p-10 lg:sticky lg:top-6 lg:self-start lg:p-14">

              {/* Brand */}
              <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-cyan-500">
                Sneak.in
              </p>

              {/* Product Name */}
              <h1 className="mt-3 text-3xl font-black capitalize leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                {product.name}
              </h1>

              {/* Brand */}
              {product.brand && (
                <p className="mt-2 text-sm font-medium capitalize text-slate-500">
                  {product.brand}
                </p>
              )}

              {/* Rating */}
              <div className="mt-5 flex flex-wrap items-center gap-3">

                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={17}
                      className="fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                <span className="text-sm font-medium text-slate-500">
                  {reviewCount}{" "}
                  {reviewCount === 1
                    ? "review"
                    : "reviews"}
                </span>

              </div>

              {/* Divider */}
              <div className="my-6 h-px bg-slate-200" />

              {/* Price */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Price
                </p>

                <div className="mt-1 flex items-end gap-3">

                  <span className="text-3xl font-black text-slate-950 sm:text-4xl">
                    ₹
                    {Number(
                      product.price
                    ).toLocaleString("en-IN")}
                  </span>

                  <span className="pb-1 text-sm font-medium text-slate-400">
                    Inclusive of all taxes
                  </span>

                </div>
              </div>

              {/* Description */}
              <div className="mt-7">

                <h2 className="text-sm font-bold text-slate-950">
                  About this product
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                  {product.description ||
                    "No description available for this product."}
                </p>

              </div>

              {/* ==========================================
                  SIZE
              ========================================== */}

              {product.sizes?.length > 0 && (
                <div className="mt-8">

                  <div className="flex items-center justify-between">

                    <h2 className="text-sm font-bold text-slate-950">
                      Select Size
                    </h2>

                    {selectedSize && (
                      <span className="text-xs font-semibold text-cyan-500">
                        Size {selectedSize} selected
                      </span>
                    )}

                  </div>

                  <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-5">

                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() =>
                          setSelectedSize(size)
                        }
                        className={`flex h-12 items-center justify-center rounded-xl border text-sm font-bold transition ${
                          selectedSize === size
                            ? "border-slate-950 bg-slate-950 text-white shadow-md"
                            : "border-slate-200 bg-white text-slate-700 hover:border-slate-950"
                        }`}
                      >
                        {size}
                      </button>
                    ))}

                  </div>

                  {!selectedSize && (
                    <p className="mt-3 text-xs text-slate-400">
                      Please select a size before adding to cart.
                    </p>
                  )}

                </div>
              )}

              {/* ==========================================
                  STOCK
              ========================================== */}

              <div className="mt-6 flex items-center gap-2">

                <span
                  className={`h-2 w-2 rounded-full ${
                    isOutOfStock
                      ? "bg-red-500"
                      : isLowStock
                      ? "bg-amber-500"
                      : "bg-emerald-500"
                  }`}
                />

                <span
                  className={`text-sm font-semibold ${
                    isOutOfStock
                      ? "text-red-500"
                      : isLowStock
                      ? "text-amber-600"
                      : "text-emerald-600"
                  }`}
                >
                  {isOutOfStock
                    ? "Currently unavailable"
                    : isLowStock
                    ? `Only ${product.stock} left in stock`
                    : `${product.stock} items available`}
                </span>

              </div>

              {/* ==========================================
                  QUANTITY + CART
              ========================================== */}

              <div className="mt-7">

                <h2 className="text-sm font-bold text-slate-950">
                  Quantity
                </h2>

                <div className="mt-3 flex flex-col gap-3 sm:flex-row">

                  {/* Quantity */}
                  <div className="flex w-fit items-center overflow-hidden rounded-xl border border-slate-200 bg-white">

                    <button
                      type="button"
                      onClick={decreaseQuantity}
                      disabled={quantity <= 1}
                      className="flex h-12 w-12 items-center justify-center text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <Minus size={17} />
                    </button>

                    <span className="flex h-12 min-w-12 items-center justify-center border-x border-slate-200 px-3 text-sm font-bold text-slate-950">
                      {quantity}
                    </span>

                    <button
                      type="button"
                      onClick={increaseQuantity}
                      disabled={
                        isOutOfStock ||
                        quantity >= product.stock
                      }
                      className="flex h-12 w-12 items-center justify-center text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <Plus size={17} />
                    </button>

                  </div>

                  {/* Add Cart */}
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={
                      adding ||
                      isOutOfStock ||
                      (product.sizes?.length > 0 &&
                        !selectedSize)
                    }
                    className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-bold text-white shadow-sm transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:bg-slate-300"
                  >
                    {adding ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Adding...
                      </>
                    ) : addedToCart ? (
                      <>
                        <Check size={18} />
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={18} />
                        Add to Cart
                      </>
                    )}
                  </button>

                </div>

              </div>

              {/* ==========================================
                  ACTION MESSAGE
              ========================================== */}

              {actionMessage && (
                <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-600">
                  {actionMessage}
                </div>
              )}

              {/* ==========================================
                  BENEFITS
              ========================================== */}

              <div className="mt-8 grid grid-cols-1 gap-3 border-t border-slate-200 pt-7 sm:grid-cols-3">

                {/* Delivery */}
                <div className="rounded-2xl bg-slate-50 p-4">

                  <Truck
                    size={19}
                    className="text-cyan-500"
                  />

                  <p className="mt-3 text-xs font-bold text-slate-950">
                    Fast Delivery
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-slate-500">
                    Quick & reliable shipping
                  </p>

                </div>

                {/* Quality */}
                <div className="rounded-2xl bg-slate-50 p-4">

                  <ShieldCheck
                    size={19}
                    className="text-cyan-500"
                  />

                  <p className="mt-3 text-xs font-bold text-slate-950">
                    Quality Assured
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-slate-500">
                    Premium footwear products
                  </p>

                </div>

                {/* Returns */}
                <div className="rounded-2xl bg-slate-50 p-4">

                  <RotateCcw
                    size={19}
                    className="text-cyan-500"
                  />

                  <p className="mt-3 text-xs font-bold text-slate-950">
                    Easy Support
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-slate-500">
                    We're here to help
                  </p>

                </div>

              </div>

              {/* Secure checkout */}
              <div className="mt-5 flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">

                <PackageCheck
                  size={20}
                  className="shrink-0 text-emerald-600"
                />

                <div>

                  <p className="text-xs font-bold text-emerald-800">
                    Secure Shopping
                  </p>

                  <p className="mt-1 text-[11px] text-emerald-700">
                    Your order and payment information is protected.
                  </p>

                </div>

              </div>

            </div>
          </div>
        </div>

        <ReviewSection productId={product._id} />

        {/* ==========================================
            CONTINUE SHOPPING
        ========================================== */}

        <div className="mt-8">

          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-cyan-500"
          >
            <ArrowLeft size={16} />
            Continue Shopping
          </Link>

        </div>

      </div>
    </div>
  );
}

export default ProductDetails;