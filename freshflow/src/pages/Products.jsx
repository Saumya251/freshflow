import { useState, useEffect } from "react"
import ProductCard from "../components/ProductCard"
import axios from "axios"

function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: "", origin: "", status: "Fresh", date: ""
  })
  const [submitting, setSubmitting] = useState(false)
  const [successMsg, setSuccessMsg] = useState("")

  const fetchProducts = () => {
    setLoading(true)
    axios.get(`https://freshflow-api.onrender.com/api/products`)
  .then((res) => { 
    const data = Array.isArray(res.data) ? res.data : []
    setProducts(data)
    setLoading(false) 
  })
      .catch(() => { setError("Failed to load products"); setLoading(false) })
  }

  useEffect(() => { fetchProducts() }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const token = localStorage.getItem("token")
      if (editingProduct) {
        await axios.put(` https://freshflow-api.onrender.com/api/products/${editingProduct._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setSuccessMsg("Product updated successfully!")
      } else {
        await axios.post(" https://freshflow-api.onrender.com/api/products", formData, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setSuccessMsg("Product added successfully!")
      }
      setFormData({ name: "", origin: "", status: "Fresh", date: "" })
      setShowForm(false)
      setEditingProduct(null)
      fetchProducts()
      setTimeout(() => setSuccessMsg(""), 3000)
    } catch (err) {
      setError("Failed to save product. Please login first.")
    }
    setSubmitting(false)
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      origin: product.origin,
      status: product.status,
      date: product.date
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return
    try {
      const token = localStorage.getItem("token")
      await axios.delete(` https://freshflow-api.onrender.com/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setSuccessMsg("Product deleted successfully!")
      fetchProducts()
      setTimeout(() => setSuccessMsg(""), 3000)
    } catch (err) {
      setError("Failed to delete product.")
    }
  }

  if (loading) return (
    <div style={{ padding: "40px", textAlign: "center", fontSize: "1.2rem" }}>
      Loading products...
    </div>
  )

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", padding: "40px 20px" }}>

      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", flexWrap: "wrap", gap: "10px" }}>
        <h1 style={{ color: "#1f2937", margin: 0 }}>🌾 Food Products</h1>
        <button
          onClick={() => { setShowForm(!showForm); setEditingProduct(null); setFormData({ name: "", origin: "", status: "Fresh", date: "" }) }}
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

      {/* ERROR MESSAGE */}
      {error && (
        <div style={{ background: "#fee2e2", color: "#dc2626", padding: "12px 20px", borderRadius: "8px", marginBottom: "20px" }}>
          ❌ {error}
        </div>
      )}

      {/* FORM */}
      {showForm && (
        <div style={{ background: "white", padding: "24px", borderRadius: "12px", marginBottom: "30px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
          <h2 style={{ color: "#1f2937", marginTop: 0, marginBottom: "20px" }}>
            {editingProduct ? "Edit Product" : "Add New Product"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
              <div>
                <label style={{ display: "block", color: "#374151", fontWeight: "500", marginBottom: "6px" }}>Product Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Organic Wheat" required
                  style={{ width: "100%", padding: "10px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "0.95rem", boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ display: "block", color: "#374151", fontWeight: "500", marginBottom: "6px" }}>Origin *</label>
                <input type="text" name="origin" value={formData.origin} onChange={handleChange} placeholder="e.g. Punjab, India" required
                  style={{ width: "100%", padding: "10px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "0.95rem", boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ display: "block", color: "#374151", fontWeight: "500", marginBottom: "6px" }}>Status *</label>
                <select name="status" value={formData.status} onChange={handleChange}
                  style={{ width: "100%", padding: "10px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "0.95rem", boxSizing: "border-box" }}>
                  <option value="Fresh">Fresh</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", color: "#374151", fontWeight: "500", marginBottom: "6px" }}>Date *</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} required
                  style={{ width: "100%", padding: "10px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "0.95rem", boxSizing: "border-box" }} />
              </div>
            </div>
            <button type="submit" disabled={submitting}
              style={{ marginTop: "20px", background: submitting ? "#9ca3af" : "#16a34a", color: "white", padding: "12px 28px", borderRadius: "8px", border: "none", cursor: submitting ? "not-allowed" : "pointer", fontSize: "1rem", fontWeight: "500" }}>
              {submitting ? "Saving..." : editingProduct ? "Update Product" : "Add Product"}
            </button>
          </form>
        </div>
      )}

      {/* PRODUCTS COUNT */}
      <p style={{ color: "#6b7280", marginBottom: "20px" }}>
        Showing {products.length} products
      </p>

      {/* EMPTY STATE */}
      {products.length === 0 && !loading && (
        <div style={{ textAlign: "center", padding: "60px", color: "#6b7280" }}>
          <div style={{ fontSize: "4rem", marginBottom: "16px" }}>📦</div>
          <h3 style={{ color: "#1f2937" }}>No products yet</h3>
          <p>Click "+ Add Product" to add your first food batch</p>
        </div>
      )}

      {/* PRODUCTS GRID */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
        {products.map((product) => (
          <div key={product._id} style={{ background: "white", borderRadius: "12px", padding: "20px", border: "1px solid #e5e7eb", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <h2 style={{ color: "#1f2937", marginBottom: "8px", marginTop: 0 }}>{product.name}</h2>
            <p style={{ color: "#6b7280", fontSize: "0.9rem", margin: "4px 0" }}>📍 {product.origin}</p>
            <p style={{ color: "#6b7280", fontSize: "0.9rem", margin: "4px 0" }}>📅 {product.date}</p>
            <div style={{ marginTop: "12px", marginBottom: "16px" }}>
              <span style={{
                padding: "4px 12px", borderRadius: "20px", fontSize: "0.85rem", fontWeight: "500",
                background: product.status === "Fresh" ? "#dcfce7" : product.status === "Processing" ? "#fef9c3" : "#dbeafe",
                color: product.status === "Fresh" ? "#16a34a" : product.status === "Processing" ? "#ca8a04" : "#2563eb"
              }}>
                {product.status}
              </span>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={() => handleEdit(product)}
                style={{ flex: 1, background: "#f3f4f6", color: "#374151", padding: "8px", borderRadius: "6px", border: "1px solid #d1d5db", cursor: "pointer", fontWeight: "500" }}>
                ✏️ Edit
              </button>
              <button onClick={() => handleDelete(product._id)}
                style={{ flex: 1, background: "#fee2e2", color: "#dc2626", padding: "8px", borderRadius: "6px", border: "1px solid #fca5a5", cursor: "pointer", fontWeight: "500" }}>
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Products