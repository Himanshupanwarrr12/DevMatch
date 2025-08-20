import mongoose from "mongoose";

const dbConnection = async (): Promise<void> => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || ""    );
      
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
};

export default dbConnection;
