import dns from "node:dns";
import mongoose from "mongoose";

dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is missing in backend/.env");

  await mongoose.connect(uri, {
    family: 4,
    serverSelectionTimeoutMS: 10000,
  });

  console.log("DB connected");
};
