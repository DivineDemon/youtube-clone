import { createError } from "./../config/error.js";
import User from "../models/User.js";

export const updateUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      const { password, ...otherDetails } = updatedUser._doc;

      res.status(200).json({
        success: true,
        message: "User Updated Successfully!",
        data: otherDetails,
      });
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "Update Action Forbidden!"));
  }
};

export const deleteUser = (req, res, next) => {};

export const getUser = (req, res, next) => {};

export const subscribe = (req, res, next) => {};

export const unsubscribe = (req, res, next) => {};

export const likeVideo = (req, res, next) => {};

export const dislikeVideo = (req, res, next) => {};
