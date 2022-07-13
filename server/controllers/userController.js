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

export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);

      res.status(200).json({
        success: true,
        message: "User Deleted Successfully!",
      });
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "Delete Action Forbidden!"));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(createError(404, "User Not Found!"));

    const { password, ...otherDetails } = user._doc;
    res.status(200).json({
      success: true,
      message: "User Found Successfully!",
      data: otherDetails,
    });
  } catch (error) {
    next(error);
  }
};

export const subscribe = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    await User.findById(req.user.id, {
      $push: {
        subscriptions: user_id,
      },
    });

    await User.findByIdAndUpdate(user_id, {
      $inc: {
        subscribers: 1,
      },
    });

    res.status(200).json({
      success: true,
      message: "Successfully Subscribed to Channel!",
    });
  } catch (error) {
    next(error);
  }
};

export const unsubscribe = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    await User.findById(req.user.id, {
      $pull: {
        subscriptions: user_id,
      },
    });

    await User.findByIdAndUpdate(user_id, {
      $inc: {
        subscribers: -1,
      },
    });

    res.status(200).json({
      success: true,
      message: "Successfully Unsubscribed from Channel!",
    });
  } catch (error) {
    next(error);
  }
};

export const likeVideo = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const dislikeVideo = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
