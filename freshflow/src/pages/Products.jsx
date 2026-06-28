import { useState, useEffect } from "react"
import ProductCard from "../components/ProductCard"
import axios from "axios"

function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then((res) => {
        setProducts(res.data)
        setLoading(false)
      })
      .catch((err) => {
        setError("Failed to load products")
        setLoading(false)
      })
  }, [])

  if (loading) return <div style={{ padding: "40px", textAlign: "center" }}>Loading...</div>
  if (error) return <div style={{ padding: "40px", color: "red" }}>{error}</div>

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", padding: "40px 20px" }}>
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