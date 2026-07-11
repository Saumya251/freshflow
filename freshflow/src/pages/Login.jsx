import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password })
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("user", JSON.stringify(res.data.user))
      navigate("/products")
    } catch (err) {
      setError(err.response?.data?.message || "Login failed")
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "white", padding: "40px", borderRadius: "12px", width: "100%", maxWidth: "400px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <h1 style={{ color: "#16a34a", textAlign: "center", marginBottom: "8px" }}>🌿 FreshFlow</h1>
        <h2 style={{ color: "#1f2937", textAlign: "center", marginBottom: "24px" }}>Login</h2>

        {error && (
          <div style={{ background: "#fee2e2", color: "#dc2626", padding: "10px", borderRadius: "6px", marginBottom: "16px" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", color: "#374151", fontWeight: "500", marginBottom: "6px" }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              style={{ width: "100%", padding: "10px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "0.95rem", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", color: "#374151", fontWeight: "500", marginBottom: "6px" }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              style={{ width: "100%", padding: "10px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "0.95rem", boxSizing: "border-box" }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ width: "100%", background: loading ? "#9ca3af" : "#16a34a", color: "white", padding: "12px", borderRadius: "8px", border: "none", cursor: loading ? "not-allowed" : "pointer", fontSize: "1rem", fontWeight: "500" }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "16px", color: "#6b7280" }}>
          Don't have an account?{" "}
          <a href="/register" style={{ color: "#16a34a", fontWeight: "500" }}>Register</a>
        </p>
      </div>
    </div>
  )
}

export default Login