function StatusBadge({ status }) {
  const colors = {
    Fresh: { background: "#dcfce7", color: "#16a34a" },
    Processing: { background: "#fef9c3", color: "#ca8a04" },
    Shipped: { background: "#dbeafe", color: "#2563eb" },
  }

  return (
    <span style={{ ...colors[status], padding: "4px 12px", borderRadius: "20px", fontSize: "0.85rem", fontWeight: "500" }}>
      {status}
    </span>
  )
}

export default StatusBadge