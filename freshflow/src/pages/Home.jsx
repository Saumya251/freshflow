function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-4xl font-bold text-green-600">Welcome to FreshFlow 🌿</h1>
      <p className="text-gray-600 mt-4 max-w-md text-lg">
        Track your food products from farm to shelf. Monitor freshness, processing stages, and quality in one place.
      </p>
      <a href="/products" className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
        View Products
      </a>
    </div>
  )
}

export default Home