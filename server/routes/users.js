import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  subscribe,
  unsubscribe,
  likeVideo,
  dislikeVideo,
} from "./../controllers/userController.js";
import { verifyToken } from "./../config/verifyToken.js";

const router = express.Router();

router
  .route("/:id")
  .get(getUser) // Get One
  .put(verifyToken, updateUser) // Update
  .delete(verifyToken, deleteUser); // Delete

// Subscribe
router.put("/sub/:user_id", verifyToken, subscribe);

// Unsubscribe
router.put("/unsub/:user_id", verifyToken, unsubscribe);

// Like Video
router.put("/like/:video_id", verifyToken, likeVideo);

// Dislike Video
router.put("/dislike/:video_id", verifyToken, dislikeVideo);

export default router;
