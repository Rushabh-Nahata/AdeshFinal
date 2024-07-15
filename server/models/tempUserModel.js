import mongoose from "mongoose";

const tempUserSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
  },
  otp: {
    type: Number,
    required: [true],
    minLength: [6],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});



const TempUser = mongoose.model("TempUser", tempUserSchema);
export default TempUser;
