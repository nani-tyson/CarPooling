import express from "express";
import { register, login, logout } from "../Controllers/authController.js";
import protect from "../Middlewares/authMiddlewares.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get("/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("name");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to get user info" });
  }
});

export default router;
