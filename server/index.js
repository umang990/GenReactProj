// backend/index.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenAI } = require("@google/genai");

dotenv.config();
console.log("🔑 Gemini key loaded:", process.env.GEMINI_API_KEY ? "✅ Yes" : "❌ No");

const app = express();
const port = process.env.PORT || 5000;

// ✅ Safe CORS config for frontend & localhost
const allowedOrigins = [
  "https://genreactproj-1.onrender.com", // your frontend
  "http://localhost:5173"                // optional: local dev
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("❌ Not allowed by CORS: " + origin));
    }
  },
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// ✅ Gemini AI Setup
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// ✅ Test route for Render deployment
app.get("/health", (req, res) => {
  res.send("✅ Backend is up and running!");
});

// ✅ POST /api/chat
app.post("/api/chat", async (req, res) => {
  const prompt = req.body.prompt?.trim();
  if (!prompt) return res.status(400).json({ error: "Prompt required" });

  console.log("💬 Prompt received:", prompt);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            code: { type: "string" }
          },
          required: ["code"]
        }
      }
    });

    let text = response.text?.trim();

    let code;
    try {
      const parsed = JSON.parse(text);
      code = parsed.code;
    } catch {
      // Fallback: extract code block
      const match = text.match(/```[a-zA-Z-]*\n([\s\S]*?)```/);
      code = match ? match[1].trim() : text;
    }

    res.json({ code });
  } catch (err) {
    console.error("💥 Gemini API Error:", err);
    res.status(500).json({ code: `// Gemini Error: ${err.message}` });
  }
});

// ✅ Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
