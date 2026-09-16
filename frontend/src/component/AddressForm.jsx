import { useState } from "react";
import { FiX, FiMapPin } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

import {
  addNewAddress,
  updateExistingAddress,
} from "../redux/features/addressSlice";

function AddressForm({
  onClose,
  onSuccess,
  editingAddress = null,
}) {
  const dispatch = useDispatch();

  const { loading, error } = useSelector(
    (state) => state.address
  );

  const [formData, setFormData] = useState({
    name: editingAddress?.name || "",
    phone: editingAddress?.phone || "",
    addressLine: editingAddress?.addressLine || "",
    city: editingAddress?.city || "",
    state: editingAddress?.state || "",
    pincode: editingAddress?.pincode || "",
    isDefault: editingAddress?.isDefault || false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingAddress) {
        await dispatch(
          updateExistingAddress({
            id: editingAddress._id,
            addressData: formData,
          })
        ).unwrap();
      } else {
        await dispatch(
          addNewAddress(formData)
        ).unwrap();
      }

      onSuccess();
    } catch (error) {
      console.error("Address operation failed:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">

      {/* Modal */}
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50">
              <FiMapPin
                className="text-sky-500"
                size={20}
              />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {editingAddress
                  ? "Edit Address"
                  : "Add New Address"}
              </h2>

              <p className="text-sm text-slate-500">
                {editingAddress
                  ? "Update your delivery information"
                  : "Add a new delivery address"}
              </p>
            </div>

          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <FiX size={20} />
          </button>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >

          {/* Error */}
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4">
              <p className="text-sm font-medium text-red-600">
                {error}
              </p>
            </div>
          )}

          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter full name"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Phone Number
            </label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Enter phone number"
              pattern="[0-9]{10}"
              maxLength="10"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            />
          </div>

          {/* Address */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Address
            </label>

            <textarea
              name="addressLine"
              value={formData.addressLine}
              onChange={handleChange}
              required
              rows="3"
              placeholder="House number, street, area"
              className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            />
          </div>

          {/* City + State */}
          <div className="grid gap-5 sm:grid-cols-2">

            {/* City */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                City
              </label>

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                placeholder="Enter city"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
              />
            </div>

            {/* State */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                State
              </label>

              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                placeholder="Enter state"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
              />
            </div>

          </div>

          {/* Pincode */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Pincode
            </label>

            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
              placeholder="Enter pincode"
              pattern="[0-9]{6}"
              maxLength="6"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            />
          </div>

          {/* Default Address */}
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-4">

            <input
              type="checkbox"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleChange}
              className="h-4 w-4 accent-sky-500"
            />

            <div>
              <p className="text-sm font-semibold text-slate-800">
                Make this my default address
              </p>

              <p className="mt-1 text-xs text-slate-500">
                This address will be selected automatically during checkout.
              </p>
            </div>

          </label>

          {/* Buttons */}
          <div className="flex gap-3 border-t border-slate-100 pt-5">

            {/* Cancel */}
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Saving..."
                : editingAddress
                ? "Update Address"
                : "Save Address"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default AddressForm;
