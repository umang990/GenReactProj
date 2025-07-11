// backend/index.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenAI } = require("@google/genai");

dotenv.config();
console.log("🔑 Gemini key loaded:", process.env.GEMINI_API_KEY ? "✅ Yes" : "❌ No");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post("/api/chat", async (req, res) => {
  const prompt = req.body.prompt?.trim();
  if (!prompt) return res.status(400).json({ error: "Prompt required" });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro", // Pro model supports structured JSON output :contentReference[oaicite:1]{index=1}
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

    let text = response.text.trim();

    let code;
    try {
      const parsed = JSON.parse(text);
      code = parsed.code;
    } catch {
      // Fallback: extract code from Markdown fences
      const match = text.match(/```[a-zA-Z]*\n([\s\S]*?)```/);
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
