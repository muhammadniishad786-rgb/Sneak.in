import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../services/authApi";

function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await getProfile(token);

        setUser(response.data.user);
      } catch (error) {
        console.log(error);

        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        setError(
          error.response?.data?.message ||
            "Unable to load your profile"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("sneakUser");

    navigate("/login");
  };

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto"></div>

          <p className="mt-4 text-gray-500">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white rounded-xl shadow-md p-8 text-center max-w-md w-full">
          <h2 className="text-xl font-semibold text-gray-900">
            Something went wrong
          </h2>

          <p className="text-gray-500 mt-2">
            {error}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-6 bg-gray-900 text-white px-6 py-2.5 rounded-lg hover:bg-gray-800 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">

      <div className="max-w-5xl mx-auto">

        {/* Page Heading */}
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-[0.2em] text-gray-500">
            MY ACCOUNT
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            Profile
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your account and view your Sneak.in activity.
          </p>
        </div>

        {/* Profile Header */}
        <div className="bg-gray-900 rounded-2xl p-6 md:p-8 text-white shadow-lg mb-6">

          <div className="flex flex-col sm:flex-row sm:items-center gap-5">

            {/* Avatar */}
            <div className="w-20 h-20 rounded-full bg-white text-gray-900 flex items-center justify-center text-3xl font-bold shrink-0">
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            {/* User Info */}
            <div>
              <h2 className="text-2xl font-bold">
                {user?.name}
              </h2>

              <p className="text-gray-300 mt-1">
                {user?.email}
              </p>

              <span className="inline-block mt-3 px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                Active Account
              </span>
            </div>

          </div>
        </div>

        {/* Account Information */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 mb-6">

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Account Information
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Your personal account details
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Name */}
            <div className="bg-gray-50 rounded-xl p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Full Name
              </p>

              <p className="text-gray-900 font-medium mt-2">
                {user?.name || "Not available"}
              </p>
            </div>

            {/* Email */}
            <div className="bg-gray-50 rounded-xl p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Email Address
              </p>

              <p className="text-gray-900 font-medium mt-2 break-all">
                {user?.email || "Not available"}
              </p>
            </div>

            {/* Role */}
            <div className="bg-gray-50 rounded-xl p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Account Type
              </p>

              <p className="text-gray-900 font-medium mt-2 capitalize">
                {user?.role || "User"}
              </p>
            </div>

          </div>
        </div>

        {/* Account Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 mb-6">

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              My Account
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Quick access to your account
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Orders */}
            <button
              onClick={() => navigate("/orders")}
              className="group flex items-center gap-4 border border-gray-200 rounded-xl p-5 text-left hover:border-gray-900 hover:shadow-sm transition"
            >
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-xl">
                📦
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">
                  My Orders
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  View your order history
                </p>
              </div>

              <span className="text-gray-400 group-hover:text-gray-900 transition text-xl">
                →
              </span>
            </button>

            {/* Addresses */}
            <button
              onClick={() => navigate("/addresses")}
              className="group flex items-center gap-4 border border-gray-200 rounded-xl p-5 text-left hover:border-gray-900 hover:shadow-sm transition"
            >
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-xl">
                📍
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">
                  Saved Addresses
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Manage your delivery addresses
                </p>
              </div>

              <span className="text-gray-400 group-hover:text-gray-900 transition text-xl">
                →
              </span>
            </button>

          </div>
        </div>

        {/* Logout */}
        <div className="flex justify-end">
          <button
            onClick={handleLogout}
            className="border border-red-500 text-red-500 px-6 py-2.5 rounded-lg font-medium hover:bg-red-500 hover:text-white transition"
          >
            Logout
          </button>
        </div>

      </div>
    </div>
  );
}

export default Profile;
