import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";

import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/features/favoriteSlice";

function FeaturedSneakers() {
  const dispatch = useDispatch();

  const { products, loading } = useSelector(
    (state) => state.products
  );

  const favorites = useSelector(
    (state) => state.favorite.favorites
  );

  // Show only first 6 products
  const featuredProducts = products?.slice(0, 6) || [];

  const getImageUrl = (image) => {
    if (!image) return "";

    if (image.startsWith("http")) {
      return image;
    }

    return `${import.meta.env.VITE_API_URL.replace("/api", "")}${image}`;
  };

  const isFavorite = (productId) => {
    return favorites.some(
      (favorite) =>
        favorite.product?._id === productId
    );
  };

  const handleFavorite = (productId) => {
    if (isFavorite(productId)) {
      dispatch(removeFromFavorites(productId));
    } else {
      dispatch(addToFavorites(productId));
    }
  };

  return (
    <section className="bg-white">

      {/* ==================================================
          SECTION HEADER
      ================================================== */}
      <div className="mx-auto max-w-[1600px] px-5 pb-8 pt-20 sm:px-8 lg:px-12">

        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

          <div>

            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400">
              Featured
            </p>

            <h2 className="mt-3 text-4xl font-black uppercase tracking-[-0.04em] text-black sm:text-5xl">
              Featured Sneakers
            </h2>

          </div>

          <Link
            to="/products"
            className="group flex w-fit items-center gap-2 text-sm font-semibold text-black"
          >
            View all

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>

        </div>

      </div>


      {/* ==================================================
          PRODUCTS
      ================================================== */}
      <div className="mx-auto max-w-[1600px] px-5 pb-24 sm:px-8 lg:px-12">

        {loading ? (

          <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">

            {[1, 2, 3].map((item) => (
              <div key={item}>

                <div className="aspect-square animate-pulse bg-zinc-100" />

                <div className="mt-5 h-4 w-2/3 animate-pulse bg-zinc-100" />

                <div className="mt-3 h-3 w-1/3 animate-pulse bg-zinc-100" />

                <div className="mt-3 h-4 w-1/4 animate-pulse bg-zinc-100" />

              </div>
            ))}

          </div>

        ) : featuredProducts.length > 0 ? (

          <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">

            {featuredProducts.map((product) => {

              const favorite = isFavorite(product._id);

              return (
                <article
                  key={product._id}
                  className="group"
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


                    {/* Favorite */}
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
                      className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition hover:bg-zinc-100"
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


                      <p className="whitespace-nowrap text-sm font-semibold text-black">
                        ₹
                        {Number(product.price).toLocaleString(
                          "en-IN"
                        )}
                      </p>

                    </div>

                  </div>

                </article>
              );
            })}

          </div>

        ) : (

          /* ==============================================
             EMPTY
          ============================================== */
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
