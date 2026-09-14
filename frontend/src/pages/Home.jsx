// import { Link } from "react-router-dom";
// import { ArrowRight, ShoppingBag, Truck, ShieldCheck } from "lucide-react";

// function Home() {
//   return (
//     <div className="min-h-screen bg-white text-gray-900">

//       {/* Hero Section */}
//       <section className="relative overflow-hidden bg-gray-950 text-white">

//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_40%,rgba(96,211,251,0.18),transparent_35%)]" />

//         <div className="relative mx-auto grid min-h-[78vh] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:px-8">

//           {/* Left Content */}
//           <div className="max-w-2xl">

//             <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">
//               Step Into Style
//             </p>

//             <h1 className="text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
//               Find Your
//               <span className="block text-sky-400">
//                 Perfect Pair.
//               </span>
//             </h1>

//             <p className="mt-7 max-w-xl text-lg leading-8 text-gray-300">
//               Discover premium footwear designed for everyday comfort,
//               effortless style, and every step in between.
//             </p>

//             {/* Buttons */}
//             <div className="mt-9 flex flex-wrap gap-4">

//               <Link
//                 to="/products"
//                 className="group flex items-center gap-2 rounded-xl bg-sky-400 px-6 py-3.5 font-semibold text-gray-950 transition hover:bg-sky-300"
//               >
//                 Shop Collection
//                 <ArrowRight
//                   size={18}
//                   className="transition-transform group-hover:translate-x-1"
//                 />
//               </Link>

//               <Link
//                 to="/products?category=sneakers"
//                 className="rounded-xl border border-gray-600 px-6 py-3.5 font-semibold text-white transition hover:border-white hover:bg-white hover:text-gray-950"
//               >
//                 Explore Sneakers
//               </Link>

//             </div>

//           </div>

//           {/* Right Visual */}
//           <div className="relative hidden lg:flex items-center justify-center">

//             <div className="absolute h-80 w-80 rounded-full bg-sky-400/10 blur-3xl" />

//             <div className="relative flex h-[420px] w-[420px] items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">

//               <div className="text-center">
//                 <ShoppingBag
//                   size={120}
//                   strokeWidth={1}
//                   className="mx-auto text-sky-400"
//                 />

//                 <p className="mt-5 text-sm uppercase tracking-[0.25em] text-gray-400">
//                   Sneak.in
//                 </p>
//               </div>

//             </div>

//           </div>

//         </div>
//       </section>


//       {/* Features */}
//       <section className="border-b border-gray-200 bg-white">

//         <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-gray-200 px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:px-8">

//           <div className="flex items-center gap-4 py-7 sm:px-8">
//             <Truck className="text-sky-500" size={28} />

//             <div>
//               <h3 className="font-semibold">Fast Delivery</h3>
//               <p className="text-sm text-gray-500">
//                 Quick and reliable shipping
//               </p>
//             </div>
//           </div>

//           <div className="flex items-center gap-4 py-7 sm:px-8">
//             <ShieldCheck className="text-sky-500" size={28} />

//             <div>
//               <h3 className="font-semibold">Secure Shopping</h3>
//               <p className="text-sm text-gray-500">
//                 Safe and secure checkout
//               </p>
//             </div>
//           </div>

//           <div className="flex items-center gap-4 py-7 sm:px-8">
//             <ShoppingBag className="text-sky-500" size={28} />

//             <div>
//               <h3 className="font-semibold">Quality Footwear</h3>
//               <p className="text-sm text-gray-500">
//                 Style made for every step
//               </p>
//             </div>
//           </div>

//         </div>

//       </section>


//       {/* Categories */}
//       <section className="bg-gray-50 px-6 py-20">

//         <div className="mx-auto max-w-7xl">

//           <div className="mb-10 flex items-end justify-between">

//             <div>
//               <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-sky-500">
//                 Shop Your Style
//               </p>

//               <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
//                 Explore Our Collection
//               </h2>
//             </div>

//             <Link
//               to="/products"
//               className="hidden items-center gap-2 text-sm font-semibold text-gray-700 hover:text-sky-500 sm:flex"
//             >
//               View All
//               <ArrowRight size={17} />
//             </Link>

//           </div>


//           <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

