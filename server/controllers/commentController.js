import Comment from "../models/Comment.js";
import Video from "../models/Video.js";
import { createError } from "./../config/error.js";

export const addComment = async (req, res, next) => {
  try {
    const newComment = new Comment({
      ...req.body,
      userId: req.user.id,
    });

    const savedComment = await newComment.save();
    res.status(201).json({
      success: true,
      message: "Successfully Commented!",
      data: savedComment,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    const video = await Video.findById();
    if (req.user.id === comment.userId || req.user.id === video.userId) {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json({
        success: true,
        message: "Successfully Delete Comment!",
      });
    } else {
      next(createError(403, "Delete Comment Action Forbidden!"));
    }
  } catch (error) {
    next(error);
  }
};

// Get All Comments for a Specific Video
export const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ videoId: req.params.video_id });
    if (!comments) return next(createError(404, "Comments Not Found!"));
    res.status(200).json({
      success: true,
      message: "Successfully Retrieved All Comments!",
      data: comments,
    });
  } catch (error) {
    next(error);
  }
};
