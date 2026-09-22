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

    if (quantity >= product.stock) return;

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
      <div className="min-h-screen bg-white">

        <div className="mx-auto max-w-[1600px] px-5 py-8 sm:px-8 lg:px-12">

          {/* Breadcrumb */}

          <div className="h-3 w-48 animate-pulse bg-zinc-100" />

          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1.25fr_0.75fr]">

            {/* Image Skeleton */}

            <div className="aspect-square animate-pulse bg-zinc-100 sm:aspect-[4/3]" />

            {/* Details Skeleton */}

            <div className="space-y-6 py-4 lg:py-10">

              <div className="h-3 w-20 animate-pulse bg-zinc-100" />

              <div className="h-12 w-4/5 animate-pulse bg-zinc-100" />

              <div className="h-5 w-24 animate-pulse bg-zinc-100" />

              <div className="h-px w-full bg-zinc-100" />

              <div className="h-10 w-32 animate-pulse bg-zinc-100" />

              <div className="space-y-3">

                <div className="h-3 w-full animate-pulse bg-zinc-100" />
                <div className="h-3 w-5/6 animate-pulse bg-zinc-100" />
                <div className="h-3 w-4/6 animate-pulse bg-zinc-100" />

              </div>

              <div className="h-14 w-full animate-pulse bg-zinc-100" />

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
      <div className="flex min-h-screen items-center justify-center bg-white px-5">

        <div className="w-full max-w-lg text-center">

          <p className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400">
            Sneak.in
          </p>

          <h2 className="mt-5 text-4xl font-black uppercase tracking-[-0.05em] sm:text-5xl">
            Product Not Found
          </h2>

          <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-zinc-500">
            {error ||
              "This product may no longer be available."}
          </p>

          <Link
            to="/products"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-zinc-800"
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
    <div className="min-h-screen bg-white text-black">

      <div className="mx-auto max-w-[1600px] px-5 py-6 sm:px-8 sm:py-8 lg:px-12">

        {/* ==========================================
            BREADCRUMB
        ========================================== */}

        <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">

          <Link
            to="/products"
            className="font-semibold text-zinc-500 transition hover:text-black"
          >
            Shop
          </Link>

          <span>/</span>

          <span className="capitalize">
            {product.category || "Product"}
          </span>

          <span>/</span>

          <span className="max-w-[220px] truncate text-zinc-500">
            {product.name}
          </span>

        </div>


        {/* ==========================================
            MAIN PRODUCT
        ========================================== */}

        <section className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16 xl:gap-24">

          {/* ==========================================
              PRODUCT IMAGE
          ========================================== */}

          <div className="relative">

            <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-zinc-100 sm:aspect-[4/3] lg:aspect-square">

              {/* Soft background */}

              <div className="absolute left-1/2 top-1/2 h-[55%] w-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white blur-3xl" />

              {/* Product Image */}

              <img
                src={imageUrl}
                alt={product.name}
                onError={(e) => {
                  e.currentTarget.src =
                    "/placeholder-product.png";
                }}
                className="relative z-10 h-full w-full object-contain p-8 transition duration-700 hover:scale-[1.04] sm:p-12 lg:p-16"
              />


              {/* Category */}

              {product.category && (
                <div className="absolute left-5 top-5 z-20 rounded-full bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-black sm:left-7 sm:top-7">
                  {product.category}
                </div>
              )}


              {/* Favorite */}

              <button
                type="button"
                onClick={handleFavorite}
                className={`absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white transition duration-300 hover:scale-105 sm:right-7 sm:top-7 ${
                  isFavorite
                    ? "text-black"
                    : "text-zinc-500 hover:text-black"
                }`}
                aria-label={
                  isFavorite
                    ? "Remove from favorites"
                    : "Add to favorites"
                }
              >
                <Heart
                  size={20}
                  className={
                    isFavorite
                      ? "fill-current"
                      : ""
                  }
                />
              </button>


              {/* Stock */}

              {isOutOfStock && (
                <div className="absolute bottom-5 left-5 z-20 rounded-full bg-black px-4 py-2 text-xs font-bold text-white sm:bottom-7 sm:left-7">
                  Out of Stock
                </div>
              )}

              {!isOutOfStock && isLowStock && (
                <div className="absolute bottom-5 left-5 z-20 rounded-full bg-white px-4 py-2 text-xs font-bold text-black sm:bottom-7 sm:left-7">
                  Only {product.stock} left
                </div>
              )}

            </div>

          </div>


          {/* ==========================================
              PRODUCT INFO / PURCHASE PANEL
          ========================================== */}

          <div className="lg:sticky lg:top-24 lg:self-start">

            {/* Brand */}

            <p className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-400">
              Sneak.in
            </p>


            {/* Product Name */}

            <h1 className="mt-4 text-[clamp(2.5rem,5vw,4.8rem)] font-black capitalize leading-[0.9] tracking-[-0.06em]">
              {product.name}
            </h1>


            {/* Brand */}

            {product.brand && (
              <p className="mt-4 text-sm font-medium capitalize text-zinc-500">
                {product.brand}
              </p>
            )}


            {/* Rating */}

            <div className="mt-5 flex items-center gap-3">

              <div className="flex items-center gap-0.5">

                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={15}
                    className="fill-black text-black"
                  />
                ))}

              </div>

              <span className="text-xs font-medium text-zinc-400">
                {reviewCount}{" "}
                {reviewCount === 1
                  ? "review"
                  : "reviews"}
              </span>

            </div>


            {/* Divider */}

            <div className="my-7 h-px bg-zinc-200" />


            {/* Price */}

            <div>

              <p className="text-3xl font-black tracking-tight sm:text-4xl">
                ₹
                {Number(
                  product.price
                ).toLocaleString("en-IN")}
              </p>

              <p className="mt-2 text-xs text-zinc-400">
                Inclusive of all taxes
              </p>

            </div>


            {/* Description */}

            <div className="mt-8">

              <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-400">
                About
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-7 text-zinc-600 sm:text-base">
                {product.description ||
                  "No description available for this product."}
              </p>

            </div>


            {/* ==========================================
                SIZE SELECTOR
            ========================================== */}

            {product.sizes?.length > 0 && (
              <div className="mt-9">

                <div className="flex items-center justify-between">

                  <h2 className="text-sm font-bold">
                    Select Size
                  </h2>

                  {selectedSize && (
                    <span className="text-xs font-semibold text-zinc-500">
                      Size {selectedSize}
                    </span>
                  )}

                </div>


                <div className="mt-4 flex flex-wrap gap-2">

                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() =>
                        setSelectedSize(size)
                      }
                      className={`flex h-12 min-w-14 items-center justify-center rounded-full border px-5 text-sm font-semibold transition duration-200 ${
                        selectedSize === size
                          ? "border-black bg-black text-white"
                          : "border-zinc-200 bg-white text-black hover:border-black"
                      }`}
                    >
                      {size}
                    </button>
                  ))}

                </div>


                {!selectedSize && (
                  <p className="mt-3 text-xs text-zinc-400">
                    Select a size to continue.
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
                className={`text-xs font-semibold ${
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
                  : "In stock"}
              </span>

            </div>


            {/* ==========================================
                QUANTITY + CART
            ========================================== */}

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">

              {/* Quantity */}

              <div className="flex h-14 w-fit items-center rounded-full border border-zinc-200">

                <button
                  type="button"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  className="flex h-14 w-12 items-center justify-center rounded-l-full text-zinc-500 transition hover:text-black disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <Minus size={17} />
                </button>

                <span className="flex min-w-10 items-center justify-center text-sm font-bold">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  disabled={
                    isOutOfStock ||
                    quantity >= product.stock
                  }
                  className="flex h-14 w-12 items-center justify-center rounded-r-full text-zinc-500 transition hover:text-black disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <Plus size={17} />
                </button>

              </div>


              {/* Add To Cart */}

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={
                  adding ||
                  isOutOfStock ||
                  (product.sizes?.length > 0 &&
                    !selectedSize)
                }
                className="flex h-14 flex-1 items-center justify-center gap-2 rounded-full bg-black px-7 text-sm font-bold text-white transition duration-300 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-400"
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


            {/* Action Message */}

            {actionMessage && (
              <div className="mt-4 border-y border-zinc-200 py-3 text-xs font-medium text-zinc-600">
                {actionMessage}
              </div>
            )}


            {/* ==========================================
                SERVICE BENEFITS
            ========================================== */}

            <div className="mt-8 border-t border-zinc-200 pt-7">

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">

                {/* Delivery */}

                <div>

                  <Truck
                    size={19}
                    strokeWidth={1.8}
                  />

                  <p className="mt-3 text-xs font-bold">
                    Fast Delivery
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-zinc-400">
                    Quick & reliable shipping
                  </p>

                </div>


                {/* Quality */}

                <div>

                  <ShieldCheck
                    size={19}
                    strokeWidth={1.8}
                  />

                  <p className="mt-3 text-xs font-bold">
                    Quality Assured
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-zinc-400">
                    Premium footwear
                  </p>

                </div>


                {/* Returns */}

                <div>

                  <RotateCcw
                    size={19}
                    strokeWidth={1.8}
                  />

                  <p className="mt-3 text-xs font-bold">
                    Easy Support
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-zinc-400">
                    We're here to help
                  </p>

                </div>

              </div>

            </div>


            {/* Secure Shopping */}

            <div className="mt-7 flex items-start gap-3 border-t border-zinc-200 pt-6">

              <PackageCheck
                size={19}
                className="mt-0.5 shrink-0"
              />

              <div>

                <p className="text-xs font-bold">
                  Secure Shopping
                </p>

                <p className="mt-1 text-[11px] leading-5 text-zinc-400">
                  Your order and payment information is protected.
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* ==========================================
            REVIEWS
        ========================================== */}

        <section className="mt-24 border-t border-zinc-200 pt-16 sm:mt-32 sm:pt-20">

          <ReviewSection productId={product._id} />

        </section>


        {/* ==========================================
            CONTINUE SHOPPING
        ========================================== */}

        <div className="mt-12 border-t border-zinc-200 pt-8">

          <Link
            to="/products"
            className="group inline-flex items-center gap-2 text-sm font-bold"
          >
            <ArrowLeft
              size={16}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />

            Continue Shopping
          </Link>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;