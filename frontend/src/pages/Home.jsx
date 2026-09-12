import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag, Truck, ShieldCheck } from "lucide-react";

function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gray-950 text-white">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_40%,rgba(96,211,251,0.18),transparent_35%)]" />

        <div className="relative mx-auto grid min-h-[78vh] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:px-8">

          {/* Left Content */}
          <div className="max-w-2xl">

            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">
              Step Into Style
            </p>

            <h1 className="text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Find Your
              <span className="block text-sky-400">
                Perfect Pair.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-gray-300">
              Discover premium footwear designed for everyday comfort,
              effortless style, and every step in between.
            </p>

            {/* Buttons */}
            <div className="mt-9 flex flex-wrap gap-4">

              <Link
                to="/products"
                className="group flex items-center gap-2 rounded-xl bg-sky-400 px-6 py-3.5 font-semibold text-gray-950 transition hover:bg-sky-300"
              >
                Shop Collection
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/products?category=sneakers"
                className="rounded-xl border border-gray-600 px-6 py-3.5 font-semibold text-white transition hover:border-white hover:bg-white hover:text-gray-950"
              >
                Explore Sneakers
              </Link>

            </div>

          </div>

          {/* Right Visual */}
          <div className="relative hidden lg:flex items-center justify-center">

            <div className="absolute h-80 w-80 rounded-full bg-sky-400/10 blur-3xl" />

            <div className="relative flex h-[420px] w-[420px] items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">

              <div className="text-center">
                <ShoppingBag
                  size={120}
                  strokeWidth={1}
                  className="mx-auto text-sky-400"
                />

                <p className="mt-5 text-sm uppercase tracking-[0.25em] text-gray-400">
                  Sneak.in
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* Features */}
      <section className="border-b border-gray-200 bg-white">

        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-gray-200 px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:px-8">

          <div className="flex items-center gap-4 py-7 sm:px-8">
            <Truck className="text-sky-500" size={28} />

            <div>
              <h3 className="font-semibold">Fast Delivery</h3>
              <p className="text-sm text-gray-500">
                Quick and reliable shipping
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 py-7 sm:px-8">
            <ShieldCheck className="text-sky-500" size={28} />

            <div>
              <h3 className="font-semibold">Secure Shopping</h3>
              <p className="text-sm text-gray-500">
                Safe and secure checkout
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 py-7 sm:px-8">
            <ShoppingBag className="text-sky-500" size={28} />

            <div>
              <h3 className="font-semibold">Quality Footwear</h3>
              <p className="text-sm text-gray-500">
                Style made for every step
              </p>
            </div>
          </div>

        </div>

      </section>


      {/* Categories */}
      <section className="bg-gray-50 px-6 py-20">

        <div className="mx-auto max-w-7xl">

          <div className="mb-10 flex items-end justify-between">

            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-sky-500">
                Shop Your Style
              </p>

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Explore Our Collection
              </h2>
            </div>

            <Link
              to="/products"
              className="hidden items-center gap-2 text-sm font-semibold text-gray-700 hover:text-sky-500 sm:flex"
            >
              View All
              <ArrowRight size={17} />
            </Link>

          </div>


          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {/* Sneakers */}
            <Link
              to="/products?category=sneakers"
              className="group relative min-h-[260px] overflow-hidden rounded-2xl bg-gray-950 p-8 text-white"
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-sky-400/20 blur-2xl transition group-hover:bg-sky-400/30" />

              <div className="relative">
                <p className="text-sm text-gray-400">01</p>

                <h3 className="mt-16 text-2xl font-bold">
                  Sneakers
                </h3>

                <div className="mt-3 flex items-center gap-2 text-sm text-sky-400">
                  Shop Now
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </div>
              </div>
            </Link>


            {/* Running */}
            <Link
              to="/products?category=running"
              className="group relative min-h-[260px] overflow-hidden rounded-2xl bg-sky-400 p-8 text-gray-950"
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/30 blur-2xl" />

              <div className="relative">
                <p className="text-sm text-gray-700">02</p>

                <h3 className="mt-16 text-2xl font-bold">
                  Running
                </h3>

                <div className="mt-3 flex items-center gap-2 text-sm font-semibold">
                  Shop Now
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </div>
              </div>
            </Link>


            {/* All Footwear */}
            <Link
              to="/products"
              className="group relative min-h-[260px] overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 sm:col-span-2 lg:col-span-1"
            >
              <div className="relative">
                <p className="text-sm text-gray-400">03</p>

                <h3 className="mt-16 text-2xl font-bold">
                  All Footwear
                </h3>

                <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
                  Explore Collection
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </div>
              </div>
            </Link>

          </div>

        </div>
      </section>


      {/* CTA */}
      <section className="bg-white px-6 py-20">

        <div className="mx-auto max-w-5xl rounded-3xl bg-gray-950 px-8 py-14 text-center text-white sm:px-12">

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-sky-400">
            Your Next Pair Awaits
          </p>

          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to step up your style?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Browse our collection and find footwear that matches
            your everyday style.
          </p>

          <Link
            to="/products"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-sky-400 px-7 py-3.5 font-semibold text-gray-950 transition hover:bg-sky-300"
          >
            Shop Now
            <ArrowRight size={18} />
          </Link>

        </div>

      </section>

    </div>
  );
}

export default Home
