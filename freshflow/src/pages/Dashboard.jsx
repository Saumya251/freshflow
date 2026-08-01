import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Dashboard() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ fresh: 0, processing: 0, shipped: 0 })
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user") || "{}")

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/login")
      return
    }
    axios.get(" ${import.meta.env.VITE_API_URL}/api/products")
      .then((res) => {
        const data = res.data
        setProducts(data)
        setStats({
          fresh: data.filter(p => p.status === "Fresh").length,
          processing: data.filter(p => p.status === "Processing").length,
          shipped: data.filter(p => p.status === "Shipped").length,
        })
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return (
    <div style={{ padding: "40px", textAlign: "center", fontSize: "1.2rem" }}>
      Loading dashboard...
    </div>
  )

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", padding: "40px 20px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>

        {/* WELCOME */}
        <div style={{ marginBottom: "30px" }}>
          <h1 style={{ color: "#1f2937", margin: "0 0 8px 0" }}>
            👋 Welcome back, {user.email}
          </h1>
          <p style={{ color: "#6b7280", margin: 0 }}>
            Here's your FreshFlow overview
          </p>
        </div>

        {/* STATS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "30px" }}>
          <div style={{ background: "white", padding: "24px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#16a34a" }}>{stats.fresh}</div>
            <div style={{ color: "#6b7280", marginTop: "4px" }}>Fresh Products</div>
          </div>
          <div style={{ background: "white", padding: "24px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#ca8a04" }}>{stats.processing}</div>
            <div style={{ color: "#6b7280", marginTop: "4px" }}>Processing</div>
          </div>
          <div style={{ background: "white", padding: "24px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#2563eb" }}>{stats.shipped}</div>
            <div style={{ color: "#6b7280", marginTop: "4px" }}>Shipped</div>
          </div>
          <div style={{ background: "white", padding: "24px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#7c3aed" }}>{products.length}</div>
            <div style={{ color: "#6b7280", marginTop: "4px" }}>Total Products</div>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div style={{ background: "white", padding: "24px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", marginBottom: "30px" }}>
          <h2 style={{ color: "#1f2937", marginTop: 0, marginBottom: "16px" }}>Quick Actions</h2>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button
              onClick={() => navigate("/products")}
              style={{ background: "#16a34a", color: "white", padding: "10px 20px", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "500" }}
            >
              📦 View Products
            </button>
            <button
              onClick={() => navigate("/ai")}
              style={{ background: "#7c3aed", color: "white", padding: "10px 20px", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "500" }}
            >
              🤖 AI Analyzer
            </button>
            <button
              onClick={() => navigate("/products")}
              style={{ background: "#2563eb", color: "white", padding: "10px 20px", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "500" }}
            >
              ➕ Add Product
            </button>
          </div>
        </div>

        {/* RECENT PRODUCTS */}
        <div style={{ background: "white", padding: "24px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <h2 style={{ color: "#1f2937", marginTop: 0, marginBottom: "16px" }}>Recent Products</h2>
          {products.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px", color: "#6b7280" }}>
              <div style={{ fontSize: "3rem", marginBottom: "12px" }}>📦</div>
              <p>No products yet — add your first one!</p>
              <button
                onClick={() => navigate("/products")}
                style={{ background: "#16a34a", color: "white", padding: "10px 20px", borderRadius: "8px", border: "none", cursor: "pointer" }}
              >
                Add Product
              </button>
            </div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #f3f4f6" }}>
                  <th style={{ textAlign: "left", padding: "10px", color: "#6b7280", fontWeight: "500" }}>Name</th>
                  <th style={{ textAlign: "left", padding: "10px", color: "#6b7280", fontWeight: "500" }}>Origin</th>
                  <th style={{ textAlign: "left", padding: "10px", color: "#6b7280", fontWeight: "500" }}>Status</th>
                  <th style={{ textAlign: "left", padding: "10px", color: "#6b7280", fontWeight: "500" }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {products.slice(0, 5).map((product) => (
                  <tr key={product._id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                    <td style={{ padding: "12px 10px", color: "#1f2937", fontWeight: "500" }}>{product.name}</td>
                    <td style={{ padding: "12px 10px", color: "#6b7280" }}>{product.origin}</td>
                    <td style={{ padding: "12px 10px" }}>
                      <span style={{
                        padding: "3px 10px",
                        borderRadius: "20px",
                        fontSize: "0.85rem",
                        fontWeight: "500",
                        background: product.status === "Fresh" ? "#dcfce7" : product.status === "Processing" ? "#fef9c3" : "#dbeafe",
                        color: product.status === "Fresh" ? "#16a34a" : product.status === "Processing" ? "#ca8a04" : "#2563eb"
                      }}>
                        {product.status}
                      </span>
                    </td>
                    <td style={{ padding: "12px 10px", color: "#6b7280" }}>{product.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  )
}

export default Dashboard