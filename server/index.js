import express from "express";
import "dotenv/config";

import { connectDB } from "./config/db.js";

// Import Routes
import userRoute from "./routes/users.js";
import videoRoute from "./routes/videos.js";
import commentRoute from "./routes/comments.js";
import authRoute from "./routes/auth.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/videos", videoRoute);
app.use("/api/comments", commentRoute);

// Server Listening + DB Connection
app.listen(PORT, () => {
  console.log(`Server Listening on Port: ${PORT}`);
  connectDB();
});
