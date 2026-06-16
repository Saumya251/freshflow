import ProductCard from "../components/ProductCard"
import products from "../data/Products"

function Products() {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Food Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            origin={product.origin}
            status={product.status}
            date={product.date}
          />
        ))}
      </div>
    </div>
  )
}

export default Products