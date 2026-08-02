import StatusBadge from "./StatusBadge"

function ProductCard({ name, origin, status, date }) {
  return (
    <div style={{ background: "white", borderRadius: "10px", padding: "20px", border: "1px solid #e5e7eb" }}>
      <h2 style={{ color: "#1f2937", marginBottom: "8px" }}>{name}</h2>
      <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>Origin: {origin}</p>
      <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>Date: {date}</p>
      <div style={{ marginTop: "12px" }}>
        <StatusBadge status={status} />
      </div>
    </div>
  )
}

export default ProductCard