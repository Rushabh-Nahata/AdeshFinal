import User from "../models/userModels.js";
import Product from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/jwtToken.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";
import cloudinary from "cloudinary";
import TempUser from "../models/tempUserModel.js";
import otpGenerator from "otp-generator";

//Register our user
export const registerUser = async (req, res, next) => {
  try {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });
    const { name, email, password } = req.body;
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
      digits: true,
    });
    //Creating a user
    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });

    await TempUser.create({
      userId: user.id,
      otp,
    });
    const message = `To activate your account, please verify your email by entering the OTP provided below on our website. \n OTP: ${otp}`;
    await sendEmail({
      email: user.email,
      subject: `Karwadenge email verification`,
      message,
    });
    //This token is create in user model
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const otpVerification = async (req, res, next) => {
  try {
    const { otp } = req.body;

    // Find the temporary user by OTP
    const tempUser = await TempUser.findOne({ otp });

    if (!tempUser) {
      return next(new ErrorHandler("Invalid OTP", 400));
    }

    // Find the actual user by the userId in tempUser
    const user = await User.findById(tempUser.userId);

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    // Update the user to be verified
    user.isVerified = true;
    await user.save();

    // Delete the temporary user record
    await TempUser.findByIdAndDelete(tempUser.id);

    // Send token to the user
    sendToken(user, 201, res);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
//Login a user

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    console.log("Login started ...");

    //Checking if user has given password and email both
    if (!email || !password) {
      return next(new ErrorHandler("Please enter email and password !", 400));
    }

    //If you get both check in the database
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }
    if (user.isVerified === false) {
      return next(
        new ErrorHandler("Your email is not verified for login!", 409)
      );
    }

    //Check if password matched or not
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    //If matches then send the token
    sendToken(user, 200, res);
    console.dir("here", req.cookies.name);
  } catch (err) {
    next(err.stack);
  }
};

//Logout a user
export const logout = (req, res, next) => {
  try {
    // If you are using cookies for the token, clear them
    res.clearCookie("token");

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    next(err);
  }
};

//Forgot password

export const forgotPassword = async (req, res, next) => {
  try {
    //We just find by email, as we have clicked on forgot password
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    //GET ResetPassword Token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${process.env.FRONTEND_API_BODY}/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n${resetPasswordUrl} \n\nIf you have not requested this email then please Ignore it !`;

    try {
      await sendEmail({
        email: user.email,
        subject: `Karwadenge Password Recovery`,
        message,
      });

      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email} successfully !`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });

      return next(new ErrorHandler(error.message, 500));
    }
  } catch (err) {
    next(err.stack);
  }
};

//RESET PASSWORD FUNCTION
export const resetPassword = async (req, res, next) => {
  try {
    //Get the req token from the url, and hash it
    //Creating token hash
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    //Once you find the hash token, you must search that particular user in the Database

    //For this user the expire time of password must be greater than Date.now()
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    //If you don't get the user, return some error
    if (!user) {
      return next(
        new ErrorHandler(
          "Reset Password Token has invalid or has been expired",
          404
        )
      );
    }

    //IF user enters wrong confirm password then return an error
    if (req.body.password !== req.body.confirmPassword) {
      return next(new ErrorHandler("Password dosent match", 400));
    }

    //if the password is matched just change the user password
    user.password = req.body.password;

    //Just do these two things undefined
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    //Use this to save the user
    await user.save();

    //Once the password is changed, Just login the user

    sendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
};

//GET USER DETAILS (This route can be accessed only by people who have logged in)
//By this route you can information about the logged in user
export const getUserDetails = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    next(err);
  }
};

//CHANGE PASSWORD ROUTE (This route can be accessed only by people who have logged in)
export const updatePassword = async (req, res, next) => {
  try {
    //We add +password as now we need the password as well
    const user = await User.findById(req.user.id).select("+password");

    //Here old password will be given by the user
    //It should match the password then only user can change the new password
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
      return next(new ErrorHandler("Old password is incorrect", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new ErrorHandler("Password does not match", 400));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
};

//UPDATE PROFILE CONTROLLER (This route can be accessed only by people who have logged in)
export const updateProfile = async (req, res, next) => {
  try {
    //We will get this data from the user
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
    };

    if (req.body.avatar !== "") {
      const user = await User.findById(req.user.id);

      const imageId = user.avatar.public_id;

      await cloudinary.v2.uploader.destroy(imageId);

      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });

      newUserData.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

//Get all users(Only accessible by admin)
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      users,
    });
  } catch (err) {
    next(err);
  }
};

//Get any user by ID (Only accessible by Admin)
export const getSingleUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(
        new ErrorHandler(`User does not exist with ID ${req.params.id}`, 400)
      );
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    next(err);
  }
};

//UPDATE USER ROLE (This route can be accessed only by admin)
//By this route admin can change the role of any user
export const updateUserRole = async (req, res, next) => {
  try {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    next(err);
  }
};

//DELETE USER (By this admin can delete any user if he/she wants)

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    //We will remove  cloudinary later
    if (!user) {
      return next(
        new ErrorHandler(`User does not exist with ID ${req.params.id}`, 400)
      );
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: "User deleted Successfully",
    });
  } catch (err) {
    next(err);
  }
};

//Create new Review Or Update the review

export const createProductReview = async (req, res, next) => {
  try {
    const { rating, comment, productId } = req.body;

    //This is the object named review
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    //Find the product whose review is created
    const product = await Product.findById(productId);

    //Is checked will find whether the current logged in user as reviewed this project or not
    //If he has it will update the previous review else add a new review
    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString()) {
          (rev.rating = rating), (rev.comment = comment);
        }
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }

    //We will take an average of all the ratings in review array
    let avg = 0;

    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
    product.ratings = avg / product.reviews.length;

    //Save the product once the review is updated
    await product.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

// This controller is to get all the reviews of a product

export const getProductReviews = async (req, res, next) => {
  try {
    const product = await Product.findById(req.query.id);

    if (!product) {
      return next(new ErrorHandler("Product not found !", 404));
    }

    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  } catch (err) {
    next(err);
  }
};

//Delete Review
export const deleteReview = async (req, res, next) => {
  try {
    const product = await Product.findById(req.query.productId);

    if (!product) {
      return next(new ErrorHandler("Product not found !", 404));
    }

    //In this we keep all the products that we want to keep and filter the rest
    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );

    let avg = 0;

    reviews.forEach((rev) => {
      avg += rev.rating;
    });

    const ratings = avg / reviews.length;

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    next(err);
  }
};
