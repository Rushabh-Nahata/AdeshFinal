import Product from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import ApiFeatures from "../utils/apifeatures.js";
import cloudinary from "cloudinary";

// CREATE PRODUCT -- Admin (Only admin can access this route)
export const createProduct = async (req, res, next) => {
  try {
    //This will update which user has created the product (Field given in product model)
    let images = [];

    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
    req.body.professionalPrice = JSON.parse(req.body.professionalPrice);
    req.body.professionalDesc = JSON.parse(req.body.professionalDesc);
    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      product,
    });
  } catch (err) {
    next(err);
  }
};

// Get All Products
export const getAllProducts = async (req, res, next) => {
  try {
    //This is used to describe the number of products per page. Useful in pagination
    const resultPerPage = 8;
    const productCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage);

    // const products = await Product.find();
    const products = await apiFeature.query;
    res.status(200).json({
      success: true,
      products,
      productCount,
      resultPerPage,
    });
  } catch (err) {
    next(err);
  }
};

// Get All Product (Admin)
export const getAdminProducts = async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
};

//GET A SINGLE PRODUCT
export const getProductDetails = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product not found !", 404));
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    next(err);
  }
};

//UPDATE PRODUCT -- (ONLY FOR ADMIN)
export const updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product not found !", 404));
    }

    // Images Start Here
    let images = [];
    console.log("Thisis price", req.body.professionalPrice)
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }

    if (images !== undefined) {
      // Deleting Images From Cloudinary
      for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
      }

      const imagesLinks = [];

      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "products",
        });

        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }

      req.body.images = imagesLinks;
    }
    let priceArr = []
    const price = JSON.parse(req.body.professionalPrice)

    price.forEach(element => {
      priceArr.push({
        id: element.id,
        price: parseInt(element.price)
      })
    });
    req.body.professionalPrice = priceArr;
    req.body.price = parseInt(req.body.price)
    req.body.Stock = parseInt(req.body.Stock)

    console.log(req.body)

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    next(err);
  }
};

//DELETE PRODUCT
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product not found !", 404));
    }

    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    await product.deleteOne();
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
