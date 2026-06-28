import ProductCard from "../components/ProductCard"
import products from "../data/Products"

function Products() {
  return (
    <div style={{ minHeight: "100vh", padding: "40px 20px" }}>
      <h1 style={{ color: "#1f2937", marginBottom: "30px" }}>Food Products</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
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