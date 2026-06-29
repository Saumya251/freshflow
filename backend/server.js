const express = require("express")
const cors = require("cors")
require("dotenv").config()

const app = express()
const PORT = 5000

app.use(cors({
  origin: "http://localhost:5173"
}))
app.use(express.json())

let products = [
  { id: 1, name: "Organic Wheat", origin: "Punjab, India", status: "Fresh", date: "2025-06-10" },
  { id: 2, name: "Basmati Rice", origin: "Haryana, India", status: "Processing", date: "2025-06-08" },
  { id: 3, name: "Yellow Corn", origin: "Maharashtra, India", status: "Shipped", date: "2025-06-05" },
  { id: 4, name: "Green Peas", origin: "Uttar Pradesh, India", status: "Fresh", date: "2025-06-11" },
]

app.get("/api/products", (req, res) => {
  res.status(200).json(products)
})

app.get("/api/products/search", (req, res) => {
  const query = req.query.q?.toLowerCase()
  if (!query) return res.status(400).json({ message: "Search query required" })
  const results = products.filter(p => p.name.toLowerCase().includes(query))
  res.status(200).json(results)
})

app.get("/api/products/:id", (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id))
  if (!product) return res.status(404).json({ message: "Product not found" })
  res.status(200).json(product)
})

app.post("/api/products", (req, res) => {
  const { name, origin, status, date } = req.body
  if (!name || !origin || !status || !date) {
    return res.status(400).json({ message: "All fields are required" })
  }
  const newProduct = {
    id: products.length + 1,
    name, origin, status, date,
  }
  products.push(newProduct)
  res.status(201).json(newProduct)
})

app.put("/api/products/:id", (req, res) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id))
  if (index === -1) return res.status(404).json({ message: "Product not found" })
  products[index] = { ...products[index], ...req.body }
  res.status(200).json(products[index])
})

app.delete("/api/products/:id", (req, res) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id))
  if (index === -1) return res.status(404).json({ message: "Product not found" })
  products.splice(index, 1)
  res.status(204).send()
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: "Something went wrong on the server" })
})

app.listen(PORT, () => {
  console.log(`FreshFlow backend running on http://localhost:${PORT}`)
})