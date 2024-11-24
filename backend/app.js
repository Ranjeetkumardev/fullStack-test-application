import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/config/database.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import cors from "cors";
import { storage } from "./src/storage/storage.js";
import userRouter from "./src/routes/userRouter.js";
import { protectRoute } from "./src/middleware/auth.js";
import postRouter from "./src/routes/postRouter.js";

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = multer({ storage });

app.use(
  cors({
    origin: [
      "http://localhost:4000",
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

// Routes
app.use("/api/auth", userRouter);
app.use("/api", postRouter);

// Image upload endpoint
// app.post(
//   "/api/upload",
//   protectRoute,
//   upload.single("image"),
//   async (req, res) => {
//     try {
//       const imageUrl = req.file.path;
//       const userId = req.user._id;
//       console.log(userId ,imageUrl)
//       // Save the image URL in MongoDB
//       await User.findByIdAndUpdate(userId, { profilePicture: imageUrl });

//       res.status(200).json({ imageUrl });
//     } catch (error) {
//       res.status(500).json({ error: "Image upload failed" });
//     }
//   }
// );

// Test route
app.get("/", (req, res) => {
  res.send("Hello universe");
});

connectDB()
  .then(() => {
    console.log("Database is successfully connected");
    app.listen(process.env.PORT || 4000, () => {
      console.log(`Server is listening at port ${process.env.PORT || 4000}...`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
    process.exit(1);
  });
