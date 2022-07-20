import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import { createError } from "./../config/error.js";

export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User Registered Successfully!",
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({
      name: req.body.name,
    });

    if (!user) {
      return next(createError(404, "User Not Found!"));
    }

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect) {
      return next(createError(401, "Invalid Credentials!"));
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET
    );

    const { password, ...otherDetails } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        success: true,
        message: "User Signed In Successfully!",
        data: otherDetails,
      });
  } catch (error) {
    next(error);
  }
};

export const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SECRET
      );

      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json({
          success: true,
          message: "User Signed In Successfully!",
          data: user._doc,
        });
    } else {
      const newUser = new User({
        ...req.body,
        fromGoogle: true,
      });

      const savedUser = await newUser.save();

      const token = jwt.sign(
        {
          id: savedUser._id,
        },
        process.env.JWT_SECRET
      );

      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json({
          success: true,
          message: "User Signed In Successfully!",
          data: savedUser._doc,
        });
    }
  } catch (error) {
    next(error);
  }
};
