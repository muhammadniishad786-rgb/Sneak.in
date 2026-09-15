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
} from "lucide-react";

import { getProductById } from "../services/productApi";
import { addCartItem } from "../redux/features/cartSlice";

function ProductDetails() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { adding } = useSelector((state) => state.cart);

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [addedToCart, setAddedToCart] = useState(false);


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


  // ==========================================
  // QUANTITY
  // ==========================================

  const increaseQuantity = () => {
    if (product?.stock && quantity >= product.stock) {
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

    // Size validation
    if (product.sizes?.length > 0 && !selectedSize) {
      alert("Please select a size.");
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

      // Reset success message after 2 seconds
      setTimeout(() => {
        setAddedToCart(false);
      }, 2000);

    } catch (error) {
      console.error("Failed to add product to cart:", error);
    }
  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="mb-8 h-5 w-32 animate-pulse rounded bg-slate-200" />

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

            <div className="h-[500px] animate-pulse rounded-3xl bg-slate-200 lg:h-[650px]" />

            <div className="space-y-5 py-8">

              <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />

              <div className="h-10 w-3/4 animate-pulse rounded bg-slate-200" />

              <div className="h-6 w-32 animate-pulse rounded bg-slate-200" />

              <div className="h-10 w-40 animate-pulse rounded bg-slate-200" />

              <div className="h-24 w-full animate-pulse rounded bg-slate-200" />

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

        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-2xl">
            !
          </div>

          <h2 className="mt-6 text-2xl font-bold text-slate-900">
            Product Not Found
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            {error || "This product may no longer be available."}
          </p>

          <Link
            to="/products"
            className="mt-7 inline-flex rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-cyan-500"
          >
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
  // STOCK STATUS
  // ==========================================

  const isOutOfStock = product.stock <= 0;


  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">


        {/* ==========================================
            BREADCRUMB
        ========================================== */}

        <div className="mb-8 flex items-center gap-2 text-sm text-slate-500">

          <Link
            to="/products"
            className="transition hover:text-cyan-500"
          >
            Shop
          </Link>

          <span>/</span>

          <span className="capitalize text-slate-400">
            {product.category || "Product"}
          </span>

        </div>


        {/* ==========================================
            PRODUCT CONTAINER
        ========================================== */}

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          <div className="grid grid-cols-1 lg:grid-cols-2">


            {/* ==========================================
                IMAGE SECTION
            ========================================== */}

            <div className="relative flex min-h-[450px] items-center justify-center overflow-hidden bg-slate-100 p-8 sm:p-12 lg:min-h-[650px]">

              <img
                src={imageUrl}
                alt={product.name}
                className="max-h-[600px] w-full object-contain transition duration-500 hover:scale-105"
              />


              {/* Category */}

              {product.category && (
                <span className="absolute left-6 top-6 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold capitalize text-slate-700 shadow-sm backdrop-blur">
                  {product.category}
                </span>
              )}


              {/* Wishlist */}

              <button
                type="button"
                className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-500 shadow-md transition hover:text-red-500"
                aria-label="Add to wishlist"
              >
                <Heart size={20} />
              </button>

            </div>


            {/* ==========================================
                PRODUCT INFORMATION
            ========================================== */}

            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">


              {/* Brand */}

              <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-500">
                Sneak.in
              </p>


              {/* Product Name */}

              <h1 className="mt-4 text-3xl font-extrabold capitalize tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                {product.name}
              </h1>


              {/* Rating */}

              <div className="mt-5 flex items-center gap-3">

                <div className="text-lg tracking-wide text-amber-400">
                  ★★★★★
                </div>

                <span className="text-sm text-slate-500">
                  {product.reviews?.length || 0} reviews
                </span>

              </div>


              {/* Price */}

              <div className="mt-7">

                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Price
                </p>

                <p className="mt-1 text-3xl font-extrabold text-slate-950">
                  ₹{Number(product.price).toLocaleString("en-IN")}
                </p>

              </div>


              {/* Description */}

              <div className="mt-7 border-t border-slate-200 pt-7">

                <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900">
                  Description
                </h2>

                <p className="mt-3 leading-7 text-slate-600">
                  {product.description ||
                    "No description available for this product."}
                </p>

              </div>


              {/* ==========================================
                  SIZE SELECTION
              ========================================== */}

              {product.sizes?.length > 0 && (

                <div className="mt-8">

                  <div className="flex items-center justify-between">

                    <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900">
                      Select Size
                    </h2>

                    <span className="text-xs text-slate-400">
                      Choose your size
                    </span>

                  </div>


                  <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">

                    {product.sizes.map((size) => (

                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`rounded-xl border py-3 text-sm font-semibold transition ${
                          selectedSize === size
                            ? "border-cyan-500 bg-cyan-500 text-white shadow-sm"
                            : "border-slate-200 bg-white text-slate-700 hover:border-cyan-400 hover:text-cyan-500"
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

              <div className="mt-6">

                {isOutOfStock ? (

                  <p className="text-sm font-semibold text-red-500">
                    Out of stock
                  </p>

                ) : (

                  <p className="text-sm font-medium text-emerald-600">
                    {product.stock} items available
                  </p>

                )}

              </div>


              {/* ==========================================
                  QUANTITY
              ========================================== */}

              <div className="mt-7">

                <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900">
                  Quantity
                </h2>

                <div className="mt-3 flex w-fit items-center overflow-hidden rounded-xl border border-slate-200">

                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className="flex h-11 w-11 items-center justify-center text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>


                  <span className="flex h-11 min-w-12 items-center justify-center border-x border-slate-200 px-3 text-sm font-semibold text-slate-900">
                    {quantity}
                  </span>


                  <button
                    type="button"
                    onClick={increaseQuantity}
                    disabled={
                      isOutOfStock ||
                      (product.stock && quantity >= product.stock)
                    }
                    className="flex h-11 w-11 items-center justify-center text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>

                </div>

              </div>


              {/* ==========================================
                  ADD TO CART
              ========================================== */}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={
                    adding ||
                    isOutOfStock ||
                    (product.sizes?.length > 0 && !selectedSize)
                  }
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-4 text-sm font-bold text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:bg-slate-300"
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


                <button
                  type="button"
                  className="flex h-14 items-center justify-center rounded-xl border border-slate-200 px-6 text-slate-600 transition hover:border-red-300 hover:text-red-500"
                  aria-label="Add to wishlist"
                >
                  <Heart size={19} />
                </button>

              </div>


              {/* ==========================================
                  PRODUCT FEATURES
              ========================================== */}

              <div className="mt-10 grid grid-cols-1 gap-5 border-t border-slate-200 pt-7 sm:grid-cols-3">


                {/* Delivery */}

                <div className="flex items-start gap-3">

                  <Truck
                    size={20}
                    className="mt-0.5 shrink-0 text-cyan-500"
                  />

                  <div>

                    <p className="text-xs font-bold text-slate-900">
                      Fast Delivery
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
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

                    <p className="text-xs font-bold text-slate-900">
                      Quality Assured
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
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

                    <p className="text-xs font-bold text-slate-900">
                      Customer Support
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      We're here to help
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* Back to Products */}

        <div className="mt-8">

          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-cyan-500"
          >
            ← Continue Shopping
          </Link>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;
