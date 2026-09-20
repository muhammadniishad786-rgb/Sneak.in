import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  fetchAdminUsers,
  editAdminUserStatus,
} from "../../redux/features/adminUserSlice";

import {
  Search,
  Eye,
  UserCheck,
  UserX,
  ShieldCheck,
  Users,
  RefreshCw,
} from "lucide-react";

function AdminUsers() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    users,
    loading,
    statusLoading,
    error,
  } = useSelector((state) => state.adminUsers);

  const [search, setSearch] = useState("");

  // ============================================
  // FETCH USERS
  // ============================================

  useEffect(() => {
    dispatch(fetchAdminUsers());
  }, [dispatch]);

  // ============================================
  // SEARCH USERS
  // ============================================

  const filteredUsers = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    if (!searchValue) {
      return users;
    }

    return users.filter((user) => {
      return (
        user.name
          ?.toLowerCase()
          .includes(searchValue) ||
        user.email
          ?.toLowerCase()
          .includes(searchValue)
      );
    });
  }, [users, search]);

  // ============================================
  // BLOCK / UNBLOCK
  // ============================================

  const handleStatusChange = async (user) => {
    const newStatus = !user.isBlocked;

    const action = newStatus
      ? "block"
      : "unblock";

    const confirmed = window.confirm(
      `Are you sure you want to ${action} ${user.name}?`
    );

    if (!confirmed) return;

    try {
      await dispatch(
        editAdminUserStatus({
          id: user._id,
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
  // DATE FORMAT
  // ============================================

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // ============================================
  // LOADING
  // ============================================

  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="animate-pulse space-y-6">

          <div className="h-8 w-48 rounded-lg bg-slate-200" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="h-24 rounded-2xl bg-white border border-slate-200" />
            <div className="h-24 rounded-2xl bg-white border border-slate-200" />
          </div>

          <div className="h-14 rounded-xl bg-white border border-slate-200" />

          <div className="h-96 rounded-2xl bg-white border border-slate-200" />

        </div>
      </div>
    );
  }

  // ============================================
  // ERROR
  // ============================================

  if (error) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex min-h-[400px] items-center justify-center">

          <div className="text-center">

            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
              <UserX className="h-7 w-7 text-red-600" />
            </div>

            <h2 className="text-lg font-semibold text-slate-900">
              Failed to load users
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {error}
            </p>

            <button
              onClick={() =>
                dispatch(fetchAdminUsers())
              }
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              <RefreshCw size={16} />
              Try Again
            </button>

          </div>

        </div>
      </div>
    );
  }

  // ============================================
  // COUNTS
  // ============================================

  const totalUsers = users.length;

  const activeUsers = users.filter(
    (user) => !user.isBlocked
  ).length;

  const blockedUsers = users.filter(
    (user) => user.isBlocked
  ).length;

  // ============================================
  // UI
  // ============================================

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">

      {/* ========================================
          HEADER
      ======================================== */}

      <div className="mb-8">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p className="text-sm font-medium text-indigo-600">
              User Management
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Users
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage registered users and account access.
            </p>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50">
            <Users className="h-6 w-6 text-indigo-600" />
          </div>

        </div>

      </div>

      {/* ========================================
          SUMMARY CARDS
      ======================================== */}

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

        {/* TOTAL */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Total Users
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {totalUsers}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
              <Users className="h-5 w-5 text-indigo-600" />
            </div>

          </div>

        </div>

        {/* ACTIVE */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Active Users
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {activeUsers}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
              <UserCheck className="h-5 w-5 text-emerald-600" />
            </div>

          </div>

        </div>

        {/* BLOCKED */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Blocked Users
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {blockedUsers}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50">
              <UserX className="h-5 w-5 text-red-600" />
            </div>

          </div>

        </div>

      </div>

      {/* ========================================
          SEARCH
      ======================================== */}

      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

        <div className="relative max-w-xl">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search by name or email..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          />

        </div>

        <p className="mt-3 text-xs text-slate-500">
          Showing {filteredUsers.length} of{" "}
          {totalUsers} users
        </p>

      </div>

      {/* ========================================
          DESKTOP TABLE
      ======================================== */}

      <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:block">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="border-b border-slate-200 bg-slate-50">

              <tr>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  User
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Role
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Registered
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100">

              {filteredUsers.length === 0 ? (

                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-16 text-center"
                  >
                    <Users className="mx-auto h-10 w-10 text-slate-300" />

                    <p className="mt-3 text-sm font-medium text-slate-600">
                      No users found
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Try a different search.
                    </p>
                  </td>
                </tr>

              ) : (

                filteredUsers.map((user) => (

                  <tr
                    key={user._id}
                    className="transition hover:bg-slate-50"
                  >

                    {/* USER */}

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                          {user.name
                            ?.charAt(0)
                            .toUpperCase()}
                        </div>

                        <div className="min-w-0">

                          <p className="truncate text-sm font-semibold text-slate-900">
                            {user.name}
                          </p>

                          <p className="truncate text-xs text-slate-500">
                            {user.email}
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* ROLE */}

                    <td className="px-6 py-5">

                      {user.role === "admin" ? (

                        <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                          <ShieldCheck size={14} />
                          Admin
                        </span>

                      ) : (

                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                          User
                        </span>

                      )}

                    </td>

                    {/* DATE */}

                    <td className="px-6 py-5 text-sm text-slate-600">
                      {formatDate(user.createdAt)}
                    </td>

                    {/* STATUS */}

                    <td className="px-6 py-5">

                      {user.isBlocked ? (

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

                    </td>

                    {/* ACTIONS */}

                    <td className="px-6 py-5">

                      <div className="flex items-center justify-end gap-2">

                        {/* VIEW */}

                        <button
                          onClick={() =>
                            navigate(
                              `/admin/users/${user._id}`
                            )
                          }
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                        >
                          <Eye size={15} />
                          View
                        </button>

                        {/* BLOCK / UNBLOCK */}

                        {user.role !== "admin" && (

                          <button
                            onClick={() =>
                              handleStatusChange(user)
                            }
                            disabled={statusLoading}
                            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${
                              user.isBlocked
                                ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                                : "bg-red-50 text-red-700 hover:bg-red-100"
                            }`}
                          >
                            {user.isBlocked ? (
                              <>
                                <UserCheck size={15} />
                                Unblock
                              </>
                            ) : (
                              <>
                                <UserX size={15} />
                                Block
                              </>
                            )}
                          </button>

                        )}

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* ========================================
          MOBILE / TABLET CARDS
      ======================================== */}

      <div className="space-y-4 lg:hidden">

        {filteredUsers.length === 0 ? (

          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">

            <Users className="mx-auto h-10 w-10 text-slate-300" />

            <p className="mt-3 text-sm font-medium text-slate-600">
              No users found
            </p>

          </div>

        ) : (

          filteredUsers.map((user) => (

            <div
              key={user._id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >

              {/* TOP */}

              <div className="flex items-start justify-between gap-3">

                <div className="flex min-w-0 items-center gap-3">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                    {user.name
                      ?.charAt(0)
                      .toUpperCase()}
                  </div>

                  <div className="min-w-0">

                    <p className="truncate text-sm font-semibold text-slate-900">
                      {user.name}
                    </p>

                    <p className="truncate text-xs text-slate-500">
                      {user.email}
                    </p>

                  </div>

                </div>

                {user.isBlocked ? (

                  <span className="shrink-0 rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700">
                    Blocked
                  </span>

                ) : (

                  <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    Active
                  </span>

                )}

              </div>

              {/* DETAILS */}

              <div className="mt-5 grid grid-cols-2 gap-4 border-y border-slate-100 py-4">

                <div>
                  <p className="text-xs text-slate-400">
                    Role
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {user.role === "admin"
                      ? "Admin"
                      : "User"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Registered
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {formatDate(user.createdAt)}
                  </p>
                </div>

              </div>

              {/* ACTIONS */}

              <div className="flex gap-2">

                <button
                  onClick={() =>
                    navigate(
                      `/admin/users/${user._id}`
                    )
                  }
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  <Eye size={16} />
                  View
                </button>

                {user.role !== "admin" && (

                  <button
                    onClick={() =>
                      handleStatusChange(user)
                    }
                    disabled={statusLoading}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${
                      user.isBlocked
                        ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                        : "bg-red-50 text-red-700 hover:bg-red-100"
                    }`}
                  >
                    {user.isBlocked ? (
                      <>
                        <UserCheck size={16} />
                        Unblock
                      </>
                    ) : (
                      <>
                        <UserX size={16} />
                        Block
                      </>
                    )}
                  </button>

                )}

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default AdminUsers;
