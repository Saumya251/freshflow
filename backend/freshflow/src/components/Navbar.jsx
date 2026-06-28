import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav style={{ background: "#16a34a", padding: "15px 30px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <h1 style={{ color: "white", margin: 0 }}>🌿 FreshFlow</h1>
      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>
        <Link to="/products" style={{ color: "white", textDecoration: "none" }}>Products</Link>
        <Link to="/about" style={{ color: "white", textDecoration: "none" }}>About</Link>
      </div>
    </nav>
  )
}

export default Navbar