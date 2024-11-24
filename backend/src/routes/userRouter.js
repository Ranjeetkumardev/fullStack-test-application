import express from "express";
import { protectRoute } from "../middleware/auth.js";
import { storage } from "../storage/storage.js";
import {
  checkAuth,
  getAllUsers,
  getProfile,
  loginUser,
  logoutUser,
  signupUser,
  updateProfile,
} from "../controllers/userController.js";
import multer from "multer";
const userRouter = express.Router();

const upload = multer({ storage });

userRouter.post("/signup", signupUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", protectRoute, logoutUser);
userRouter.get("/getallusers", protectRoute, getAllUsers);
userRouter.get("/getProfile", protectRoute, getProfile);
// userRouter.get("/:otheruserId", protectRoute, getOtheruser);

userRouter.patch(
  "/update-profile",
  protectRoute,
  upload.single("profilePicture"),
  updateProfile
);

userRouter.get("/check", protectRoute, checkAuth);

export default userRouter;
