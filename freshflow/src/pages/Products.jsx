import { useState, useEffect } from "react"
import ProductCard from "../components/ProductCard"
import axios from "axios"

function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    origin: "",
    status: "Fresh",
    date: "",
  })
  const [submitting, setSubmitting] = useState(false)
  const [successMsg, setSuccessMsg] = useState("")

  // Fetch all products
  const fetchProducts = () => {
    setLoading(true)
    axios.get("http://localhost:5000/api/products")
      .then((res) => {
        setProducts(res.data)
        setLoading(false)
      })
      .catch((err) => {
        setError("Failed to load products")
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Handle form submit
const handleSubmit = async (e) => {
  e.preventDefault()
  setSubmitting(true)
  try {
    const token = localStorage.getItem("token")
    await axios.post("http://localhost:5000/api/products", formData, {
      headers: { Authorization: `Bearer ${token}` }
    })
    setSuccessMsg("Product added successfully!")
    setFormData({ name: "", origin: "", status: "Fresh", date: "" })
    setShowForm(false)
    fetchProducts()
    setTimeout(() => setSuccessMsg(""), 3000)
  } catch (err) {
    setError("Failed to add product. Please login first.")
  }
  setSubmitting(false)
}

  if (loading) return (
    <div style={{ padding: "40px", textAlign: "center", fontSize: "1.2rem" }}>
      Loading products...
    </div>
  )

  if (error) return (
    <div style={{ padding: "40px", color: "red", textAlign: "center" }}>
      {error}
    </div>
  )

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", padding: "40px 20px" }}>

      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", flexWrap: "wrap", gap: "10px" }}>
        <h1 style={{ color: "#1f2937", margin: 0 }}>🌾 Food Products</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{ background: "#16a34a", color: "white", padding: "10px 20px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "1rem", fontWeight: "500" }}
        >
          {showForm ? "Cancel" : "+ Add Product"}
        </button>
      </div>

      {/* SUCCESS MESSAGE */}
      {successMsg && (
        <div style={{ background: "#dcfce7", color: "#16a34a", padding: "12px 20px", borderRadius: "8px", marginBottom: "20px", fontWeight: "500" }}>
          ✅ {successMsg}
        </div>
      )}

      {/* ADD PRODUCT FORM */}
      {showForm && (
        <div style={{ background: "white", padding: "24px", borderRadius: "12px", marginBottom: "30px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
          <h2 style={{ color: "#1f2937", marginTop: 0, marginBottom: "20px" }}>Add New Product</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>

              <div>
                <label style={{ display: "block", color: "#374151", fontWeight: "500", marginBottom: "6px" }}>
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Organic Wheat"
                  required
                  style={{ width: "100%", padding: "10px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "0.95rem", boxSizing: "border-box" }}
                />
              </div>

              <div>
                <label style={{ display: "block", color: "#374151", fontWeight: "500", marginBottom: "6px" }}>
                  Origin *
                </label>
                <input
                  type="text"
                  name="origin"
                  value={formData.origin}
                  onChange={handleChange}
                  placeholder="e.g. Punjab, India"
                  required
                  style={{ width: "100%", padding: "10px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "0.95rem", boxSizing: "border-box" }}
                />
              </div>

              <div>
                <label style={{ display: "block", color: "#374151", fontWeight: "500", marginBottom: "6px" }}>
                  Status *
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "10px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "0.95rem", boxSizing: "border-box" }}
                >
                  <option value="Fresh">Fresh</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", color: "#374151", fontWeight: "500", marginBottom: "6px" }}>
                  Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  style={{ width: "100%", padding: "10px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "0.95rem", boxSizing: "border-box" }}
                />
              </div>

            </div>

            <button
              type="submit"
              disabled={submitting}
              style={{ marginTop: "20px", background: submitting ? "#9ca3af" : "#16a34a", color: "white", padding: "12px 28px", borderRadius: "8px", border: "none", cursor: submitting ? "not-allowed" : "pointer", fontSize: "1rem", fontWeight: "500" }}
            >
              {submitting ? "Adding..." : "Add Product"}
            </button>
          </form>
        </div>
      )}

      {/* PRODUCTS COUNT */}
      <p style={{ color: "#6b7280", marginBottom: "20px" }}>
        Showing {products.length} products
      </p>

      {/* PRODUCTS GRID */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
        {products.map((product) => (
          <ProductCard
            key={product._id}
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