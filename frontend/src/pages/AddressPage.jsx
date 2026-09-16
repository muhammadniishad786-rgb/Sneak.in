import { useEffect, useState } from "react";
import { getAddress } from "../services/addressApi";
import { FiMapPin, FiPlus, FiEdit2, FiTrash2, FiCheck } from "react-icons/fi";

function AddressPage() {
  const [address, setAddress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const data = await getAddress();
      setAddress(data.addresses);
    } catch (error) {
      console.error("Failed to fetch addresses:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="animate-pulse">
            <div className="mb-4 h-8 w-48 rounded bg-slate-200"></div>
            <div className="mb-10 h-4 w-72 rounded bg-slate-200"></div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="h-56 rounded-2xl bg-white shadow-sm"></div>
              <div className="h-56 rounded-2xl bg-white shadow-sm"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <FiMapPin className="text-sky-500" size={22} />

              <span className="text-sm font-semibold uppercase tracking-wider text-sky-500">
                Delivery
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              My Addresses
            </h1>

            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Manage your saved delivery addresses
            </p>
          </div>

          {/* Add Address Button */}
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            <FiPlus size={18} />
            Add New Address
          </button>
        </div>

        {/* Empty State */}
        {address.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-sky-50">
              <FiMapPin className="text-sky-500" size={28} />
            </div>

            <h2 className="text-xl font-semibold text-slate-900">
              No saved addresses
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Add a delivery address to make your checkout process faster and
              easier.
            </p>

            <button
              type="button"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              <FiPlus size={18} />
              Add Address
            </button>
          </div>
        ) : (
          <>
            {/* Address Count */}
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm text-slate-500">
                {address.length} {address.length === 1 ? "address" : "addresses"} saved
              </p>
            </div>

            {/* Address Cards */}
            <div className="grid gap-6 md:grid-cols-2">
              {address.map((item) => (
                <div
                  key={item._id}
                  className={`relative overflow-hidden rounded-2xl border bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md ${
                    item.isDefault
                      ? "border-sky-300 ring-1 ring-sky-100"
                      : "border-slate-200"
                  }`}
                >
                  {/* Default Badge */}
                  {item.isDefault && (
                    <div className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-600">
                      <FiCheck size={14} />
                      Default
                    </div>
                  )}

                  {/* Address Header */}
                  <div className="flex items-start gap-4 pr-20">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                      <FiMapPin className="text-slate-700" size={20} />
                    </div>

                    <div>
                      <h2 className="text-lg font-bold text-slate-900">
                        {item.name}
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        {item.phone}
                      </p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="my-5 h-px bg-slate-100"></div>

                  {/* Address Details */}
                  <div className="space-y-1 text-sm leading-6 text-slate-600">
                    <p>{item.addressLine}</p>

                    <p>
                      {item.city}, {item.state}
                    </p>

                    <p className="font-medium text-slate-800">
                      PIN - {item.pincode}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                    <button
                      type="button"
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                    >
                      <FiEdit2 size={16} />
                      Edit
                    </button>

                    <button
                      type="button"
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-100 px-4 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50"
                    >
                      <FiTrash2 size={16} />
                      Delete
                    </button>
                  </div>

                  {/* Set Default */}
                  {!item.isDefault && (
                    <button
                      type="button"
                      className="mt-3 w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-sky-600 transition hover:bg-sky-50"
                    >
                      Set as Default
                    </button>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AddressPage;
