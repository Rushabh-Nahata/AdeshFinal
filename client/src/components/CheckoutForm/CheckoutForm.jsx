import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "./CheckoutForm.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router";


export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigateTo = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const [emailInput, setEmailInput] = useState("");

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const { shippingInfo, cartItems } = useSelector((state) => state.carts);
  console.log("this is cartItems", cartItems)
  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (elements == null || stripe == null) {
      return;
    }

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError?.message) {
      // Show error to your customer
      setErrorMessage(submitError.message);
      return;
    }

    const price = 12;

    // Create the PaymentIntent and obtain clientSecret from your server endpoint
    const config = { headers: { "Content-Type": "application/json" } };

    const response = await axios.post(
      "https://karwadenge-server.onrender.com/api/v1/payment/process",
      JSON.stringify(order),
      config
    );

    const session = await response.data.session;
    console.log("thsi is session", session)
    // const result = stripePromise.redirectToCheckout({
    //   sessionId: session.id,
    // });

    // if (result.error) {
    //   console.log(result.error);
    // }


    // const { client_secret: clientSecret } = await res.json();

    const { error } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      client_secret: "sk_test_51OgVOpSC02TAJUHS8F1990AQzT1ZGSkHm0ip6jzqjthnD1K4IKduqGOrRps7uHwJjOyE0R8Ugv2doX72W7evFFfq005rukXkp5",
      confirmParams: {
        return_url: `http://localhost:5173/success`,
      },
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit} className="checkoutForm">
        <div className="mb-3">
          <label htmlFor="email-input">Email</label>
          <div>
            <input
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              type="email"
              id="email-input"
              placeholder="johndoe@gmail.com"
            />
          </div>
        </div>
        <PaymentElement />
        <button type="submit" disabled={!stripe || !elements}>
          Pay
        </button>
        {/* Show error message to your customers */}
        {errorMessage && <div>{errorMessage}</div>}
      </form>
    </div>

  );
};
