import express from "express";
import { signup, signin, googleAuth } from "./../controllers/authController.js";

const router = express.Router();

// CREATE A USER
router.post("/signup", signup);

// SIGN IN
router.post("/signin", signin);

// GOOGLE OAUTH
router.post("/google", googleAuth);

export default router;
