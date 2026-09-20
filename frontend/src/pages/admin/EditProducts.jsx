import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  fetchAdminProductById,
  editAdminProduct,
  clearSelectedProduct,
} from "../../redux/features/adminProductSlice";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    selectedProduct,
    productLoading,
    updateLoading,
    error,
  } = useSelector((state) => state.adminProducts);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    sizes: "",
    stock: "",
  });

  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch product
  useEffect(() => {
    dispatch(fetchAdminProductById(id));

    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, id]);

  // Fill form when product arrives
  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        name: selectedProduct.name || "",
        description:
          selectedProduct.description || "",
        price: selectedProduct.price || "",
        category: selectedProduct.category || "",
        brand: selectedProduct.brand || "",
        sizes:
          selectedProduct.sizes?.join(",") || "",
        stock: selectedProduct.stock ?? "",
      });
    }
  }, [selectedProduct]);

  // Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    const data = new FormData();

    data.append("name", formData.name);
    data.append(
      "description",
      formData.description
    );
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("brand", formData.brand);
    data.append("sizes", formData.sizes);
    data.append("stock", formData.stock);

    // Only send image if a new image is selected
    if (image) {
      data.append("image", image);
    }

    try {
      await dispatch(
        editAdminProduct({
          id,
          data,
        })
      ).unwrap();

      setMessage(
        "Product updated successfully!"
      );

      setTimeout(() => {
        navigate("/admin/products");
      }, 1000);
    } catch (error) {
      setMessage(
        error || "Failed to update product"
      );
    }
  };

  // Loading
  if (productLoading) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-3xl">

          <div className="mb-8">
            <div className="h-8 w-48 animate-pulse rounded bg-slate-200" />

            <div className="mt-3 h-4 w-72 animate-pulse rounded bg-slate-200" />
          </div>

          <div className="space-y-6 rounded-2xl bg-white p-6 shadow-sm">
            <div className="h-12 animate-pulse rounded-xl bg-slate-100" />
            <div className="h-24 animate-pulse rounded-xl bg-slate-100" />
            <div className="h-12 animate-pulse rounded-xl bg-slate-100" />
            <div className="h-12 animate-pulse rounded-xl bg-slate-100" />
            <div className="h-12 animate-pulse rounded-xl bg-slate-100" />
          </div>

        </div>
      </div>
    );
  }

  // Error / product not found
  if (!selectedProduct) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-3xl">

          <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              Product not found
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {error || "Unable to load this product."}
            </p>

            <button
              onClick={() =>
                navigate("/admin/products")
              }
              className="mt-6 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-cyan-500"
            >
              Back to Products
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() =>
              navigate("/admin/products")
            }
            className="mb-4 text-sm font-medium text-slate-500 hover:text-slate-900"
          >
            ← Back to Products
          </button>

          <h1 className="text-3xl font-bold text-slate-900">
            Edit Product
          </h1>

          <p className="mt-2 text-slate-500">
            Update product information for Sneak.in
          </p>
        </div>

        {/* Message */}
        {(message || error) && (
          <div className="mb-6 rounded-xl bg-slate-100 p-4 text-sm text-slate-700">
            {message || error}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl bg-white p-6 shadow-sm"
        >

          {/* Product Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Product Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
            />
          </div>

          {/* Price + Stock */}
          <div className="grid gap-5 sm:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Price
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                required
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Stock
              </label>

              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                required
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
              />
            </div>

          </div>

          {/* Category + Brand */}
          <div className="grid gap-5 sm:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Category
              </label>

              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Brand
              </label>

              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
              />
            </div>

          </div>

          {/* Sizes */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Sizes
            </label>

            <input
              type="text"
              name="sizes"
              value={formData.sizes}
              onChange={handleChange}
              placeholder="6,7,8,9,10"
              required
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
            />

            <p className="mt-2 text-xs text-slate-400">
              Enter sizes separated by commas
            </p>
          </div>

          {/* Current Image */}
          {selectedProduct.image && (
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Current Image
              </label>

              <img
                src={
                  selectedProduct.image.startsWith(
                    "http"
                  )
                    ? selectedProduct.image
                    : `https://sneak-in-backend.onrender.com${selectedProduct.image}`
                }
                alt={selectedProduct.name}
                className="h-40 w-40 rounded-xl border border-slate-200 object-cover"
              />
            </div>
          )}

          {/* New Image */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Change Product Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm"
            />

            <p className="mt-2 text-xs text-slate-400">
              Leave empty to keep the current image.
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={updateLoading}
            className="w-full rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {updateLoading
              ? "Updating Product..."
              : "Update Product"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default EditProduct;
