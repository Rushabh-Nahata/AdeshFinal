import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name !"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please enter product description!"],
  },
  price: {
    type: Number,
    required: [true, "Please enter product price"],
    maxLength: [8, "Price cannot exceed 8 figures"],
  },
  professionalPrice: [
    {
      id: {
        type: String,
      },
      price: {
        type: Number,
      },
    }],
  professionalDesc: [
    {
      id: {
        type: String,
      },
      description: {
        type: String,
      },
    }],
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please enter product Category !"],
  },
  Stock: {
    type: Number,
    required: [true, "Please enter product stock !"],
    maxLength: [4, "Stock cannot exceed 4 characters !"],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],

  //This will notify who has created the product (which user)
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
