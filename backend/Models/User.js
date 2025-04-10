import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, sparse : true },
  password: { type: String, required: true },
  phone: { type: String,  unique: true, sparse : true },
  gender: { type: String },
  isDriver: { type: Boolean, default: false },
}, { timestamps: true });

const User = mongoose.model("User", userSchema); 
export default User;
