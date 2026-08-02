import { useState } from "react"
import axios from "axios"

function AIAnalysis() {
  const [formData, setFormData] = useState({
    name: "",
    origin: "",
    status: "Fresh",
    date: "",
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)
    setError(null)

    try {
      const token = localStorage.getItem("token")
      const res = await axios.post(
        " https://freshflow-api.onrender.com/api/ai/analyze",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setResult(res.data.analysis)
    } catch (err) {
      setError(err.response?.data?.message || "AI analysis failed. Please try again.")
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", padding: "40px 20px" }}>
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>

        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1 style={{ color: "#1f2937", fontSize: "2rem" }}>🤖 AI Quality Analyzer</h1>
          <p style={{ color: "#6b7280", fontSize: "1.1rem" }}>
            Enter your food batch details and get an instant AI-powered quality assessment
          </p>
        </div>

        {/* FORM */}
        <div style={{ background: "white", padding: "30px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", marginBottom: "24px" }}>
          <h2 style={{ color: "#1f2937", marginTop: 0 }}>Product Details</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>

              <div>
                <label style={{ display: "block", color: "#374151", fontWeight: "500", marginBottom: "6px" }}>Product Name *</label>
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
                <label style={{ display: "block", color: "#374151", fontWeight: "500", marginBottom: "6px" }}>Origin *</label>
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
                <label style={{ display: "block", color: "#374151", fontWeight: "500", marginBottom: "6px" }}>Status *</label>
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
                <label style={{ display: "block", color: "#374151", fontWeight: "500", marginBottom: "6px" }}>Processing Date *</label>
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
              disabled={loading}
              style={{ marginTop: "20px", width: "100%", background: loading ? "#9ca3af" : "#16a34a", color: "white", padding: "14px", borderRadius: "8px", border: "none", cursor: loading ? "not-allowed" : "pointer", fontSize: "1rem", fontWeight: "500" }}
            >
              {loading ? "🔄 Analyzing with AI..." : "🤖 Analyze Product Quality"}
            </button>
          </form>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div style={{ background: "white", padding: "30px", borderRadius: "12px", textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
            <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🔄</div>
            <h3 style={{ color: "#1f2937" }}>AI is analyzing your product...</h3>
            <p style={{ color: "#6b7280" }}>This usually takes 3-5 seconds</p>
            <div style={{ width: "60px", height: "4px", background: "#16a34a", borderRadius: "2px", margin: "16px auto", animation: "pulse 1s infinite" }}></div>
          </div>
        )}

        {/* ERROR STATE */}
        {error && (
          <div style={{ background: "#fee2e2", border: "1px solid #fca5a5", padding: "20px", borderRadius: "12px", color: "#dc2626" }}>
            <h3 style={{ margin: "0 0 8px 0" }}>❌ Analysis Failed</h3>
            <p style={{ margin: 0 }}>{error}</p>
          </div>
        )}

        {/* AI RESULT */}
        {result && (
          <div style={{ background: "white", padding: "30px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <span style={{ fontSize: "2rem" }}>🤖</span>
              <h2 style={{ color: "#1f2937", margin: 0 }}>AI Quality Assessment</h2>
            </div>
            <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "20px", borderRadius: "8px" }}>
              <pre style={{ whiteSpace: "pre-wrap", color: "#1f2937", fontFamily: "Arial", fontSize: "0.95rem", lineHeight: "1.6", margin: 0 }}>
                {result}
              </pre>
            </div>
            <button
              onClick={() => { setResult(null); setFormData({ name: "", origin: "", status: "Fresh", date: "" }) }}
              style={{ marginTop: "16px", background: "#f3f4f6", color: "#374151", padding: "10px 20px", borderRadius: "8px", border: "1px solid #d1d5db", cursor: "pointer", fontSize: "0.95rem" }}
            >
              Analyze Another Product
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

export default AIAnalysis