const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()

const Product = require("./models/Product")

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err))

// ─── ROUTES ───────────────────────────────────────────

// GET all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find()
    res.status(200).json(products)
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message })
  }
})

// GET single product by id
app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ message: "Product not found" })
    res.status(200).json(product)
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message })
  }
})

// POST create new product
app.post("/api/products", async (req, res) => {
  try {
    console.log("POST request received:", req.body)
    const { name, origin, status, date } = req.body
    if (!name || !origin || !date) {
      return res.status(400).json({ message: "Name, origin, and date are required" })
    }
    const newProduct = new Product({ name, origin, status, date })
    const savedProduct = await newProduct.save()
    console.log("Product saved successfully:", savedProduct)
    res.status(201).json(savedProduct)
  } catch (err) {
    console.error("Error saving product:", err.message)
    res.status(500).json({ message: "Server error", error: err.message })
  }
})

// PUT update a product
app.put("/api/products/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    if (!updatedProduct) return res.status(404).json({ message: "Product not found" })
    res.status(200).json(updatedProduct)
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message })
  }
})

// DELETE a product
app.delete("/api/products/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id)
    if (!deletedProduct) return res.status(404).json({ message: "Product not found" })
    res.status(204).send()
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message })
  }
})

// GET search products by name
app.get("/api/products/search", async (req, res) => {
  try {
    const query = req.query.q
    if (!query) return res.status(400).json({ message: "Search query required" })
    const results = await Product.find({ name: { $regex: query, $options: "i" } })
    res.status(200).json(results)
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message })
  }
})

// ─── ERROR HANDLING MIDDLEWARE ─────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: "Something went wrong on the server" })
})

app.listen(PORT, () => {
  console.log(`FreshFlow backend running on http://localhost:${PORT}`)
})