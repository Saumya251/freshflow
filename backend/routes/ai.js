const express = require("express")
const { GoogleGenerativeAI } = require("@google/generative-ai")
const requireAuth = require("../middleware/requireAuth")

const router = express.Router()
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

// POST /api/ai/analyze
router.post("/analyze", requireAuth, async (req, res) => {
  try {
    const { name, origin, status, date } = req.body

    if (!name || !origin || !status || !date) {
      return res.status(400).json({ message: "All product fields are required" })
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

    const prompt = `You are a food quality expert. Analyze this food product batch and provide a quality assessment.

Product Details:
- Name: ${name}
- Origin: ${origin}
- Current Status: ${status}
- Processing Date: ${date}

Please provide:
1. Freshness Assessment (is it likely still fresh based on the date?)
2. Quality Rating (Poor/Fair/Good/Excellent)
3. Storage Recommendations (how should this product be stored?)
4. Shelf Life Estimate (how many days is it likely good for?)
5. Any Health or Safety Concerns

Keep your response clear, concise, and helpful for food processing professionals.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    res.status(200).json({
      analysis: text,
      product: { name, origin, status, date }
    })

  } catch (err) {
    console.error("Gemini API error:", err.message)
    res.status(500).json({ message: "AI analysis failed. Please try again." })
  }
})

module.exports = router