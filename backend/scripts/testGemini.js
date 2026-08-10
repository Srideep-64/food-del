import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const run = async () => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-3.5-flash-lite",
      generationConfig: { responseMimeType: "application/json" }
    });

    const result = await model.generateContent(
      `Respond only in strict JSON like this: {"reply": "hello, this is working"}`
    );

    console.log("RAW RESPONSE:", result.response.text());
  } catch (err) {
    console.error("ERROR:", err);
  }
};

run();