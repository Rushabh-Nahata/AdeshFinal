import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";

//This function will create new Order
export const newOrder = async (req, res, next) => {
  try {
    const {
      shippingInfo,
      orderItems,
      paymentId,
      itemsPrice,
      taxPrice,
      // shippingPrice,
      totalPrice,
      user,
    } = req.body;

    const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentId,
      itemsPrice,
      taxPrice,
      // shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: user._id,
    });

    res.status(201).json({
      success: true,
      order,
    });
  } catch (err) {
    console.log(err.resposne.data);
    next(err);
  }
};

//FUNCTION TO GET A SINGLE ORDER
export const getSingleOrder = async (req, res, next) => {
  try {
    //The populate here will do to the user database and get the user's name and email
    console.log("Single Order");
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      return next(new ErrorHandler("Order not found with this ID", 404));
    }

    // console.log("Single Order");

    res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    next(err);
  }
};

//FUNCTION GET ALL ORDERS OF A LOGGED IN USER
export const myOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id });

    console.log("My Orders");
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (err) {
    next(err);
  }
};

//FUNCTION GET ALL ORDERS  ----(ADMIN)
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach((order) => {
      totalAmount += order.totalPrice;
    });

    res.status(200).json({
      success: true,
      totalAmount,
      orders,
    });
  } catch (err) {
    next(err);
  }
};

//UPDATE ORDER STATUS ----(ADMIN)
export const updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorHandler("Order not found with this ID", 404));
    }

    if (order.orderStatus === "Delivered") {
      return next(
        new ErrorHandler("You have already delivered this order !", 404)
      );
    }
    if (req.body.status === "Shipped") {
      order.orderItems.forEach(async (o) => {
        await updateStock(o.product, o.quantity);
      });
    }

    order.orderItems.forEach(async (order) => {
      await updateStock(order.product, order.quantity);
    });

    order.orderStatus = req.body.status;
    order.deliveredAt = Date.now();

    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    next(err);
  }
};

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.Stock = product.Stock - quantity;

  await product.save({ validateBeforeSave: false });
}

// Delete Order function --- Admin
export const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorHandler("Order not found with this ID", 404));
    }

    await order.deleteOne();

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    next(err);
  }
};
