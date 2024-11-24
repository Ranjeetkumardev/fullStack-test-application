import bcrypt from "bcryptjs";
import { generateToken } from "../utils/utils.js";
import multer from "multer";
import User from "../models/User.js";
import { storage } from "../storage/storage.js";
import mongoose from "mongoose";

const upload = multer({ storage });

export const signupUser = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logoutUser = (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { expertise, about, gender } = req.body;
    const userId = req.user._id;
    // If no fields to update, return an error
    if (!req.file && !expertise && !about && !gender) {
      return res
        .status(400)
        .json({ success: false, message: "No fields to update" });
    }
    const updates = {};
    if (req.file) {
      updates.profilePicture = req.file.path;
    }
    if (expertise) updates.expertise = expertise;
    if (about) updates.about = about;
    if (gender) updates.gender = gender;

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    });

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Send the updated user data as response
    res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error in updateProfile:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const users = await User.find({ _id: { $ne: loggedInUserId } });
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Error in  getting getAllUsers:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const getProfile = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const user = await User.findById(loggedInUserId);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error in  getting getProfile:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
// export const getOtheruser = async (req, res) => {
//   const { otheruserId } = req.params;

   
//   try {
//     // Find user by ID
//     const user = await User.findById(otheruserId); // Use `findById` for clarity
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found.",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       user,
//     });
//   } catch (error) {
//     console.error("Error in getting getOtheruser:", error.message);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };
export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
