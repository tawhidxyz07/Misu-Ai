const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json());

// Gemini API Initialize
const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
        // সিস্টেম প্রম্পটে মেয়েদের চরিত্র হিসেবে উত্তর দিতে বলা হয়েছে
        const prompt = `You are a polite female Bangla AI Assistant. Always answer strictly in natural Bengali language. Keep answers short and concise. User asked: ${userMessage}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ reply: text });
    } catch (error) {
        console.error("Gemini Error:", error);
        res.status(500).json({ error: "সার্ভারে সমস্যা হয়েছে।" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
