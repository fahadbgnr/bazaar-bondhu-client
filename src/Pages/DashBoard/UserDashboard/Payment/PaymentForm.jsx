import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [error, setError] = useState("");
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const navigate = useNavigate();

  const { isPending, data: productInfo = {} } = useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (isPending) {
    return <p className="text-center py-6">⏳ Loading product details...</p>;
  }

  const amount = productInfo.pricePerUnit || 0;
  const amountInCents = Math.round(amount * 100); // prevent floating point errors

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    // Step 1: Validate the card
    const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (pmError) {
      setError(pmError.message);
      return;
    }

    setError("");
    console.log("Payment method:", paymentMethod);

    try {
      // Step 2: Create payment intent
      const res = await axiosSecure.post("/create-payment-intent", {
        amountInCents,
        id,
      });

      const clientSecret = res.data.clientSecret;

      // Step 3: Confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user?.displayName || "Anonymous",
            email: user?.email || "No Email",
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
        return;
      }

      if (result.paymentIntent?.status === "succeeded") {
        const transactionId = result.paymentIntent.id;

        // Step 4: Save payment to DB
        const paymentData = {
          id,
          email: user?.email,
          itemName: productInfo.itemName || "Unknown Product",
          marketName: productInfo.marketName || "Unknown Market",
          amount,
          transactionId,
          paymentMethod: result.paymentIntent.payment_method_types,
        };

        const paymentRes = await axiosSecure.post("/payments", paymentData);

        if (paymentRes.data.insertedId) {
          await Swal.fire({
            icon: "success",
            title: "✅ Payment Successful!",
            html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
            confirmButtonText: "Go to My Orders",
          });
          navigate("/dashboard/myOrderList");
        }
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 dark:text-gray-200">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-xl font-bold text-center">
          💳 Pay for {productInfo.itemName || "Product"}
        </h2>

        <CardElement className="p-3 border rounded dark:bg-gray-700 dark:border-gray-600" />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded w-full hover:bg-blue-700 transition disabled:opacity-50"
          disabled={!stripe}
        >
          Pay ৳{amount}
        </button>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
