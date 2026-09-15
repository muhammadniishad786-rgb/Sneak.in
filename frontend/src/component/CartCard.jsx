function CartCard({ item }) {
  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row">

      {/* Product Image */}
      <div className="h-32 w-full shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-32 sm:w-32">
        <img
          src={item.product.image}
          alt={item.product.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col justify-between">

        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            {item.product.name}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Size: {item.size}
          </p>

          <p className="mt-2 font-semibold text-slate-900">
            ₹{item.product.price.toLocaleString()}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-4 flex items-center justify-between">

          {/* Quantity */}
          <div className="flex items-center rounded-lg border border-slate-200">

            <button className="px-3 py-1.5 text-lg text-slate-600 hover:bg-slate-100">
              −
            </button>

            <span className="px-4 py-1.5 font-medium">
              {item.quantity}
            </span>

            <button className="px-3 py-1.5 text-lg text-slate-600 hover:bg-slate-100">
              +
            </button>

          </div>

          {/* Remove */}
          <button className="text-sm font-medium text-red-500 hover:text-red-600">
            Remove
          </button>

        </div>
      </div>
    </div>
  );
}

export default CartCard;