//             {/* Sneakers */}
//             <Link
//               to="/products?category=sneakers"
//               className="group relative min-h-[260px] overflow-hidden rounded-2xl bg-gray-950 p-8 text-white"
//             >
//               <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-sky-400/20 blur-2xl transition group-hover:bg-sky-400/30" />

//               <div className="relative">
//                 <p className="text-sm text-gray-400">01</p>

//                 <h3 className="mt-16 text-2xl font-bold">
//                   Sneakers
//                 </h3>

//                 <div className="mt-3 flex items-center gap-2 text-sm text-sky-400">
//                   Shop Now
//                   <ArrowRight
//                     size={16}
//                     className="transition-transform group-hover:translate-x-1"
//                   />
//                 </div>
//               </div>
//             </Link>


//             {/* Running */}
//             <Link
//               to="/products?category=running"
//               className="group relative min-h-[260px] overflow-hidden rounded-2xl bg-sky-400 p-8 text-gray-950"
//             >
//               <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/30 blur-2xl" />

//               <div className="relative">
//                 <p className="text-sm text-gray-700">02</p>

//                 <h3 className="mt-16 text-2xl font-bold">
//                   Running
//                 </h3>

//                 <div className="mt-3 flex items-center gap-2 text-sm font-semibold">
//                   Shop Now
//                   <ArrowRight
//                     size={16}
//                     className="transition-transform group-hover:translate-x-1"
//                   />
//                 </div>
//               </div>
//             </Link>


//             {/* All Footwear */}
//             <Link
//               to="/products"
//               className="group relative min-h-[260px] overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 sm:col-span-2 lg:col-span-1"
//             >
//               <div className="relative">
//                 <p className="text-sm text-gray-400">03</p>

//                 <h3 className="mt-16 text-2xl font-bold">
//                   All Footwear
//                 </h3>

//                 <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
//                   Explore Collection
//                   <ArrowRight
//                     size={16}
//                     className="transition-transform group-hover:translate-x-1"
//                   />
//                 </div>
//               </div>
//             </Link>

//           </div>

//         </div>
//       </section>


//       {/* CTA */}
//       <section className="bg-white px-6 py-20">

//         <div className="mx-auto max-w-5xl rounded-3xl bg-gray-950 px-8 py-14 text-center text-white sm:px-12">

//           <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-sky-400">
//             Your Next Pair Awaits
//           </p>

//           <h2 className="text-3xl font-bold sm:text-4xl">
//             Ready to step up your style?
//           </h2>

//           <p className="mx-auto mt-4 max-w-xl text-gray-400">
//             Browse our collection and find footwear that matches
//             your everyday style.
//           </p>

//           <Link
//             to="/products"
//             className="mt-8 inline-flex items-center gap-2 rounded-xl bg-sky-400 px-7 py-3.5 font-semibold text-gray-950 transition hover:bg-sky-300"
//           >
//             Shop Now
//             <ArrowRight size={18} />
//           </Link>

//         </div>

//       </section>

//     </div>
//   );
// }

