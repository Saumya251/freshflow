import { Link, useNavigate } from "react-router-dom"

function Navbar() {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const user = JSON.parse(localStorage.getItem("user") || "null")

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/login")
  }

  return (
    <nav style={{ background: "#16a34a", padding: "15px 30px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <h1 style={{ color: "white", margin: 0 }}>🌿 FreshFlow</h1>
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>
        <Link to="/dashboard" style={{ color: "white", textDecoration: "none" }}>Dashboard</Link>
        <Link to="/products" style={{ color: "white", textDecoration: "none" }}>Products</Link>
        <Link to="/about" style={{ color: "white", textDecoration: "none" }}>About</Link>
        <Link to="/ai" style={{ color: "white", textDecoration: "none" }}>🤖 AI Analyzer</Link>
        {token ? (
          <>
            <span style={{ color: "white", fontSize: "0.9rem" }}>{user?.email}</span>
            <button onClick={handleLogout} style={{ background: "white", color: "#16a34a", padding: "6px 14px", borderRadius: "6px", border: "none", cursor: "pointer", fontWeight: "500" }}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" style={{ background: "white", color: "#16a34a", padding: "6px 14px", borderRadius: "6px", textDecoration: "none", fontWeight: "500" }}>
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar