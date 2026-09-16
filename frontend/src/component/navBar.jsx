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
  ChevronDown,
} from "lucide-react";

function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);

  const navigate = useNavigate();

  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  // Get cart from Redux
  const { cart } = useSelector((state) => state.cart);

  // Calculate total quantity
  const cartCount =
    cart?.items?.reduce(
      (total, item) => total + item.quantity,
      0
    ) || 0;

  const handleLogout = () => {
    localStorage.removeItem("token");

    setToken(null);
    setMobileMenu(false);

    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#100d2f]/95 text-white backdrop-blur-xl">

      <div className="mx-auto max-w-[1500px] px-5 sm:px-6 lg:px-10">

        <div className="flex h-[76px] items-center justify-between">

          {/* =================================================
              LOGO
          ================================================= */}

          <Link
            to="/"
            className="group shrink-0"
          >
            <div className="text-2xl font-black tracking-tight text-white sm:text-3xl">
              Sneak<span className="text-sky-400">.in</span>
            </div>

            <p className="hidden text-[8px] uppercase tracking-[0.35em] text-gray-500 sm:block">
              Step Into Style
            </p>
          </Link>


          {/* =================================================
              DESKTOP NAVIGATION
          ================================================= */}

          <div className="hidden items-center gap-10 lg:flex">

            <Link
              to="/"
              className="group relative text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-300 transition hover:text-white"
            >
              Home

              <span className="absolute -bottom-2 left-0 h-px w-0 bg-sky-400 transition-all duration-300 group-hover:w-full" />
            </Link>


            <Link
              to="/products"
              className="group relative text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-300 transition hover:text-white"
            >
              Shop

              <span className="absolute -bottom-2 left-0 h-px w-0 bg-sky-400 transition-all duration-300 group-hover:w-full" />
            </Link>


            {/* Collections */}

            <div className="group relative">

              <button className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-300 transition hover:text-white">

                Collections

                <ChevronDown
                  size={13}
                  className="transition-transform group-hover:rotate-180"
                />

              </button>


              {/* Dropdown */}

              <div className="pointer-events-none absolute left-1/2 top-full w-48 -translate-x-1/2 pt-5 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100">

                <div className="rounded-xl border border-white/10 bg-[#171344] p-2 shadow-2xl">

                  <Link
                    to="/products?category=sneakers"
                    className="block rounded-lg px-4 py-3 text-xs font-medium text-gray-300 transition hover:bg-white/10 hover:text-white"
                  >
                    Sneakers
                  </Link>

                  <Link
                    to="/products?category=running"
                    className="block rounded-lg px-4 py-3 text-xs font-medium text-gray-300 transition hover:bg-white/10 hover:text-white"
                  >
                    Running
                  </Link>

                  <Link
                    to="/products"
                    className="block rounded-lg px-4 py-3 text-xs font-medium text-gray-300 transition hover:bg-white/10 hover:text-white"
                  >
                    All Footwear
                  </Link>

                </div>

              </div>

            </div>


            <Link
              to="/products?category=running"
              className="group relative text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-300 transition hover:text-white"
            >
              Running

              <span className="absolute -bottom-2 left-0 h-px w-0 bg-sky-400 transition-all duration-300 group-hover:w-full" />
            </Link>

            <Link
              to="/address"
              className="group relative text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-300 transition hover:text-white"
            >
              Addresses

              <span className="absolute -bottom-2 left-0 h-px w-0 bg-sky-400 transition-all duration-300 group-hover:w-full" />
            </Link>

          </div>


          {/* =================================================
              RIGHT SIDE
          ================================================= */}

          <div className="hidden items-center gap-2 md:flex">

            {/* Search */}

            <button
              onClick={() => navigate("/products")}
              className="flex h-10 w-10 items-center justify-center rounded-full text-gray-400 transition hover:bg-white/10 hover:text-white"
              aria-label="Search"
            >
              <Search size={18} />
            </button>


            {/* =================================================
                CART
            ================================================= */}

            <button
              onClick={() => navigate("/cart")}
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-400 transition hover:bg-white/10 hover:text-white"
              aria-label="Shopping cart"
            >

              <ShoppingBag size={19} />

              {/* Cart Count */}

              {cartCount > 0 && (
                <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-sky-400 px-1 text-[9px] font-bold text-gray-950">
                  {cartCount}
                </span>
              )}

            </button>


            {/* Divider */}

            <div className="mx-2 h-6 w-px bg-white/10" />


            {/* =================================================
                LOGGED IN
            ================================================= */}

            {token ? (

              <div className="flex items-center gap-2">

                <Link
                  to="/profile"
                  className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-gray-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
                >

                  <User size={16} />

                  <span className="text-xs font-semibold">
                    Account
                  </span>

                </Link>


                <button
                  onClick={handleLogout}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition hover:bg-red-500/10 hover:text-red-400"
                  title="Logout"
                >
                  <LogOut size={17} />
                </button>

              </div>

            ) : (

              <div className="flex items-center gap-2">

                <Link
                  to="/login"
                  className="px-3 py-2 text-xs font-semibold text-gray-300 transition hover:text-white"
                >
                  Login
                </Link>


                <Link
                  to="/register"
                  className="rounded-lg bg-white px-5 py-2.5 text-xs font-bold text-gray-950 transition hover:bg-sky-400"
                >
                  Sign Up
                </Link>

              </div>

            )}

          </div>


          {/* =================================================
              MOBILE BUTTON
          ================================================= */}

          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-300 transition hover:bg-white/10 hover:text-white md:hidden"
            aria-label="Toggle menu"
          >

            {mobileMenu ? (
              <X size={23} />
            ) : (
              <Menu size={23} />
            )}

          </button>

        </div>


        {/* =================================================
            MOBILE MENU
        ================================================= */}

        {mobileMenu && (

          <div className="border-t border-white/10 py-5 md:hidden">

            <div className="flex flex-col gap-1">

              {/* Home */}

              <Link
                to="/"
                onClick={() => setMobileMenu(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-gray-300 transition hover:bg-white/10 hover:text-white"
              >
                Home
              </Link>


              {/* Shop */}

              <Link
                to="/products"
                onClick={() => setMobileMenu(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-gray-300 transition hover:bg-white/10 hover:text-white"
              >
                Shop
              </Link>


              {/* Sneakers */}

              <Link
                to="/products?category=sneakers"
                onClick={() => setMobileMenu(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-gray-300 transition hover:bg-white/10 hover:text-white"
              >
                Sneakers
              </Link>


              {/* Running */}

              <Link
                to="/products?category=running"
                onClick={() => setMobileMenu(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-gray-300 transition hover:bg-white/10 hover:text-white"
              >
                Running
              </Link>


              {/* Divider */}

              <div className="my-3 border-t border-white/10" />


              {/* Search */}

              <button
                onClick={() => {
                  setMobileMenu(false);
                  navigate("/products");
                }}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium text-gray-300 transition hover:bg-white/10 hover:text-white"
              >

                <Search size={18} />

                Search

              </button>


              {/* =================================================
                  MOBILE CART
              ================================================= */}

              <button
                onClick={() => {
                  setMobileMenu(false);
                  navigate("/cart");
                }}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium text-gray-300 transition hover:bg-white/10 hover:text-white"
              >

                <ShoppingBag size={18} />

                Shopping Cart

                {cartCount > 0 && (
                  <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-sky-400 px-1 text-[9px] font-bold text-gray-950">
                    {cartCount}
                  </span>
                )}

              </button>


              {/* =================================================
                  MOBILE AUTH
              ================================================= */}

              {token ? (

                <>

                  <Link
                    to="/profile"
                    onClick={() => setMobileMenu(false)}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-300 transition hover:bg-white/10 hover:text-white"
                  >

                    <User size={18} />

                    Account

                  </Link>


                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium text-red-400 transition hover:bg-red-500/10"
                  >

                    <LogOut size={18} />

                    Logout

                  </button>

                </>

              ) : (

                <>

                  <Link
                    to="/login"
                    onClick={() => setMobileMenu(false)}
                    className="rounded-lg px-4 py-3 text-sm font-medium text-gray-300 transition hover:bg-white/10 hover:text-white"
                  >
                    Login
                  </Link>


                  <Link
                    to="/register"
                    onClick={() => setMobileMenu(false)}
                    className="mt-2 rounded-lg bg-sky-400 px-4 py-3 text-center text-sm font-bold text-gray-950 transition hover:bg-sky-300"
                  >
                    Create Account
                  </Link>

                </>

              )}

            </div>

          </div>

        )}

      </div>

    </nav>
  );
}

export default Navbar;
