# ♻️ Trash to Treasure - Smart Waste & Upcycling Assistant

## 1. Chosen Vertical
* **Vertical:** Sustainability & Smart Waste Management
* **Target Audience:** Everyday users seeking accurate recycling guidance and practical DIY upcycling ideas.

## 2. Approach & Logic
* **Multimodal Processing:** Accepts both visual inputs (image uploads) and text descriptions via Gemini 1.5 Flash.
* **Contextual State Evaluation:** Detects item conditions (e.g., grease, leftover liquids) to route contaminated recyclables correctly to Compost or Trash.
* **Structured Responses:** Uses Gemini's JSON mode to ensure clean, reliable UI rendering.

## 3. How It Works
1. User provides an image or text description of an item.
2. Node.js Express server formats input and proxies the request securely to Gemini API.
3. Response is rendered in the UI with color-coded category badges, prep steps, and upcycling tips.

## 4. How to Run Locally
1. Clone repository: `git clone <your-repo-link>`
2. Install dependencies: `npm install`
3. Add API key to `.env`: `GEMINI_API_KEY=your_key_here`
4. Start server: `node server.js`
5. Open browser at: `http://localhost:5000`