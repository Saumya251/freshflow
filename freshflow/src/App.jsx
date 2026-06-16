import { useState } from "react";

function App() {
  const [items, setItems] = useState(["Rice", "Wheat", "Sugar"]);

  const addItem = () => {
    const newItem = prompt("Enter item name");
    if (newItem) setItems([...items, newItem]);
  };

  const deleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div style={{ fontFamily: "Arial", background: "#f3f4f6", minHeight: "100vh", padding: "20px" }}>
      
      {/* HEADER */}
      <div style={{ background: "white", padding: "15px", borderRadius: "10px" }}>
        <h1>🚀 FreshFlow Dashboard</h1>
        <p>Smart Food Processing System</p>
      </div>

      {/* GRID */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "20px" }}>
        
        {/* INVENTORY */}
        <div style={{ background: "white", padding: "15px", borderRadius: "10px" }}>
          <h2>📦 Inventory</h2>

          <button onClick={addItem} style={{ marginBottom: "10px" }}>
            Add Item
          </button>

          <ul>
            {items.map((item, i) => (
              <li key={i} style={{ display: "flex", justifyContent: "space-between", margin: "5px 0" }}>
                {item}
                <button onClick={() => deleteItem(i)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>

        {/* PRODUCTION */}
        <div style={{ background: "white", padding: "15px", borderRadius: "10px" }}>
          <h2>🏭 Production</h2>
          <p>Batch A → Completed ✔</p>
          <p>Batch B → Processing ⏳</p>
          <p>Batch C → Pending ⏳</p>
        </div>

      </div>
    </div>
  );
}

export default App;