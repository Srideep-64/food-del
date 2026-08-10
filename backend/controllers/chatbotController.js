import foodModel from "../models/foodModel.js";
import getRecommendation from "../services/llmService.js";

const chatRecommend = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.json({ success: false, message: "Message is required" });
    }

    const foodList = await foodModel.find({});

    const llmResponse = await getRecommendation(message, foodList);

    // Validate: only keep recommendation IDs that actually exist in DB
    const validIds = new Set(foodList.map(item => item._id.toString()));
    const filteredRecommendations = llmResponse.recommendations.filter(
      rec => validIds.has(rec.id)
    );

    res.json({
      success: true,
      replyText: llmResponse.replyText,
      recommendations: filteredRecommendations
    });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Chatbot error, please try again" });
  }
};

export default chatRecommend;