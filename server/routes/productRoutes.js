import express from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  getAdminProducts,
} from "../controllers/productController.js";
import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";
import {
  createProductReview,
  deleteReview,
  getProductReviews,
} from "../controllers/userController.js";

const router = express.Router();

//GET
router.get("/products", getAllProducts);
router.get(
  "/products/:id",
  // isAuthenticatedUser,
  // authorizeRoles("admin"),
  getProductDetails
);

//POST
router.post("/admin/products/new",
isAuthenticatedUser,
  authorizeRoles("admin"),
  createProduct
);


router.get(
  "/admin/products",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAdminProducts
);

//PUT
router.put(
  "/admin/products/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateProduct
);

//DELETE
router.delete(
  "/admin/products/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteProduct
);

//Review a product by an User route
router.put("/review", isAuthenticatedUser, createProductReview);
router.get("/review", getProductReviews);
router.delete("/review", isAuthenticatedUser, deleteReview);

export default router;
