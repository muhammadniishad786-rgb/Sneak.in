import { Link } from "react-router-dom";

function Navbar() {

    const token = localStorage.getItem("token")
  return (
    <nav className="w-full bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-600">
          MyApp
        </h1>

        {/* Login & Register */}
        {!token ? (
            <>
              <Link
                to="/login"
                className="text-gray-700 font-medium hover:text-blue-600"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          ) : (
            <Link
              to="/profile"
              className="text-gray-700 font-medium hover:text-blue-600"
            >
              Profile
            </Link>
          )}

      </div>
    </nav>
  );
}

export default Navbar;