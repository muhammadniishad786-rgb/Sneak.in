import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FiUser,
  FiMail,
  FiShield,
  FiCalendar,
  FiEdit3,
  FiSave,
  FiLoader,
} from "react-icons/fi";

import {
  fetchAdminProfile,
  editAdminProfile,
} from "../../redux/features/adminProfileSlice";


function AdminProfile() {
  const dispatch = useDispatch();

  const {
    profile,
    loading,
    updateLoading,
    error,
  } = useSelector((state) => state.adminProfile);


  // ============================================
  // FORM STATE
  // ============================================

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [message, setMessage] = useState("");


  // ============================================
  // FETCH PROFILE
  // ============================================

  useEffect(() => {
    dispatch(fetchAdminProfile());
  }, [dispatch]);


  // ============================================
  // SET FORM DATA
  // ============================================

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        email: profile.email || "",
      });
    }
  }, [profile]);


  // ============================================
  // HANDLE INPUT CHANGE
  // ============================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setMessage("");
  };


  // ============================================
  // HANDLE UPDATE
  // ============================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    if (!formData.name.trim()) {
      setMessage("Name is required");
      return;
    }

    if (!formData.email.trim()) {
      setMessage("Email is required");
      return;
    }

    try {
      await dispatch(
        editAdminProfile({
          name: formData.name.trim(),
          email: formData.email.trim(),
        })
      ).unwrap();

      setMessage("Profile updated successfully!");
    } catch (error) {
      setMessage(error || "Failed to update profile");
    }
  };


  // ============================================
  // LOADING STATE
  // ============================================

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">

          {/* Header Skeleton */}
          <div className="mb-8">
            <div className="h-8 w-48 animate-pulse rounded-lg bg-slate-200" />
            <div className="mt-3 h-4 w-72 animate-pulse rounded bg-slate-200" />
          </div>


          {/* Card Skeleton */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="h-32 animate-pulse bg-slate-200" />

            <div className="px-6 pb-8 sm:px-8">

              <div className="-mt-12 flex items-end gap-4">
                <div className="h-24 w-24 animate-pulse rounded-2xl bg-slate-300" />

                <div className="pb-2">
                  <div className="h-6 w-48 animate-pulse rounded bg-slate-200" />
                  <div className="mt-2 h-4 w-32 animate-pulse rounded bg-slate-200" />
                </div>
              </div>


              <div className="mt-10 grid gap-6 md:grid-cols-2">

                <div>
                  <div className="mb-2 h-4 w-24 animate-pulse rounded bg-slate-200" />
                  <div className="h-11 animate-pulse rounded-xl bg-slate-100" />
                </div>

                <div>
                  <div className="mb-2 h-4 w-24 animate-pulse rounded bg-slate-200" />
                  <div className="h-11 animate-pulse rounded-xl bg-slate-100" />
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    );
  }


  // ============================================
  // ERROR STATE
  // ============================================

  if (!profile) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-5xl">

          <div className="rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
              <FiShield className="text-xl text-red-600" />
            </div>

            <h2 className="mt-4 text-xl font-bold text-slate-900">
              Unable to load profile
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {error || "Something went wrong while loading your profile."}
            </p>

            <button
              onClick={() => dispatch(fetchAdminProfile())}
              className="mt-6 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Try Again
            </button>

          </div>

        </div>
      </div>
    );
  }


  // ============================================
  // AVATAR INITIALS
  // ============================================

  const getInitials = (name) => {
    if (!name) return "A";

    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0].toUpperCase())
      .join("");
  };


  // ============================================
  // FORMAT DATE
  // ============================================

  const formattedDate = profile.createdAt
    ? new Date(profile.createdAt).toLocaleDateString(
        "en-IN",
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        }
      )
    : "Not available";


  // ============================================
  // MAIN UI
  // ============================================

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

      <div className="mx-auto max-w-5xl">

        {/* ======================================
            PAGE HEADER
        ====================================== */}

        <div className="mb-8">

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <FiShield />
            <span>Administration</span>
            <span>/</span>
            <span className="text-slate-700">
              Profile
            </span>
          </div>

          <div className="mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Admin Profile
              </h1>

              <p className="mt-1 text-sm text-slate-500 sm:text-base">
                Manage your administrator account information.
              </p>
            </div>

          </div>

        </div>


        {/* ======================================
            PROFILE CARD
        ====================================== */}

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* Profile Banner */}

          <div className="relative h-32 bg-slate-900 sm:h-40">

            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800" />

          </div>


          {/* Profile Content */}

          <div className="px-5 pb-8 sm:px-8">

            {/* Profile Header */}

            <div className="relative -mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">

              <div className="flex flex-col gap-4 sm:flex-row sm:items-end">

                {/* Avatar */}

                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border-4 border-white bg-slate-800 text-2xl font-bold text-white shadow-lg sm:h-28 sm:w-28 sm:text-3xl">
                  {getInitials(profile.name)}
                </div>


                {/* Name */}

                <div className="pb-1">

                  <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                    {profile.name}
                  </h2>

                  <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                    <FiMail className="shrink-0" />
                    <span className="break-all">
                      {profile.email}
                    </span>
                  </div>

                </div>

              </div>


              {/* Role Badge */}

              <div className="flex w-fit items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3 py-1.5 text-sm font-semibold text-purple-700">

                <FiShield />

                <span>Administrator</span>

              </div>

            </div>


            {/* Divider */}

            <div className="my-8 border-t border-slate-200" />


            {/* ==================================
                ACCOUNT INFORMATION
            ================================== */}

            <div>

              <div className="mb-5">

                <h3 className="text-lg font-bold text-slate-900">
                  Account Information
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Update your personal account details.
                </p>

              </div>


              <form onSubmit={handleSubmit}>

                <div className="grid gap-6 md:grid-cols-2">

                  {/* NAME */}

                  <div>

                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Full Name
                    </label>

                    <div className="relative">

                      <FiUser className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                      />

                    </div>

                  </div>


                  {/* EMAIL */}

                  <div>

                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Email Address
                    </label>

                    <div className="relative">

                      <FiMail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                      />

                    </div>

                  </div>

                </div>


                {/* ==================================
                    READ ONLY INFORMATION
                ================================== */}

                <div className="mt-8 grid gap-4 sm:grid-cols-2">

                  {/* ROLE */}

                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-slate-600 shadow-sm">
                        <FiShield />
                      </div>

                      <div>

                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                          Account Role
                        </p>

                        <p className="mt-1 text-sm font-semibold capitalize text-slate-800">
                          {profile.role || "Admin"}
                        </p>

                      </div>

                    </div>

                  </div>


                  {/* REGISTERED DATE */}

                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-slate-600 shadow-sm">
                        <FiCalendar />
                      </div>

                      <div>

                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                          Member Since
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-800">
                          {formattedDate}
                        </p>

                      </div>

                    </div>

                  </div>

                </div>


                {/* ==================================
                    MESSAGE
                ================================== */}

                {(message || error) && (
                  <div
                    className={`mt-6 rounded-xl border px-4 py-3 text-sm font-medium ${
                      message.includes("successfully")
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border-red-200 bg-red-50 text-red-700"
                    }`}
                  >
                    {message || error}
                  </div>
                )}


                {/* ==================================
                    SAVE BUTTON
                ================================== */}

                <div className="mt-8 flex justify-end border-t border-slate-200 pt-6">

                  <button
                    type="submit"
                    disabled={updateLoading}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  >

                    {updateLoading ? (
                      <>
                        <FiLoader className="animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <FiSave />
                        Save Changes
                      </>
                    )}

                  </button>

                </div>

              </form>

            </div>

          </div>

        </div>


        {/* ======================================
            SECURITY NOTE
        ====================================== */}

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

          <div className="flex gap-4">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
              <FiShield />
            </div>

            <div>

              <h3 className="font-semibold text-slate-900">
                Account Security
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Your administrator account is protected by
                authentication and role-based authorization.
                Password management can be added separately
                without changing your profile information.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}


export default AdminProfile;
