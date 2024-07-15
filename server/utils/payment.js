import Razorpay from "razorpay";

// Initialize Razorpay
const instance = new Razorpay({
  key_id: "rzp_live_jCWpsTxWR135dj", // Replace with your Razorpay Key ID
  key_secret: "ZrZhtEwOao0tt8Bs3yJtKgjq", // Replace with your Razorpay Key Secret
});

const createOrder = async (req, res) => {
  const { amount, currency, receipt } = req.body;

  try {
    const options = {
      amount: amount * 100, // Amount in paise
      currency,
      receipt,
    };
    const order = await instance.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

const verifyPayment = async (signature, payment_id, payment_signature) => {
  try {
    const result = await instance.payments.authorize(
      payment_id,
      signature,
      payment_signature
    );
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  verifyPayment,
  createOrder,
};
