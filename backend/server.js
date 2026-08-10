dotenv.config();

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import chatbotRouter from "./routes/chatbotRoute.js";
import connectCloudinary from "./config/cloudinary.js";

// app config
const app=express()
const port= process.env.port || 4000

// middleware
app.use(express.json())
app.use(cors())

// DB connection
connectDB().catch((err) => {
  console.error("DB connection failed:", err.message);
  process.exit(1);
});

connectCloudinary();

// api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)
app.use("/api/chatbot",chatbotRouter);

app.get("/",(req,res)=>{
  res.send("API Working")
})

app.listen(port,()=>{
  console.log(`Server Started on http://localhost:${port}`)
})

