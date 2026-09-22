import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  ShoppingBag,
  ArrowRight,
  Loader2,
} from "lucide-react";

import {
  fetchFavorites,
  removeFromFavorites,
} from "../redux/features/favoriteSlice";

function Favorites() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    favorites,
    loading,
    error,
  } = useSelector((state) => state.favorite);

  // Fetch favorites when page loads
  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  // Remove favorite
  const handleRemoveFavorite = (productId) => {
    dispatch(removeFromFavorites(productId));
  };

  // Open product details
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Loading
  if (loading && favorites.length === 0) {
    return (
      <main className="min-h-screen bg-white">
        <div className="flex min-h-[70vh] items-center justify-center">
          <Loader2
            size={32}
            className="animate-spin text-slate-900"
          />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">

      {/* ==================================================
          HEADER
      ================================================== */}
      <section className="border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">

          <div className="flex items-end justify-between">

            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                Saved for later
              </p>

              <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
                Favorites
              </h1>

              <p className="mt-3 text-sm text-slate-500">
                {favorites.length}{" "}
                {favorites.length === 1 ? "item" : "items"}
              </p>
            </div>

            <Heart
              size={34}
              strokeWidth={1.5}
              className="hidden sm:block"
            />

          </div>

        </div>
      </section>


      {/* ==================================================
          ERROR
      ================================================== */}
      {error && (
        <div className="mx-auto max-w-7xl px-5 pt-6 sm:px-8 lg:px-10">
          <div className="rounded-xl bg-red-50 px-5 py-4 text-sm text-red-600">
            {error}
          </div>
        </div>
      )}


      {/* ==================================================
          EMPTY FAVORITES
      ================================================== */}
      {!loading && favorites.length === 0 && (
        <section className="flex min-h-[65vh] items-center justify-center px-5">

          <div className="max-w-md text-center">

            {/* Icon */}
            <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
              <Heart
                size={32}
                strokeWidth={1.5}
                className="text-slate-700"
              />
            </div>

            <h2 className="text-3xl font-bold tracking-tight">
              Your favorites are empty
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Save the sneakers you love and come back to them
              whenever you want.
            </p>

            <button
              onClick={() => navigate("/products")}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#100d2f] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Explore Sneakers
              <ArrowRight size={17} />
            </button>

          </div>

        </section>
      )}


      {/* ==================================================
          FAVORITES GRID
      ================================================== */}
      {favorites.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">

          <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">

            {favorites.map((favorite) => {

              const product = favorite.product;

              // Safety check
              if (!product) return null;

              return (
                <article
                  key={favorite._id}
                  className="group"
                >

                  {/* ====================================
                      PRODUCT IMAGE
                  ==================================== */}
                  <div
                    onClick={() =>
                      handleProductClick(product._id)
                    }
                    className="relative aspect-square cursor-pointer overflow-hidden bg-slate-100"
                  >

                    <img
                      src={
                        product.image?.startsWith("http")
                          ? product.image
                          : `https://sneak-in-backend.onrender.com${product.image}`
                      }
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105"
                    />

                    {/* Remove Heart */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFavorite(product._id);
                      }}
                      disabled={loading}
                      aria-label="Remove from favorites"
                      className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <Heart
                        size={19}
                        fill="currentColor"
                        strokeWidth={1.8}
                      />
                    </button>

                  </div>


                  {/* ====================================
                      PRODUCT INFO
                  ==================================== */}
                  <div className="pt-5">

                    <div className="flex items-start justify-between gap-4">

                      <div className="min-w-0">

                        <h2 className="truncate text-base font-semibold">
                          {product.name}
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                          {product.category || "Sneakers"}
                        </p>

                      </div>

                      <p className="whitespace-nowrap text-sm font-semibold">
                        ₹{Number(product.price).toLocaleString("en-IN")}
                      </p>

                    </div>


                    {/* ====================================
                        VIEW PRODUCT / ADD TO BAG
                    ==================================== */}
                    <button
                      onClick={() =>
                        handleProductClick(product._id)
                      }
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#100d2f] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                      <ShoppingBag size={17} />

                      View Product
                    </button>

                  </div>

                </article>
              );
            })}

          </div>

        </section>
      )}

    </main>
  );
}

export default Favorites;
