const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

const app = express();
app.use(cors()); // Allows your frontend to communicate with backend
app.use(express.json());

// Initialize Gemini (Replace with OpenAI if you prefer)
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `You are a helpful Bangla AI Assistant. Answer purely in the Bengali language. Keep answers concise. User says: ${userMessage}`,
        });

        res.json({ reply: response.text });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to generate AI response." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
