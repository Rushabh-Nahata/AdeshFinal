// src/Payment.js
import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import "./payment.css"

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const { shippingInfo, cartItems } = useSelector((state) => state.carts);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const totalPrice = orderInfo.totalPrice

  const buttonstyle = {

    "border": "none",
    "background-color": " rgb(0, 0, 0)",
    "color": "white",
    "font": "300 0.9vmax 'Roboto'",
    "width": "100%",
    "padding": " 0.8vmax",
    "cursor": "pointer",
    "transition": "all 0.5s",
    "outline": "none",
    "margin-top": "20px",
  }



  const handlePayment = async () => {
    try {
      const orderUrl = 'https://karwadenge-server.onrender.com/api/v1/payment/process';
      const response = await axios.post(orderUrl, { totalPrice: totalPrice });

      const { amount, id: order_id, currency } = response.data;

      const options = {
        key: 'rzp_live_jCWpsTxWR135dj', // Enter the Key ID generated from the Dashboard
        amount: amount.toString(),
        currency: currency,
        name: 'KARWADENGE',
        description: 'Payment',
        order_id: order_id,
        handler: async function (response) {
          const order = {
            shippingInfo,
            orderItems: cartItems,
            itemsPrice: orderInfo.subtotal,
            paymentId: response.razorpay_payment_id,
            taxPrice: orderInfo.tax,
            // shippingPrice: orderInfo.shippingCharges,
            totalPrice: orderInfo.totalPrice,
            user: user
          };

          console.log(order);
          const res = await axios.post('https://karwadenge-server.onrender.com/api/v1/order/new', order);
          console.log(res);
          console.log(res.data);
          if (res) {
            console.log("Payment Done");
            navigateTo("/success");
          }
        },
        prefill: {
          name: `{user.name}`,
          email: `{user.email}`,
          contact: '9999999999',
        },
        notes: {
          address: 'Razorpay Corporate Office',
        },
        theme: {
          color: '#F37254',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div>
      <div className='payment-razorpay'>
        <h2>Pay with Razorpay</h2>
        <button onClick={handlePayment} className='paymentFormBtn' style={buttonstyle}>Pay Now</button>
      </div>
    </div>
  );
};

export default Payment;
