function Home() {
  return (
    <div style={{ fontFamily: "Arial", background: "#f3f4f6", minHeight: "100vh" }}>

      {/* HERO SECTION */}
      <div style={{ background: "linear-gradient(135deg, #16a34a, #15803d)", color: "white", padding: "80px 40px", textAlign: "center" }}>
        <h1 style={{ fontSize: "2.8rem", fontWeight: "bold", margin: "0 0 16px 0" }}>
          🌿 Welcome to FreshFlow
        </h1>
        <p style={{ fontSize: "1.2rem", maxWidth: "600px", margin: "0 auto 30px auto", opacity: 0.9 }}>
          A smart food traceability platform that tracks food products from farm to shelf — with real-time status monitoring and AI-powered quality insights.
        </p>
        <a href="/products" style={{ background: "white", color: "#16a34a", padding: "14px 32px", borderRadius: "8px", textDecoration: "none", fontWeight: "bold", fontSize: "1rem" }}>
          View Products →
        </a>
      </div>

      {/* PROBLEM SECTION */}
      <div style={{ padding: "60px 40px", textAlign: "center", background: "white" }}>
        <h2 style={{ fontSize: "2rem", color: "#1f2937", marginBottom: "16px" }}>
          The Problem We Solve
        </h2>
        <p style={{ color: "#6b7280", fontSize: "1.1rem", maxWidth: "700px", margin: "0 auto" }}>
          Food processing businesses currently track product batches manually — using paper records and spreadsheets. This leads to slow contamination response, wasted food, and zero transparency. FreshFlow replaces all of that with a real-time digital platform.
        </p>
      </div>

      {/* FEATURES SECTION */}
      <div style={{ padding: "60px 40px", background: "#f3f4f6" }}>
        <h2 style={{ fontSize: "2rem", color: "#1f2937", textAlign: "center", marginBottom: "40px" }}>
          What FreshFlow Does
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", maxWidth: "1000px", margin: "0 auto" }}>

          <div style={{ background: "white", padding: "24px", borderRadius: "12px", textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>📦</div>
            <h3 style={{ color: "#1f2937", marginBottom: "8px" }}>Batch Tracking</h3>
            <p style={{ color: "#6b7280", fontSize: "0.95rem" }}>Track every food batch with name, origin, processing date, and current status in real time.</p>
          </div>

          <div style={{ background: "white", padding: "24px", borderRadius: "12px", textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>🔍</div>
            <h3 style={{ color: "#1f2937", marginBottom: "8px" }}>Status Monitoring</h3>
            <p style={{ color: "#6b7280", fontSize: "0.95rem" }}>Instantly see if any product is Fresh, Processing, or Shipped — no more manual checks.</p>
          </div>

          <div style={{ background: "white", padding: "24px", borderRadius: "12px", textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>🤖</div>
            <h3 style={{ color: "#1f2937", marginBottom: "8px" }}>AI Quality Analysis</h3>
            <p style={{ color: "#6b7280", fontSize: "0.95rem" }}>Gemini AI analyzes batch data and gives freshness assessments and storage recommendations.</p>
          </div>

          <div style={{ background: "white", padding: "24px", borderRadius: "12px", textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>🔒</div>
            <h3 style={{ color: "#1f2937", marginBottom: "8px" }}>Secure Access</h3>
            <p style={{ color: "#6b7280", fontSize: "0.95rem" }}>JWT authentication ensures only authorized users can add or modify food records.</p>
          </div>

        </div>
      </div>
      

      {/* FOOTER CTA */}
      <div style={{ padding: "60px 40px", background: "#16a34a", color: "white", textAlign: "center" }}>
        <h2 style={{ fontSize: "1.8rem", marginBottom: "16px" }}>
          Ready to Track Your Food Products?
        </h2>
        <p style={{ opacity: 0.9, marginBottom: "24px", fontSize: "1.1rem" }}>
          View all tracked products and monitor their status in real time.
        </p>
        <a href="/products" style={{ background: "white", color: "#16a34a", padding: "14px 32px", borderRadius: "8px", textDecoration: "none", fontWeight: "bold", fontSize: "1rem" }}>
          Go to Products →
        </a>
      </div>

    </div>
  )
}

export default Home