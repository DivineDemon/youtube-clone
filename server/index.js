import express from "express";
import cors from "cors";
import "dotenv/config";

import { connectDB } from "./config/db.js";

// Import Routes
import userRoute from "./routes/users.js";
import videoRoute from "./routes/videos.js";
import commentRoute from "./routes/comments.js";
import authRoute from "./routes/auth.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/videos", videoRoute);
app.use("/api/comments", commentRoute);

// Error Handler Middleware
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || "Something Went Wrong!";
  return res.status(statusCode).json({
    success: false,
    message,
  });
});

// Server Listening + DB Connection
app.listen(PORT, () => {
  console.log(`Server Listening on Port: ${PORT}`);
  connectDB();
});
