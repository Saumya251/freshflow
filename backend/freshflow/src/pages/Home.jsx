function Home() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "20px" }}>
      <h1 style={{ color: "#16a34a", fontSize: "2.5rem" }}>Welcome to FreshFlow 🌿</h1>
      <p style={{ color: "#6b7280", fontSize: "1.2rem", maxWidth: "500px", marginTop: "10px" }}>
        Track your food products from farm to shelf. Monitor freshness, processing stages, and quality in one place.
      </p>
      <a href="/products" style={{ marginTop: "20px", background: "#16a34a", color: "white", padding: "12px 24px", borderRadius: "8px", textDecoration: "none" }}>
        View Products
      </a>
    </div>
  )
}

export default Home