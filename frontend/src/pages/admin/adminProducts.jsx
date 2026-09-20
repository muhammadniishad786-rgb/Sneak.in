import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Package,
  AlertTriangle,
  RefreshCw,
  X,
} from "lucide-react";

import { fetchAdminProducts } from "../../redux/features/adminProductSlice";

function AdminProducts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, loading, error } = useSelector(
    (state) => state.adminProducts
  );

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  // Filter products by name, category or brand
  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) {
      return products;
    }

    const search = searchTerm.toLowerCase();

    return products.filter((product) => {
      return (
        product.name?.toLowerCase().includes(search) ||
        product.category?.toLowerCase().includes(search) ||
        product.brand?.toLowerCase().includes(search)
      );
    });
  }, [products, searchTerm]);

  // Stock status
  const getStockStatus = (stock) => {
    if (stock === 0) {
      return {
        label: "Out of stock",
        className:
          "bg-red-50 text-red-700 border-red-200",
      };
    }

    if (stock <= 5) {
      return {
        label: "Low stock",
        className:
          "bg-amber-50 text-amber-700 border-amber-200",
      };
    }

    return {
      label: "In stock",
      className:
        "bg-emerald-50 text-emerald-700 border-emerald-200",
    };
  };

  // Loading state
  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header skeleton */}
        <div className="animate-pulse">
          <div className="h-8 w-40 rounded bg-slate-200" />

          <div className="mt-3 h-4 w-64 rounded bg-slate-200" />

          {/* Search skeleton */}
          <div className="mt-6 h-11 w-full rounded-xl bg-slate-200" />

          {/* Table skeleton */}
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="h-12 bg-slate-100" />

            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-4 border-t border-slate-100 p-4"
              >
                <div className="h-12 w-12 rounded-xl bg-slate-200" />
                <div className="h-4 w-40 rounded bg-slate-200" />
                <div className="ml-auto h-4 w-20 rounded bg-slate-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
              <AlertTriangle size={20} />
            </div>

            <div className="flex-1">
              <h2 className="font-semibold text-red-900">
                Failed to load products
              </h2>

              <p className="mt-1 text-sm text-red-700">
                {error}
              </p>

              <button
                onClick={() => dispatch(fetchAdminProducts())}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                <RefreshCw size={16} />
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">

      {/* ================= HEADER ================= */}

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white">
              <Package size={21} />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Products
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Manage your footwear catalog and inventory.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate("/admin/products/create")}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 hover:shadow-md sm:w-auto"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* ================= SUMMARY ================= */}

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

        {/* Total Products */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Total Products
          </p>

          <div className="mt-2 flex items-end justify-between">
            <h2 className="text-2xl font-bold text-slate-900">
              {products.length}
            </h2>

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
              <Package size={18} />
            </div>
          </div>
        </div>

        {/* Low Stock */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Low Stock
          </p>

          <div className="mt-2 flex items-end justify-between">
            <h2 className="text-2xl font-bold text-amber-600">
              {
                products.filter(
                  (product) =>
                    product.stock > 0 &&
                    product.stock <= 5
                ).length
              }
            </h2>

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
              <AlertTriangle size={18} />
            </div>
          </div>
        </div>

        {/* Out of Stock */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Out of Stock
          </p>

          <div className="mt-2 flex items-end justify-between">
            <h2 className="text-2xl font-bold text-red-600">
              {
                products.filter(
                  (product) => product.stock === 0
                ).length
              }
            </h2>

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600">
              <X size={18} />
            </div>
          </div>
        </div>
      </div>

      {/* ================= SEARCH ================= */}

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search products by name, category or brand..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-100"
          />

          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
            >
              <X size={17} />
            </button>
          )}
        </div>

        <div className="mt-3 text-xs text-slate-500">
          Showing{" "}
          <span className="font-semibold text-slate-700">
            {filteredProducts.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-700">
            {products.length}
          </span>{" "}
          products
        </div>
      </div>

      {/* ================= DESKTOP TABLE ================= */}

      <div className="mt-6 hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:block">

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">

            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Product
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Category
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Brand
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Price
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Stock
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

              {filteredProducts.map((product) => {
                const stockStatus = getStockStatus(
                  product.stock
                );

                return (
                  <tr
                    key={product._id}
                    className="transition hover:bg-slate-50/70"
                  >

                    {/* Product */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">

                        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                          {product.image ? (
                            <img
                              src={
                                product.image.startsWith(
                                  "http"
                                )
                                  ? product.image
                                  : `https://sneak-in-backend.onrender.com${product.image}`
                              }
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-slate-400">
                              <Package size={20} />
                            </div>
                          )}
                        </div>

                        <div>
                          <p className="font-semibold text-slate-900">
                            {product.name}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            ID: {product._id}
                          </p>
                        </div>

                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4">
                      <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium capitalize text-slate-700">
                        {product.category || "—"}
                      </span>
                    </td>

                    {/* Brand */}
                    <td className="px-6 py-4 text-sm font-medium text-slate-700">
                      {product.brand || "—"}
                    </td>

                    {/* Price */}
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-slate-900">
                        ₹{Number(product.price || 0).toLocaleString("en-IN")}
                      </span>
                    </td>

                    {/* Stock */}
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-slate-800">
                        {product.stock}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${stockStatus.className}`}
                      >
                        {stockStatus.label}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">

                        <button
                          title="Edit product"
                          onClick={() =>
                            navigate(
                              `/admin/products/${product._id}/edit`
                            )
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          title="Delete product"
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-100 text-red-500 transition hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 size={16} />
                        </button>

                      </div>
                    </td>

                  </tr>
                );
              })}

            </tbody>
          </table>
        </div>

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <Package size={24} />
            </div>

            <h3 className="mt-4 font-semibold text-slate-900">
              No products found
            </h3>

            <p className="mt-1 max-w-sm text-sm text-slate-500">
              Try changing your search or add a new product
              to your catalog.
            </p>

          </div>
        )}

      </div>

      {/* ================= MOBILE CARDS ================= */}

      <div className="mt-6 space-y-4 lg:hidden">

        {filteredProducts.map((product) => {
          const stockStatus = getStockStatus(product.stock);

          return (
            <div
              key={product._id}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >

              {/* Product header */}
              <div className="flex gap-4">

                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                  {product.image ? (
                    <img
                      src={
                        product.image.startsWith("http")
                          ? product.image
                          : `https://sneak-in-backend.onrender.com${product.image}`
                      }
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-400">
                      <Package size={22} />
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">

                  <h3 className="truncate font-semibold text-slate-900">
                    {product.name}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {product.brand || "No brand"}
                  </p>

                  <p className="mt-2 font-semibold text-slate-900">
                    ₹{Number(product.price || 0).toLocaleString("en-IN")}
                  </p>

                </div>

              </div>

              {/* Product details */}
              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">

                <div>
                  <p className="text-xs text-slate-400">
                    Category
                  </p>

                  <p className="mt-1 text-sm font-medium capitalize text-slate-700">
                    {product.category || "—"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Stock
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {product.stock}
                  </p>
                </div>

              </div>

              {/* Status + Actions */}
              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">

                <span
                  className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${stockStatus.className}`}
                >
                  {stockStatus.label}
                </span>

                <div className="flex gap-2">

                  <button
                    title="Edit product"
                    onClick={() =>
                      navigate(
                        `/admin/products/${product._id}/edit`
                      )
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    title="Delete product"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-100 text-red-500 transition hover:bg-red-50"
                  >
                    <Trash2 size={16} />
                  </button>

                </div>

              </div>

            </div>
          );
        })}

        {/* Mobile empty state */}
        {filteredProducts.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <Package size={24} />
            </div>

            <h3 className="mt-4 font-semibold text-slate-900">
              No products found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try a different search term.
            </p>

          </div>
        )}

      </div>

    </div>
  );
}

export default AdminProducts;
