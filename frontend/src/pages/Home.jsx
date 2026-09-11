function Home() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Hero Section */}
      <section className="flex min-h-[80vh] items-center justify-center px-6">
        <div className="max-w-2xl text-center">

          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to MyApp
          </h1>

          <p className="text-lg text-gray-600 mb-8">
            A simple React and Express application with JWT
            authentication.
          </p>

          <div className="flex justify-center gap-4">

            <a
              href="/register"
              className="rounded-md bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
            >
              Get Started
            </a>

            <a
              href="/login"
              className="rounded-md border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 hover:bg-gray-50"
            >
              Login
            </a>

          </div>

        </div>
      </section>

    </div>
  );
}

export default Home;