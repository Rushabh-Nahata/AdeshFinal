import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Import the function

import Razorpay from "razorpay";

// Initialize Razorpay
const instance = new Razorpay({
  key_id: "rzp_live_jCWpsTxWR135dj", // Replace with your Razorpay Key ID
  key_secret: "ZrZhtEwOao0tt8Bs3yJtKgjq", // Replace with your Razorpay Key Secret
});

const createOrder = async (amount) => {
  try {
    const options = {
      amount: amount * 100, // Amount is in paise
      currency: "INR",
      receipt: "order_rcptid_11",
    };
    const order = await instance.orders.create(options);
    return order;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const processPayment = async (req, res) => {
  const { totalPrice } = req.body; // Assuming amount is sent in request body
  // console.log("This is totalPrice", totalPrice)
  // console.log("This is order",req.body)
  try {
    const order = await createOrder(totalPrice);
    console.log("This is order", order);
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const processPayment_stripe = async (req, res, next) => {
  try {
    const { orderItems } = req.body;
    // console.log(orderItems)
    // const paymentResult = { message: "Payment successful" };
    const lineItems = orderItems.map((product) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: product.name,
          images: product.image,
        },
        unit_amount: Math.round(product.price * 100),
      },
      quantity: product.quantity,
    }));

    // Debugging: Log the final lineItems array
    console.log("Final lineItems array:", lineItems);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: orderItems[0].name,
            },
            unit_amount: Math.round(orderItems[0].price * 100),
          },
          quantity: orderItems[0].quantity,
        },
      ],
      success_url: "http://localhost:5173/success",
      mode: "payment",
    });

    // Respond with success
    console.log("Payment done successfully");
    res.status(200).json({ session, success: true });
  } catch (error) {
    // If an error occurs during payment processing, handle it here
    console.error("Payment processing error:", error);
    res.status(500).json({ success: false, error: "Payment processing error" });
  }
};
