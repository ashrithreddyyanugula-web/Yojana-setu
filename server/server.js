const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config({
    path: "./server/.env"
});

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/chat", async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                error: "Message is required",
            });
        }

        const response = await client.responses.create({
            model: "gpt-5.6-luna",
            instructions:
                "You are the AI assistant for Yojana Setu. Help users understand government schemes clearly. Give simple, accurate and useful answers.",
            input: message,
        });

        res.json({
            reply: response.output_text,
        });

    } catch (error) {
        console.error("AI ERROR:", error);

        res.status(500).json({
            error: "AI request failed",
        });
    }
});

app.listen(3001, () => {
    console.log("================================");
    console.log("AI SERVER RUNNING");
    console.log("http://localhost:3001");
    console.log("================================");
});