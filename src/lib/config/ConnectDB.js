import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log("Connected to Database");
  } catch (err) {
    return console.log("Error:", err.message);
  }
}
