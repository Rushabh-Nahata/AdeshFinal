import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import axios from "axios";
import "./Payment.css";
import { createOrder, clearErrors } from "../../../store/orders/orderAction";
import { useNavigate } from "react-router";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CheckoutForm } from '../../CheckoutForm/CheckoutForm'

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const navigateTo = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { shippingInfo, cartItems } = useSelector((state) => state.carts);
  const { error } = useSelector((state) => state.order);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };
  console.log(order);

  const options = {
    mode: 'payment',
    amount: 1099,
    currency: 'usd',
    // Fully customizable with appearance API.
    appearance: {
      /*...*/
    },
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );
      createOrder(dispatch, order);
      navigateTo("/success");
    } catch (err) {
      console.log("Error while Ordering");
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      clearErrors(dispatch);
    }
  }, [alert, dispatch, error]);

  return (
    <div>
      {/* <Elements stripe={stripePromise} options={options}>
        <CheckoutForm />
      </Elements> */}
      <Payment />

      <form onSubmit={submitHandler}>
        {/* <h1>Rushabh</h1> */}
        <input
          type="submit"
          value={`Pay on Delivery - ₹${orderInfo && orderInfo.totalPrice} `}
          // ref={payBtn}
          className="paymentFormBtn"
        />
      </form>
    </div>
  );
};

export default Payment;
