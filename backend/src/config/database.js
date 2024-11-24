import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGOURL; // Ensure this matches your .env variable
    if (!mongoUri) {
      throw new Error("MONGOURL is not defined in environment variables");
    }
    await mongoose.connect(mongoUri);
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};
 
