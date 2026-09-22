import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  ShoppingBag,
  User,
  Menu,
  X,
  Search,
  LogOut,
  Heart,
} from "lucide-react";

function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);

  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem("token"));

  // Redux cart
  const { cart } = useSelector((state) => state.cart);

  // Redux favorites
  const { favorites = [] } = useSelector(
    (state) => state.favorite || {}
  );

  // Cart quantity
  const cartCount =
    cart?.items?.reduce(
      (total, item) => total + item.quantity,
      0
    ) || 0;

  const favoriteCount = favorites.length;

  const closeMobileMenu = () => {
    setMobileMenu(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    setToken(null);
    closeMobileMenu();

    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/95 backdrop-blur-xl">

      {/* =====================================================
          MAIN NAVBAR
      ===================================================== */}

      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">

        <div className="flex h-[72px] items-center justify-between">

          {/* =================================================
              LOGO
          ================================================= */}

          <Link
            to="/"
            className="group shrink-0"
            onClick={closeMobileMenu}
          >
            <div className="text-[25px] font-black tracking-[-0.06em] text-black sm:text-[28px]">
              Sneak<span className="text-zinc-500">.in</span>
            </div>
          </Link>


          {/* =================================================
              DESKTOP NAVIGATION
          ================================================= */}

          <div className="hidden items-center gap-8 lg:flex">

            <Link
              to="/"
              className="group relative py-3 text-[13px] font-semibold text-zinc-900"
            >
              Home

              <span className="absolute bottom-1 left-0 h-[2px] w-0 rounded-full bg-black transition-all duration-300 group-hover:w-full" />
            </Link>


            <Link
              to="/products"
              className="group relative py-3 text-[13px] font-semibold text-zinc-900"
            >
              Shop

              <span className="absolute bottom-1 left-0 h-[2px] w-0 rounded-full bg-black transition-all duration-300 group-hover:w-full" />
            </Link>


            <Link
              to="/products?category=sneakers"
              className="group relative py-3 text-[13px] font-semibold text-zinc-900"
            >
              Sneakers

              <span className="absolute bottom-1 left-0 h-[2px] w-0 rounded-full bg-black transition-all duration-300 group-hover:w-full" />
            </Link>


            {/* <Link
              to="/products?category=running"
              className="group relative py-3 text-[13px] font-semibold text-zinc-900"
            >
              Running

              <span className="absolute bottom-1 left-0 h-[2px] w-0 rounded-full bg-black transition-all duration-300 group-hover:w-full" />
            </Link> */}


            <Link
              to="/orders"
              className="group relative py-3 text-[13px] font-semibold text-zinc-900"
            >
              Orders

              <span className="absolute bottom-1 left-0 h-[2px] w-0 rounded-full bg-black transition-all duration-300 group-hover:w-full" />
            </Link>

            <Link
              to="/address"
              className="group relative py-3 text-[13px] font-semibold text-zinc-900"
            >
              Addresses

              <span className="absolute bottom-1 left-0 h-[2px] w-0 rounded-full bg-black transition-all duration-300 group-hover:w-full" />
            </Link>

          </div>


          {/* =================================================
              DESKTOP RIGHT SIDE
          ================================================= */}

          <div className="hidden items-center gap-1 md:flex">

            {/* Search */}

            <button
              onClick={() => navigate("/products")}
              className="group flex h-10 w-10 items-center justify-center rounded-full text-zinc-700 transition hover:bg-zinc-100 hover:text-black"
              aria-label="Search"
            >
              <Search
                size={19}
                strokeWidth={2}
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </button>


            {/* Favorites */}

            <button
              onClick={() => navigate("/favorites")}
              className="group relative flex h-10 w-10 items-center justify-center rounded-full text-zinc-700 transition hover:bg-zinc-100 hover:text-black"
              aria-label="Favorites"
            >
              <Heart
                size={19}
                strokeWidth={2}
                className="transition-transform duration-300 group-hover:scale-110"
              />

              {favoriteCount > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-black px-1 text-[8px] font-bold text-white">
                  {favoriteCount}
                </span>
              )}
            </button>


            {/* Cart */}

            <button
              onClick={() => navigate("/cart")}
              className="group relative flex h-10 w-10 items-center justify-center rounded-full text-zinc-700 transition hover:bg-zinc-100 hover:text-black"
              aria-label="Shopping cart"
            >
              <ShoppingBag
                size={19}
                strokeWidth={2}
                className="transition-transform duration-300 group-hover:scale-110"
              />

              {cartCount > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-black px-1 text-[8px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>


            {/* Divider */}

            <div className="mx-3 h-6 w-px bg-zinc-200" />


            {/* Authentication */}

            {token ? (

              <div className="flex items-center gap-1">

                <Link
                  to="/profile"
                  className="flex h-10 items-center gap-2 rounded-full px-4 text-[13px] font-semibold text-zinc-800 transition hover:bg-zinc-100"
                >
                  <User size={17} />

                  Account
                </Link>


                <button
                  onClick={handleLogout}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-500 transition hover:bg-zinc-100 hover:text-black"
                  title="Logout"
                  aria-label="Logout"
                >
                  <LogOut size={17} />
                </button>

              </div>

            ) : (

              <div className="flex items-center gap-1">

                <Link
                  to="/login"
                  className="rounded-full px-4 py-2.5 text-[13px] font-semibold text-zinc-800 transition hover:bg-zinc-100"
                >
                  Login
                </Link>


                <Link
                  to="/register"
                  className="rounded-full bg-black px-5 py-2.5 text-[13px] font-semibold text-white transition duration-300 hover:bg-zinc-800"
                >
                  Sign Up
                </Link>

              </div>

            )}

          </div>


          {/* =================================================
              MOBILE MENU BUTTON
          ================================================= */}

          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-black transition hover:bg-zinc-100 md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenu ? (
              <X size={23} />
            ) : (
              <Menu size={23} />
            )}
          </button>

        </div>


        {/* =====================================================
            MOBILE MENU
        ===================================================== */}

        {mobileMenu && (

          <div className="border-t border-zinc-200 py-5 md:hidden">

            <div className="flex flex-col">

              {/* Main Links */}

              <Link
                to="/"
                onClick={closeMobileMenu}
                className="border-b border-zinc-100 py-4 text-lg font-semibold text-black"
              >
                Home
              </Link>


              <Link
                to="/products"
                onClick={closeMobileMenu}
                className="border-b border-zinc-100 py-4 text-lg font-semibold text-black"
              >
                Shop
              </Link>


              <Link
                to="/products?category=sneakers"
                onClick={closeMobileMenu}
                className="border-b border-zinc-100 py-4 text-lg font-semibold text-black"
              >
                Sneakers
              </Link>


              <Link
                to="/products?category=running"
                onClick={closeMobileMenu}
                className="border-b border-zinc-100 py-4 text-lg font-semibold text-black"
              >
                Running
              </Link>


              <Link
                to="/orders"
                onClick={closeMobileMenu}
                className="border-b border-zinc-100 py-4 text-lg font-semibold text-black"
              >
                Orders
              </Link>


              {/* Utility Links */}

              <div className="mt-4 grid grid-cols-2 gap-2">

                <button
                  onClick={() => {
                    closeMobileMenu();
                    navigate("/products");
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl bg-zinc-100 px-4 py-4 text-sm font-semibold text-black transition hover:bg-zinc-200"
                >
                  <Search size={18} />

                  Search
                </button>


                <button
                  onClick={() => {
                    closeMobileMenu();
                    navigate("/favorites");
                  }}
                  className="relative flex items-center justify-center gap-2 rounded-xl bg-zinc-100 px-4 py-4 text-sm font-semibold text-black transition hover:bg-zinc-200"
                >
                  <Heart size={18} />

                  Favorites

                  {favoriteCount > 0 && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[9px] font-bold text-white">
                      {favoriteCount}
                    </span>
                  )}
                </button>


                <button
                  onClick={() => {
                    closeMobileMenu();
                    navigate("/cart");
                  }}
                  className="relative flex items-center justify-center gap-2 rounded-xl bg-zinc-100 px-4 py-4 text-sm font-semibold text-black transition hover:bg-zinc-200"
                >
                  <ShoppingBag size={18} />

                  Cart

                  {cartCount > 0 && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[9px] font-bold text-white">
                      {cartCount}
                    </span>
                  )}
                </button>


                {token ? (

                  <Link
                    to="/profile"
                    onClick={closeMobileMenu}
                    className="flex items-center justify-center gap-2 rounded-xl bg-zinc-100 px-4 py-4 text-sm font-semibold text-black transition hover:bg-zinc-200"
                  >
                    <User size={18} />

                    Account
                  </Link>

                ) : (

                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="flex items-center justify-center rounded-xl bg-zinc-100 px-4 py-4 text-sm font-semibold text-black transition hover:bg-zinc-200"
                  >
                    Login
                  </Link>

                )}

              </div>


              {/* Auth */}

              {token ? (

                <button
                  onClick={handleLogout}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 px-4 py-4 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                >
                  <LogOut size={18} />

                  Logout
                </button>

              ) : (

                <Link
                  to="/register"
                  onClick={closeMobileMenu}
                  className="mt-4 flex w-full items-center justify-center rounded-xl bg-black px-4 py-4 text-sm font-semibold text-white transition hover:bg-zinc-800"
                >
                  Create Account
                </Link>

              )}

            </div>

          </div>

        )}

      </div>

    </nav>
  );
}

export default Navbar;
