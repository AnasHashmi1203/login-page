import mongoose from "mongoose";
import User from "../models/User.js";

let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectDB();

    const { username, password } = req.body;

    const newUser = new User({
      username,
      password
    });

    await newUser.save();

    res.status(200).json({ message: "Login data saved" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}
