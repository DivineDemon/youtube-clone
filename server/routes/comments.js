import express from "express";
import { verifyToken } from "./../config/verifyToken.js";
import {
  addComment,
  deleteComment,
  getComments,
} from "./../controllers/commentController.js";
const router = express.Router();

router.post("/", verifyToken, addComment);
router.delete("/:id", verifyToken, deleteComment);
router.get("/:video_id", getComments);

export default router;
