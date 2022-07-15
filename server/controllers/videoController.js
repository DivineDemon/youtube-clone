import Video from "../models/Video.js";
import User from "../models/User.js";
import { createError } from "./../config/error.js";

export const addVideo = async (req, res, next) => {
  const newVideo = new Video({
    userId: req.user.id,
    ...req.body,
  });
  try {
    const savedVideo = newVideo.save();
    res.status(201).json({
      success: true,
      message: "Successfully Posted a Video!",
      data: savedVideo,
    });
  } catch (error) {
    next(err);
  }
};

export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video Not Found!"));
    if (req.user.id === video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json({
        success: true,
        message: "Successfully Updated Video!",
        data: updatedVideo,
      });
    } else {
      return next(createError(403, "Update Action Forbidden!"));
    }
  } catch (error) {
    next(err);
  }
};

export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video Not Found!"));
    if (req.user.id === video.userId) {
      await Video.findByIdAndDelete(req.params.id);
      res.status(200).json({
        success: true,
        message: "Successfully Deleted Video!",
      });
    } else {
      return next(createError(403, "Delete Action Forbidden!"));
    }
  } catch (error) {
    next(err);
  }
};

export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video Not Found!"));
    res.status(200).json({
      success: true,
      message: "Successfully Retrieved Video!",
      data: video,
    });
  } catch (error) {
    next(err);
  }
};

export const addView = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    res.status(200).json({
      success: true,
      message: "Successfully Viewed Video!",
    });
  } catch (error) {
    next(err);
  }
};

export const random = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    if (!videos) return next(createError(404, "Videos Not Found!"));
    res.status(200).json({
      success: true,
      message: "Successfully Retrieved Random Videos!",
      data: videos,
    });
  } catch (error) {
    next(err);
  }
};

export const trend = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 });
    if (!videos) return next(createError(404, "Videos Not Found!"));
    res.status(200).json({
      success: true,
      message: "Successfully Retrieved Trending Videos!",
      data: videos,
    });
  } catch (error) {
    next(err);
  }
};

export const sub = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subscriptions = user.subscriptions;

    const list = await Promise.all(
      subscriptions.map((channelId) => {
        return Video.find({ userId: channelId });
      })
    );
    res.status(200).json({
      success: true,
      data: list.flat().sort((a, b) => b.createdAt - a.createdAt),
    });
  } catch (error) {
    next(err);
  }
};

export const getByTag = async (req, res, next) => {
  try {
    const tags = req.query.tags.split(",");
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    if (!videos) return next(createError(404, "Videos Not Found!"));
    res.status(200).json({
      success: true,
      message: "Successfully Retrieved Trending Videos!",
      data: videos,
    });
  } catch (error) {
    next(err);
  }
};

export const search = async (req, res, next) => {
  try {
    const query = req.query.q;
    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
    }).limit(40);
    if (!videos) return next(createError(404, "Videos Not Found!"));
    res.status(200).json({
      success: true,
      message: "Successfully Retrieved Trending Videos!",
      data: videos,
    });
  } catch (error) {
    next(err);
  }
};
