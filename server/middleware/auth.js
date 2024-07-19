import ErrorHandler from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";
import User from "../models/userModels.js";
import catchAsyncErrors from "./catchAsyncErrors.js";

// const ErrorHandler = require("../utils/errorhander");
// const catchAsyncErrors = require("./catchAsyncErrors");
// const jwt = require("jsonwebtoken");
// const User = require("../models/userModel");

export const isAuthenticatedUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    console.log(req.headers);
    // Extract token from Authorization header
    const token = authHeader.split(" ")[1];
    console.log(token);

    if (!token) {
      return next(
        new ErrorHandler("Please Login to access this resource", 401)
      );
    }

    try {
      const decodedData = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decodedData.id);
      next();
    } catch (error) {
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ error: "Invalid token" });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    //All roles that are present in the array will be allowed
    //Ex : If the specified array has 'admin', and the user that is logged in is a admin then do nothing and allow
    //Else give a error that user is not allowed

    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: '${req.user.role}' is not allowed to access this resource`,
          403
        )
      );
    }

    next();
  };
};
