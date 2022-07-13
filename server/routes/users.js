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
  .delete(deleteUser); // Delete

// Subscribe
router.put("/sub/:user_id", subscribe);

// Unsubscribe
router.put("/unsub/:user_id", unsubscribe);

// Like Video
router.put("/like/:video_id", likeVideo);

// Dislike Video
router.put("/dislike/:video_id", dislikeVideo);

export default router;
