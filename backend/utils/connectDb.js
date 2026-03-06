import mongoose from "mongoose";
import express from "express";
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("DB connected");
  } catch (error) {
    console.log("DB error", error);
  }
};
export default connectDb;
