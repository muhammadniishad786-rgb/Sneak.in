import { useEffect, useState } from "react";
import { FiMapPin, FiPlus, FiCheck, FiShoppingBag } from "react-icons/fi";
import { getAddress } from "../services/addressApi";
import { fetchCart } from "../redux/features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {cart} = useSelector(
    (state) => state.cart
  )
  

  useEffect(() => {
    fetchAddresses();
    dispatch(fetchCart())
  }, []);

  // for setting the cart items total amount
  const cartItems = cart?.items || [];
  const totalAmount = cartItems.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );  

  // for handle add address
  const handleAddress = () => {
    navigate("/address")
  }
  
  // for setting the addresses 
  const fetchAddresses = async () => {
    try {
      const data = await getAddress();

      setAddresses(data.addresses);

      // Automatically select default address
      const defaultAddress = data.addresses.find(
        (address) => address.isDefault,
      );

      if (defaultAddress) {
        setSelectedAddress(defaultAddress._id);
      }
    } catch (error) {
      console.error("Failed to fetch addresses:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="mb-8 h-9 w-48 rounded bg-slate-200"></div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="h-96 rounded-2xl bg-white lg:col-span-2"></div>
            <div className="h-96 rounded-2xl bg-white"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-10">
          <div className="mb-2 flex items-center gap-2 text-sky-500">
            <FiShoppingBag size={20} />

            <span className="text-sm font-semibold uppercase tracking-wider">
              Sneak.in Checkout
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Checkout
          </h1>

          <p className="mt-2 text-slate-500">
            Review your delivery details and order before placing it.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* LEFT SECTION */}
          <div className="space-y-6 lg:col-span-2">
            {/* Address Section */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Delivery Address
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Select where you want your order delivered.
                  </p>
                </div>

                <FiMapPin size={22} className="text-sky-500" />
              </div>

              {addresses.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center">
                  <FiMapPin size={28} className="mx-auto mb-3 text-slate-400" />

                  <h3 className="font-semibold text-slate-900">
                    No address found
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Add a delivery address to continue.
                  </p>

                  <button
                    type="button"
                    onClick={handleAddress}
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    <FiPlus size={17} />
                    Add Address
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {addresses.map((address) => {
                    const isSelected = selectedAddress === address._id;

                    return (
                      <button
                        key={address._id}
                        type="button"
                        onClick={() => setSelectedAddress(address._id)}
                        className={`w-full rounded-2xl border p-5 text-left transition ${
                          isSelected
                            ? "border-sky-400 bg-sky-50/50 ring-1 ring-sky-200"
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          {/* Radio */}
                          <div
                            className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                              isSelected
                                ? "border-sky-500 bg-sky-500"
                                : "border-slate-300"
                            }`}
                          >
                            {isSelected && (
                              <FiCheck size={13} className="text-white" />
                            )}
                          </div>

                          {/* Address Details */}
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="font-bold text-slate-900">
                                {address.name}
                              </h3>

                              {address.isDefault && (
                                <span className="rounded-full bg-sky-100 px-2.5 py-1 text-xs font-semibold text-sky-600">
                                  Default
                                </span>
                              )}
                            </div>

                            <p className="mt-1 text-sm text-slate-500">
                              {address.phone}
                            </p>

                            <p className="mt-3 text-sm leading-6 text-slate-600">
                              {address.addressLine}
                              <br />
                              {address.city}, {address.state} -{" "}
                              {address.pincode}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Add Address */}
            {addresses.length > 0 && (
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-4 text-sm font-semibold text-slate-700 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-600"
              >
                <FiPlus size={18} />
                Add New Address
              </button>
            )}
          </div>

          {/* RIGHT SECTION */}
          <div>
            <div className="sticky top-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                  <FiShoppingBag size={19} className="text-slate-700" />
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">Order Summary</h2>

                  <p className="text-xs text-slate-500">Your Sneak.in order</p>
                </div>
              </div>

              {/* Temporary Summary */}
              <div className="space-y-4 border-b border-slate-100 pb-5">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Subtotal</span>

                  <span className="font-medium text-slate-900">₹{totalAmount}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Delivery</span>

                  <span className="font-medium text-green-600">FREE</span>
                </div>
              </div>

              <div className="flex items-center justify-between py-5">
                <span className="font-semibold text-slate-900">Total</span>

                <span className="text-2xl font-bold text-slate-900">₹{totalAmount}</span>
              </div>

              <button
                type="button"
                disabled={!selectedAddress}
                className="w-full rounded-xl bg-slate-900 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                Place Order
              </button>

              <p className="mt-4 text-center text-xs leading-5 text-slate-400">
                Your order will be created after you confirm your delivery
                address.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
