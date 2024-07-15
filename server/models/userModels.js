import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name !"],
    maxLength: [30, "Name cannot exceed 30 chars !"],
    minLength: [5, "Name should have more than 5 chars !"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email!"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email "],
  },
  password: {
    type: String,
    required: [true, "Enter your password !"],
    minLength: [8, "Password should be more than 8 chars"],
    select: false, //Give everything apart password
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

//This runs before userSchema
userSchema.pre("save", async function (next) {
  //IF YOU UPDATE YOUR PROFILE ONLY EMAIL NAME ETC WILL BE UPDATED NOT PASSWORD
  if (!this.isModified("password")) {
    next();
  }
  //IF YOU CHANGE YOUR PASSWORD THIS LINE WILL BE EXECUTED
  this.password = await bcrypt.hash(this.password, 10);
});

//COMPARE PASSWORD
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//GENERATING PASSWORD RESET TOKEN
userSchema.methods.getResetPasswordToken = function () {
  //Generating Token
  //This will generate a new token of 20 bytes
  const resetToken = crypto.randomBytes(20).toString("hex");

  //Hashing and adding to user schema
  //This is present in user scheam
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  //Expires in 15 min
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);
export default User;
