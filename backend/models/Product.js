const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Fresh", "Processing", "Shipped"],
    default: "Fresh",
  },
  date: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model("Product", productSchema)