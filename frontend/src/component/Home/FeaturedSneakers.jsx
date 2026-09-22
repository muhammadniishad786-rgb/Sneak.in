import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FiHeart, FiChevronLeft, FiChevronRight } from "react-icons/fi";

import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/features/favoriteSlice";
import { fetchProducts } from "../../redux/features/productSlice";

function FeaturedSneakers() {
  const dispatch = useDispatch();

  // Horizontal slider reference
  const sliderRef = useRef(null);

  const { products, loading } = useSelector(
    (state) => state.products
  );

  const favorites = useSelector(
    (state) => state.favorite.favorites
  );

  // Show only first 6 products
  const featuredProducts = products?.slice(0, 6) || [];

  // ==================================================
  // IMAGE URL
  // ==================================================

  const getImageUrl = (image) => {
    if (!image) return "";

    if (image.startsWith("http")) {
      return image;
    }

    return `${import.meta.env.VITE_API_URL.replace("/api", "")}${image}`;
  };

  // ==================================================
  // CHECK FAVORITE
  // ==================================================

  const isFavorite = (productId) => {
    return favorites.some(
      (favorite) =>
        favorite.product?._id === productId
    );
  };

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  // ==================================================
  // FAVORITE HANDLER
  // ==================================================

  const handleFavorite = (productId) => {
    if (isFavorite(productId)) {
      dispatch(removeFromFavorites(productId));
    } else {
      dispatch(addToFavorites(productId));
    }
  };

  // ==================================================
  // SLIDER
  // ==================================================

  const scrollSlider = (direction) => {
    if (!sliderRef.current) return;

    const scrollAmount = sliderRef.current.clientWidth * 0.75;

    sliderRef.current.scrollBy({
      left:
        direction === "left"
          ? -scrollAmount
          : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-white">

      {/* ==================================================
          SECTION HEADER
      ================================================== */}

      <div className="mx-auto max-w-[1600px] px-5 pb-8 pt-20 sm:px-8 lg:px-12">

        <div className="flex items-end justify-between gap-6">

          {/* Heading */}

          <div>

            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400">
              Featured
            </p>

            <h2 className="mt-3 text-4xl font-black uppercase tracking-[-0.04em] text-black sm:text-5xl">
              Featured Sneakers
            </h2>

          </div>


          {/* Desktop Controls */}

          <div className="hidden items-center gap-2 sm:flex">

            <button
              type="button"
              onClick={() => scrollSlider("left")}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white text-black transition hover:bg-black hover:text-white"
              aria-label="Previous sneakers"
            >
              <FiChevronLeft size={20} />
            </button>

            <button
              type="button"
              onClick={() => scrollSlider("right")}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white text-black transition hover:bg-black hover:text-white"
              aria-label="Next sneakers"
            >
              <FiChevronRight size={20} />
            </button>

          </div>

        </div>

      </div>


      {/* ==================================================
          PRODUCTS
      ================================================== */}

      <div className="pb-24">

        {loading ? (

          /* ==================================================
             LOADING
          ================================================== */

          <div className="flex gap-5 overflow-hidden px-5 sm:px-8 lg:px-12">

            {[1, 2, 3, 4].map((item) => (

              <div
                key={item}
                className="w-[82vw] shrink-0 sm:w-[48vw] lg:w-[31vw]"
              >

                <div className="aspect-square animate-pulse bg-zinc-100" />

                <div className="mt-5 h-4 w-2/3 animate-pulse bg-zinc-100" />

                <div className="mt-3 h-3 w-1/3 animate-pulse bg-zinc-100" />

              </div>

            ))}

          </div>

        ) : featuredProducts.length > 0 ? (

          /* ==================================================
             HORIZONTAL SLIDER
          ================================================== */

          <div
            ref={sliderRef}
            className="flex gap-5 overflow-x-auto scroll-smooth px-5 pb-4 sm:gap-6 sm:px-8 lg:px-12"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >

            {featuredProducts.map((product) => {

              const favorite = isFavorite(product._id);

              return (

                <article
                  key={product._id}
                  className="group w-[82vw] shrink-0 sm:w-[48vw] lg:w-[31vw]"
                >

                  {/* ======================================
                      IMAGE
                  ====================================== */}

                  <div className="relative aspect-square overflow-hidden bg-zinc-100">

                    <Link
                      to={`/product/${product._id}`}
                      className="block h-full w-full"
                    >

                      <img
                        src={getImageUrl(product.image)}
                        alt={product.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                      />

                    </Link>


                    {/* ==================================
                        FAVORITE
                    ================================== */}

                    <button
                      type="button"
                      onClick={() =>
                        handleFavorite(product._id)
                      }
                      aria-label={
                        favorite
                          ? "Remove from favorites"
                          : "Add to favorites"
                      }
                      className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white transition duration-300 ${
                        favorite
                          ? "text-black"
                          : "text-zinc-700 hover:text-black"
                      }`}
                    >

                      <FiHeart
                        size={19}
                        className={
                          favorite
                            ? "fill-current"
                            : ""
                        }
                      />

                    </button>

                  </div>


                  {/* ======================================
                      PRODUCT INFORMATION
                  ====================================== */}

                  <div className="pt-5">

                    <div className="flex items-start justify-between gap-5">

                      <div className="min-w-0">

                        <Link
                          to={`/product/${product._id}`}
                        >

                          <h3 className="truncate text-base font-semibold text-black transition group-hover:underline">
                            {product.name}
                          </h3>

                        </Link>

                        <p className="mt-1 text-sm text-zinc-500">
                          {product.category || "Sneakers"}
                        </p>

                      </div>


                      {/* Price */}

                      <p className="whitespace-nowrap text-sm font-semibold text-black">

                        ₹
                        {Number(
                          product.price
                        ).toLocaleString("en-IN")}

                      </p>

                    </div>

                  </div>

                </article>

              );

            })}

          </div>

        ) : (

          /* ==================================================
             EMPTY
          ================================================== */

          <div className="py-20 text-center">

            <p className="text-sm text-zinc-500">
              No sneakers available right now.
            </p>

          </div>

        )}

      </div>

    </section>
  );
}

export default FeaturedSneakers;