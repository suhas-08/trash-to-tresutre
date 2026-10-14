const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { GoogleGenAI } = require('@google/genai');
require('dotenv').config();

const app = express();
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/api/analyze-trash', upload.single('image'), async (req, res) => {
  try {
    const userDescription = req.body.description || '';
    const file = req.file;

    if (!userDescription && !file) {
      return res.status(400).json({ error: 'Please provide either a text description or an image.' });
    }

    const systemPrompt = `You are an expert waste management and upcycling assistant. Analyze the user's input.
Return strictly a valid JSON object matching this exact schema:
{
  "item_name": "Short item name",
  "bin_category": "Recycle" | "Compost" | "Trash" | "E-Waste",
  "preparation_steps": ["Step 1", "Step 2"],
  "upcycling_tip": "Creative DIY reuse idea or 'None' if unsafe/unhygienic."
}
Rules: Do not enclose the JSON in markdown code blocks.`;

    const contents = [systemPrompt];
    if (userDescription) contents.push(`User description: ${userDescription}`);
    if (file) {
      contents.push({
        inlineData: {
          data: file.buffer.toString('base64'),
          mimeType: file.mimetype
        }
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: contents,
      config: { responseMimeType: 'application/json' }
    });

    res.json(JSON.parse(response.text));
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Failed to process request.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));