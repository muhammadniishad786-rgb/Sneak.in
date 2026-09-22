import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

function Hero() {
  const { products, loading } = useSelector(
    (state) => state.product
  );

  const featuredProduct = products?.[0];

  const getImageUrl = (image) => {
    if (!image) return "";

    if (image.startsWith("http")) {
      return image;
    }

    return `${import.meta.env.VITE_API_URL.replace("/api", "")}${image}`;
  };

  return (
    <section className="bg-white">

      {/* ==================================================
          HERO CONTAINER
      ================================================== */}
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">

        <div className="relative min-h-[calc(100vh-80px)] overflow-hidden">

          {/* ==================================================
              TEXT CONTENT
          ================================================== */}
          <div className="relative z-20 flex min-h-[calc(100vh-80px)] flex-col justify-center py-16 lg:w-[55%] lg:py-24">

            {/* Small Label */}
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
              Sneak.in — New Season
            </p>

            {/* Main Heading */}
            <h1 className="max-w-4xl text-[clamp(4rem,9vw,9rem)] font-black uppercase leading-[0.82] tracking-[-0.06em] text-black">
              Move
              <br />
              Different.
            </h1>

            {/* Description */}
            <p className="mt-8 max-w-md text-base leading-7 text-zinc-500 sm:text-lg">
              Step into sneakers designed for everyday movement,
              effortless style, and your next adventure.
            </p>

            {/* Buttons */}
            <div className="mt-9 flex flex-wrap items-center gap-3">

              <Link
                to="/products"
                className="group inline-flex items-center gap-3 rounded-full bg-black px-7 py-4 text-sm font-semibold text-white transition duration-300 hover:bg-zinc-800"
              >
                Shop Sneakers

                <ArrowUpRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>

              {featuredProduct && (
                <Link
                  to={`/product/${featuredProduct._id}`}
                  className="rounded-full border border-zinc-300 px-7 py-4 text-sm font-semibold text-black transition duration-300 hover:border-black"
                >
                  View Featured
                </Link>
              )}

            </div>

          </div>


          {/* ==================================================
              PRODUCT VISUAL
          ================================================== */}
          <div className="absolute inset-y-0 right-[-20%] flex w-[80%] items-center justify-center lg:right-[-5%] lg:w-[65%]">

            {/* Very subtle background circle */}
            <div className="absolute h-[65vw] w-[65vw] max-h-[750px] max-w-[750px] rounded-full bg-zinc-100" />

            {/* Background Typography */}
            <span className="pointer-events-none absolute select-none text-[18vw] font-black uppercase leading-none tracking-[-0.08em] text-black/[0.025]">
              SNEAK
            </span>

            {/* Loading */}
            {loading ? (
              <div className="relative z-10 h-[300px] w-[300px] animate-pulse rounded-full bg-zinc-200 sm:h-[450px] sm:w-[450px]" />
            ) : featuredProduct?.image ? (

              <Link
                to={`/product/${featuredProduct._id}`}
                className="relative z-10 block w-full"
              >
                <img
                  src={getImageUrl(featuredProduct.image)}
                  alt={featuredProduct.name}
                  className="mx-auto w-[85%] max-w-[750px] object-contain transition duration-700 ease-out hover:scale-105"
                />
              </Link>

            ) : (

              <div className="relative z-10 flex h-[300px] w-[300px] items-center justify-center rounded-full bg-zinc-100 sm:h-[450px] sm:w-[450px]">
                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400">
                  Sneak.in
                </span>
              </div>

            )}

          </div>


          {/* ==================================================
              FEATURED PRODUCT INFO
          ================================================== */}
          {featuredProduct && !loading && (
            <div className="absolute bottom-8 right-5 z-30 hidden max-w-[220px] text-right sm:block lg:bottom-12 lg:right-12">

              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-zinc-400">
                Featured
              </p>

              <p className="mt-2 text-sm font-bold text-black">
                {featuredProduct.name}
              </p>

              <p className="mt-1 text-sm text-zinc-500">
                ₹{Number(featuredProduct.price).toLocaleString("en-IN")}
              </p>

            </div>
          )}

        </div>

      </div>


      {/* ==================================================
          BOTTOM INTRO STRIP
      ================================================== */}
      <div className="border-y border-zinc-200 bg-white">

        <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-5 py-6 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">

          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400">
            Built for everyday movement
          </p>

          <p className="max-w-xl text-sm leading-6 text-zinc-500">
            Find your next pair from the latest Sneak.in collection.
          </p>

        </div>

      </div>

    </section>
  );
}

export default Hero;
