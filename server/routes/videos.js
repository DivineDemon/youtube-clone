import express from "express";
import {
  addVideo,
  updateVideo,
  deleteVideo,
  getVideo,
  addView,
  trend,
  random,
  sub,
} from "../controllers/videoController.js";
import { verifyToken } from "./../config/verifyToken.js";

const router = express.Router();

// Create a Video
router.post("/", verifyToken, addVideo);
router
  .route("/:id")
  .get(getVideo)
  .put(verifyToken, updateVideo)
  .delete(verifyToken, deleteVideo);
router.put("/view/:id", addView);
router.get("/trend", trend);
router.get("/random", random);
router.get("/sub", verifyToken, sub);

export default router;
