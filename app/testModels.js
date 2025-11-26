import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

async function testModels() {
  try {
    const response = await openai.chat.completions.create({
      // model: "openai/gpt-4o-mini",
      model: "x-ai/grok-4.1-fast:free",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Explain AI in 2 sentences." }
      ]
    });

    console.log("Response:", response.choices[0].message.content);

  } catch (err) {
    console.error("Error:", err.response?.data || err.message);
  }
}

testModels();
