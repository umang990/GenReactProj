// backend/index.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenAI } = require("@google/genai");

dotenv.config();
console.log("🔑 Gemini key loaded:", process.env.GEMINI_API_KEY ? "✅ Yes" : "❌ No");

const app = express();
const port = process.env.PORT || 5000;

// ✅ CORS setup to allow frontend
const allowedOrigins = [
  "https://genreactproj-1.onrender.com", // your frontend
  "http://localhost:5173"                // local dev (optional)
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl)
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

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// ✅ Optional: simple health route
app.get("/health", (req, res) => {
  res.send("✅ Backend is up and running!");
});

app.post("/api/chat", async (req, res) => {
  const prompt = req.body.prompt?.trim();
  if (!prompt) return res.status(400).json({ error: "Prompt required" });

  console.log("💬 Received prompt:", prompt);

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
      // Fallback: extract code from markdown
      const match = text.match(/```[a-zA-Z-]*\n([\s\S]*?)```/);
      code = match ? match[1].trim() : text;
    }

    res.json({ code });
  } catch (err) {
    console.error("💥 Gemini API Error:", err);
    res.status(500).json({ code: `// Gemini Error: ${err.message}` });
  }
});

app.listen(port, () => {
  console.log(`🚀 Backend running at http://localhost:${port}`);
});
