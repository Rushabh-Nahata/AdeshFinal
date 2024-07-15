import { adminProductActions } from "./adminProductSlice";
import { newProductActions } from "./newProductSlice";
import { productDetailsSliceActions } from "./productDetailsSlice";
import { productReviewActions } from "./productReviewSlice";
import { productActions } from "./productSlice";
import axios from "axios";

//Get products
export const getProduct = async (
  dispatch,
  keyword = "",
  currentPage = 1,
  price = [0, 25000],
  category,
  ratings = 0
) => {
  try {
    let link = `http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

    if (category) {
      link = `http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
    }
    const { data } = await axios.get(link);
    // console.log(data);

    dispatch(
      productActions.setProducts({
        products: data.products,
        productCount: data.productCount,
        resultPerPage: data.resultPerPage,
      })
    );
  } catch (e) {
    console.log(e);
    dispatch(
      productActions.setError({
        error: e.message,
        loading: false,
      })
    );
  }
};

// Get All Products For Admin
export const getAdminProduct = async (dispatch) => {
  try {
    dispatch(productActions.adminProductRequest());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.get(
      "http://localhost:4000/api/v1/admin/products",
      config
    );

    dispatch(
      productActions.adminProductSuccess({
        products: data.products,
      })
    );
  } catch (error) {
    dispatch(
      productActions.adminProductFail({
        error: error.response.data.message,
      })
    );
  }
};

//Create product for admin
export const createProduct = async (dispatch, productData) => {
  try {
    dispatch(newProductActions.newProductRequest());

    const config = {
      headers: {
        "Content-Type": "application/form-data",
      },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `http://localhost:4000/api/v1/admin/products/new`,
      productData,
      config
    );

    dispatch(
      newProductActions.newProductSuccess({
        product: data.product,
        success: data.success,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(
      newProductActions.newProductFail({
        error: error.response.data.message,
      })
    );
  }
};

// Update Product
export const updateProduct =  async (dispatch,id, productData) => {
  try {
    dispatch(adminProductActions.updateProductRequest());

    const config = {
      headers: {
        "Content-Type": "application/form-data",
      },
      withCredentials: true,
    };

    const { data } = await axios.put(
      `http://localhost:4000/api/v1/admin/products/${id}`,
      productData,
      config
    );

    dispatch(
      adminProductActions.updateProductSuccess({
        isUpdated: data.success,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(
      adminProductActions.updateProductFail({
        error: error.response.data.message,
      })
    );
  }
};

// Delete Product
export const deleteProduct = async (dispatch, id) => {
  try {
    dispatch(adminProductActions.deleteProductRequest());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.delete(
      `http://localhost:4000/api/v1/admin/products/${id}`,
      config
    );

    dispatch(
      adminProductActions.deleteProductSuccess({
        isDeleted: data.success,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(
      adminProductActions.deleteProductFail({
        error: error.response.data.message,
      })
    );
  }
};

//For USER and admin to get
export const getProductDetail = async (dispatch, id) => {
  try {
    const { data } = await axios.get(
      `http://localhost:4000/api/v1/products/${id}`
    );

    dispatch(
      productDetailsSliceActions.getAllProductDetails({
        product: data.product,
      })
    );
  } catch (e) {
    console.log(e);
    dispatch(
      productDetailsSliceActions.setError({
        error: e.message,
        loading: false,
      })
    );
  }
};

// NEW REVIEW
export const newReview = async (dispatch, reviewData) => {
  try {
    dispatch(productReviewActions.newReviewRequest());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.put(
      `http://localhost:4000/api/v1/review`,
      reviewData,
      config
    );

    dispatch(
      productReviewActions.newReviewSuccess({
        success: data.success,
      })
    );
  } catch (error) {
    console.log(error.response.data.message);
    dispatch(
      productReviewActions.newReviewFail({
        error: error.response.data.message,
      })
    );
  }
};

// Clearing Errors
export const clearErrors = async (dispatch) => {
  dispatch(productActions.clearError());
};