// export default Home

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import api from "../services/api";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/product");

        setProducts(response.data.products || response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const featuredProduct = products[0];

  const getImageUrl = (image) => {
    if (!image) return "";

    if (image.startsWith("http")) {
      return image;
    }

    return `${import.meta.env.VITE_API_URL}${image}`;
  };

  return (
    <div className="min-h-screen bg-[#e9e8f2] text-gray-950">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative mx-auto min-h-[calc(100vh-80px)] max-w-[1500px] overflow-hidden bg-gradient-to-br from-[#21145c] via-[#171344] to-[#050611]">

        {/* Background Glow */}

        <div className="pointer-events-none absolute -left-40 top-20 h-[450px] w-[450px] rounded-full bg-purple-700/20 blur-[120px]" />

        <div className="pointer-events-none absolute right-10 top-10 h-[350px] w-[350px] rounded-full bg-blue-600/20 blur-[120px]" />

        <div className="pointer-events-none absolute bottom-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[100px]" />


        {/* Decorative circles */}

        <div className="absolute left-[8%] top-[35%] h-5 w-5 rounded-full border border-pink-400" />

        <div className="absolute right-[15%] top-[18%] h-5 w-5 rounded-full border border-orange-400" />

        <div className="absolute right-[20%] top-[65%] h-7 w-7 rounded-full border border-pink-500" />

        <div className="absolute bottom-[10%] left-[20%] h-5 w-5 rounded-full border border-orange-400" />

        <div className="absolute bottom-[7%] right-[8%] h-4 w-4 rounded-full border border-blue-400" />


        {/* =====================================================
            SOCIAL SIDE TEXT
        ===================================================== */}

        <div className="absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 -rotate-90 items-center gap-8 text-[8px] font-semibold uppercase tracking-[0.3em] text-gray-500 lg:flex">

          <span>Instagram</span>
          <span>Facebook</span>
          <span>Twitter</span>

        </div>


        {/* =====================================================
            HERO CONTENT
        ===================================================== */}

        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-80px)] max-w-6xl grid-cols-1 items-center px-6 lg:grid-cols-2 lg:px-8">

          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <div className="relative z-20 py-16 lg:py-20">

            {/* Featured */}

            <div className="mb-6 inline-flex rounded-full bg-white px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#25185f]">
              Featured Collection
            </div>


            {/* Heading */}

            <h1 className="max-w-xl text-6xl font-black uppercase leading-[0.88] tracking-tight text-white sm:text-7xl lg:text-[82px]">

              New

              <br />

              <span>
                Street
              </span>

              <br />

              <span className="text-sky-400">
                Collection
              </span>

            </h1>


            {/* Description */}

            <p className="mt-7 max-w-md text-sm leading-6 text-gray-400 sm:text-base">
              Discover footwear designed for everyday movement,
              bold style, and all-day comfort.
            </p>


            {/* Buttons */}

            <div className="mt-8 flex flex-wrap gap-3">

              <Link
                to={
                  featuredProduct
                    ? `/products/${featuredProduct._id}`
                    : "/products"
                }
                className="group flex items-center gap-3 rounded-lg bg-sky-400 px-6 py-3 text-sm font-bold text-gray-950 transition hover:bg-sky-300"
              >
                Shop Now

                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>


              <Link
                to="/products"
                className="flex items-center gap-3 rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white hover:text-gray-950"
              >
                Explore Collection
              </Link>

            </div>

          </div>


          {/* =================================================
              RIGHT PRODUCT
          ================================================= */}

          <div className="relative flex h-[420px] items-center justify-center lg:h-[600px]">

            {/* Background Text */}

            <span className="pointer-events-none absolute select-none text-[120px] font-black uppercase tracking-tighter text-white/[0.025] sm:text-[180px]">
              SNEAK
            </span>


            {/* Product Glow */}

            <div className="absolute h-[300px] w-[300px] rounded-full bg-blue-500/20 blur-[80px] sm:h-[400px] sm:w-[400px]" />


            {/* Product */}

            {loading ? (

              <div className="relative z-10 h-[320px] w-[320px] animate-pulse rounded-full bg-white/5" />

            ) : featuredProduct?.image ? (

              <img
                src={getImageUrl(featuredProduct.image)}
                alt={featuredProduct.name}
                className="relative z-10 max-h-[430px] w-[90%] object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.7)] transition duration-500 hover:scale-105"
              />

            ) : (

              <div className="relative z-10 flex h-[320px] w-[320px] items-center justify-center rounded-full border border-white/10 bg-white/5">

                <ShoppingBag
                  size={110}
                  strokeWidth={1}
                  className="text-sky-400"
                />

              </div>

            )}


            {/* Discount Card */}

            <div className="absolute right-0 top-[18%] z-20 rounded-xl border border-white/10 bg-white/10 px-4 py-3 shadow-xl backdrop-blur-md">

              <div className="flex items-center gap-3">

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-xs font-bold text-gray-950">
                  %
                </div>

                <div>

                  <p className="text-[10px] font-bold text-white">
                    Up to 30% Off
                  </p>

                  <p className="mt-1 text-[8px] text-gray-400">
                    Limited collection
                  </p>

                </div>

              </div>

            </div>


            {/* Small Product Label */}

            {featuredProduct && (
              <div className="absolute bottom-[10%] left-[5%] z-20 hidden rounded-xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-md sm:block">

                <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400">
                  Featured
                </p>

                <p className="mt-1 max-w-[150px] truncate text-sm font-bold text-white">
                  {featuredProduct.name}
                </p>

                {featuredProduct.price && (
                  <p className="mt-1 text-xs text-sky-400">
                    ₹{featuredProduct.price}
                  </p>
                )}

              </div>
            )}

          </div>

        </div>


        {/* =====================================================
            SLIDER CONTROLS
        ===================================================== */}

        <div className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 items-center gap-5">

          <button className="text-gray-500 transition hover:text-white">
            <ChevronLeft size={17} />
          </button>


          <div className="flex items-center gap-2">

            <span className="h-2 w-2 rounded-full bg-gray-600" />

            <span className="h-2 w-6 rounded-full bg-sky-400" />

            <span className="h-2 w-2 rounded-full bg-gray-600" />

            <span className="h-2 w-2 rounded-full bg-gray-600" />

          </div>


          <button className="text-gray-500 transition hover:text-white">
            <ChevronRight size={17} />
          </button>

        </div>


        {/* Product Number */}

        <div className="absolute bottom-5 right-7 hidden sm:block">

          <span className="text-5xl font-thin text-white/20">
            01
          </span>

        </div>

      </section>


      {/* =====================================================
          FEATURES
      ===================================================== */}

      <section className="mx-auto max-w-[1500px] bg-[#e9e8f2] px-6 py-8">

        <div className="grid gap-5 sm:grid-cols-3">

          <div className="rounded-xl bg-white p-5 shadow-sm">

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
              Free Shipping
            </p>

            <p className="mt-2 text-sm font-semibold">
              Fast and reliable delivery
            </p>

          </div>


          <div className="rounded-xl bg-white p-5 shadow-sm">

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
              Premium Quality
            </p>

            <p className="mt-2 text-sm font-semibold">
              Footwear made for every step
            </p>

          </div>


          <div className="rounded-xl bg-white p-5 shadow-sm">

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
              Secure Checkout
            </p>

            <p className="mt-2 text-sm font-semibold">
              Safe and reliable payments
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          COLLECTIONS
      ===================================================== */}

      <section className="mx-auto max-w-[1500px] bg-[#e9e8f2] px-6 pb-20">

        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

          <div>

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-sky-500">
              Explore
            </p>

            <h2 className="mt-2 text-4xl font-black uppercase tracking-tight">
              Find Your Pair
            </h2>

          </div>


          <Link
            to="/products"
            className="group flex items-center gap-2 text-sm font-bold text-gray-700 transition hover:text-sky-500"
          >
            View Collection

            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />

          </Link>

        </div>


        {/* Category Cards */}

        <div className="mt-8 grid gap-5 md:grid-cols-3">

          {/* Sneakers */}

          <Link
            to="/products?category=sneakers"
            className="group relative min-h-[250px] overflow-hidden rounded-2xl bg-[#171344] p-7"
          >

            <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-blue-500/20 blur-2xl transition group-hover:bg-blue-500/30" />

            <div className="relative">

              <span className="text-xs font-semibold text-gray-500">
                01
              </span>

              <h3 className="mt-20 text-3xl font-black uppercase text-white">
                Sneakers
              </h3>

              <p className="mt-2 flex items-center gap-2 text-sm text-sky-400">
                Explore

                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                />
              </p>

            </div>

          </Link>


          {/* Running */}

          <Link
            to="/products?category=running"
            className="group relative min-h-[250px] overflow-hidden rounded-2xl bg-sky-400 p-7"
          >

            <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-white/30 blur-2xl" />

            <div className="relative">

              <span className="text-xs font-semibold text-gray-700">
                02
              </span>

              <h3 className="mt-20 text-3xl font-black uppercase text-gray-950">
                Running
              </h3>

              <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-gray-950">
                Explore

                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                />
              </p>

            </div>

          </Link>


          {/* All Shoes */}

          <Link
            to="/products"
            className="group relative min-h-[250px] overflow-hidden rounded-2xl bg-white p-7 shadow-sm"
          >

            <div className="relative">

              <span className="text-xs font-semibold text-gray-400">
                03
              </span>

              <h3 className="mt-20 text-3xl font-black uppercase">
                All Shoes
              </h3>

              <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                Explore

                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                />
              </p>

            </div>

          </Link>

        </div>

      </section>

    </div>
  );
}

export default Home;
