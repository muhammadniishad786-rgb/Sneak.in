import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  fetchAdminUserById,
  editAdminUserStatus,
  clearSelectedUser,
} from "../../redux/features/adminUserSlice";

import {
  ArrowLeft,
  User,
  Mail,
  ShieldCheck,
  CalendarDays,
  UserCheck,
  UserX,
  Copy,
} from "lucide-react";

function AdminUserDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const {
    selectedUser,
    userLoading,
    statusLoading,
    error,
  } = useSelector((state) => state.adminUsers);

  // ============================================
  // FETCH USER
  // ============================================

  useEffect(() => {
    dispatch(fetchAdminUserById(id));

    return () => {
      dispatch(clearSelectedUser());
    };
  }, [dispatch, id]);

  // ============================================
  // FORMAT DATE
  // ============================================

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );
  };

  // ============================================
  // BLOCK / UNBLOCK
  // ============================================

  const handleStatusChange = async () => {
    if (!selectedUser) return;

    const newStatus = !selectedUser.isBlocked;

    const action = newStatus
      ? "block"
      : "unblock";

    const confirmed = window.confirm(
      `Are you sure you want to ${action} ${selectedUser.name}?`
    );

    if (!confirmed) return;

    try {
      await dispatch(
        editAdminUserStatus({
          id: selectedUser._id,
          isBlocked: newStatus,
        })
      ).unwrap();
    } catch (error) {
      console.error(
        "Failed to update user status:",
        error
      );
    }
  };

  // ============================================
  // LOADING
  // ============================================

  if (userLoading) {
    return (
      <div className="min-h-screen p-4 sm:p-6 lg:p-8">

        <div className="animate-pulse space-y-6">

          {/* Header */}

          <div className="h-8 w-40 rounded-lg bg-slate-200" />

          {/* Profile card */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6">

            <div className="flex items-center gap-4">

              <div className="h-20 w-20 rounded-full bg-slate-200" />

              <div className="space-y-3">
                <div className="h-5 w-40 rounded bg-slate-200" />
                <div className="h-4 w-56 rounded bg-slate-200" />
              </div>

            </div>

          </div>

          {/* Details */}

          <div className="h-72 rounded-2xl border border-slate-200 bg-white" />

        </div>

      </div>
    );
  }

  // ============================================
  // ERROR
  // ============================================

  if (error || !selectedUser) {
    return (
      <div className="min-h-screen p-4 sm:p-6 lg:p-8">

        <button
          onClick={() =>
            navigate("/admin/users")
          }
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
        >
          <ArrowLeft size={18} />
          Back to Users
        </button>

        <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-slate-200 bg-white">

          <div className="text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
              <UserX className="h-7 w-7 text-red-600" />
            </div>

            <h2 className="mt-4 text-lg font-semibold text-slate-900">
              User not found
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {error || "Unable to load user information."}
            </p>

            <button
              onClick={() =>
                navigate("/admin/users")
              }
              className="mt-5 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Back to Users
            </button>

          </div>

        </div>

      </div>
    );
  }

  // ============================================
  // UI
  // ============================================

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">

      {/* ========================================
          HEADER
      ======================================== */}

      <div className="mb-6">

        <button
          onClick={() =>
            navigate("/admin/users")
          }
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
        >
          <ArrowLeft size={18} />
          Back to Users
        </button>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p className="text-sm font-medium text-indigo-600">
              User Management
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              User Details
            </h1>
          </div>

          {/* ACTION */}

          {selectedUser.role !== "admin" && (
            <button
              onClick={handleStatusChange}
              disabled={statusLoading}
              className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${
                selectedUser.isBlocked
                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                  : "bg-red-600 text-white hover:bg-red-700"
              }`}
            >
              {selectedUser.isBlocked ? (
                <>
                  <UserCheck size={18} />
                  {statusLoading
                    ? "Unblocking..."
                    : "Unblock User"}
                </>
              ) : (
                <>
                  <UserX size={18} />
                  {statusLoading
                    ? "Blocking..."
                    : "Block User"}
                </>
              )}
            </button>
          )}

        </div>

      </div>

      {/* ========================================
          PROFILE HEADER
      ======================================== */}

      <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="p-6 sm:p-8">

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

            {/* AVATAR */}

            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-slate-900 text-2xl font-bold text-white">
              {selectedUser.name
                ?.charAt(0)
                .toUpperCase()}
            </div>

            {/* USER INFO */}

            <div className="min-w-0 flex-1">

              <div className="flex flex-wrap items-center gap-3">

                <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                  {selectedUser.name}
                </h2>

                {/* ROLE */}

                {selectedUser.role === "admin" ? (

                  <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                    <ShieldCheck size={14} />
                    Admin
                  </span>

                ) : (

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    User
                  </span>

                )}

                {/* STATUS */}

                {selectedUser.isBlocked ? (

                  <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                    Blocked
                  </span>

                ) : (

                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Active
                  </span>

                )}

              </div>

              <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                <Mail size={16} />
                {selectedUser.email}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* ========================================
          INFORMATION GRID
      ======================================== */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        {/* ======================================
            PERSONAL INFORMATION
        ====================================== */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="mb-6 flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
              <User className="h-5 w-5 text-indigo-600" />
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                Personal Information
              </h3>

              <p className="text-xs text-slate-500">
                Basic account information
              </p>
            </div>

          </div>

          <div className="space-y-5">

            {/* NAME */}

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Full Name
              </p>

              <p className="mt-1 text-sm font-medium text-slate-800">
                {selectedUser.name || "N/A"}
              </p>
            </div>

            {/* EMAIL */}

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Email Address
              </p>

              <p className="mt-1 break-all text-sm font-medium text-slate-800">
                {selectedUser.email || "N/A"}
              </p>
            </div>

            {/* ROLE */}

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Account Role
              </p>

              <p className="mt-1 text-sm font-medium capitalize text-slate-800">
                {selectedUser.role || "user"}
              </p>
            </div>

          </div>

        </div>

        {/* ======================================
            ACCOUNT INFORMATION
        ====================================== */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="mb-6 flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                Account Information
              </h3>

              <p className="text-xs text-slate-500">
                Account status and activity
              </p>
            </div>

          </div>

          <div className="space-y-5">

            {/* STATUS */}

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Account Status
              </p>

              <div className="mt-2">

                {selectedUser.isBlocked ? (

                  <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700">
                    <span className="h-2 w-2 rounded-full bg-red-500" />
                    Blocked
                  </span>

                ) : (

                  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Active
                  </span>

                )}

              </div>
            </div>

            {/* CREATED DATE */}

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Registered On
              </p>

              <p className="mt-1 flex items-center gap-2 text-sm font-medium text-slate-800">
                <CalendarDays size={16} className="text-slate-400" />
                {formatDate(selectedUser.createdAt)}
              </p>
            </div>

            {/* USER ID */}

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                User ID
              </p>

              <div className="mt-1 flex items-center gap-2">

                <p className="min-w-0 break-all font-mono text-xs text-slate-600">
                  {selectedUser._id}
                </p>

                <button
                  onClick={() =>
                    navigator.clipboard.writeText(
                      selectedUser._id
                    )
                  }
                  className="shrink-0 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                  title="Copy User ID"
                >
                  <Copy size={15} />
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ========================================
          ACCOUNT STATUS SECTION
      ======================================== */}

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <h3 className="font-semibold text-slate-900">
              Account Access
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Control whether this user can access their account.
            </p>

          </div>

          {selectedUser.role !== "admin" && (

            <button
              onClick={handleStatusChange}
              disabled={statusLoading}
              className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${
                selectedUser.isBlocked
                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                  : "bg-red-600 text-white hover:bg-red-700"
              }`}
            >
              {selectedUser.isBlocked ? (
                <>
                  <UserCheck size={18} />
                  {statusLoading
                    ? "Unblocking..."
                    : "Unblock User"}
                </>
              ) : (
                <>
                  <UserX size={18} />
                  {statusLoading
                    ? "Blocking..."
                    : "Block User"}
                </>
              )}
            </button>

          )}

        </div>

      </div>

    </div>
  );
}

export default AdminUserDetails;
