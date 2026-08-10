import express from "express";
import chatRecommend from "../controllers/chatbotController.js";

const chatbotRouter = express.Router();

chatbotRouter.post("/recommend", chatRecommend);

export default chatbotRouter;