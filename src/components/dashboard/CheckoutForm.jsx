import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import Button from "../Button";
import { useState } from "react";

const CheckoutForm = ({ auction, auctionLoading }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:5173/dashboard/paymentSuccess",
      },

      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message);
      setIsProcessing(false);
    } else if (paymentIntent) {
      console.log(paymentIntent);
    }
    setIsProcessing(false);
  };

  return (
    <div className="lg:flex gap-2">
      {/* auction detail */}
      <div className="lg:w-1/2 ">
        <h1>Auction detail</h1>
      </div>

      {/* payment form */}
      <div className="lg:w-1/2 ">
        <form onSubmit={handleSubmit} className="space-y-3">
          <PaymentElement />
          {errorMessage && (
            <span className="block text-red-600">{errorMessage}</span>
          )}
          <Button disabled={!stripe || isProcessing} isLoading={isProcessing}>
            Pay
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
