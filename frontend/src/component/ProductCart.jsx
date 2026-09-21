import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiHeart } from "react-icons/fi";
import {
  addToFavorites,
  removeFromFavorites,
} from "../redux/features/favoriteSlice";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const favorites = useSelector(
    (state) => state.favorite.favorites
  );

  const isFavorite = favorites.some(
    (favorite) => favorite.product?._id === product._id
  );

  const handleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(product._id));
    } else {
      dispatch(addToFavorites(product._id));
    }
  };

  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      
      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-slate-100">
        
        {/* Product Image */}
        <Link to={`/product/${product._id}`}>
          <img
            src={
              product.image?.startsWith("http")
                ? product.image
                : `https://sneak-in-backend.onrender.com${product.image}`
            }
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Category */}
        {product.category && (
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold capitalize text-slate-700 shadow-sm backdrop-blur">
            {product.category}
          </span>
        )}

        {/* Wishlist */}
        <button
          type="button"
          onClick={handleFavorite}
          className={`absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur transition ${
            isFavorite
              ? "text-red-500"
              : "text-slate-500 hover:text-red-500"
          }`}
          aria-label={
            isFavorite
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
        >
          <FiHeart
            size={19}
            className={isFavorite ? "fill-current" : ""}
          />
        </button>
      </div>

      {/* Product Details */}
      <div className="p-5">

        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
          Sneak.in
        </p>

        {/* Product Name */}
        <Link to={`/product/${product._id}`}>
          <h3 className="mt-1 line-clamp-1 text-lg font-bold capitalize text-slate-900 transition hover:text-cyan-500">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-2">
          <div className="text-sm text-amber-400">
            ★★★★★
          </div>

          <span className="text-xs text-slate-400">
            ({product.reviews?.length || 0} reviews)
          </span>
        </div>

        {/* Price + Cart */}
        <div className="mt-5 flex items-center justify-between gap-3">

          <div>
            <p className="text-xs text-slate-400">
              Price
            </p>

            <p className="text-xl font-bold text-slate-900">
              ₹{Number(product.price).toLocaleString("en-IN")}
            </p>
          </div>

          <button
            type="button"
            className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-500"
            onClick={() => navigate(`/product/${product._id}`)}
          >
            Add to Cart
          </button>

        </div>
      </div>
    </div>
  );
}

export default ProductCard;