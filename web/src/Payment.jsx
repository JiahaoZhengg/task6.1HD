import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
// Specific payment form
import CheckoutForm from "./CheckoutForm";
import "./Payment.css";

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");
// Payment Page
export default function Payment() {
   const [clientSecret, setClientSecret] = useState("");
   // Call the backend to get the payment method
   useEffect(() => {
      fetch("http://127.0.0.1:4242/create-payment-intent", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
      }).then((res) => res.json())
         .then((data) => setClientSecret(data.clientSecret));
   }, []);

   const appearance = {
      theme: 'stripe',
   };
   // Additional configuration of payment methods
   const options = {
      clientSecret,
      appearance,
      locale: "en"
   };

   return (
      <div className="Payment">
         {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
               <CheckoutForm />
            </Elements>
         )}
      </div>
   );
}