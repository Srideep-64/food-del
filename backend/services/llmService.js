import { GoogleGenerativeAI } from "@google/generative-ai";

const getRecommendation = async (userMessage, foodList) => {
  // moved inside — runs only when called, after dotenv has loaded
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  const model = genAI.getGenerativeModel({
    model: "gemini-3.5-flash-lite",
    generationConfig: { responseMimeType: "application/json" }
  });

  const trimmedFoodList = foodList.map(item => ({
    id: item._id,
    name: item.name,
    description: item.description,
    category: item.category,
    price: item.price
  }));

  const systemPrompt = `
You are a food recommendation assistant for an Indian food delivery app.
You will be given:
1. A JSON list of available menu items (with id, name, description, category, price)
2. A user's message describing their mood or dietary preference

Rules:
- ONLY recommend items from the provided list. Never invent items.
- If the user's message is a greeting, small talk, or unrelated to food/mood/diet (e.g. "hi", "how are you", "what's up"), respond conversationally in replyText and return an EMPTY recommendations array. Do not force a food recommendation in these cases.
- Recommend 2 to 4 items that best match the user's mood/diet, using the name, description, and category to judge fit.
- If nothing matches well, recommend the closest options and say so in replyText.
- Respond ONLY in strict JSON, no markdown, no extra text, in this exact shape:
{
  "replyText": "short friendly message explaining the recommendation",
  "recommendations": [
    { "id": "food_id_here", "reason": "short reason this item fits" }
  ]
}

Menu:
${JSON.stringify(trimmedFoodList)}

User message: "${userMessage}"
`;

  const result = await model.generateContent(systemPrompt);
  const responseText = result.response.text();

  try {
    return JSON.parse(responseText);
  } catch (err) {
    console.error("Failed to parse Gemini response:", responseText);
    throw new Error("Invalid response format from LLM");
  }
};

export default getRecommendation;