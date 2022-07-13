import express from "express";
import { signup, signin } from "./../controllers/authController.js";

const router = express.Router();

// CREATE A USER
router.post("/signup", signup);

// SIGN IN
router.post("/signin", signin);

// GOOGLE OAUTH
router.post("/google");

export default router;
