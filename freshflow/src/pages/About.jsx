function About() {
  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "20px" }}>
      <h1 style={{ color: "#16a34a", fontSize: "2rem" }}>About FreshFlow</h1>
      <p style={{ color: "#6b7280", fontSize: "1.1rem", maxWidth: "500px", marginTop: "10px" }}>
        FreshFlow is a food traceability platform that helps food processing businesses track product batches from farm to shelf and get AI-powered quality insights.
      </p>
    </div>
  )
}

export default About