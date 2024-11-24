import express from "express";
import multer from "multer";
import { storage } from "../storage/storage.js";
import { createPostWithImages, getAllPosts } from "../controllers/postController.js";
import { protectRoute } from "../middleware/auth.js";

const upload = multer({ storage });
const postRouter = express.Router();

postRouter.post("/createpost",protectRoute,upload.array("images", 10), createPostWithImages);
postRouter.get("/getallposts",protectRoute, getAllPosts);

export default postRouter;
