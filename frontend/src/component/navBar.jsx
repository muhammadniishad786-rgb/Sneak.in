import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  User,
  Menu,
  X,
  Search,
  LogOut,
} from "lucide-react";

function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-200">

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        <div className="h-20 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="shrink-0">
            <div className="text-2xl sm:text-3xl font-black tracking-tight text-gray-950">
              Sneak<span className="text-blue-500">.in</span>
            </div>

            <p className="hidden sm:block text-[9px] tracking-[0.3em] text-gray-400 uppercase">
              Step Into Style
            </p>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">

            <Link
              to="/"
              className="text-sm font-medium text-gray-700 hover:text-gray-950 transition"
            >
              Home
            </Link>

            <Link
              to="/products"
              className="text-sm font-medium text-gray-700 hover:text-gray-950 transition"
            >
              Shop
            </Link>

            <Link
              to="/products?category=sneakers"
              className="text-sm font-medium text-gray-700 hover:text-gray-950 transition"
            >
              Sneakers
            </Link>

            <Link
              to="/products?category=running"
              className="text-sm font-medium text-gray-700 hover:text-gray-950 transition"
            >
              Running
            </Link>

          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-3">

            {/* Search */}
            <button
              onClick={() => navigate("/products")}
              className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:text-gray-950 transition"
              aria-label="Search"
            >
              <Search size={19} />
            </button>

            {/* Cart */}
            <button
              onClick={() => navigate("/cart")}
              className="relative w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:text-gray-950 transition"
              aria-label="Shopping cart"
            >
              <ShoppingBag size={20} />

              {/* Cart count - connect with Redux later */}
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-blue-500 text-white text-[10px] font-bold flex items-center justify-center">
                0
              </span>
            </button>

            {/* Account */}
            {token ? (
              <div className="flex items-center gap-2 ml-2">

                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                >
                  <User size={18} />
                  <span className="text-sm font-medium">
                    Account
                  </span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-500 transition"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>

              </div>
            ) : (
              <div className="flex items-center gap-2 ml-2">

                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-950 transition"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-5 py-2.5 bg-gray-950 text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition"
                >
                  Sign Up
                </Link>

              </div>
            )}

          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition"
            aria-label="Toggle menu"
          >
            {mobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="md:hidden border-t border-gray-100 py-5">

            <div className="flex flex-col gap-1">

              <Link
                to="/"
                onClick={() => setMobileMenu(false)}
                className="px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-100"
              >
                Home
              </Link>

              <Link
                to="/products"
                onClick={() => setMobileMenu(false)}
                className="px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-100"
              >
                Shop
              </Link>

              <Link
                to="/products?category=sneakers"
                onClick={() => setMobileMenu(false)}
                className="px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-100"
              >
                Sneakers
              </Link>

              <Link
                to="/products?category=running"
                onClick={() => setMobileMenu(false)}
                className="px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-100"
              >
                Running
              </Link>

              <div className="border-t border-gray-100 mt-3 pt-3">

                {token ? (
                  <>
                    <Link
                      to="/profile"
                      onClick={() => setMobileMenu(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-100"
                    >
                      <User size={18} />
                      Account
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 font-medium hover:bg-red-50"
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
                      className="block px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-100"
                    >
                      Login
                    </Link>

                    <Link
                      to="/register"
                      onClick={() => setMobileMenu(false)}
                      className="block mt-2 px-4 py-3 bg-gray-950 text-white text-center rounded-lg font-semibold"
                    >
                      Create Account
                    </Link>
                  </>
                )}

              </div>

            </div>
          </div>
        )}

      </div>
    </nav>
  );
}

export default Navbar;
