import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, SlidersHorizontal, X } from "lucide-react";

import { fetchProducts } from "../redux/features/productSlice";
import ProductCard from "../component/ProductCart";
import { fetchFavorites } from "../redux/features/favoriteSlice";

function Products() {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector(
    (state) => state.products
  );

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");
  const [showFilters, setShowFilters] = useState(false);

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        products
          .map((product) => product.category)
          .filter(Boolean)
      ),
    ];

    return uniqueCategories;
  }, [products]);

  // Fetch products
  useEffect(() => {
    const params = {};

    if (search.trim()) {
      params.search = search;
    }

    if (category !== "all") {
      params.category = category;
    }

    if (sort !== "default") {
      params.sort = sort;
    }

    dispatch(fetchProducts(params));
  }, [search, category, sort, dispatch]);

  // Fetch favorites
  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setSort("default");
  };

  const hasFilters =
    search.trim() !== "" ||
    category !== "all" ||
    sort !== "default";

  return (
    <div className="min-h-screen bg-white text-black">

      {/* ==================================================
          PAGE INTRO
      ================================================== */}

      <section className="border-b border-zinc-200">
        <div className="mx-auto max-w-[1600px] px-5 pb-14 pt-16 sm:px-8 sm:pb-16 sm:pt-20 lg:px-12 lg:pb-20 lg:pt-24">

          <div className="max-w-5xl">

            <p className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-400">
              Sneak.in Collection
            </p>

            <h1 className="mt-5 text-[clamp(3.5rem,8vw,8rem)] font-black uppercase leading-[0.82] tracking-[-0.07em]">
              Find Your
              <br />
              Pair.
            </h1>

            <p className="mt-7 max-w-xl text-sm leading-6 text-zinc-500 sm:text-base">
              Explore sneakers designed for everyday movement,
              comfort, performance, and effortless style.
            </p>

          </div>

        </div>
      </section>


      {/* ==================================================
          FILTER / SEARCH AREA
      ================================================== */}

      <section className="sticky top-0 z-30 border-b border-zinc-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">

          <div className="flex min-h-[76px] items-center gap-4">

            {/* Search */}

            <div className="relative min-w-0 flex-1">

              <Search
                size={19}
                strokeWidth={1.8}
                className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-400"
              />

              <input
                type="text"
                placeholder="Search sneakers"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent py-3 pl-8 pr-8 text-sm text-black outline-none placeholder:text-zinc-400"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-0 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-zinc-400 transition hover:bg-zinc-100 hover:text-black"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}

            </div>


            {/* Desktop Filters */}

            <div className="hidden items-center gap-3 md:flex">

              {/* Category */}

              <div className="relative">

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="cursor-pointer appearance-none rounded-full border border-zinc-200 bg-white py-3 pl-5 pr-10 text-sm font-medium text-black outline-none transition hover:border-zinc-400 focus:border-black"
                >
                  <option value="all">
                    All Categories
                  </option>

                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs">
                  ↓
                </span>

              </div>


              {/* Sort */}

              <div className="relative">

                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="cursor-pointer appearance-none rounded-full border border-zinc-200 bg-white py-3 pl-5 pr-10 text-sm font-medium text-black outline-none transition hover:border-zinc-400 focus:border-black"
                >
                  <option value="default">
                    Sort By
                  </option>

                  <option value="price_asc">
                    Price: Low to High
                  </option>

                  <option value="price_desc">
                    Price: High to Low
                  </option>

                  <option value="name">
                    Name
                  </option>
                </select>

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs">
                  ↓
                </span>

              </div>


              {/* Clear */}

              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
                >
                  Clear
                </button>
              )}

            </div>


            {/* Mobile Filter Button */}

            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="flex h-11 shrink-0 items-center gap-2 rounded-full border border-zinc-200 px-4 text-sm font-semibold transition hover:border-black"
            >
              <SlidersHorizontal size={17} />

              <span className="hidden xs:inline">
                Filters
              </span>
            </button>

          </div>


          {/* ==================================================
              MOBILE FILTER PANEL
          ================================================== */}

          {showFilters && (
            <div className="border-t border-zinc-200 py-5 md:hidden">

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                {/* Category */}

                <div>

                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-zinc-400">
                    Category
                  </label>

                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-medium outline-none focus:border-black"
                  >
                    <option value="all">
                      All Categories
                    </option>

                    {categories.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>

                </div>


                {/* Sort */}

                <div>

                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-zinc-400">
                    Sort
                  </label>

                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-medium outline-none focus:border-black"
                  >
                    <option value="default">
                      Default
                    </option>

                    <option value="price_asc">
                      Price: Low to High
                    </option>

                    <option value="price_desc">
                      Price: High to Low
                    </option>

                    <option value="name">
                      Name
                    </option>
                  </select>

                </div>

              </div>


              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-4 w-full rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
                >
                  Clear Filters
                </button>
              )}

            </div>
          )}

        </div>
      </section>


      {/* ==================================================
          PRODUCTS
      ================================================== */}

      <main className="mx-auto max-w-[1600px] px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">

        {/* Products Header */}

        <div className="mb-10 flex items-end justify-between gap-6">

          <div>

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400">
              Collection
            </p>

            <h2 className="mt-2 text-3xl font-black uppercase tracking-[-0.04em] sm:text-4xl">
              All Sneakers
            </h2>

          </div>


          <p className="hidden text-sm text-zinc-400 sm:block">
            {products.length}{" "}
            {products.length === 1 ? "product" : "products"}
          </p>

        </div>


        {/* Mobile Product Count */}

        <p className="mb-8 text-sm text-zinc-400 sm:hidden">
          {products.length}{" "}
          {products.length === 1 ? "product" : "products"}
        </p>


        {/* ==================================================
            LOADING
        ================================================== */}

        {loading && (
          <div className="grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item}>

                <div className="aspect-square animate-pulse bg-zinc-100" />

                <div className="pt-5">

                  <div className="h-4 w-2/3 animate-pulse bg-zinc-100" />

                  <div className="mt-3 h-3 w-1/3 animate-pulse bg-zinc-100" />

                  <div className="mt-4 h-4 w-1/4 animate-pulse bg-zinc-100" />

                </div>

              </div>
            ))}

          </div>
        )}


        {/* ==================================================
            ERROR
        ================================================== */}

        {!loading && error && (
          <div className="border-y border-zinc-200 py-20 text-center">

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
              Something went wrong
            </p>

            <h3 className="mt-3 text-2xl font-black uppercase">
              Unable to load sneakers
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-zinc-500">
              {error}
            </p>

            <button
              type="button"
              onClick={() => dispatch(fetchProducts())}
              className="mt-7 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
            >
              Try Again
            </button>

          </div>
        )}


        {/* ==================================================
            NO PRODUCTS
        ================================================== */}

        {!loading &&
          !error &&
          products.length === 0 && (
            <div className="border-y border-zinc-200 py-24 text-center">

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
                Collection
              </p>

              <h3 className="mt-3 text-2xl font-black uppercase">
                No sneakers found
              </h3>

              <p className="mt-3 text-sm text-zinc-500">
                Try changing your search or filters.
              </p>

              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-6 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
                >
                  Clear Filters
                </button>
              )}

            </div>
          )}


        {/* ==================================================
            PRODUCT GRID
        ================================================== */}

        {!loading &&
          !error &&
          products.length > 0 && (
            <div className="grid grid-cols-1 gap-x-5 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))}

            </div>
          )}

      </main>

    </div>
  );
}

export default Products;